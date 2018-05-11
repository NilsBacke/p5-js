function Player() {
	this.x = width / 2;
	this.y = height / 2;
	this.width = 20;
	this.speed = 3;
	this.health = 100;
	this.shield = 0;
	this.xv = 0;
	this.yv = 0;
	this.canPickUp; // a gun object

	this.inventory = []; // array of guns
	this.inventorySize = 2;
	this.currentSelection = 0;

	this.show = function() {
		push();
		fill(255, 200, 100);
		// translate(width / 2 + this.x, height / 2 + this.y);
		// var a = atan2(mouseY - height / 2 + this.y, mouseX - width / 2 + this.x);
		// rotate(a);

		rectMode(CENTER);
		
		rect(this.x, this.y, this.width, this.width);

		if (this.inventory[this.currentSelection]) {
			fill(0);
			rectMode(CORNER);
			rect(this.x + this.width / 4, this.y, 2, -15);
		}
		pop();
		this.showInventory();
		this.showHealthBar();
	}

	this.showHealthBar = function() {
		push();
		rectMode(CORNER);
		fill(57, 255, 20);
		rect(width / 2 - 200, height - 75, this.health * 4, 10);
		fill(0, 255, 255);
		rect(width / 2 - 200, height - 85, this.shield * 4, 10);
		pop();
	}

	this.showInventory = function() {
		var inventoryWidth = 50;
		var startx = width - inventoryWidth * this.inventorySize - 50;
		var starty = 20;
		for (var i = 0; i < this.inventorySize; i++) {
			push();
			noFill();
			stroke(255, 170);
			if (this.currentSelection == i) {
				strokeWeight(10);
			} else {
				strokeWeight(6);
			}
			
			rect(startx, starty, inventoryWidth, inventoryWidth);
			startx += 50;
			pop();
		}

		for (var i = 0; i < this.inventory.length; i++) {
			if (this.inventory[i] != 0) {
				this.inventory[i].showInInventory(i);
			}
		}
	}

	this.update = function() {
		this.move();
		if (this.health <= 0) {
			textSize(100);
			textAlign(CENTER);
			text("GAME OVER", width / 2, height / 2);
			this.health = 0;
			noLoop();
		}
	}

	this.move = function() {
		this.x += this.xv * this.speed;
		this.y += this.yv * this.speed;
	}

	this.getInventoryIndex = function() {
		return this.inventory.length == this.inventorySize ? this.currentSelection : this.inventory.length;
	}

}