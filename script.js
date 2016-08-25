var canvas = document.getElementById("vector");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.fillStyle = "#000";
context.fillRect(0,0,canvas.width,canvas.height);

var mouse = {x: 0, y: 0};
var gap = 45;
var vectors = [];

function generateVectors(gap) {
	for (var i = 0; i < 360; i+=gap) {
		vectors.push(new Vector(i,i+gap));
	}
}
generateVectors(360/gap);
 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}, false);

context.lineWidth = 1;
context.lineJoin = 'round';
context.lineCap = 'round';
context.strokeStyle = '#fff';
 
canvas.addEventListener('mousedown', function(e) {
    canvas.addEventListener('mousemove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);
 
var onPaint = function() {
	updateVectors();
	for (var i = 0; i < vectors.length; i++) {
		context.beginPath();
	    context.moveTo(vectors[i].x, vectors[i].y);
	    context.lineTo(vectors[i].x+1, vectors[i].y+1);
	    context.stroke();
	}
};

function getHypothenuse(x1,y1,x2,y2) {
	var x = Math.abs(x1-x2);
	var y = Math.abs(y1-y2);
	return Math.sqrt((x*x)+(y*y));
}

function angle(cx,cy,px,py) {
    var p0 = {x: cx, y: cy - Math.sqrt(Math.abs(px - cx) * Math.abs(px - cx)
            + Math.abs(py - cy) * Math.abs(py - cy))};
    return (2 * Math.atan2(py - p0.y, px - p0.x)) * 180 / Math.PI;
}

function updateVectors() {
	var h = getHypothenuse(canvas.width/2,canvas.height/2,mouse.x,mouse.y);
	var ang = angle(canvas.width/2,canvas.height/2,mouse.x,mouse.y)%gap;
	for (var i = 0; i < vectors.length; i++) {
		vectors[i].x = canvas.width/2 + Math.cos(
			(vectors[i].start+ang)
			*(Math.PI/180))*h;
		vectors[i].y = canvas.height/2 + Math.sin(
			(vectors[i].start+ang)
			*(Math.PI/180))*h;
	}
}

function Vector(start,end) {
	this.start = start;
	this.end = end;
	this.angle;
	this.x;
	this.y;
}