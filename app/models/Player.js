const PlayerStructure = require('../structures/Player');

const config = require('../config');

const { timeout } = require('../utils');

class Player extends PlayerStructure {
  shoot() {
    if (!this.isCooldownActive) {
      this.context.spawnBullet(this.position.x, this.position.y);
      this.isCooldownActive = true;
      timeout(config.bulletCooldown).then(() => {
        this.isCooldownActive = false;
      });
    }
  }
}

module.exports = Player;
