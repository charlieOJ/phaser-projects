INITIAL_VEL = 300;
Level1 = function(game) {};
Level1.prototype = {
  preload: function () {
    game.load.image('paddle', 'assets/paddles.png');
    game.load.image('brick', 'assets/brick.png');
    game.load.image('ball', 'assets/ball.png');
  },
  create: function () {
    // Start the Arcade physics system (for movements and collisions)
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // Set the background color to blue
    game.world.enableBody = true;
    this.paddle = game.add.sprite(250, 400, 'paddle');
    this.paddle.anchor.set(0.5, 0.5);
    // Make sure the paddle won't move when it hits the ball
    this.paddle.body.immovable = true;
    this.paddle.body.collideWorldBounds = true;
    this.bricks = game.add.group();
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        // Create the brick at the correct position
        var brick = game.add.sprite(55+i*75, 55+j*35, 'brick');

        // Make sure the brick won't move when the ball hits it
        brick.body.immovable = true;

        // Add the brick to the group
        this.bricks.add(brick);
      }
    }
    this.ball = game.add.sprite(170, 300, 'ball');
    // Give the ball some initial speed
    this.ball.body.velocity.x = INITIAL_VEL;
    this.ball.body.velocity.y = 400;
    this.ball.anchor.set(0.5, 0.5);

    // Make sure the ball will bounce when hitting something
    this.ball.body.bounce.setTo(1);
    this.ball.body.collideWorldBounds = true;
    //  Register the keys.
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  },
  update: function () {
    // Move the paddle left/right when an arrow key is pressed
    if (this.leftKey.isDown) {
      this.paddle.body.velocity.x = -600;
    }  else if (this.rightKey.isDown) {
      this.paddle.body.velocity.x = 600;
    } else {
      // Stop the paddle when no key is pressed
      this.paddle.body.velocity.x = 0;
    }

    game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
    game.physics.arcade.overlap(this.ball, this.paddle, this.collideWithPaddle, null, this);

    // Restart the game if the ball is below the paddle
    if (this.ball.y > this.paddle.y-8){
      nextLevel = "Level1";
      game.state.start('Start', true, false, nextLevel);
    }

    bricks_count = this.bricks.countDead();
    if (this.bricks.length == bricks_count){
      nextLevel = "Level2";
      game.state.start('Restart', true, false, nextLevel);
    }
  },
  hit: function(ball, brick) {
    brick.kill();
  },
  collideWithPaddle: function (ball, paddle) {
    let returnAngle = 0;
    let segmentHit = Math.floor( (ball.y - paddle.y) / 4);

    if (segmentHit >= 4) {
      segmentHit = 4 - 1;
    } else if (segmentHit <= -4) {
      segmentHit = -(4 - 1);
    }
    if (paddle.x > 450 * 0.5) {
      returnAngle = segmentHit * 15;
      this.game.physics.arcade.velocityFromAngle(returnAngle, INITIAL_VEL, this.ball.body.velocity);
    } else {
      returnAngle = 180 - (segmentHit * 15);
      if (returnAngle > 180) {
        returnAngle -= 360;
      }
      this.game.physics.arcade.velocityFromAngle(returnAngle, INITIAL_VEL, this.ball.body.velocity);
    }
  }
};
