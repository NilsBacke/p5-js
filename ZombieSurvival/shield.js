function Shield() {
	this.x = random(0, width);
	this.y = random(0, height);

	this.show = function() {
		push();
		fill(0, 255, 255);
		textSize(16);
		textAlign(CENTER);
		text("S", this.x, this.y);
		pop();
	}
}