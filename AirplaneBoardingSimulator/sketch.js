var plane;
var numPax;

function setup() {
	createCanvas(600, 800);
	frameRate(10);
	plane = new Plane(6, 30);

	numPax = plane.seatsPerRow * plane.rows;
}

function draw() {
	background(0);
	plane.draw();
	plane.updatePassengers();
}

function mousePressed() {
	plane.addPassenger(new Passenger());
}