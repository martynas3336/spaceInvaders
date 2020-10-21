const GameScreen = require('./GameScreen');
const Dashboard = require('../models/Dashboard');
const Player = require('../models/Player');

const ENUM = require('../enum');
const config = require('../config');

class Game {
  #enemies;

  #player;

  #bullets;

  #window;

  #width;

  #height

  #gameScreen;

  #dashboard;

  #shouldEnemiesMoveDown;

  #ticks;

  #enemyDirection;

  constructor(window) {
    this.enemies = [];
    this.player = {};
    this.bullets = [];
    this.window = window;
    this.gameScreen = new GameScreen(this);
    this.dashboard = new Dashboard(this);
    this.player = new Player(this);
    this.shouldEnemiesMoveDown = false;
    this.ticks = config.ticks;
    this.enemyDirection = ENUM.RIGHT;
  }

  set enemies(enemies) {
    this.#enemies = enemies;
  }

  get enemies() {
    return this.#enemies;
  }

  set player(player) {
    this.#player = player;
  }

  get player() {
    return this.#player;
  }

  set bullets(bullets) {
    this.#bullets = bullets;
  }

  get bullets() {
    return this.#bullets;
  }

  set window(window) {
    this.#window = window;
  }

  get window() {
    return this.#window;
  }

  set width(width) {
    this.#width = width;
  }

  get width() {
    return this.#width;
  }

  set height(height) {
    this.#height = height;
  }

  get height() {
    return this.#height;
  }

  set gameScreen(gameScreen) {
    this.#gameScreen = gameScreen;
  }

  get gameScreen() {
    return this.#gameScreen;
  }

  set dashboard(dashboard) {
    this.#dashboard = dashboard;
  }

  get dashboard() {
    return this.#dashboard;
  }

  set shouldEnemiesMoveDown(shouldEnemiesMoveDown) {
    this.#shouldEnemiesMoveDown = shouldEnemiesMoveDown;
  }

  get shouldEnemiesMoveDown() {
    return this.#shouldEnemiesMoveDown;
  }

  set ticks(ticks) {
    this.#ticks = ticks;
  }

  get ticks() {
    return this.#ticks;
  }

  set enemyDirection(enemyDirection) {
    this.#enemyDirection = enemyDirection;
  }

  get enemyDirection() {
    return this.#enemyDirection;
  }
}

module.exports = Game;
