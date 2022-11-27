/*
    NOTE: this file is not meant to be read in class as it
    contains more advanced code that is javascript specific.
    if you want to look into this after class to better
    understand javascript, i have left comments explaining the code
*/


//find the location of the data from the html object with the id "main" and link it to a variable
const canvas = document.getElementById("main");
//create a variable conatining functions to draw on the canvas
const ctx = canvas.getContext("2d");

//set the width and height of the canvas to the width and height of the usable window area
canvas.width = innerWidth;
canvas.height = innerHeight;


const mouse = {x: 0, y: 0, clicking: false};

const keysDown = [];


//tell the window to execute the following code when it is resized
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

//execute the given code when the mouse is moving over the canvas
canvas.addEventListener("mousemove", (event) => {
    //set the remembered mouse's coordinates to the coordinates of the real mouse relative to the canvas
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
});
//update the remembered mouse's clicking value when the real mouse clicks or stops clicking on the window
window.addEventListener("mousedown", () => {mouse.clicking = true;});
window.addEventListener("mouseup", () => {mouse.clicking = false;});

//when the user presses/releases a key with the window selected, add/remove that key to a list of pressed keys
window.addEventListener("keydown", (event) => {keysDown.push(event.key.toLowerCase());});
window.addEventListener("keyup", (event) => {
    //check if the released key is in the list of down keys (to prevent errors)
    if(keyIsPressed(event.key.toLowerCase())){
        //remove 1 value from the list at the index of the released key
        keysDown.splice(keysDown.indexOf(event.key.toLowerCase()), 1);
    }
});



//set the width of future drawn lines to 4 pixels
ctx.lineWidth = 4;


function keyIsPressed(key){
    //return whether any of the keys in the list of pressed keys are the same as the given key
    return keysDown.some(pressed => pressed == key);
}


function rect(x, y, width, height, color = "gray", border = "black"){
    //remember the current ctx settings
    ctx.save();

    //change the color settings of the ctx to the given color settings
    ctx.fillStyle = color;
    ctx.strokeStyle = border;


    //create a path in the shape of a rectangle with the inputted parameters
    ctx.rect(x, y, width, height);

    //fill the space inside of the path, then draw a line on the path (creating a border)
    ctx.fill();
    ctx.stroke();


    //restore the ctx settings to what they were when ctx.save() was called
    ctx.restore();
}

function text(text, x, y, size = "50", color = "black"){
    ctx.save();

    ctx.fillStyle = color;
    //set the font size to the given size and the font to arial
    ctx.font = size+"px arial, sans-serif"


    //fill in the text at the given coordinates
    ctx.fillText(text, x, y);


    ctx.restore();
}

function clear(){
    //erase all the canvas pixels within a rectangle the size of the window
    ctx.clearRect(0, 0, innerWidth, innerHeight);
}