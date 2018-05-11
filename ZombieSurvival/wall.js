function Wall() {
	this.width = random(10, 50);
	this.height = 50 - this.width;
	this.height = constrain(this.height, 10, 50);
	this.x = random(0, width - this.width);
	this.y = random(0, height - this.height);

	this.show = function() {
		push();
		fill(255);
		rect(this.x, this.y, this.width, this.height);
		pop();
	}
}