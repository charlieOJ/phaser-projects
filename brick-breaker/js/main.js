var player;
var bricks_count = 0;
var cursors;
var spaceKey;
var leftKey;
var rightKey;
var startText;
var currentLevel,nextLevel = "Level1";
var paddleSegmentsMax = 4;
var paddleSegmentHeight = 4;
var paddleSegmentAngle = 15;

var game = new Phaser.Game(450, 500, Phaser.AUTO, 'gameContainer');

game.state.add('Start', Start);
game.state.add('Level1', Level1);
game.state.add('Level2', Level2);
game.state.add('Level3', Level3);
game.state.add('Restart', Restart);

game.state.start('Start');
