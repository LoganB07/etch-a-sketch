function toggleOnOff(bool) {
    let text = document.querySelector(".on-off");
    if (bool) {
        text.textContent = "OFF";
        return false;
    }
    else {
        text.textContent = "ON";
        return true;
    }
}

function changeGridSize() {
    let valid = false;
    let newSize;
    while (!valid) {
        newSize = prompt("What size would you like your grid to be?\n(Max is 100 Min is 1)");
        if (newSize < 1 || newSize > 100) {alert("REALLY! I said the max was 100 and min was 1!")}
        else {valid = true;}
    }
    let text = document.querySelector(".size");
    text.textContent = `${newSize}px X ${newSize}px`;
    return newSize;
}

function refreshGrid() {
    let gridArea = document.querySelector("#content");
    while (gridArea.firstChild) {
        gridArea.removeChild(gridArea.lastChild);
    }
}

function createGrid(size, isRGB) {
    const gridArea = document.querySelector("#content");

    let sketchArea = document.createElement("div");
    sketchArea.classList.add("sketch-area");
    gridArea.appendChild(sketchArea);

    let style = window.getComputedStyle(sketchArea);
    let sketchWidth = parseInt(style.getPropertyValue("width"));
    console.log(sketchWidth);

    let pixelWidth = sketchWidth / size;

    console.log(pixelWidth)

    style = window.getComputedStyle(sketchArea);
    let sketchHeight = parseInt(style.getPropertyValue("height"));
    console.log(sketchHeight);

    let pixelHeight = sketchHeight / size;
    

    console.log(pixelHeight)


    let pixels = size * size;
    for (let i = 0; i < pixels; i++) {
        let newPixel = document.createElement("div");
        newPixel.classList.add("pixel");
        newPixel.classList.add("catch");
        newPixel.style.width = `${pixelWidth}px`;
        newPixel.style.height = `${pixelHeight}px`;
        newPixel.addEventListener("mouseenter", function() {changeColor(isRGB, newPixel)});
        sketchArea.appendChild(newPixel);
    }
    


}

function changeColor(isRGB, pixel) {
    let color = "black";
    if (isRGB) {
        let r = randomColorValue();
        let g = randomColorValue();
        let b = randomColorValue();
        color = `rgb(${r}, ${g}, ${b})`
    }
    pixel.style.backgroundColor = color;
}

function randomColorValue() {
    const MIN = 0;
    const MAX = 255;
    let randnum = Math.floor((Math.random() * (MAX - MIN) + MIN));
    return randnum;
}

let gridSize = 16;
let isRGB = false;

const refreshBtn = document.querySelector("#refresh");
refreshBtn.addEventListener("click", () => {refreshGrid();});

const toggleRGB = document.querySelector("#RGB");
toggleRGB.addEventListener("click", () => {isRGB = toggleOnOff(isRGB);});

const gridSizeBtn = document.querySelector("#change-size");
gridSizeBtn.addEventListener("click", () => {gridSize = changeGridSize();});

const createGridBtn = document.querySelector("#create");
createGridBtn.addEventListener("click", () => {
    refreshGrid();
    createGrid(gridSize, isRGB);
});


