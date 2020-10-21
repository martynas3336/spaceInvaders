const Entity = require('./Entity');

const config = require('../config');
const playerSkin = require('../skins/player');

class Player extends Entity {
  #isCooldownActive;

  constructor(context) {
    super(context, config.player, playerSkin);
    this.isCooldownActive = false;
  }

  set isCooldownActive(isCooldownActive) {
    this.#isCooldownActive = isCooldownActive;
  }

  get isCooldownActive() {
    return this.#isCooldownActive;
  }
}

module.exports = Player;
