// Inspired by Daniel Shiffman's Coding Challenge #76

let x = 0;
let y = 0;
let spacing = 20; // the increment value for each line drawm

function setup() {
  createCanvas(800, 800);
  background(0);
}

function draw() {
  stroke(255);

  // randomize which line will be drawn
  if (random(1) < 0.5) {
    line(x, y, x + spacing, y + spacing); // forward slash \
  } else {
    line(x, y + spacing, x + spacing, y); // back slash /
  }
  x = x + spacing; // increment x

  // if x is at the right edge of the canvas, go to the next line
  if (x > width) {
    x = 0;
    y = y + spacing;
  }

  rect

}
