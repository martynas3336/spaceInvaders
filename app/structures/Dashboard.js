const blessed = require('blessed');

const config = require('../config');

class Dashboard {
  #context;

  #score;

  #highScore;

  #killCount;

  #isPaused;

  #blessed;

  #isGameOver;

  #level;

  #speedMultiplierPerLevel;

  constructor(context) {
    this.context = context;
    this.score = 0;
    this.highScore = 0;
    this.killCount = 0;
    this.isGameOver = false;
    this.isPaused = true;
    this.level = 1;
    this.speedMultiplierPerLevel = config.speedMultiplierPerLevel;
    this.blessed = blessed.box({
      parent: this.context.window.screen,
      content: this.context.skin,
      tags: true,
      top: config.dashboardY,
      left: config.dashboardX,
      width: config.dashboardWidth,
      height: config.dashboardHeight,
      style: {
        fg: 'white',
      },
      border: {
        type: 'line',
        fg: 'red',
      },
    });
  }

  set context(context) {
    this.#context = context;
  }

  get context() {
    return this.#context;
  }

  set score(score) {
    this.#score = score;
  }

  get score() {
    return this.#score;
  }

  set highScore(highScore) {
    this.#highScore = highScore;
  }

  get highScore() {
    return this.#highScore;
  }

  set killCount(killCount) {
    this.#killCount = killCount;
  }

  get killCount() {
    return this.#killCount;
  }

  set isPaused(isPaused) {
    this.#isPaused = isPaused;
  }

  get isPaused() {
    return this.#isPaused;
  }

  set blessed(_blessed) {
    this.#blessed = _blessed;
  }

  get blessed() {
    return this.#blessed;
  }

  set isGameOver(isGameOver) {
    this.#isGameOver = isGameOver;
  }

  get isGameOver() {
    return this.#isGameOver;
  }

  set level(level) {
    this.#level = level;
  }

  get level() {
    return this.#level;
  }

  set speedMultiplierPerLevel(speedMultiplierPerLevel) {
    this.#speedMultiplierPerLevel = speedMultiplierPerLevel;
  }

  get speedMultiplierPerLevel() {
    return this.#speedMultiplierPerLevel;
  }
}

module.exports = Dashboard;
