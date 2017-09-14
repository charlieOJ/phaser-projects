Game = function(game) {};
Game.prototype = {
  preload: function () {
    game.load.image('paddle', '../pong-phaser/assets/paddle2.png');
    game.load.image('ball', '../pong-phaser/assets/ball2.png');
  },
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    this.player1 = game.add.sprite(50, 150, 'paddle');
    this.player2 = game.add.sprite(900, 150, 'paddle');

    this.ball = game.add.sprite(500, 300, 'ball');
    this.player1.body.immovable = true;
    this.player1.body.collideWorldBounds = true;
    this.player2.body.immovable = true;
    this.player2.body.collideWorldBounds = true;

    // Give the ball some initial speed
    this.ball.body.velocity.x = 200;
    this.ball.body.velocity.y = 200;
    // Make sure the ball will bounce when hitting something
    this.ball.body.bounce.setTo(1.1);
    this.ball.body.collideWorldBounds = true;
    this.player1.body.collideWorldBounds = true;
    this.player2.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();

  },
  update: function () {
    // // Move the players left/right when an arrow key is pressed
    if (cursors.up.isDown) {
      this.player1.body.velocity.y = -650;
      this.player2.body.velocity.y = -650;
    }  else if (cursors.down.isDown) {
      this.player1.body.velocity.y = 650;
      this.player2.body.velocity.y = 650;
    } else {
      // Stop the players when no key is pressed
      this.player1.body.velocity.y = 0;
      this.player2.body.velocity.y = 0;
    }

    // // Add collisions between the paddle and the ball
    game.physics.arcade.collide(this.player1, this.ball);
    game.physics.arcade.collide(this.player2, this.ball);

    if (this.ball.x < this.player1.x-10 || this.ball.x > this.player2.x+10){
      game.state.start(game.state.current);
    }

  }
};
