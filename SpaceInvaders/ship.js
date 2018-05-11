function Ship() {
	this.x = width / 2;
	this.y = height - 50;
	this.size = 20;
	this.bullets = [];
	this.xdir = 0;
	this.speed = 3;

	this.setDir = function(dir) {
		this.xdir = dir;
	}

	this.move = function() {
		this.x += this.xdir * 3;
	}

	this.show = function() {
		fill(255);
		rectMode(CENTER);
		rect(this.x, this.y, this.size, this.size);
	}

	this.shoot = function shoot() {
		this.bullets.push(new Bullet(this.x, this.y));
	}
}