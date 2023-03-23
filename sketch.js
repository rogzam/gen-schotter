let rowsSlider, columnsSlider, maxRotationSlider, maxDisplacementRatioSlider;

function setup() {
  createCanvas(600, 900);
  rectMode(CENTER);
  angleMode(DEGREES);
  noLoop();

  createSliders();
  draw();
}

function draw() {
  background(229, 84, 32);
  drawArtwork();
  ///displaySliderTitles();
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

  rowsSlider = createSlider(1, 28, 230);
  rowsSlider.position(((width-240)/3)-30, height - 50);
  rowsSlider.input(draw);
  rowsSlider.style('width', sliderWidth);
  setSliderStyle(rowsSlider);

  columnsSlider = createSlider(1, 20, 12);
  columnsSlider.position((((width-240)/3)*2)-30, height - 50);
  columnsSlider.input(draw);
  columnsSlider.style('width', sliderWidth);
  setSliderStyle(columnsSlider);

  maxRotationSlider = createSlider(0, 180, 45);
  maxRotationSlider.position((((width-240)/3)*3)-30, height - 50);
  maxRotationSlider.input(draw);
  maxRotationSlider.style('width', sliderWidth);
  setSliderStyle(maxRotationSlider);

  maxDisplacementRatioSlider = createSlider(0, 100, 30);
  maxDisplacementRatioSlider.position((((width-240)/3)*4)-30, height - 50);
  maxDisplacementRatioSlider.input(draw);
  maxDisplacementRatioSlider.style('width', sliderWidth);
  setSliderStyle(maxDisplacementRatioSlider);
}

function drawArtwork() {
  noFill();
  stroke(0);
  stroke(255, 255, 255);
  strokeWeight(2);

  let rows = rowsSlider.value();
  let columns = columnsSlider.value();
  let unitSize = 24;
  let maxRotation = maxRotationSlider.value();
  let maxDisplacementRatio = maxDisplacementRatioSlider.value() / 100;

  let artworkWidth = columns * unitSize;
  let artworkHeight = rows * unitSize;

  let offsetX = (width - artworkWidth) / 2;
  let offsetY = ((height - artworkHeight) / 2)-25;

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

function displaySliderTitles() {
  fill(255); // White color for slider titles
  textSize(12);
  noStroke();
  textAlign(CENTER, CENTER);
  textFont('Arial', 11);
  ///textStyle(BOLD);
  text('[ rows ]', ((width-240)/3), height - 32);
  text('[ columns ]', (((width-240)/3)*2), height - 32);
  text('[ rotation ]',(((width-240)/3)*3), height - 32);
  text('[ displacement ]', (((width-240)/3)*4), height - 32);
}

function mouseClicked() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    draw();
  }
}
      