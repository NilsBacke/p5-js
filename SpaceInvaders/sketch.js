var ship;
var aliens = [];

var numAliens = 50;
var aliensPerRow = numAliens / 5;

var ticksSinceShot;

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	setupAliens();
	ticksSinceShot = frameRate();
}

function draw() {
	background(0);
	ship.show();
	ship.move();

	// draw bullets
	for (var i = 0; i < ship.bullets.length; i++) {
		fill(255);
		ship.bullets[i].update();
		ship.bullets[i].show();

		// delete off screen bullets
		if (ship.bullets[i].y < 0) {
			ship.bullets.splice(i, 1);
		}
	}

    // draw aliens
    var offsety = random(-0.5, 0.5);
	for (var i = 0; i < aliens.length; i++) {
		aliens[i].show();
		aliens[i].move(offsety);
	}

	// check to move aliens down
	for (var i = 0; i < aliens.length; i++) {
		if (aliens[i].x > width - 100 ||
			aliens[i].x < 100) {
			for (var j = 0; j < aliens.length; j++) {
				aliens[j].moveDown();
			}
			break;
		}
	}
	
	// check for bullet hits
	for (var i = 0; i < aliens.length; i++) {
		for (var j = 0; j < ship.bullets.length; j++) {
			if (aliens[i].collides(ship.bullets[j])) {
				aliens.splice(i, 1);
				ship.bullets.splice(j, 1);
				break;
			}
		}
	}


	ticksSinceShot++;
}

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		ship.setDir(1);
	} else if (keyCode === LEFT_ARROW) {
		ship.setDir(-1);
	} else if (keyCode === UP_ARROW) {
		if (ticksSinceShot > frameRate() / 4) {
			ship.shoot();
			ticksSinceShot = 0;
		}
	}
}

function keyReleased() {
	if (keyCode != UP_ARROW) {
		ship.setDir(0);
	}
}

function setupAliens() {
	var temp = new Alien(0, 0);
	var gap = 40;
	var startx = width/2 - (aliensPerRow / 2 * (temp.size + gap)) + (temp.size + gap);
	var xc = startx;
	var yc = 20;
	for (var i = 0; i < numAliens; i++) {
		xc += gap;
		if (i % aliensPerRow == 0) {
			xc = startx;
			yc += gap;
		}
		aliens.push(new Alien(xc, yc));
	}
}