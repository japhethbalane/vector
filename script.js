const displayModes = document.querySelectorAll('.display-mode');
const countInput = document.querySelector('.count');
const sizeInput = document.querySelector('.size');
const shadowInput = document.querySelector('.shadow');
const shadowOffsetInput = document.querySelector('.shadow-offset');
const inkColorInput = document.querySelector('.ink');
const backgroundColorInput = document.querySelector('.bg');
const randomInput = document.querySelector('.random');
const bubblyInput = document.querySelector('.bubbly');

/////////////////////////////////////////////////////////////////

var canvas = document.getElementById("vector");
var ctx = canvas.getContext("2d");
var cursorcount = 1;
var cursorsize = 10;
var shadowsize = 0;
var shadowOffset = 0;
var bgColor = '#ffffff';
var inkColor = '#aaaaaa';
var isDrawing = false;
var endx = 0;
var endy = 0;
var hue = randomBetween(0, 360);
var isWavy = false;
var isRandomColor = false;
var isBubbly = false;
var mode = 2;

countInput.value = cursorcount;
sizeInput.value = cursorsize;
shadowInput.value = shadowsize;
shadowOffsetInput.value = shadowOffset;
inkColorInput.value = inkColor;
backgroundColorInput.value = bgColor;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
clearCanvas();
ctx.lineCap = 'round';
ctx.lineWidth = cursorsize;

/////////////////////////////////////////////////////////////////

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // drawFoundation();
}
function drawFoundation() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    // ctx.strokeStyle = 'rgba(0,0,0,0.2)';

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

function HexToHSL(hex, offset) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);

    return 'hsl(' + (h * 360 + offset) + ', ' + s + '%, ' + l + '%)';
}

///////////////////////////////////////////////////////////////// MODES

function mirrorHorizontal(e) {
    if (isBubbly) {
        var rad = randomBetween(1, cursorsize);
        ctx.globalAlpha = Math.random();
        ctx.beginPath();
        ctx.arc(canvas.width-e.pageX, e.pageY, rad, Math.PI * 2, false);
        ctx.fill()
        ctx.beginPath();
        ctx.arc(e.pageX, e.pageY, rad, Math.PI * 2, false);
        ctx.fill();
        ctx.globalAlpha = 1;
    } else {
        ctx.beginPath();
        ctx.moveTo(canvas.width-endx,    endy);
        ctx.lineTo(canvas.width-e.pageX, e.pageY);
        ctx.stroke()
        ctx.beginPath();
        ctx.moveTo(endx, endy);
        ctx.lineTo(e.pageX, e.pageY);
        ctx.stroke();
    }
}
function mirrorHorizontalVertical(e) {
    if (isBubbly) {
        var rad = randomBetween(1, cursorsize);
        ctx.globalAlpha = Math.random();
        ctx.beginPath();
        ctx.arc(canvas.width-e.pageX, canvas.height-e.pageY, rad, Math.PI * 2, false);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(canvas.width-e.pageX, e.pageY, rad, Math.PI * 2, false);
        ctx.fill()
        ctx.beginPath();
        ctx.arc(e.pageX, canvas.height-e.pageY, rad, Math.PI * 2, false);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(e.pageX, e.pageY, rad, Math.PI * 2, false);
        ctx.fill();
        ctx.globalAlpha = 1;
    } else {
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
}
function mirrorRadial(e) {
    var div = 360 / cursorcount;
    if (isBubbly) {
        var ang = angle(e.pageX, e.pageY, canvas.width/2, canvas.height/2);
        var hyp = getHypothenuse(e.pageX, e.pageY, canvas.width/2, canvas.height/2);
        var rad = randomBetween(1, cursorsize);
        ctx.globalAlpha = Math.random();
        for (var i = 0; i < cursorcount; i++) {
            var dx2 = Math.cos((ang+(div*(i+1)))*(Math.PI/180)) * hyp;
            var dy2 = Math.sin((ang+(div*(i+1)))*(Math.PI/180)) * hyp;
            ctx.beginPath();
            ctx.arc(canvas.width / 2 + dx2, canvas.height / 2 + dy2, rad, Math.PI * 2, false);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    } else {
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
}

/////////////////////////////////////////////////////////////////

countInput.addEventListener('change', function() {
    if (this.value < 1) {
        cursorcount = 1;
    } else if (this.value > 30) {
        cursorcount = 30;
    } else {
        cursorcount = this.value;
    }
    this.value = cursorcount;
});
sizeInput.addEventListener('change', function() {
    if (this.value < 1) {
        cursorsize = 1;
    } else if (this.value > 40) {
        cursorsize = 40;
    } else {
        cursorsize = this.value;
    }
    ctx.lineWidth = cursorsize;
    this.value = cursorsize;
});
shadowInput.addEventListener('change', function() {
    if (this.value < 0) {
        shadowsize = 0;
    } else if (this.value > 20) {
        shadowsize = 20;
    } else {
        shadowsize = this.value;
    }
    this.value = shadowsize;
});
shadowOffsetInput.addEventListener('change', function() {
    if (this.value < 0) {
        shadowOffset = 0;
    } else if (this.value > 180) {
        shadowOffset = 180;
    } else {
        shadowOffset = this.value;
    }
    this.value = shadowOffset;
    console.log(shadowOffset);
});
inkColorInput.addEventListener('change', function(e) {
    inkColor = this.value;
});
backgroundColorInput.addEventListener('change', function() {
    bgColor = this.value;
    clearCanvas();
});
randomInput.addEventListener('change', function(e) {
    isRandomColor = e.srcElement.checked;
});
bubblyInput.addEventListener('change', function(e) {
    isBubbly = e.srcElement.checked;
});
for (let display of displayModes) {
    if (display.value == mode) {
        display.checked = true;
    }
    display.addEventListener('change', function(e) {
        mode = display.value;
    });
}

canvas.addEventListener('mousemove', function(e) {
    if (isDrawing) {
        hue += isRandomColor ? 0.1 : 0;
        ctx.shadowBlur = shadowsize;
        ctx.shadowColor = isRandomColor ? 'hsl(' + (hue + shadowOffset) + ', 100%, 50%)' : HexToHSL(inkColor, shadowOffset);
        ctx.strokeStyle = isRandomColor ? 'hsl(' + (hue) + ', 100%, 50%)' : inkColor;
        ctx.fillStyle = isRandomColor ? 'hsl(' + (hue) + ', 100%, 50%)' : inkColor;

        if (mode == 0) {
            mirrorHorizontal(e);
        } else if (mode == 1) {
            mirrorHorizontalVertical(e);
        } else if (mode == 2) {
            mirrorRadial(e);
        }

        endx = e.pageX;
        endy = e.pageY;
        ctx.shadowBlur = 0;
    }
});
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
    if (e.keyCode == 99) {
        clearCanvas();
    } else if (e.keyCode == 104) {
        document.querySelector('.controls').classList.toggle('hidden');
    } else if (e.keyCode == 114) {
        isRandomColor = !isRandomColor;
        randomInput.checked = isRandomColor;
    } else if (e.keyCode == 98) {
        isBubbly = !isBubbly;
        bubblyInput.checked = isBubbly;
    }
});
