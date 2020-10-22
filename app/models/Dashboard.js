const DashboardStructure = require('../structures/Dashboard');

const config = require('../config');

class Dashboard extends DashboardStructure {
  update() {
    this.blessed.setLine(0, `High Score: ${this.highScore}`);
    this.blessed.setLine(2, `Score: ${this.score}`);
    this.blessed.setLine(4, `Kill Count: ${this.killCount}`);
    if (this.isGameOver) {
      this.blessed.setLine(6, 'Status: Game Over.');
    } else {
      this.blessed.setLine(6, `Status: ${this.isPaused ? 'Paused.' : 'Running.'}`);
    }
    this.blessed.setLine(8, `Level: ${this.level}`);
    this.blessed.setLine(10, `Ticks: ${this.context.ticks
    * (1 / this.speedMultiplierPerLevel) ** (this.level - 1)}`);
    this.blessed.setLine(12, `Pause Buttons: ${config.pauseButtons.join(', ')}`);
    this.blessed.setLine(14, `Exit Buttons: ${config.exitButtons.join(', ')}`);
    this.context.window.screen.render();
  }

  addKillScore() {
    this.killCount += 1;
    this.score += config.scoreMultiplier;
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    this.update();
  }

  handleStartOver() {
    this.isGameOver = false;
    this.level = 1;
    this.killCount = 0;
    this.resetScore();
    this.unpause();
  }

  handleGameOver() {
    this.isGameOver = true;
    this.pause();
  }

  handleLevelComplete() {
    this.pause();
    this.isLevelComplete = true;
  }

  handleStartAfterLevelComplete() {
    this.isLevelComplete = false;
    this.level += 1;
  }

  resetScore() {
    this.score = 0;
    this.update();
  }

  unpause() {
    this.isPaused = false;
    this.update();
  }

  pause() {
    this.isPaused = true;
    this.update();
  }
}

module.exports = Dashboard;
