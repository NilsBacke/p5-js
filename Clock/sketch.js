var clockNumber = 2;
var hourAngle;
var minAngle;
var secAngle;

function setup() {
	createCanvas(600, 600);
	angleMode(DEGREES);
}

function draw() {
	background(0);
	translate(width / 2, height / 2);
	rotate(-90);

	calculateAngles();
	if (clockNumber == 1) {
		drawRings();
	} else if (clockNumber == 2) {
		drawRings();
		drawHands();
	} else {
		drawHands();
	}
}

function drawRings() {
	noFill();
	strokeWeight(8);

	stroke(255, 0, 100);
	arc(0, 0, 360, 360, 0, secAngle); // second circle

	stroke(0, 255, 100);
	arc(0, 0, 380, 380, 0, minAngle); // minute circle

	stroke(0, 100, 255);
 	arc(0, 0, 400, 400, 0, hourAngle); // hour circle
}

function drawHands() {
 	push();
 	rotate(secAngle);
 	stroke(255, 0, 100);
 	line(0, 0, 180, 0);
 	pop();

 	push();
 	rotate(minAngle);
 	stroke(0, 255, 100);
 	line(0, 0, 190, 0);
 	pop();

 	push();
 	rotate (hourAngle);
 	stroke(0, 100, 255);
 	line(0, 0, 200, 0);
 	pop();
}

function calculateAngles() {
	var hr = hour();
	var min = minute();
	var sec = second();

	hourAngle = map(hr % 12, 0, 12, 0, 360) + map(min, 0, 60, 0, 30) + map(sec, 0, 60, 0, 0.5);
	minAngle = map(min, 0, 60, 0, 360) + map(sec, 0, 60, 0, 6);
	secAngle = map(sec, 0, 60, 0, 360);
}

function mousePressed() {
	// check bounds for buttons
	var xbound1 = mouseX >= 0 && mouseX <= width / 3;
	var xbound2 = mouseX > width / 3 && mouseX <= width * 2/3;
	var xbound3 = mouseX > width * 2/3 && mouseX <= width;
	var ybound = mouseY >= 0 && mouseY <= height;	
	
	if (ybound) {
		if (xbound1) {
			clockNumber = 1;
		} else if (xbound2) {
			clockNumber = 2;
		} else if (xbound3) {
			clockNumber = 3;
		}
	}

}