const _ = require('lodash');

const CLIStructure = require('../structures/CLI');

class CLI extends CLIStructure {
  onKeyPress(keys, cb) {
    this.context.screen.on('keypress', (key, opt) => {
      if (_.includes(keys, opt.name)) {
        cb(opt);
      }
    });
  }
}

module.exports = CLI;
