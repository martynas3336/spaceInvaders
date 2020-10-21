class CLI {
  #context;

  constructor(context) {
    this.context = context;
  }

  set context(context) {
    this.#context = context;
  }

  get context() {
    return this.#context;
  }
}

module.exports = CLI;
