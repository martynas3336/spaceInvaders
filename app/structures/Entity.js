const WindowItem = require('./WindowItem');

const Position = require('./Position');

class Entity {
  #context;

  #config;

  #skin;

  #position;

  #blessed;

  #actionCallbacks;

  constructor(context, config, skin) {
    this.context = context;
    this.config = config;
    this.skin = skin;
    this.actionCallbacks = {};
    this.position = new Position();
    this.blessed = new WindowItem(this);
  }

  set context(context) {
    this.#context = context;
  }

  get context() {
    return this.#context;
  }

  set config(config) {
    this.#config = config;
  }

  get config() {
    return this.#config;
  }

  set skin(skin) {
    this.#skin = skin;
  }

  get skin() {
    return this.#skin;
  }

  set position(position) {
    this.#position = position;
  }

  get position() {
    return this.#position;
  }

  set blessed(blessed) {
    this.#blessed = blessed;
  }

  get blessed() {
    return this.#blessed;
  }

  set actionCallbacks(actionCallbacks) {
    this.#actionCallbacks = actionCallbacks;
  }

  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.blessed.setPosition(x, y);
  }

  destroy() {
    this.blessed.entity.destroy();
  }

  moveLeft() {
    this.setPosition(this.position.x - 1, this.position.y);
  }

  moveRight() {
    this.setPosition(this.position.x + 1, this.position.y);
  }

  moveUp() {
    this.setPosition(this.position.x, this.position.y - 1);
  }

  moveDown() {
    this.setPosition(this.position.x, this.position.y + 1);
  }
}

module.exports = Entity;
