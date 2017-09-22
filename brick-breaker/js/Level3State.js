INITIAL_VEL = 300;
Level3 = function(game) {};
Level3.prototype = {
  preload: function () {
    game.load.image('paddle', 'assets/paddles.png');
    game.load.image('brick', 'assets/brick.png');
    game.load.image('ball', 'assets/ball.png');
  },
  create: function () {
    currentLevel = "Level3";
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
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        // Add the brick to the group
        this.bricks.add(this.colorBrick(i,j));
      }
    }
    this.ball = game.add.sprite(170, 300, 'ball');
    this.ball.anchor.set(0.5, 0.5);
    // Give the ball some initial speed
    this.ball.body.velocity.x = INITIAL_VEL;
    this.ball.body.velocity.y = 210;
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

    // Call the 'hit' function when the ball hits a brick
    game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
    game.physics.arcade.overlap(this.ball, this.paddle, this.collideWithPaddle, null, this);

    // Restart the game if the ball is below the paddle
    if (this.ball.y > this.paddle.y-8){
      nextLevel = "Level3";
      game.state.start('Start', true, false, nextLevel);
    }

    bricks_count = this.bricks.countDead();
    if (this.bricks.length == bricks_count){
      nextLevel = "Level3";
      game.state.start('Restart', true, false, nextLevel);
    }
  },
  hit: function(ball, brick) {
    brick['health'] -= 0.5;
    if (brick['health'] == 0){
      brick.kill();
    }
  },
  colorBrick: function(i, j){
    var bmd = game.add.bitmapData(25, 10);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 25, 10);
    var rnd = Math.random()*(10);
    if(rnd%2 > 0 && rnd%2 < 1){
      bmd.ctx.fillStyle = 'red';
      bmd.ctx.fill();
      var brick = game.add.sprite(55 + i * 60, 55 + j * 35, bmd);
    } else {
      bmd.ctx.fillStyle = '#FFF';
      bmd.ctx.fill();
      var brick = game.add.sprite(55 + i * 60, 55 + j * 35, bmd);
      brick['health'] -= 0.5;
    }
    // Make sure the brick won't move when the ball hits it
    brick.body.immovable = true;

    return brick;
  },
  collideWithPaddle: function (ball, paddle) {
    let returnAngle = 0;
    let segmentHit = Math.floor( (ball.y - paddle.y) / paddleSegmentHeight);

    if (segmentHit >= paddleSegmentsMax) {
      segmentHit = paddleSegmentsMax - 1;
    } else if (segmentHit <= -paddleSegmentsMax) {
      segmentHit = -(paddleSegmentsMax - 1);
    }
    if (paddle.x > 450 * 0.5) {
      returnAngle = segmentHit * paddleSegmentAngle;
      this.game.physics.arcade.velocityFromAngle(returnAngle, INITIAL_VEL, this.ball.body.velocity);
    } else {
      returnAngle = 180 - (segmentHit * paddleSegmentAngle);
      if (returnAngle > 180) {
        returnAngle -= 360;
      }
      this.game.physics.arcade.velocityFromAngle(returnAngle, INITIAL_VEL, this.ball.body.velocity);
    }
  }
};
