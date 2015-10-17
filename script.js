var canvas = document.getElementById("vector");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var points1 = [];
// var points2 = [];

setInterval(world, 30);
generatePoints(4);

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function generatePoints(count) {
	if (count > 50) {count = 50};
	for (var i = 0; i < count; i++) {
		points1.push(new Point());
		// points2.push(new Point());
	};
}

function world() {
	clearCanvas();
	drawLines();
	for (var i = 0; i < points1.length; i++) {
		points1[i].update(0,canvas.width/2).draw();
		// points2[i].update(canvas.width/2,canvas.width).draw();
	}
}

function clearCanvas() {
	context.fillStyle = "rgba(155,155,155,0.5)";
	context.fillRect(0,0,canvas.width,canvas.height);
}

function drawLines() {
	for (var i = 0; i < points1.length; i++) {
		for (var j = i+1; j < points1.length; j++) {
			context.beginPath();
			context.moveTo(points1[i].x, points1[i].y);
			context.lineTo(points1[j].x, points1[j].y);
			context.stroke();
		}
		// for (var j = i+1; j < points1.length; j++) {
		// 	context.beginPath();
		// 	context.moveTo(points2[i].x, points2[i].y);
		// 	context.lineTo(points2[j].x, points2[j].y);
		// 	context.stroke();
		// }
	}
}

function Point() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height);
	this.radius = 3;
	this.speedx = randomBetween(2, 5);
	this.speedy = randomBetween(1, 5);

	if (randomBetween(1,3) == 1) {
		this.speedx*=-1;
	};
	if (randomBetween(1,3) == 1) {
		this.speedy*=-1;
	};

	this.update = function() {
		this.x+=this.speedx;
		this.y+=this.speedy;

		if (this.x < 0 || this.x > canvas.width) {
			this.speedx*=-1;
		};
		if (this.y < 0 || this.y > canvas.height) {
			this.speedy*=-1;
		};

		return this;
	}

	this.draw = function() {
		context.beginPath();
		context.fillStyle = "#000000";
		context.strokeStyle = "rgba(0,0,0,0.5)";
		context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		context.stroke();
		context.fill();

		return this;	
	}
}