Restart = function(game) {};
Restart.prototype = {
  preload: function(){
    game.load.image('win', 'assets/win.png');
  },
  create: function(){
    game.add.sprite(0, 70, 'win');
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },
  update: function(){
    if (this.spaceKey.isDown) {
      game.state.start('Start');
    }
  }
};
