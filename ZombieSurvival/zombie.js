function Zombie() {
	this.x = random(0, width);
	this.y = random(0, height);
	this.width = 20;
	this.health = 100;
	this.lastAttack = 0;
	this.speed = 1;
	this.damage = 45;

	this.show = function() {
		push();
		fill(map(this.health, 0, 100, 0, 255), 0, 0);
		ellipse(this.x, this.y, this.width);
		pop();
	}

	this.update = function(player) {
		this.move(player);
	}

	this.move = function(player) {
		var v = createVector(player.x - this.x, player.y - this.y);
		v.setMag(this.speed);
		this.x += v.x;
		this.y += v.y;
	}

	this.collision = function(bullets) {
		for (var i = 0; i < bullets.length; i++) {
			if (bullets[i].x < this.x + this.width
					&& bullets[i].x + bullets[i].width > this.x
					&& bullets[i].y < this.y + this.width
					&& bullets[i].y + bullets[i].width > this.y) {
				this.health -= bullets[i].damage;
				bullets.splice(i, 1);
			}
		}
		return bullets;
	}

	this.collisionWithPlayer = function(player) {
		this.lastAttack++;
		if (player.x < this.x + this.width
				&& player.x + player.width > this.x
				&& player.y < this.y + this.width
				&& player.y + player.width > this.y
				&& this.lastAttack > 30) {
			player.health -= this.damage;
			this.lastAttack = 0;
			console.log("hit");
		}
	
		return player;
	}
}