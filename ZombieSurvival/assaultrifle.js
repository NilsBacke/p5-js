function AssaultRifle() {
	this.x = random(0, width);
	this.y = random(0, height);
	this.rarity = int(random(0, 5));
	this.c;

	if (this.rarity == 0) {
		this.c = color(211, 211, 211);
	} else if (this.rarity == 1) {
		this.c = color(127, 255, 0);
	} else if (this.rarity == 2) {
		this.c = color(0, 0, 205);
	} else if (this.rarity == 3) {
		this.c = color(255, 0, 255);
	} else if (this.rarity == 4) {
		this.c = color(255, 215, 0);
	}

	this.show = function() {
		push();
		fill(this.c);
		textSize(16);
		textAlign(CENTER);
		text("AR", this.x, this.y);
		pop();
	}

	this.showInInventory = function(index) {
		var inventoryWidth = 50;
		var startx = width - inventoryWidth * 2 - 50 + index * 50;
		var starty = 20;
		push();
		fill(this.c);
		textSize(16);
		textAlign(CENTER);
		text("AR", startx + inventoryWidth / 2, starty + inventoryWidth / 2);
		pop();
	}
}