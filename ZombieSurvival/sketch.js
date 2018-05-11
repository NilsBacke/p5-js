var player;
var numGuns = 5;
var guns = [];
var bullets = [];
var walls = [];
var zombies = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	player = new Player();
	generateGuns();
	generateWalls();
	generateZombies();
}

function draw() {
	background(0, 128, 0);
	player.show();
	player.update(guns);
	showGuns();
	showBullets();
	showWalls();
	updateZombies();
	checkForPickUp();
}

function generateGuns() {
	for (var i = 0; i < numGuns; i++) {
		guns[i] = new AssaultRifle();
	}
}

function generateWalls() {
	for (var i = 0; i < 10; i++) {
		walls[i] = new Wall();
	}
}

function generateZombies() {
	for (var i = 0; i < 5; i++) {
		zombies[i] = new Zombie();
	}
}

function showGuns() {
	for (var i = 0; i < guns.length; i++) {
		guns[i].show();
	}
}

function showBullets() {
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].show();
		bullets[i].update();
	}
}

function showWalls() {
	for (var i = 0; i < walls.length; i++) {
		walls[i].show();
	}
}

function updateZombies() {
	for (var i = 0; i < zombies.length; i++) {
		zombies[i].show();
		zombies[i].update(player);
		bullets = zombies[i].collision(bullets);
		player = zombies[i].collisionWithPlayer(player);
		if (zombies[i].health <= 0) {
			zombies.splice(i, 1);
		}
	}
}

function checkForPickUp() {
	for (var i = 0; i < guns.length; i++) {
		if (dist(player.x, player.y, guns[i].x, guns[i].y) < player.width + 10) {
			push();
			textAlign(LEFT);
			fill(255);
			text("Press E to pick up", 10, height - 20);
			player.canPickUp = guns[i];
			pop();
		}
	}
}

function mousePressed() {
	if (player.inventory[player.currentSelection]) {
		bullets.push(new Bullet(player));
	}
}

function keyPressed() {
	if (key == 'W') {
		player.yv = -1;
	} else if (key == 'A') {
		player.xv = -1;
	} else if (key == 'D') {
		player.xv = 1;
	} else if (key == 'S') {
		player.yv = 1;
	} else if (key == 'E') {
		if (player.canPickUp) {
			var index = player.getInventoryIndex();
			if (index == player.currentSelection && player.inventory.length != 0) {
				dropGun();
			}
			player.inventory[index] = player.canPickUp;
			deleteGun(player.inventory[index]);
		}
	} else if (key == 'Q') {
		if (player.inventory[player.currentSelection]) {
			dropGun();
		}
	} else if (key == '1') {
		player.currentSelection = 0;
	} else if (key == '2') {
		player.currentSelection = 1;
	}
	return false;
}

function keyReleased() {
	if (key == 'W' || key == 'S') {
		player.yv = 0;
	} else if (key == 'A' || key == 'D') {
		player.xv = 0;
	}
}

function dropGun() {
	player.inventory[player.currentSelection].x = player.x;
	player.inventory[player.currentSelection].y = player.y;
	guns.push(player.inventory[player.currentSelection]);
	player.inventory[player.currentSelection] = 0;
}

function deleteGun(gun) {
	for (var i = 0; i < guns.length; i++) {
		if (gun == guns[i]) {
			guns.splice(i, 1);
		}
	}
}

// function Bear(type) {
// 	this.type = type;
// }

// Bear.prototype.growl = function() {
// 	console.log();
// }

// function Grizzly() {
// 	Bear.call(this, 'grizzly');
// }

// Grizzly.prototype = Object.create(Bear.prototype);