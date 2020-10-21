const blessed = require('blessed');

class WindowItem {
  #context;

  #entity;

  constructor(context) {
    this.context = context;
    this.entity = blessed.box({
      parent: this.context.context.window.screen,
      content: this.context.skin,
      tags: true,
      width: this.context.config.width,
      height: this.context.config.height,
      style: {
        fg: this.context.config.color,
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

  render() {
    this.context.context.window.screen.render();
  }

  setPosition(x, y) {
    this.entity.left = x;
    this.entity.top = y;
    this.render();
  }
}

module.exports = WindowItem;
