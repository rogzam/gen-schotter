let rows = 23;
let columns = 13;
let canvas_size = 800;

let counter = 0;

let unitSize = 24  ;

let maxRotation = 0;
let maxDisplacementRatio = 0;

let initialRotations = []; // Store initial random rotations for each row
let initialDisplacementsX = []; // Store initial random displacements in X for each row
let initialDisplacementsY = []; // Store initial random displacements in Y for each row

function setup() {
  let w = canvas_size;
  let h = canvas_size;
  createCanvas(w, h);
  rectMode(CENTER);
  angleMode(DEGREES);

  // Generate and store random initial rotations and displacements for each row and column
  for (let row = 0; row < rows; row++) {
    initialRotations[row] = [];
    initialDisplacementsX[row] = [];
    initialDisplacementsY[row] = [];
    
    for (let col = 0; col < columns; col++) {
      initialRotations[row][col] = random(-50, 50);
      initialDisplacementsX[row][col] = random(-unitSize, unitSize);
      initialDisplacementsY[row][col] = random(-unitSize, unitSize);
    }
  }
}
function draw() {
  clear();
  background(0,0,0,0);

  counter++;
  maxDisplacementRatio = map(counter, 0, 80, 0, 0.7);
  maxRotation = map(counter, 0, 80, 0, 1);

  if (counter >= 80) {
    counter = 80;
  }

  noFill();
  stroke(0.8);
  stroke(255, 255, 255);
  strokeWeight(canvas_size / 450);

  let artworkWidth = columns * unitSize;
  let artworkHeight = rows * unitSize;

  let offsetX = (width - artworkWidth) / 2;
  let offsetY = (height - artworkHeight) / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      let centerX = offsetX + col * unitSize + unitSize / 2;
      let centerY = offsetY + row * unitSize + unitSize / 2;

      let rotation = initialRotations[row][col] * maxRotation * (row / (rows - 1));

      let displacementX = initialDisplacementsX[row][col] * maxDisplacementRatio * (row / (rows - 1));
      let displacementY = initialDisplacementsY[row][col] * maxDisplacementRatio * (row / (rows - 1));

      push();
      translate(centerX + displacementX, centerY + displacementY);
      rotate(rotation);
      rect(0, 0, unitSize, unitSize);
      pop();
    }
  }
}
function mousePressed() {
  counter = 0;
}
  