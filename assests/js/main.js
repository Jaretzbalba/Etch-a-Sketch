const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let colorPicker = document.querySelector('.colorPicker');
let colorBtn = document.querySelector('.color');
let pencilBtn = document.querySelector('.pencil');
let rainbowBtn = document.querySelector('.rainbow');
let eraserBtn = document.querySelector('.eraser');
let clearBtn = document.querySelector('.clear');
let sizeValue = document.querySelector('.sizeVal');
let sizeSlider = document.querySelector('.sizeSlider');
const grid = document.getElementById('grid');

//event listener method

// defaultBtn.addEventListener('click', function () {
//   setCurrentMode('color');
// });
// pencilBtn.addEventListener('click', function () {
//   setCurrentMode('pencil');
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

colorPicker.oninput = e => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
pencilBtn.onclick = () => setCurrentMode('pencil');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = e => updateSize(e.target.value);
sizeSlider.onchange = () => reloadGrid();

let mouseDown = false; //create mouseDown value to keep track of onmousedown/onmouseup
document.body.onmousedown = () => (mouseDown = true); //while mouse is pressed down, keep mouseDown as true
document.body.onmouseup = () => (mouseDown = false); //while mouse is unpressed, keep mouseDown false

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
  } else if (currentMode === 'pencil') {
    if (e.target.style.backgroundColor.match(/rgba/)) {
      let currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
      if (currentOpacity <= 0.9) {
        e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
      }
    } else if (e.target.style.backgroundColor == 'rgb(0, 0, 0)') {
      return;
    } else {
      e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    }
  }
}

function shade(e) {
  if (e.type === 'mouseover' && !mouseDown) return; //if mouse is hovering but not pressed down, don't do anything
  if (currentMode === 'pencil') {
    e.target.style.backgroundColor = 'hsl(0 0% 90%)';
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

function setCurrentColor(newColor) {
  currentColor = newColor;
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
