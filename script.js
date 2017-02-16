const controls = document.querySelector('.controls');
const numberInput = document.querySelector('.number');
const sizeInput = document.querySelector('.size');
const colorInput = document.querySelector('.color');
const waveInput = document.querySelector('.wave');

var canvas = document.getElementById("vector");
var ctx = canvas.getContext("2d");
var cursorcount = 8;
var cursorsize = 10;
var maxcursorsize = 50;
var maxcount = 30;
var bgColor = '#ffffff';
var isDrawing = false;
var endx = 0;
var endy = 0;
var hue = randomBetween(0, 360);
var dir = true;
var isWavy = false;

numberInput.value = cursorcount;
sizeInput.value = cursorsize;
colorInput.value = bgColor;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
clearCanvas();
ctx.lineCap = 'round';
ctx.lineWidth = cursorsize;

/////////////////////////////////////////////////////////////////

function draw(e) {
	if (isDrawing) {
		hue+=0.1;
		if (isWavy) updateDir();
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
	if (dir) cursorsize++;
	else cursorsize--;
	ctx.lineWidth = cursorsize;
	if (cursorsize > maxcursorsize || ctx.lineWidth <= 1) dir = !dir; 
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
	ctx.fillStyle = bgColor;
	ctx.fillRect(0,0,canvas.width, canvas.height);
	drawFoundation();
}
function hideControls() {	
	document.querySelector('.controls').classList.toggle('hidden');
}
function drawFoundation() {
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgba(0,0,0,0.2)';
	
	var div = 50;
	for (var i = 1;
		i*div < getHypothenuse(canvas.width/2,canvas.height/2,0,0);
		i++) {
		ctx.beginPath();
		ctx.arc(canvas.width/2, canvas.height/2, div*i, Math.PI*2, false);
		ctx.stroke();
	}

	div = 30;
	for (var i = 0; i < 360; i+=360/div) {
		var dx = Math.cos((i)*(Math.PI/180)) * getHypothenuse(canvas.width/2,canvas.height/2,0,0);
		var dy = Math.sin((i)*(Math.PI/180)) * getHypothenuse(canvas.width/2,canvas.height/2,0,0);
		ctx.beginPath();
		ctx.moveTo(canvas.width/2, canvas.height/2);
		ctx.lineTo(canvas.width/2+dx, canvas.height/2+dy);
		ctx.stroke();
	}

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
	cursorcount = this.value > 0 && this.value <= maxcount ? this.value : cursorcount;
	this.value = cursorcount;
});
sizeInput.addEventListener('change', function() {
	cursorsize = this.value > 0 && this.value <= maxcursorsize ? this.value : cursorsize;
	ctx.lineWidth = cursorsize;
	this.value = cursorsize;
});
colorInput.addEventListener('change', function() {
	bgColor = this.value;
	clearCanvas();
});
waveInput.addEventListener('change', function(e) {
	isWavy = this.checked;
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

window.addEventListener('keypress', function(e) {
	console.log(e.keyCode);
	if (e.keyCode == 101) {
		clearCanvas();
	} else if (e.keyCode == 104) {
		hideControls();
	}
});