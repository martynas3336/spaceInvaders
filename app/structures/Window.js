const blessed = require('blessed');

const config = require('../config');

const CLI = require('../models/CLI');

class Window {
  #screen;

  #cli;

  constructor() {
    this.screen = blessed.screen({
      smartCSR: true,
      autoPadding: true,
    });
    this.screen.title = config.title;
    this.screen.key(config.exitButtons, () => process.exit(0));
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
