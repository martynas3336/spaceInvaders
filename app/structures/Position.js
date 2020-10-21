class Position {
  #x;

  #y;

  constructor({
    x = 0, y = 0,
  } = {}) {
    this.x = x;
    this.y = y;
  }

  set x(x) {
    this.#x = x;
  }

  get x() {
    return this.#x;
  }

  set y(y) {
    this.#y = y;
  }

  get y() {
    return this.#y;
  }
}

module.exports = Position;
