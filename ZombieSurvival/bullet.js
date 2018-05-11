function Bullet(player) {
	this.x = player.x;
	this.y = player.y;
	this.speed = 6;
	this.width = 3;
	this.vector = createVector(mouseX - player.x, mouseY - player.y);
	this.vector.setMag(this.speed);

	this.damage = 30;

	this.show = function() {
		push();
		fill(0);
		ellipse(this.x, this.y, this.width);
		pop();
	}

	this.update = function() {
		this.x += this.vector.x;
		this.y += this.vector.y;
	}
}