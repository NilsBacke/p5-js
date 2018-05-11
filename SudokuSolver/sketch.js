var bd;
var grid = [[0, 6, 1, 8, 0, 0, 0, 0, 7],
			[0, 8, 9, 2, 0, 5, 0, 4, 0],
			[0, 0, 0, 0, 4, 0, 9, 0, 3],
			[2, 0, 0, 1, 6, 0, 3, 0, 0],
			[6, 7, 0, 0, 0, 0, 0, 5, 1],
			[0, 0, 4, 0, 2, 3, 0, 0, 8],
			[7, 0, 5, 0, 9, 0, 0, 0, 0],
			[0, 9, 0, 4, 0, 2, 7, 3, 0],
			[1, 0, 0, 0, 0, 8, 4, 6, 0]];

var stack = [];

function setup() {
	createCanvas(800, 800);
	bd = new Board();
	bd.board = grid;
	frameRate(5);
}

function draw() {
	background(51);
	drawGrid();
	
	bd.draw();
	if (solve()) {
		noLoop();
	}

	// var blank = bd.findBlank();
	// stack.push(blank);

	// var num = getNum(blank);

	// bd.board[blank.i][blank.j] = num;

	// if (num == 0) {
	// 	blank = stack.pop();
	// 	if (stack.length == 0) {
	// 		console.log("No solution");
	// 		noLoop();
	// 	}
	// }

	// blank = bd.findBlank();
	// if (bd.isSolved()) {
	// 	noLoop();
	// }



	// var blank;

}

function getNum(blank) {
	var num = 0;
	for (num = 1; num <= 9; num++) {
		if (bd.isValidBoard(blank.i, blank.j, num)) {
			return num;
		}
	}
	return num;
}

function solve() {
	var blank;
	background(51);
	drawGrid();
	
	bd.draw();



	if (bd.isSolved()) {
		return true;
	} else {
		for (var num = 1; num <= 9; num++) {
				blank = bd.findBlank();
			if (bd.isValidBoard(blank.i, blank.j, num)) {
				bd.board[blank.i][blank.j] = num;

				if (solve()) {
					return true;
				}

				bd.board[blank.i][blank.j] = 0;
			}
		}
	}
	return false;
}

function drawGrid() {
	fill(255);

	var counter = 0;
	var thickness = 5;
	for (var i = 0; i < height; i += (height - thickness) / 9) {
		thickness = 5;
		if (counter != 0 && counter % 3 == 0) {
			thickness = 10;
		}
		rect(0, i, width, thickness);
		counter++;
	}

	counter = 0;
	for (var i = 0; i < width; i += (width - thickness) / 9) {
		thickness = 5;
		if (counter != 0 && counter % 3 == 0) {
			thickness = 10;
		}
		rect(i, 0, thickness, width);
		counter++;
	}
}