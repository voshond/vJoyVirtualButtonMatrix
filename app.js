const express = require('express');
const app = express();
const path = require('path');
const { vJoy, vJoyDevice } = require('vjoy');

// create a joystick
let deviceId = 1;

// check if there is a device ID
if (process.argv.length > 2) {
	deviceId = Number(process.argv[2]);
}

// check if vjoy controllers are enabled
if (!vJoy.isEnabled()) {
	console.log("vJoy is not enabled.");
	process.exit();
}

// create a device
let device = vJoyDevice.create(deviceId);

// check if it was created
if (device == null) {
	console.log(`Could not initialize the device. Status: ${vJoyDevice.status(deviceId)}`);
	process.exit();
}

// setup the express server
app.listen(process.env.port || 3000);
app.use('/img',express.static(path.join(__dirname, 'public/img')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// handle the requests
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index.html'));
});

let ran = false;
app.post('/button', function(req, res){
  console.log(req.body);
  let pressedButton = req.body.button;

  device.buttons[pressedButton].set(true); // press the first button

  setTimeout(() => {
    device.buttons[pressedButton].set(false);
  }, 300);

  console.log(`Button ${pressedButton} pressed`);

  res.send(JSON.stringify({status: 200, pressedButton: pressedButton})); // try res.json() if getList() returns an object or array
});

console.log('Running at Port 3000');