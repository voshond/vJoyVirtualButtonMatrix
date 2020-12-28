const fs = require('fs');
const { vJoy, vJoyDevice } = require('vjoy');
const express = require('express');
const buttonGenerator = require('./buttonGenerator.js');
const sliderGenerator = require('./sliderGenerator.js');
const nunjucks = require('nunjucks');
const app = express();
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
const userConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'user-config.json')));

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
device.resetButtons();

// check if it was created
if (device == null) {
    console.log(`Could not initialize the device. Status: ${vJoyDevice.status(deviceId)}`);
    process.exit();
}

// setup the express server
app.listen(process.env.port || config.general.port);
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

nunjucks.configure('views', {
    autoescape: false,
    express: app
});

let groups = {};
[...new Set(userConfig.customButtons.map(item => {
    return item.group;
}))].map(filter => {
    groups[filter] = userConfig.customButtons.filter(item => item.group === filter);
});

let buttons = buttonGenerator(groups.default.concat(groups.shipcontrol));
let defaultB = buttonGenerator(groups.default);
let shipcontrol = buttonGenerator(groups.shipcontrol);
let sliders = sliderGenerator(groups.sliders);

// Init Sliders
groups.sliders.forEach(element => {
    device.axes[`${element.id}`].set(parseInt(element.range.default));
});

app.get('/', function (req, res) {
    res.render('index.html', { buttons, shipcontrol, sliders });
});

app.post('/button', function (req, res) {
    console.log(req.body);
    let button = {
        id: req.body.id,
        type: req.body.type
    }

    device.buttons[button.id].set(true); // press the first button
    setTimeout(() => {
        device.buttons[button.id].set(false);
    }, 300);

    res.send(JSON.stringify({ status: 200, id: button.id })); // try res.json() if getList() returns an object or array
});

const toggleButtons = {};

app.post('/toggle', function (req, res) {
    console.log(req.body);
    let button = {
        id: req.body.id,
        state: req.body.state,
        type: req.body.type
    }

    device.buttons[button.id].set(button.state);
    res.send(JSON.stringify({ status: 200, id: button, state: button.state })); // try res.json() if getList() returns an object or array
});

app.post('/slider', function (req, res) {
    console.log(req.body);
    let slider = {
        id: req.body.id,
        type: req.body.type,
        value: parseInt(req.body.value)
    }

    device.axes[`${slider.id}`].set(slider.value);

    res.send(JSON.stringify({ status: 200, id: slider.id, value: slider.value })); // try res.json() if getList() returns an object or array
});

console.log('Running at Port 3000 🚀');