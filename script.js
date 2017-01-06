var canvas = document.getElementById("vector");
var ctx = canvas.getContext("2d");
var cursorcount = 8;
var cursorsize = 30;

const numberInput = document.querySelector('.number');
const sizeInput = document.querySelector('.size');

numberInput.value = cursorcount;
sizeInput.value = cursorsize;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

clearCanvas();

ctx.lineCap = 'round';
ctx.lineWidth = cursorsize;
// ctx.globalCompositeOperation = 'multiply';

var isDrawing = false;
var endx = 0;
var endy = 0;
var hue = randomBetween(0, 360);
var dir = true;

function draw(e) {
	if (isDrawing) {
		hue+=0.1;
		// updateDir();
		ctx.strokeStyle = 'hsl('+hue+', 100%, 50%)';
		// mode1(e);
		mode2(e);
		endx = e.pageX;
		endy = e.pageY;
	}
}

/////////////////////////////////////////////////////////////////

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function updateDir() {
	if (dir) ctx.lineWidth++;
	else ctx.lineWidth--;
	if (ctx.lineWidth >= cursorsize || ctx.lineWidth <= 1) dir = !dir; 
}
function getHypothenuse(x1,y1,x2,y2) {
	var x = Math.abs(x1-x2);
	var y = Math.abs(y1-y2);
	return Math.sqrt((x*x)+(y*y));
}
function angle(cx,cy,px,py) {
    var p0 = {x: cx, y: cy - Math.sqrt(Math.abs(px - cx) * Math.abs(px - cx)
    	+ Math.abs(py - cy) * Math.abs(py - cy))};
    return (2 * Math.atan2(py - p0.y, px - p0.x)) * 180 / Math.PI + 90;
}
function clearCanvas() {
	ctx.fillStyle = '#001634';
	ctx.fillRect(0,0,canvas.width, canvas.height);
	drawFoundation();
}
function hideControls() {	
}
function drawFoundation() {
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgba(255,255,255,0.1)';
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, 10, Math.PI*2, false);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, 100, Math.PI*2, false);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, 500, Math.PI*2, false);
	ctx.stroke();
	
	// ctx.beginPath();
	// ctx.moveTo(0, 0);
	// ctx.lineTo(canvas.width, canvas.height);
	// ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0, canvas.height/2);
	ctx.lineTo(canvas.width, canvas.height/2);
	ctx.stroke();
	// ctx.beginPath();
	// ctx.moveTo(0, canvas.height);
	// ctx.lineTo(canvas.width, 0);
	// ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(canvas.width/2, 0);
	ctx.lineTo(canvas.width/2, canvas.height);
	ctx.stroke();
	ctx.lineWidth = cursorsize;
}

///////////////////////////////////////////////////////////////// MODES

function mode1(e) {
	ctx.beginPath();
	ctx.moveTo(canvas.width-endx,    canvas.height-endy);
	ctx.lineTo(canvas.width-e.pageX, canvas.height-e.pageY);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(canvas.width-endx,    endy);
	ctx.lineTo(canvas.width-e.pageX, e.pageY);
	ctx.stroke()
	ctx.beginPath();
	ctx.moveTo(endx,    canvas.height-endy);
	ctx.lineTo(e.pageX, canvas.height-e.pageY);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(endx, endy);
	ctx.lineTo(e.pageX, e.pageY);
	ctx.stroke();
}
function mode2(e) {
	var div = 360 / cursorcount;
	var ang1, hyp1, dx1, dy1, ang2, hyp2, dx2, dy2;
	ang1 = angle(endx, endy, canvas.width/2, canvas.height/2);
	hyp1 = getHypothenuse(endx, endy, canvas.width/2, canvas.height/2);
	ang2 = angle(e.pageX, e.pageY, canvas.width/2, canvas.height/2);
	hyp2 = getHypothenuse(e.pageX, e.pageY, canvas.width/2, canvas.height/2);
	for (var i = 0; i < cursorcount; i++) {
		dx1 = Math.cos((ang1+(div*(i+1)))*(Math.PI/180)) * hyp1;
		dy1 = Math.sin((ang1+(div*(i+1)))*(Math.PI/180)) * hyp1;
		dx2 = Math.cos((ang2+(div*(i+1)))*(Math.PI/180)) * hyp2;
		dy2 = Math.sin((ang2+(div*(i+1)))*(Math.PI/180)) * hyp2;
		ctx.beginPath();
		ctx.moveTo(canvas.width/2+dx1, canvas.height/2+dy1);
		ctx.lineTo(canvas.width/2+dx2, canvas.height/2+dy2);
		ctx.stroke();
	}
}

/////////////////////////////////////////////////////////////////

numberInput.addEventListener('change', function() {
	cursorcount = this.value;
	// if (cursorcount > this.max) {cursorcount = this.max;}
	// if (cursorcount < this.min) {cursorcount = this.min;}
});
sizeInput.addEventListener('change', function() {
	cursorsize = this.value;
	// if (cursorsize > this.max) {cursorsize = this.max;}
	// if (cursorsize < this.min) {cursorsize = this.min;}
	ctx.lineWidth = cursorsize;
});

/////////////////////////////////////////////////////////////////

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', function(e) {
	isDrawing = true;
	endx = e.pageX;
	endy = e.pageY;
});
canvas.addEventListener('mouseup', function(e) {
	isDrawing = false;
});
canvas.addEventListener('mouseout', function(e) {
	isDrawing = false;
});
