var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.yPosition = [60, 145, 225]; // Three possible rows
    this.x = -125; // Start offscreen
    this.y = this.yPosition[Math.floor(Math.random() * this.yPosition.length)];; // Pick one of the three possible rows at random in which to spawn.
    this.speed = (Math.random() * 200) + 100; //Set a random speed within the proper range
}
Enemy.prototype.update = function(dt) {
    // Respawn enemy once it reaches the right side
    if (this.x > 500) {
        this.x = -125;
        this.y = this.yPosition[Math.floor(Math.random() * this.yPosition.length)];; // Pick one of the three possible rows at random in which to spawn.
    }
    this.x += this.speed * dt;
    // Create enemy dimensions
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 50;
    this.bottom = this.y + 50;
    this.checkCollisions(this, player);
}
// Check for collisions
Enemy.prototype.isColliding = function(enemy, player) {
    //If any of any these 'safe zones' are violated, return TRUE for collision
    return !( player.left > enemy.right ||
    player.right < enemy.left ||
    player.top > enemy.bottom ||
    player.bottom < enemy.top);
}
// If there's a collision, restart game
Enemy.prototype.checkCollisions = function(enemy, player) {
    if (this.isColliding(enemy, player)) {
        console.log("Collide!");
        player.reset();
    }
}
// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    // Initialize player's position
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt) {
    if (this.y < 0) {
        this.reset();
    }
    // Create Player dimensions
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 50;
    this.bottom = this.y + 50;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    // How far should we move?
    var xMove = 101;
    var yMove = 83;
    //Check for input and also keep player from going off screen
    if(key === 'left' && this.x > 0) {
        this.x -= xMove;
    }
    else if(key === 'up' && this.y > 0) {
        this.y -= yMove;
    }
    else if(key=== 'right' && this.x < 400) {
        this.x += xMove;
    }
    else if(key === 'down' && this.y < 400) {
        this.y += yMove;
    }
}

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 405;
}
// Instantiating enemies and player.
var allEnemies = [new Enemy(),new Enemy(),new Enemy()];
var player = new Player(200,400);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});