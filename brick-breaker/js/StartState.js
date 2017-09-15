Start = function(game) {};
Start.prototype = {
  create: function(){
    startText = game.add.text(25,200, 'PRESS SPACE TO START', {fontSize: '32px', fill: '#FFF' });
    game.add.text(80,250, 'Use arrow key (left and right)\n to moove the paddle', {fontSize: '20px', fill: '#FFF', align: 'center' });
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  update: function(){
    if (this.spaceKey.isDown) {
      game.state.start(nextLevel);
    }
  }
};
