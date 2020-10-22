const _ = require('lodash');

const GameStructure = require('../structures/Game');

const Enemy = require('../structures/Enemy');
const Bullet = require('../structures/Bullet');

const config = require('../config');
const ENUM = require('../enum');

const { timeout } = require('../utils');

class Game extends GameStructure {
  setup() {
    this.dashboard.isPaused = true;
    this.player.setPosition(config.playerStartingPositionX, config.playerStartingPositionY);
    _.times(config.enemyRowAmount, (i) => {
      _.times(config.enemyColumnAmount, (j) => {
        this.spawnEnemy(i, j);
      });
    });
  }

  prepare() {
    this.dashboard.update();

    this.window.cli.onKeyPress(config.rightKeyPress, () => {
      if (this.player.position.x + config.player.width + 1 < config.screenWidth) {
        this.player.moveRight();
      }
    });

    this.window.cli.onKeyPress(config.leftKeyPress, () => {
      if (this.player.position.x - 1 > 0) {
        this.player.moveLeft();
      }
    });

    this.window.cli.onKeyPress(config.shootKeyPress, () => {
      this.player.shoot();
    });

    this.window.cli.onKeyPress(config.pauseButtons, () => {
      this.dashboard.pause();
    });

    this.window.screen.on('keypress', (key, opt) => {
      if (this.dashboard.isPaused && !_.includes(config.pauseButtons, opt.full)) {
        if (this.dashboard.isGameOver) {
          this.destroyAllEnemies();
          this.dashboard.handleStartOver();
        }
        this.setup();
        this.dashboard.unpause();
      }
    });
  }

  spawnEnemy(i, j) {
    const enemy = new Enemy(this);
    this.enemies.push(enemy);

    const x = i * (config.enemyHorizontalSpacing + config.enemy.width) + 1;
    const y = j * (config.enemyVerticalSpacing + config.enemy.height) + 1;

    enemy.setPosition(x, y);
  }

  destroyAllEnemies() {
    for (let i = this.enemies.length - 1; i >= 0; i -= 1) {
      this.destroyEnemy(this.enemies[i]);
    }
  }

  destroyEnemy(enemy) {
    enemy.destroy();
    _.remove(this.enemies, (enem) => enem === enemy);
  }

  destroyEnemyByPlayer(enemy) {
    this.destroyEnemy(enemy);
    this.dashboard.addKillScore();
  }

  spawnBullet(x, y) {
    const bullet = new Bullet(this);
    this.bullets.push(bullet);
    bullet.setPosition(x, y);
  }

  destroyBullet(bullet) {
    bullet.destroy();
    _.remove(this.bullets, (blt) => blt === bullet);
  }

  cleanBullets() {
    _.forEach(this.bullets, (bullet) => {
      if (bullet && bullet.position.y < 0) {
        this.destroyBullet(bullet);
      }
    });
  }

  handleEnemyShooting() {
    let bulletsUsed = [];
    const enemiesShot = _.filter(this.enemies, (enemy) => {
      const bulletsThatHit = _.filter(this.bullets, (bullet) => {
        const bulletLeft = bullet.position.x;
        const bulletRight = bullet.position.x + bullet.config.width;
        const bulletTop = bullet.position.y;
        const bulletBottom = bullet.position.y + bullet.config.height;

        const enemyLeft = enemy.position.x;
        const enemyRight = enemy.position.x + enemy.config.width;
        const enemyTop = enemy.position.y;
        const enemyBottom = enemy.position.y + enemy.config.height;

        return bulletLeft < enemyRight
          && bulletRight > enemyLeft
          && bulletTop < enemyBottom
          && bulletBottom > enemyTop;
      });
      bulletsUsed = _.concat(bulletsUsed, bulletsThatHit);
      return bulletsThatHit.length > 0;
    });

    _.forEach(enemiesShot, (enemy) => {
      this.destroyEnemyByPlayer(enemy);
    });

    _.forEach(bulletsUsed, (bullet) => {
      this.destroyBullet(bullet);
    });
  }

  checkGameOver() {
    let isGameOver = false;
    _.forEach(this.enemies, (enemy) => {
      const bulletLeft = enemy.position.x;
      const bulletRight = enemy.position.x + enemy.config.width;
      const bulletTop = enemy.position.y;
      const bulletBottom = enemy.position.y + enemy.config.height;

      const enemyLeft = this.player.position.x;
      const enemyRight = this.player.position.x + this.player.config.width;
      const enemyTop = this.player.position.y;
      const enemyBottom = this.player.position.y + this.player.config.height;

      if (bulletLeft < enemyRight
        && bulletRight > enemyLeft
        && bulletTop < enemyBottom
        && bulletBottom > enemyTop) isGameOver = true;
    });

    let mostBottomEnemyY = this.enemies.length > 0 ? this.enemies[0].position.y : 0;

    // find most bottom enemy position
    _.forEach(this.enemies, (entity) => {
      if (entity.position.y > mostBottomEnemyY) {
        mostBottomEnemyY = entity.position.y;
      }
    });
    if (mostBottomEnemyY + config.enemy.height > config.playerStartingPositionY) isGameOver = true;
    if (isGameOver) this.dashboard.handleGameOver();
  }

  checkLevelComplete() {
    if (this.enemies.length === 0 && !this.dashboard.isPaused) {
      this.dashboard.handleLevelComplete();
    }
  }

  handleEnemiesMovement() {
    let mostRightEnemyX = 0;
    let mostLeftEnemyX = this.enemies.length > 0 ? this.enemies[0].position.x : 0;

    // find most left and most right enemy x position
    _.forEach(this.enemies, (entity) => {
      if (entity.position.x > mostRightEnemyX) {
        mostRightEnemyX = entity.position.x;
      }
      if (entity.position.x < mostLeftEnemyX) {
        mostLeftEnemyX = entity.position.x;
      }
    });

    // switch direction and move down if reached border
    if (this.enemyDirection === ENUM.RIGHT
      && (mostRightEnemyX + config.enemy.width) + 1 - config.screenWidth >= 0) {
      this.enemyDirection = ENUM.LEFT;
      _.forEach(this.enemies, (entity) => {
        entity.moveDown();
      });
    }
    if (this.enemyDirection === ENUM.LEFT && mostLeftEnemyX <= 1) {
      this.enemyDirection = ENUM.RIGHT;
      _.forEach(this.enemies, (entity) => {
        entity.moveDown();
      });
    }

    // go left or go right
    _.forEach(this.enemies, (entity) => {
      if (this.enemyDirection === ENUM.LEFT) {
        entity.moveLeft();
      }
      if (this.enemyDirection === ENUM.RIGHT) {
        entity.moveRight();
      }
    });
  }

  handleBulletsMovement() {
    _.forEach(this.bullets, (entity) => {
      entity.moveUp();
    });
  }

  update() {
    this.handleEnemiesMovement();
    this.handleBulletsMovement();

    this.handleEnemyShooting();

    this.checkGameOver();

    this.cleanBullets();

    this.checkLevelComplete();
  }

  async tick() {
    await timeout(this.ticks
      * (1 / this.dashboard.speedMultiplierPerLevel) ** (this.dashboard.level - 1));
    if (!this.dashboard.isPaused) this.update();
    this.tick();
  }
}

module.exports = Game;
