/*
 **--------- Project8: HTML Canvas ---------**
 */

//What is Canvas? -> Canvas on the web means microsoft paint where you get a block of pixel and then you can draw on it
//1. Access the canvas element
const canvas = document.getElementById("draw");

// NOTE: You don't draw on the canvas element in HTML but you draw on "context". A "Context" can be 2D or 3D
//2. Create the context to draw
const ctx = canvas.getContext("2d"); //NOTE: context is actually an object -> creates graphics on the fly

//3. Set the area of the canvas to be the exact width of the window(readjusting area as we resize window) => current fixed size of canvas is 800 * 800
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//When you draw on something you need: a) color to draw b) end of line to be squared off/rounded c) when line meets another then also its squared off/rounded. In this project we have used rounded
//4. Base settings to draw: strokeStyle, linejoin, lineCap
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = "30"; //increases line width of strokes
ctx.globalCompositionOperation = "source-in";

//5. we need some variables to check on how are we drawing on canvas
let isDrawing = false; //flag: when click down = TRUE, when not clicked on button = FALSE
let lastX = 0; //this sets the starting point at which line is starting to draw
let lastY = 0; //this sets the ending point at which line is ending
let hue = 0;

//6. we need a function which takes event object and use for drawing functionality and triggers when we move mouse over the canvas
function draw(e) {
  if (!isDrawing) return; //return when mouse is not downed
  // console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; //here we are starting the stroke with red
  //7. start a path
  ctx.beginPath();
  //8. we need to start with an X and Y -> this will complete our drawing from X to Y
  //start from
  ctx.moveTo(lastX, lastY);
  //go to
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  //9. till above code we are drawing only in one direction from left window corner
  // console.log(lastX, lastY);
  /**
   * lastX = e.offsetX;
     lastY = e.offsetY;
  */
  // NOTE: ES6 trick - using destructing an array technique - to set two or more variables in one line[for above two lines]
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++; //here we are incrementing the hue value and thus changing colors
  if (hue >= 360) {
    hue = 0; //setting it to 0 if it exceeds 360 value
  }
}

// part of 6
//NOTE: by putting mousedown first over mousemove we are updating the lastX and lastY to draw the line where we mouse down and not starting from 0,0 location
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY]; //updating coordinates
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// WHAT IS AN HSL: https://mothereffinghsl.com/
// Its basically an Rainbow and programmatically you can select the pieces of rainbow
// H: Hue of the rainbow - Red to Red
// S: Saturation - Tells how bright the color is
// L: Lighness(from dark to light)
