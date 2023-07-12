
// getElementsByClassName returns a NodeList, so although we only have one item with the class grid-container, we must use an index to select the specific node
let gridContainer = document.getElementsByClassName('grid-container')[0]; 
let currPenMode = 1;
let currGridSize = 24;

function color(e) {
    let color = e.target.style.backgroundColor.toString();
    let red, green, blue;
    if (currPenMode === 1) {
        e.target.style.backgroundColor = "black";
    } else if (currPenMode === 2) {
        if (!color) {
            e.target.style.backgroundColor = "rgb(191, 191, 191)";
        } else {
            let shave = false;
            red = color.substr(4, 3);
            if (red.includes(",")) {
                shave = true;
                red = color.substr(4, 2);
            }
            red = Number(red);

            green = shave ? color.substr(8, 2) : color.substr(9, 3);
            green = Number(green);

            blue = shave ? color.substr(12, 2) : color.substr(14, 3);
            blue = Number(blue);

            red *= 0.75;
            green *= 0.75;
            blue *= 0.75;

            if (red < 10) {
                red = 0;
                green = 0;
                blue = 0;
            }

            e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        }
    } else if (currPenMode === 3) {
        if (!color) {
            red = Math.floor(Math.random() * 200) + 26;
            green = Math.floor(Math.random() * 200) + 26;
            blue = Math.floor(Math.random() * 200) + 26;
            e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        }
    }
}

function changePenMode(e) {
    if (e.target.value === "solid") {
        currPenMode = 1;
    } else if (e.target.value === "darken") {
        currPenMode = 2;
    } else if (e.target.value === "rainbow") {
        currPenMode = 3;
    } else {
        currPenMode = 4;
    }

    console.log(currPenMode);

}

function createGrid(size) {
    currGridSize = size;
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    let gridBoxes = Array(size).fill(Array(size));

    for(let i = 0; i < gridBoxes.length; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add("row");
        gridContainer.appendChild(newDiv);
        for (let j = 0; j < Math.floor(gridBoxes.length * 1.5); j++) {
            gridBoxes[i][j] = document.createElement('div');
            gridBoxes[i][j].style.border = "1px solid black";
            gridBoxes[i][j].addEventListener('mouseover', color);
            newDiv.appendChild(gridBoxes[i][j]);
        }
    }
}

function updateGrid(e) {
    let input = Number(e.target.value);
    if (input <= 100 && input >= 0) {
        createGrid(input);
    }
}

function erasePad(e) {
    if (e.type === "mouseenter") {
        e.target.style.backgroundColor = "#5D150D";
        return;
    } else if (e.type === "mouseleave") {
        e.target.style.backgroundColor = "#6E260E";
        return;
    } else if (e.type === "click") {
        createGrid(currGridSize);
    }
}

createGrid(24);

let gridSizeInput = document.getElementById('grid-size');
gridSizeInput.addEventListener('input', updateGrid);

let penMode = document.getElementById('mode');
penMode.addEventListener('change', changePenMode);

let eraseButton = document.getElementById('erase-button');
eraseButton.addEventListener('mouseenter', erasePad);
eraseButton.addEventListener('mouseleave', erasePad);
eraseButton.addEventListener('click', erasePad);
