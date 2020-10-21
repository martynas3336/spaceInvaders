const blessed = require('blessed');

const CLI = require('../models/CLI');

class Window {
  #screen;

  #cli;

  constructor(title, exitKeys) {
    this.screen = blessed.screen({
      smartCSR: true,
      autoPadding: true,
    });
    this.screen.title = title;
    this.screen.key(exitKeys, () => process.exit(0));
    this.cli = new CLI(this);
  }

  set screen(screen) {
    this.#screen = screen;
  }

  get screen() {
    return this.#screen;
  }

  set cli(cli) {
    this.#cli = cli;
  }

  get cli() {
    return this.#cli;
  }
}

module.exports = Window;
