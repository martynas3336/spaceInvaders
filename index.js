const Window = require('./app/structures/Window');
const Game = require('./app/models/Game');

const run = () => {
  const window = new Window('Space Invaders', ['C-c']);
  const game = new Game(window);
  game.prepare();
  game.setup();
  game.tick();
};

run();
