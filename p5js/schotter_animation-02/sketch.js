let maxRotation = 0, maxDisplacementRatio = 0;
let counter = 0;
let direction = 0;
let animationSpeed = 20; 
let canvas_size = 800;


function setup() {
  createCanvas(canvas_size,canvas_size);
  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(animationSpeed); 
  loop(); 
}

function draw() {
  clear();
  background(0,0,0,0);
  counter += direction;
  maxRotation = map(counter, 0, 50, 0, 90);
  maxDisplacementRatio = map(counter, 0, 50, 0, 1);


  if (counter >= 30) {
    direction = -1;
  } else if (counter <= 0) {
    direction = 1;
  }
  
  noFill();
  stroke(1);
  stroke(255, 255, 255);
  strokeWeight(canvas_size / 450);

  let rows = 23;
  let columns = 13;
  let unitSize = 28;

  let artworkWidth = columns * unitSize;
  let artworkHeight = rows * unitSize;

  let offsetX = (width - artworkWidth) / 2;
  let offsetY = (height - artworkHeight) / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      let centerX = offsetX + col * unitSize + unitSize / 2;
      let centerY = offsetY + row * unitSize + unitSize / 2;

      let rotation = random(-maxRotation, maxRotation) * (row / (rows - 1));

      let displacementX =
        random(-unitSize, unitSize) * maxDisplacementRatio * (row / (rows - 1));
      let displacementY =
        random(-unitSize, unitSize) * maxDisplacementRatio * (row / (rows - 1));

      push();
      translate(centerX + displacementX, centerY + displacementY);
      rotate(rotation);
      rect(0, 0, unitSize, unitSize);
      pop();
    }
  }
}

function mousePressed() {
  if (isLooping()) {
    noLoop();
  } else {
    loop();
  }
}
