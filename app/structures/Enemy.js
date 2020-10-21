const Entity = require('./Entity');

const config = require('../config');
const enemySkin = require('../skins/enemy');

class Enemy extends Entity {
  constructor(context) {
    super(context, config.enemy, enemySkin);
  }
}

module.exports = Enemy;
