var isDrawing = false;
var isRunning = false;

var input = [];
var amplitude = [];
var phase = [];
var indices = [];
var fourierDrawing = []

var sliderNMax;
var sliderDt;
var nMax = 0;
var drawingOffset = 0;
var dt = 1;

function setup() {
  createCanvas(1200, 700);
  background(0, 0, 50);

  sliderDt = createSlider(0.01, 2, 1, 0.01);
  sliderDt.position(width/2-200, height-80);
  sliderDt.style('width', '400px');
  sliderDt.changed(() => dt = sliderDt.value());

  refreshNMaxSlider();
}

function draw() {
  background(0, 0, 50);

  // User drawing mode
  if (isDrawing){
    if ((pow(mouseX - width/2 -input[input.length-1].x, 2) + pow(mouseY - height/2 - input[input.length-1].y, 2)) > pow(1, 2)){
      input.push(createVector(mouseX - width/2, mouseY - height/2));
    }
  }

  // Original shape
  stroke(255);
  noFill();
  strokeWeight(5);
  beginShape();
  for (let i=0;i<input.length;i++){
    vertex(width/2 + input[i].x, height/2 + input[i].y)
  }
  endShape();

  // DRAW CIRCLES
  if (isRunning && amplitude[0]){
    let currentX = width/2 + amplitude[0].x;
    let currentY = height/2 + amplitude[0].y;
    let center = createVector(currentX, currentY);
    
    fill(255, 255, 255, 100);
    noStroke();
    ellipse(currentX, currentY, 10)

    for (let n = 1;n<nMax;n++){
      let currentN = indices[n];
      let k = currentN <= input.length/2 ? currentN : currentN - input.length;

      if (abs(amplitude[currentN]) > 5){
        
        let phi = (drawingOffset * k * TWO_PI / input.length) + phase[currentN];
        currentX += amplitude[currentN] * Math.cos(phi);
        currentY += amplitude[currentN] * Math.sin(phi);
        
        drawCircles(center, amplitude[currentN], currentX, currentY);

        center.x = currentX;
        center.y = currentY;
      }
    }
    if (nMax > 0){fourierDrawing.push(createVector(currentX, currentY));}
  }

  // fourierDrawing
    if (!isDrawing && isRunning){
    stroke(255, 0, 0, 255);
    noFill();
    strokeWeight(5);
    beginShape();
    for (let i=0;i<fourierDrawing.length;i++){
      vertex(fourierDrawing[i].x, fourierDrawing[i].y)
    }
    endShape();
  }

  // Info Text
  stroke(255);
  fill(255);
  strokeWeight(0.5);
  textAlign(LEFT);
  textSize(20);
  text("kMax = " + (max(0, nMax-1)), width / 2 + 200, height-30);
  text("dt = " + dt, width / 2 + 200, height-70);
  if (input.length == 0 || isDrawing) {
    textSize(15);
    textAlign(CENTER);
    text("Start/stop drawing by pressing enter\nStart/stop animation with Space", width / 2, 0+30);
  }

  // motion
  if (isRunning){drawingOffset = drawingOffset + dt;}
  if (drawingOffset > input.length){
    drawingOffset = 0;
    fourierDrawing = [];
  }
}

function reset() {
  performFourier();
  fourierDrawing = [];
  drawingOffset = 0;
  nMax = sliderNMax.value()
}

function keyReleased() {
  if (keyCode === 32) { //Space
    if (isRunning){
      isRunning = false;

    } else {
      isRunning = true;
      isDrawing = false;
    }
  }
  if (keyCode === 13) { // Enter
    if (isDrawing){
      isDrawing = false;
      refreshNMaxSlider();
      reset();
      isRunning = true;
    } else {
      drawingOffset = 0;
      isRunning = false;
      input = [createVector(mouseX - width/2, mouseY - height/2)];
      isDrawing = true;
    }
  }
  return false; // prevent any default behavior
}


function refreshNMaxSlider() {
  if (sliderNMax){sliderNMax.remove();}
  sliderNMax = createSlider(1, max(1, input.length), int(input.length/2), 1);
  sliderNMax.position(width/2-200, height-40);
  sliderNMax.style('width', '400px');
  sliderNMax.changed(reset);
  nMax = sliderNMax.value();
}


function performFourier() {
  fourier = fourierTrafo(input);
  amplitude = fourier.amplitude;
  phase = fourier.phase;
  indices = fourier.indices;
}


function drawCircles(center, amplitude, currentX, currentY){
  noFill();
  stroke(255, 255, 255, 100)
  ellipse(center.x, center.y, 2*amplitude)

  fill(255, 255, 255, 100);
  noStroke();
  ellipse(currentX, currentY, 10)

  stroke(255, 255, 255, 100);
  noFill();
  strokeWeight(2.5);
  line(currentX, currentY, center.x, center.y);
  strokeWeight(5);
}
