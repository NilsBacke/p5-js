function Passenger() {
	this.width = 20;
	this.x = width / 2 - this.width / 2;
	this.y = 0;
	this.isSeated = false;
	this.hasCarryOn;
	this.puttingAwayCarryOn = 0; // ticks that the passenger has been putting away his carry on
	this.seatRow;    // fix to be a seat object
	this.seatLetter;
	this.speed = this.width;

	this.draw = function() {
		if (this.isSeated) {
			fill(0, 0, 255);
		} else {
			fill(0, 255, 0);
		}
		rect(this.x, this.y, this.width, this.width);
		textAlign(CENTER);

		var tag;
		if (this.isSeated) {
			tag = 'S';
		} else if (this.hasCarryOn) {
			tag = 'C';
		} else {
			tag = 'P';
		}
		textSize(24);
		fill(255, 0, 0);
		text(tag, this.x + this.width / 2, this.y + this.width);
	}

	this.update = function(seats, paxInQueue, totalPax) {
		if (!this.isSeated) { // if not seated
			if (this.hasCarryOn && this.canMoveIntoSeat(seats)) {
				if (this.puttingAwayCarryOn < frameRate()) {
					this.speed = 0;
					this.puttingAwayCarryOn++;
				} else if (this.puttingAwayCarryOn >= frameRate()) {
					this.puttingAwayCarryOn = 0;
					this.move(seats, paxInQueue, totalPax);
				}
			} else {
				this.move(seats, paxInQueue, totalPax);
			}
		}
	}

	this.move = function(seats, paxInQueue, totalPax) {
		if (this.canMoveIntoSeat(seats) && !this.puttingAwayCarryOn) {
			this.moveIntoSeat(seats, paxInQueue, totalPax);
		} else {
			for (var i = 0; i < paxInQueue.length; i++) {
				if (this.seatRow == paxInQueue[i].seatRow && this.seatLetter == paxInQueue[i].seatLetter) { // skip itself
					continue;
				}
				if (this.y + this.speed == paxInQueue[i].y) {
					return;
				}
			}
			this.y += this.speed;
		}
	}

	this.moveIntoSeat = function(seats, paxInQueue, totalPax) {
		var seatx = seats[unchar(this.seatLetter) - 65][this.seatRow - 1].xcoord;
		var seaty = seats[unchar(this.seatLetter) - 65][this.seatRow - 1].ycoord;

		for (var i = 0; i < totalPax.length; i++) {
			if (totalPax[i].x > seatx && totalPax[i].x < this.x) {
				 // add passengers to list to move out of seat, then back in
			}
		}
		this.x = seatx;
		this.y = seaty;
		this.isSeated = true;
		if (this.hasCarryOn) {
			this.puttingAwayCarryOn = false;
		}
	}

	this.canMoveIntoSeat = function(seats) {
		return seats[unchar(this.seatLetter) - 65][this.seatRow - 1].ycoord == this.y && 
				seats[unchar(this.seatLetter) - 65][this.seatRow - 1].isEmpty();
	}

	// this.getAvailableSeats = function(seats) {
	// 	var borderingSeats = [];
	// 	for (var i = 0; i < seats.length; i++) {
	// 		for (var j = 0; j < seats[i].length; j++) {
	// 			if (seats[i][j].ycoord == this.y && 
	// 					seats[i][j].isEmpty()) {
	// 				borderingSeats.push(seats[i][j]);
	// 			}
	// 		}	
	// 	}
	// 	return borderingSeats;
	// }

	// this.pause = function() {
	// 	noLoop();
	// }

	// this.resume = function() {
	// 	loop();
	// }


}