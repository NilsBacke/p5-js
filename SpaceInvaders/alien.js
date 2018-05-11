function Alien(x, y) {
	this.x = x;
	this.y = y;
	this.size = 20;
	this.xdir = 1;
	this.speed = 1;

	this.show = function() {
		fill(255, 0, 0); // red
		stroke(0);
		rect(this.x, this.y, this.size, this.size);
	}

	this.move = function(yoffset) {
		this.x += this.xdir * this.speed;
		this.y += yoffset;
	}

	this.moveDown = function() {
		this.xdir = -this.xdir;
		this.y += this.size * 2;
	}

	this.collides = function(bullet) {
		var d = dist(this.x, this.y, bullet.x, bullet.y - (bullet.ysize / 2));
		if (d < this.size + (bullet.ysize / 2)) {
			return true;
		} else {
			return false;
		}
	}
}