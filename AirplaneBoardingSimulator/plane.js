function Plane() {
	this.seatsPerRow = 6;
	this.rows = 30;
	this.padding = 10;
	this.seats = [];
	this.totalPax = [];
	this.paxInQueue = [];
	this.seatsTaken = [];

	var translateX = width / 2 - (this.seatsPerRow / 2 * 20 + 20);
	var translateY = height / 2 - (this.rows / 2 * 20);

	for (var i = 0; i < this.seatsPerRow; i++) {
		this.seats[i] = [];
		for (var j = 0; j < this.rows; j++) {
			var x = i * 20 + this.padding + translateX;
			if (i > this.seatsPerRow / 2 - 1) {
				x += 20
			}
			this.seats[i][j] = new Seat(x, j * 20 + translateY, j + 1, char(i + 65));
		}
	}

	var k = 0;
	for (var i = 0; i < this.seatsPerRow; i++) {
		for (var j = 0; j < this.rows; j++) {
			this.seatsTaken[k++] = this.seats[i][j];
		}
	}

	this.draw = function() {
		for (var i = 0; i < this.seatsPerRow; i++) {
			for (var j = 0; j < this.rows; j++) {
				this.seats[i][j].draw();
			}
		}

		for (var i = 0; i < this.totalPax.length; i++) {
			this.totalPax[i].draw();
		}
	}

	this.addPassenger = function(p) {
		if (this.seatsTaken.length > 0) {
			if (random(0, 1) < 0.5) {
				p.hasCarryOn = true;
			} else {
				p.hasCarryOn = false;
			}

			var index = int(random(0, this.seatsTaken.length));
			var seat = this.seatsTaken[index];
			p.seatLetter = seat.letter;
			p.seatRow = seat.rowNum;
			this.seatsTaken.splice(index, 1);

			// p.seatLetter = char(int(random(0, this.seatsPerRow)) + 65);
			// p.seatRow = int(random(1, this.rows + 1));
			this.paxInQueue.push(p);
		}
	}

	this.updatePassengers = function() {
		for (var i = 0; i < this.paxInQueue.length; i++) {
			this.paxInQueue[i].update(this.seats, this.paxInQueue, this.totalPax);
		}

		this.checkSeats();

		// remove seated passengers
		for (var i = 0; i < this.paxInQueue.length; i++) {
			this.totalPax.push(this.paxInQueue[i]);
			if (this.paxInQueue[i].isSeated) {
				this.paxInQueue.splice(i, 1);
			}
		}
	}

	this.checkSeats = function() {
		for (var i = 0; i < this.seatsPerRow; i++) {
			for (var j = 0; j < this.rows; j++) {
				for (var k = 0; k < this.paxInQueue.length; k++) {
					if (this.seats[i][j].xcoord == this.paxInQueue[k].x &&
							this.seats[i][j].ycoord == this.paxInQueue[k].y) {
						this.seats[i][j].passenger = this.paxInQueue[k];
					}
				}
			}
		}
	}
}