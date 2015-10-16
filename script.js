var canvas = document.getElementById("vector");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var points = [];

setInterval(world, 30);
generatePoints(50);

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function generatePoints(count) {
	for (var i = 0; i < count; i++) {
		points.push(new Point());
	};
}

function world() {
	clearCanvas();
	drawLines();
	for (var i = 0; i < points.length; i++) {
		points[i].update().draw();
	}
}

function clearCanvas() {
	context.fillStyle = "rgba(155,155,155,0.5)";
	context.fillRect(0,0,canvas.width,canvas.height);
}

function drawLines() {
	for (var i = 0; i < points.length; i++) {
		for (var j = i+1; j < points.length; j++) {
			context.beginPath();
			context.moveTo(points[i].x, points[i].y);
			context.lineTo(points[j].x, points[j].y);
			context.stroke();
		}
	}
}

function Point() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height);
	this.radius = 3;
	this.speedx = randomBetween(2, 6);
	this.speedy = randomBetween(1, 3);

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
		context.fillStyle = "#ffffff";
		context.strokeStyle = "rgba(0,0,0,0.5)";
		context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		context.stroke();
		context.fill();

		return this;	
	}
}