const Entity = require('./Entity');

const config = require('../config');
const bulletSkin = require('../skins/bullet');

class Enemy extends Entity {
  constructor(context) {
    super(context, config.bullet, bulletSkin);
  }
}

module.exports = Enemy;
