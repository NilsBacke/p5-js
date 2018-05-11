function Paddle(isPlayer1) {
	this.isPlayer1 = isPlayer1;
	this.width = 50;
	this.height = 10;
	this.x = width / 2 - this.width / 2;
	this.y = 0; // for player2
	this.dir = 0;
	this.speed = 5;
	this.ticksSinceScored = 5;
	this.img = 0;

	// initialize y coord
	this.setup = function() {
		if (this.isPlayer1) {
			this.y = height - this.height;
		}
	}

	// draw the paddle (a white rectangle)
	this.draw = function() {
		stroke(255);
		rect(this.x, this.y, this.width, this.height);
	}

	// update the x coord based on speed
	this.move = function() {
		this.x += this.dir * this.speed;
		this.x = constrain(this.x, 0, width - this.width);
		this.ticksSinceScored++;
	}

	// set direction (-1 for left, +1 for right )
	this.setDir = function(dir) {
		this.dir = dir;
	}

	// check for a collision between the paddle and the given puck
	this.checkCollision = function(puck) {
		var deltaX = puck.x - max(this.x, min(puck.x, this.x + this.width));
		var deltaY = puck.y - max(this.y, min(puck.y, this.y + this.height));
		if ((deltaX * deltaX + deltaY * deltaY) < (puck.size * puck.size)
			&& this.ticksSinceScored > 5) {
			// collision
		
			if (puck.yv < 0) {
				puck.yv -= 0.1;
			} else {
				puck.yv += 0.1;
			}
			puck.yv = -puck.yv;
			puck.xv = (puck.x - this.x + this.width / 2) / 10;
			this.ticksSinceScored = 0;
		}
	}
}