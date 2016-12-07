// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.enemyMovement = [-150, 600];
    this.enemyLocation = [60, 140, 220];
    this.enemySpeedRange = [150, 600];
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

Enemy.prototype.reset = function() {
    var startingPosition = this.enemyMovement[0];
    this.x = startingPosition;
    this.y = this.getRandomLoc();
    this.speed = this.getSpeed();
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var maxPosition = this.enemyMovement[1];
    this.x += this.speed * dt;

    if (this.x > maxPosition) {
        this.reset();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Enemy.prototype.getRandomLoc = function() {
    return this.enemyLocation[Math.floor(Math.random() * this.enemyLocation.length)];

}

Enemy.prototype.getSpeed = function() {
    var minSpeed = this.enemySpeedRange[0],
        maxSpeed = this.enemySpeedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Player = function() {
    this.xPlayerRange = [-2, 402];
    this.yPlayerRange = [-20, 380];
    this.characters = ['images/char-boy.png','images/char-cat-girl.png','images/char-princess-girl.png','images/char-pink-girl.png','images/char-horn-girl.png'];
    this.sprite = 'images/char-boy.png';
    this.reset();
}

Player.prototype.update = function() {
    this.checkCollisions();
}

Player.prototype.checkCollisions = function () {
    if (this.y == -20){
        alert("Winner Winner Chicken Dinner");
        this.reset();
    } else if (this.y >= 60 && this.y <= 220){
        var self = this;
        allEnemies.forEach(function(enemy){
            if (enemy.y == self.y) {
                if(enemy.x >= player.x - 30 && enemy.x <= player.x + 30){
                    self.reset();
                }
            }
        });
    }
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.changeCharacter = function(key) {
    var char = '';
    if (key === 'z') {
        char = this.characters[0];
    } else if (key === 'x') {
        char = this.characters[1];
    } else if (key === 'c') {
        char = this.characters[2];
    } else if (key === 'v') {
        char = this.characters[3];
    }
    return char;
}

Player.prototype.handleInput = function (key) {
    if (key === 'left') {
       this.x -= (this.x - 101 < this.xPlayerRange[0]) ? 0 : 101;
   } else if (key === 'right') {
       this.x += (this.x + 101 > this.xPlayerRange[1]) ? 0 : 101;
   } else if (key === 'up') {
       this.y -= (this.y - 80 < this.yPlayerRange[0]) ? 0 : 80;
   } else if (key === 'down') {
       this.y += (this.y + 80 > this.yPlayerRange[1]) ? 0 : 80;
   } else if (key === 'c' || key === 'z' || key === 'x' || key === 'v') {
       this.sprite = this.changeCharacter(key);
       this.reset();
   }
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        90: 'z',
        88: 'x',
        67: 'c',
        86: 'v'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var bowser = new Enemy();
var ganon = new Enemy();
var robotnik = new Enemy();
var allEnemies = [bowser, ganon, robotnik];
var player = new Player();