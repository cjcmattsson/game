// Create our 'main' state that will contain the game
var mainState = {
  preload: function() {
  // Load the falcon sprite, the pipes and background
  game.load.image('space', 'assets/space.png');
  game.load.image('falcon', 'assets/falcon2.png');
  game.load.image('pipe', 'assets/cursorjabba.png');
},

create: function() {
  // Change the background color of the game to blue

  // game.stage.backgroundColor = '#71c5cf';

  tileSprite = game.add.tileSprite(0, 0, 1000, 1000, 'space');

  // Set the physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Display the falcon at the position x=100 and y=245
  // Decides where on screen falcon is
  this.falcon = game.add.sprite(100, 245, 'falcon');

  // Add physics to the falcon
  // Needed for: movements, gravity, collisions, etc.
  game.physics.arcade.enable(this.falcon);

  // Add gravity to the falcon to make it fall
  this.falcon.body.gravity.y = 1000;

  // Call the 'jump' function when the spacekey is hit
  var spaceKey = game.input.keyboard.addKey(
                  Phaser.Keyboard.SPACEBAR);
  spaceKey.onDown.add(this.jump, this);

  // Create an empty group
this.pipes = game.add.group();

this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

this.score = 0;
this.labelScore = game.add.text(20, 20, "0",
    { font: "30px Arial", fill: "#ffffff" });
},

update: function() {
  // If the falcon is out of the screen (too high or too low)
  // Call the 'restartGame' function
  if (this.falcon.y < 0 || this.falcon.y > 490)
      this.restartGame();
},

// Make the falcon jump
jump: function() {
    // Add a vertical velocity to the falcon
    // Decides how high the falcon jumps on spacebar-press
    this.falcon.body.velocity.y = -350;
},

// Restart the game
restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');

    game.physics.arcade.overlap(
    this.falcon, this.pipes, this.restartGame, null, this);
},

addOnePipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200;

    // Automatically kill the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function() {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
        if (i != hole && i != hole + 1)
            this.addOnePipe(400, i * 60 + 10);

            this.score += 1;
            this.labelScore.text = this.score;
},
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
