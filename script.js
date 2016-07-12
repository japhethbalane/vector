var canvas = document.getElementById("vector");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var points1 = [];
var points2 = [];
var points3 = [];

var a = randomBetween(1, 7);
var b = randomBetween(1, 7);
var c = randomBetween(1, 7);

var ctr = 0;

context.fillStyle = "rgba(0,0,0,1)";
context.fillRect(0,0,canvas.width,canvas.height);

setInterval(world, 30);
generatePoints(3);

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function generatePoints(count) {
	if (count > 50) {count = 50};
	for (var i = 0; i < count; i++) {
		points1.push(new Point(0,canvas.width));
		points2.push(new Point(0,canvas.width));
		points3.push(new Point(0,canvas.width));
		
		// points1.push(new Point(0,canvas.width/3));
		// points2.push(new Point(canvas.width/3,canvas.width/3*2));
		// points3.push(new Point(canvas.width/3*2,canvas.width));
	};
}

function world() {
	clearCanvas();
	drawLines();
	ctr++;
	if (ctr == 100) {
		ctr = 0;
		a = randomBetween(1, 7);
		b = randomBetween(1, 7);
		c = randomBetween(1, 7);
	};
	for (var i = 0; i < points1.length; i++) {
		points1[i].update().draw();
		points2[i].update().draw();
		points3[i].update().draw();
	}
}

function clearCanvas() {
	context.fillStyle = "rgba(0,0,0,0.07)";
	context.fillRect(0,0,canvas.width,canvas.height);
}

function color(col) {
	var r =  0;
	var g =  0;
	var b =  0;
	if (col == 1) {
		r += randomBetween(100,255);
	};
	if (col == 2) {
		g += randomBetween(100,255);
	};
	if (col == 3) {
		b += randomBetween(100,255);
	};
	if (col == 4) {
		r += randomBetween(100,255);
		g += randomBetween(100,255);
	};
	if (col == 5) {
		r += randomBetween(100,255);
		b += randomBetween(100,255);
	};
	if (col == 6) {
		g += randomBetween(100,255);
		b += randomBetween(100,255);
	};
	return 'rgb(' + r + ', ' + g + ',' + b + ')';
}

function drawLines() {
	for (var i = 0; i < points1.length; i++) {
		for (var j = i+1; j < points1.length; j++) {
			context.beginPath();
			context.strokeStyle = color(a);
			context.moveTo(points1[i].x, points1[i].y);
			context.lineTo(points1[j].x, points1[j].y);
			context.stroke();
			context.beginPath();
			context.strokeStyle = color(b);
			context.moveTo(points2[i].x, points2[i].y);
			context.lineTo(points2[j].x, points2[j].y);
			context.stroke();
			context.beginPath();
			context.strokeStyle = color(c);
			context.moveTo(points3[i].x, points3[i].y);
			context.lineTo(points3[j].x, points3[j].y);
			context.stroke();
		}
	}
}

function Point(p1,p2) {
	this.x = randomBetween(p1, p2);
	this.y = randomBetween(0, canvas.height);
	// this.x = randomBetween(0, canvas.width);
	// this.y = randomBetween(0, canvas.height);
	this.radius = 3;
	this.speedx = randomBetween(2, 10);
	this.speedy = randomBetween(1, 5);

	// var gen = 15;
	// this.speedx *= gen;
	// this.speedy *= gen;

	if (randomBetween(1,3) == 1) {
		this.speedx*=-1;
	};
	if (randomBetween(1,3) == 1) {
		this.speedy*=-1;
	};

	this.update = function() {
		this.x+=this.speedx;
		this.y+=this.speedy;

		// if (this.x < p1 || this.x > p2) {
		// 	this.speedx*=-1;
		// };
		// if (this.y < 0 || this.y > canvas.height) {
		// 	this.speedy*=-1;
		// };

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
		// context.stroke();
		// context.fill();

		return this;	
	}
}