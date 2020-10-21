const handler = {
  enemyRowAmount: 2,
  enemyColumnAmount: 2,
  enemyHorizontalSpacing: 2,
  enemyVerticalSpacing: 1,
  playerStartingPositionX: 30,
  playerStartingPositionY: 45,
  screenWidth: 70,
  screenHeight: 50,
  ticks: 10,
  bulletCooldown: 1,
  scoreMultiplier: 15,
  speedMultiplierPerLevel: 1.1,
  leftKeyPress: ['a', 'A', 'left'],
  rightKeyPress: ['d', 'D', 'right'],
  pauseButtons: ['p', 'P'],
  shootKeyPress: ['space'],
  player: {
    width: 3,
    height: 2,
    color: 'red',
  },
  enemy: {
    width: 3,
    height: 2,
    color: 'red',
  },
  bullet: {
    width: 1,
    height: 1,
    color: 'red',
  },
  dashboardX: 70,
  dashboardY: 0,
  dashboardWidth: 50,
  dashboardHeight: 50,
};

module.exports = handler;
