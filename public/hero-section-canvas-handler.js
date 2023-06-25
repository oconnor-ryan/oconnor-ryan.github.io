const heroBackgroundCanvas = document.getElementById("hero-background-canvas");
const ctx = heroBackgroundCanvas.getContext("2d");

const WIDTH = heroBackgroundCanvas.width;
const HEIGHT = heroBackgroundCanvas.height;

ctx.fillStyle = 'black';
ctx.beginPath();
ctx.fillRect(0, 0, WIDTH, HEIGHT);
ctx.stroke();

function drawLine(x0, y0, x1, y1) {
  ctx.beginPath();
  ctx.strokeStyle = "yellow";
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function drawTreeStep(iteration, nodes) {
  let newNodes = [];
  
  let iterDegree = (Math.PI / 4) / (1*iteration);

  for(let {x,y,deg} of nodes) {
    //console.log(deg * 180 / Math.PI);
    let leftDeg = deg - iterDegree;
    let rightDeg = deg + iterDegree;
    
    let leftY = y + Math.round(20*Math.sin(leftDeg));
    let rightY = y + Math.round(20*Math.sin(rightDeg));

    let leftX = x + Math.round(20*Math.cos(leftDeg));
    let rightX = x + Math.round(20*Math.cos(rightDeg));

    drawLine(x, y, leftX, leftY);
    drawLine(x, y, rightX, rightY);

    newNodes.push({x: leftX, y: leftY, deg: leftDeg}, {x: rightX, y: rightY, deg: rightDeg});
  }
  return newNodes;
  
}

let lastCall = 0;
let iterations = 1;

let nodes = [{x: WIDTH/2, y: HEIGHT/2, deg: Math.PI/2}];
let nodes1 = [{x: WIDTH/2, y: HEIGHT/2, deg: 3*Math.PI/2}];

function update(deltaTimeMillis) {
  if(iterations <= 8 && deltaTimeMillis - lastCall >= 100) {
    lastCall = deltaTimeMillis;
    nodes = drawTreeStep(iterations, nodes);
    nodes1 = drawTreeStep(iterations, nodes1);
    iterations++;
  } 
  window.requestAnimationFrame(update);

}

window.requestAnimationFrame(update);