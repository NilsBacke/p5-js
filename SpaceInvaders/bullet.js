function Bullet(xc, yc) {
	this.x = xc;
	this.y = yc;
	this.speed = 6;
	this.xsize = 2;
	this.ysize = 10;

	this.show = function() {
		stroke(255);
		fill(255);
		rect(this.x, this.y, this.xsize, this.ysize);
	}

	this.update = function() {
		this.y -= this.speed;
	}
}