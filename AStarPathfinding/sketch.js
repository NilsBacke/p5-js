 // From Daniel Shiffman's Coding Challenge #51
 var cols = 50;
 var rows = 50;
 var grid = new Array(cols);

 var openSet = [];
 var closedSet = [];
 var start;
 var end;
 var w, h;
 var path = [];

 function Spot(i, j) {
 	this.i = i;
 	this.j = j;
 	this.f = 0;
 	this.g = 0;
 	this.h = 0;
 	this.neighbors = [];
 	this.previous = undefined;
 	this.wall = false;

 	if (random(1) < 0.25) {
 		this.wall = true;
 	}

 	this.show = function(col) {
 		if (this.wall) {
 			fill(0);
 			noStroke();
 			ellipse(this.i * w + w/2, this.j * h + h/2, w/2, h/2);
 		}
 		
 		// rect(this.i * w, this.j * w, w - 1, h - 1);
 	}

 	this.addNeighbors = function(grid) {
 		if (i < cols - 1) {
 			this.neighbors.push(grid[this.i + 1][this.j]);
 		}
 		if (i > 0) {
 			this.neighbors.push(grid[this.i - 1][this.j]);
 		}
 		if (j < rows - 1) {
 			this.neighbors.push(grid[this.i][this.j + 1]);
 		}
 		if (j > 0) {
 			this.neighbors.push(grid[this.i][this.j - 1]);
 		}
 		if (i > 0 && j > 0) {
 			this.neighbors.push(grid[this.i - 1][this.j - 1]);
 		}
 		if (i < cols - 1 && j > 0) {
 			this.neighbors.push(grid[this.i + 1][this.j - 1]);
 		}
 		if (i > 0 && j < rows - 1) {
 			this.neighbors.push(grid[this.i - 1][this.j + 1]);
 		}
 		if (i < cols - 1 && j < rows - 1) {
 			this.neighbors.push(grid[this.i + 1][this.j + 1]);
 		}
 	}
 }

function setup() {
	createCanvas(400, 400);

	w = width / cols;
	h = height / rows;

	// making the 2D array
	for (var i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i, j);
		}
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid);
		}
	}

	start = grid[0][0];
	end = grid[cols - 1][rows - 1];
	start.wall = false;
	end.wall = false;

	start.h = heuristic(start, end);

	openSet.push(start);
}

function draw() {
	if (openSet.length > 0) {
		// keep going
		var winnerIndex = getLowestFIndex();
		var current = openSet[winnerIndex];

		if (current == end) {
			console.log("DONE!");
			noLoop();
		}

		removeFromArray(openSet, current);
		closedSet.push(current);

		var neighbors = current.neighbors;
		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i];
			if (closedSet.includes(neighbor) || neighbor.wall) {
				continue; // skip if already processed
			}

			var newPath = false;

			var tempG = current.g + heuristic(neighbor, current);

			if (openSet.includes(neighbor)) {
				if (tempG < neighbor.g) {
					neighbor.g = tempG;
					newPath = true;
				}
			} else {
				neighbor.g = tempG;
				newPath = true;
				openSet.push(neighbor);
			}

			if (newPath) {
				neighbor.h = heuristic(neighbor, end);
				neighbor.g = tempG;
				neighbor.f = neighbor.g + neighbor.h;
				neighbor.previous = current;
			}
		}

	} else {
		// no solution
		console.log("No Solution");
		noLoop();
		return;
	}

	background(255);

	// debugging
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show(color(255));
		}
	}

	// find the path
	path = [];
	var temp = current;
	path.push(temp);
	while (temp.previous) {
		path.push(temp.previous);
		temp = temp.previous;
	}

	noFill();
	stroke(255, 0, 200);
	strokeWeight(3);
	beginShape();
	for (var i = 0; i < path.length; i++) {
		vertex(path[i].i * w + w/2, path[i].j * h + h/2);
	}
	endShape();

}

function heuristic(a, b) {
	var d = dist(a.i, a.j, b.i, b.j);
	return d;
}

function getLowestFIndex() {
	var lowestIndex = 0;
	for (var i = 0; i < openSet.length; i++) {
		if (openSet[i].f < openSet[lowestIndex].f) {
			lowestIndex = i;
		}
	}
	return lowestIndex;
}

function removeFromArray(arr, elt) {
	for (var i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elt) {
			arr.splice(i, 1);
		}
	}
}