const blessed = require('blessed');

const config = require('../config');

class GameScreen {
  #context;

  #entity;

  constructor(context) {
    this.context = context;
    this.entity = blessed.box({
      parent: this.context.window.screen,
      content: this.context.skin,
      tags: true,
      top: 0,
      left: 0,
      width: config.screenWidth,
      height: config.screenHeight,
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

  set entity(entity) {
    this.#entity = entity;
  }

  get entity() {
    return this.#entity;
  }
}

module.exports = GameScreen;
