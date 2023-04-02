let rowsSlider, columnsSlider, maxRotationSlider, maxDisplacementRatioSlider;
let canvas_size = 800;

function setup() {
  let w = canvas_size;
  let h = canvas_size;
  
  createCanvas(w, h);
  rectMode(CENTER);
  angleMode(DEGREES);
  noLoop();

  createSliders();
  draw();
}

function draw() {
  clear();
  background(0,0,0,0);
  drawArtwork();
  //displaySliderTitles();
}

function createSliders() {
  let sliderWidth = '60px';
  let sliderHeight = '2px';
  let sliderThumbSize = '8px';

  // Slider CSS modification function
  function setSliderStyle(slider) {
    let sliderId = 'slider' + Math.random().toString(36).substr(2, 9);
    slider.elt.setAttribute('id', sliderId);

    let style = document.createElement('style');
    style.innerHTML = `
      #${sliderId} {
        -webkit-appearance: none;
        height: 0px;
        background-color: transparent;
      }
      #${sliderId}::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        width: 2px;
        height: 12px;
        background: #ffffff;
        cursor: pointer;
        margin-top: -4px;
      }
      #${sliderId}::-webkit-slider-runnable-track {
        width: 100%;
        height: ${sliderHeight};
        cursor: pointer;
        background: #ffffff;
      }
    `;
    document.head.appendChild(style);
  }

  rowsSlider = createSlider(1, 28, 23);
  rowsSlider.position(((width - width / 2.5) / 3) - width / 20, height - height / 24);
  rowsSlider.input(draw);
  rowsSlider.style('width', sliderWidth);
  setSliderStyle(rowsSlider);

  columnsSlider = createSlider(1, 30, 13);
  columnsSlider.position((((width - width / 2.5) / 3) * 2) - width / 20, height - height / 24);
  columnsSlider.input(draw);
  columnsSlider.style('width', sliderWidth);
  setSliderStyle(columnsSlider);

  maxRotationSlider = createSlider(0, 120, 50);
  maxRotationSlider.position((((width - width / 2.5) / 3) * 3) - width / 20, height - height / 24);
  maxRotationSlider.input(draw);
  maxRotationSlider.style('width', sliderWidth);
  setSliderStyle(maxRotationSlider);

  maxDisplacementRatioSlider = createSlider(0, 500, 30);
  maxDisplacementRatioSlider.position((((width - width / 2.5) / 3) * 4) - width / 20, height - height / 24);
  maxDisplacementRatioSlider.input(draw);
  maxDisplacementRatioSlider.style('width', sliderWidth);
  setSliderStyle(maxDisplacementRatioSlider);
}

function drawArtwork() {
  noFill();
  stroke(255, 255, 255, 255 );
  strokeWeight(canvas_size / 450);

  let rows = rowsSlider.value();
  let columns = columnsSlider.value();
  let unitSize = 28;
  let maxRotation = maxRotationSlider.value();
  let maxDisplacementRatio = maxDisplacementRatioSlider.value() / 100;

  let artworkWidth = columns * unitSize;
  let artworkHeight = rows * unitSize;

  let offsetX = (width - artworkWidth) / 2;
  let offsetY = (height - artworkHeight) / 2;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      let centerX = offsetX + col * unitSize + unitSize / 2;
      let centerY = offsetY + row * unitSize + unitSize / 2;
      let rotation = random(-maxRotation, maxRotation) * (row / (rows - 1));

      let displacementX = random(-unitSize, unitSize) * maxDisplacementRatio * (row / (rows - 1));
      let displacementY = random(-unitSize, unitSize) * maxDisplacementRatio * (row / (rows - 1));

      push();
      translate(centerX + displacementX, centerY + displacementY);
      rotate(rotation);
      rect(0, 0, unitSize, unitSize);
      pop();
    }
  }
}

/*function displaySliderTitles() {
  fill(255); // White color for slider titles
  textSize(12);
  noStroke();
  textAlign(CENTER, CENTER);
  textFont('Arial', 11);
  
  text('[ rows ]', ((width - 800 / 2.5) / 3) - width / 20, height - height / 16 - 12);
  text('[ columns ]', (((width - 800 / 2.5) / 3) * 2) - width / 20, height - height / 16 - 12);
  text('[ rotation ]', (((width - 800 / 2.5) / 3) * 3) - width / 20, height - height / 16 - 12);
  text('[ displacement ]', (((width - 800 / 2.5) / 3) * 4) - width / 20, height - height / 16 - 12);
}
*/
function mouseClicked() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    draw();
  }
}

