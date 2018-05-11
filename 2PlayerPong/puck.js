function Puck() {
	this.x = width / 2;
	this.y = height / 2;
	this.xv = 0; // x velocity
	this.yv = 0; // y velocity 
	this.size = 20;

	// draw the puck (a circle)
	this.draw = function() {
		stroke(255);
		ellipse(this.x, this.y, this.size, this.size);
	}

	// update the puck's x and y coords based on the xv and yv
	this.move = function() {
		if (this.xv == 0 && this.yv == 0) {
			var xsign = random(0, 1);
			if (xsign > 0.5) {
				xsign = 1;
			} else {
				xsign = -1;
			}
			var ysign = random(0, 1);
			if (ysign > 0.5) {
				ysign = 1;
			} else {
				ysign = -1;
			}
			this.xv = random(1, 5) * xsign;
			this.yv = random(3, 6) * ysign;
		}
		this.x += this.xv;
		this.y += this.yv;

		if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
			this.xv = -this.xv;
		}
	}

	// checks to see if the puck is out of bounds
	this.isOutOfBounds = function() {
		if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > width) {
			return true;
		}
		return false;
	}
}