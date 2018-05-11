function Board() {
	this.board = [];
	this.length = 9;
	this.size = length * length;

	// returns a pair
	this.findBlank = function() {
		var blankIndexI;
		var blankIndexJ;
		for (blankIndexI = 0; blankIndexI < this.length; blankIndexI++) {
			for (blankIndexJ = 0; blankIndexJ < this.length; blankIndexJ++) {
				if (this.board[blankIndexI][blankIndexJ] == 0) {
					return new Pair(blankIndexI, blankIndexJ);
				}
			}
		}
	}

	this.isSolved = function() {
		for (var i = 0; i < this.length; i++) {
			for (var j = 0; j < this.length; j++) {
				if (this.board[i][j] == 0) {
					return false;
				}
			}
		}
		return true;
	}

	this.isValidBoard = function(row, col, num) {

		// check duplicate values in columns
		for(var i = 0; i < 9; i++) {
	        if(this.board[row][i] == num) {
	            return false;
	        }
	    }

		// check duplicate columns in rows
		for(var i = 0; i < 9; i++) {
	        if(this.board[i][col] == num) {
	            return false;
	        }
	    }

		// check each 3x3 block
		var arr;
		for (var i = 0; i < this.length - 3; i += 3) {
			for (var j = 0; j < this.length - 3; j += 3) {
				arr = [this.board[i][j], this.board[i+1][j], this.board[i+2][j],
						this.board[i][j+1], this.board[i+1][j+1], this.board[i+2][j+1],
						this.board[i][j+2], this.board[i+1][j+2], this.board[i+2][j+2]];
				if (this.contains(arr, num)) {
					return false;
				}
			}
		}

		return true;
	}

	// exludes 0s
	// excludes first occurrence of duplicate
	this.contains = function(arr, value) {
		var occurences = 0;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] != 0 && arr[i] == value) {
				occurences++;
			}
		}
		if (occurences > 1) {
			return true;
		}
		return false;
	}

	this.draw = function() {
		textSize(80);
		textAlign(CENTER);
		for (var i = 0; i < this.length; i++) {
			for (var j = 0; j < this.length; j++) {
				if (this.board[i][j] != 0) {
					text(this.board[i][j], width / (this.length * 2) + width * i / 9, height * j / 9 + height / 9 - height / 63);
				}
			}
		}
	}
}