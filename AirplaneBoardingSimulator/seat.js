function Seat(xcoord, ycoord, rowNum, letter) {
	this.xcoord = xcoord;
	this.ycoord = ycoord;
	this.width = 20;
	this.passenger = 0;
	this.rowNum = rowNum;
	this.letter = letter;

	this.draw = function () {
		stroke(255);
		fill(0);
		rect(this.xcoord, this.ycoord, this.width, this.width);
	}

	this.isEmpty = function() {
		return this.passenger == 0;
	}
}