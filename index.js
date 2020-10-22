const Window = require('./app/structures/Window');
const Game = require('./app/models/Game');

const run = () => {
  const window = new Window();
  const game = new Game(window);
  game.prepare();
  game.setup();
  game.tick();
};

run();
