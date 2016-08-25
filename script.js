var canvas = document.getElementById("vector");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.fillStyle = "#000";
context.fillRect(0,0,canvas.width,canvas.height);

var mouse = {x: 0, y: 0};
 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}, false);

context.lineWidth = 3;
context.lineJoin = 'round';
context.lineCap = 'round';
context.strokeStyle = '#fff';
 
canvas.addEventListener('mousedown', function(e) {
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);
 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);
 
var onPaint = function() {
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
};