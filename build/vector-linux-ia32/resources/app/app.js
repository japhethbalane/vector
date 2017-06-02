var {app, BrowserWindow} = require('electron');

let win;

app.on('ready', function() {
	win = new BrowserWindow({
		width: 700,
		height: 700,
		resizable: false,
		frame: false
	});
	win.loadURL(`file://${__dirname}/index.html`);
});