var g = 0.1;
var yvelocity = 0;
var xvelocity = 0;
var x;
var y;
var score = 0;
var ticksSinceScored = 0;

var rectX;
var rectY;
var rectWidth = 50;
var rectHeight = 10;
var esize = 20;

var difficulty = 5;

function setup() {
	createCanvas(600, 600);
	rectY = width * 3/4;
	x = width / 2;
	y = width / 4;
}

function draw() {
	background(0);

	ellipse(x, y, esize);
	yvelocity += g;
	y = y + yvelocity;
	x = x + xvelocity;

	rectX = mouseX - rectWidth / 2;
	// rectX = width / 2 - rectWidth;
	rect(rectX, rectY, rectWidth, rectHeight);

	// Check for collision
	if (collision()) {
		yvelocity = -5;
		xvelocity = (x - mouseX) / (10 / difficulty);
		if (ticksSinceScored > 5) {
			score++;
			ticksSinceScored = 0;
		}
	}
	ticksSinceScored++;

	if (x < 0 || x > width) {
		xvelocity = -xvelocity;
	}

	if (y > height) {
		xvelocity = 0;
		yvelocity = 0;
		y = height;
	}

	// Print score
	textSize(24);
	textAlign(CENTER);
	fill(255);
	text("Score: " + score, width / 2, 100);
}

function collision() {
	var deltaX = x - max(rectX, min(x, rectX + rectWidth));
	var deltaY = y - max(rectY, min(y, rectY + rectHeight));
	return (deltaX * deltaX + deltaY * deltaY) < (esize * esize);
}

function Circle(x, y) {
	this.x = x;
	this.y = y;
	this.color = c;
	this.diameter = 20;

	this.draw = function(color) {
		fill(color);
		ellipse(this.x, this.y, this.diameter);
	}
}