const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let defaultBtn = document.querySelector('.default');
let rainbowBtn = document.querySelector('.rainbow');
let eraserBtn = document.querySelector('.eraser');
let clearBtn = document.querySelector('.clear');
let sizeValue = document.querySelector('.sizeVal');
let sizeSlider = document.querySelector('.sizeSlider');

//event listener method

// defaultBtn.addEventListener('click', function () {
//   setCurrentMode('color');
// });
// rainbowBtn.addEventListener('click', function () {
//   setCurrentMode('rainbow');
// });
// eraserBtn.addEventListener('click', function () {
//   setCurrentMode('eraser');
// });
// clearBtn.addEventListener('click', function () {
//   reloadGrid();
// });
// sizeSlider.addEventListener('mousemove', function (e) {
//   updateSize(e.target.value);
// });
// sizeSlider.addEventListener('change', function (e) {
//   reloadGrid();
// });

//direct property method i.e. onclick, onmousemove, etc. ***More concise than event listener method***

defaultBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = e => updateSize(e.target.value);
sizeSlider.onchange = () => reloadGrid();

let mouseDown = false; //create mouseDown value to keep track of onmousedown/onmouseup
document.body.onmousedown = () => (mouseDown = true); //while mouse is pressed down, keep mouseDown as true
document.body.onmouseup = () => (mouseDown = false); //while mouse is unpressed, keep mouseDown false

const grid = document.getElementById('grid');

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return; //if mouse is hovering but not pressed down, don't do anything
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe';
  }
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid-element');
    gridElement.addEventListener('mouseover', changeColor);
    gridElement.addEventListener('mousedown', changeColor);
    grid.appendChild(gridElement);
  }
}

function setCurrentMode(newMode) {
  currentMode = newMode;
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = '';
}

function updateSize(newSize) {
  sizeValue.innerHTML = `${newSize} x ${newSize}`;
  currentSize = newSize;
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
};
