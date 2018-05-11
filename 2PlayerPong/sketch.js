var p1; // player 1
var p2; // player 2
var puck; // puck object

function setup() {
	createCanvas(600, 600);
	// set up objects
	p1 = new Paddle(true);
	p1.setup();
	p2 = new Paddle(false);
	p2.setup();

	puck = new Puck();
}

function draw() {
	background(0);
	// update and show objects
	p1.draw();
	p2.draw();
	p1.move();
	p2.move();
	puck.draw();
	puck.move();

	// check collisions every iteration
	p1.checkCollision(puck)
	p2.checkCollision(puck)

	// end of game
	if (puck.isOutOfBounds()) {
		gameOver();
	}
}

// shows the gameOver text and stops looping to end the game
function gameOver() {
	textSize(60);
	textAlign(CENTER);
	fill(255);
	text("Game Over", width / 2, height / 2);
	noLoop();
}

// set the direction of movement for the two players based on key input
function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		p1.setDir(1);
	} else if (keyCode === LEFT_ARROW) {
		p1.setDir(-1);
	} else if (key == 'D') {
		p2.setDir(1);
	} else if (key == 'A') {
		p2.setDir(-1);
	}
}

// when a key is released, stop movement for the respective player
function keyReleased() {
	if (keyCode != LEFT_ARROW && keyCode != RIGHT_ARROW) {
		p2.setDir(0);
	} else if (key != 'A' || key != 'D') {
		p1.setDir(0);
	}
	return false;
}

// restart game
function mousePressed() {
	setup();
	loop();
}