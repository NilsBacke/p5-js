let xv = 0;
let yv = 0;
let x;
let y;
let grid = 20;
let length = 1;
let tail = [10];
var coord;

let xfood;
let yfood;

function setup() {
  createCanvas(800,800);
  background(0);
  frameRate(15);
  x = width / 2;
  y = height / 2;

  updateFoodLocation();
}

function draw() {
	let lengthCopy = length;
	background(0);
	fill(255);

	rect(x, y, grid, grid);
	for (var i = 0; i < length - 1; i++) {
		rect(tail[i].xc, tail[i].yc, grid, grid);
		tail[i].xc = x;
		tail[i].yc = y;
	}

	x += xv * grid;
	y += yv * grid;

	x = constrain(x, 0, width - grid);
	y = constrain(y, 0, height - grid);

	// check collision
	if (collideRectCircle(x, y, grid, grid, xfood, yfood, 20, 20)) {
		length++;
		tail[length-2] = {xc:x, yc:y};
	}

	// food
	if (lengthCopy == length) {
		drawFood();
	} else {
		updateFoodLocation();
		drawFood();
	}
	
}

function updateFoodLocation() {
	xfood = random(0 + grid, width - grid);
	yfood = random(0 + grid, height - grid);
}

function drawFood() {
	fill(255, 0, 100);
	ellipse(xfood, yfood, 20, 20);
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		xv = -1;
		yv = 0;
	} else if (keyCode === UP_ARROW) {
		xv = 0;
		yv = -1;
	} else if (keyCode === DOWN_ARROW) {
		yv = 1;
		xv = 0;
	} else if (keyCode === RIGHT_ARROW) {
		yv = 0;
		xv = 1;
	}
}
