const fs = require('fs');
const { vJoy, vJoyDevice } = require('vjoy');
const express = require('express');
const groupRender = require('./lib/groupRender.js');
const nunjucks = require('nunjucks');
const app = express();
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
const userConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'user-config.json')));
const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
const inferEthernetInterface = () => {
    const keys = Object.keys(results)
    for (const key of keys) {
        if(key.startsWith("Ethernet")) {
            return results[key]
        }
    }
    return keys.length > 0
        ? results[keys[0]]
        : null
}

let serverAdress = (
    results["Ethernet"] ||
    inferEthernetInterface() ||
    ["localhost"])[0];

// create a joystick
let deviceId = userConfig.vJoy.deviceId;

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
app.listen(process.env.port || userConfig.general.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'nunjucks');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

nunjucks.configure('views', {
    autoescape: false,
    express: app
});

let renderedGroups = groupRender(userConfig, true);
let sliders = userConfig.customInputs.filter(item => item.type === "slider");

// Init Sliders
setTimeout(() => {
    sliders.forEach(element => {
        try {
            device.axes[`${element.id}`].set(element.range.default);
        } catch (error) {
            console.log("error setting default range");
        }
    });
}, 1500);

app.get('/', function (req, res) {
    res.render('client.html', { renderedGroups: renderedGroups, configStorage: JSON.stringify(userConfig) });
});

app.get('/config', function (req, res) {
    res.render('config.html');
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
    }, 50);

    res.send(JSON.stringify({ status: 200, id: button.id })); // try res.json() if getList() returns an object or array
});

app.post('/toggle', function (req, res) {
    console.log(req.body);
    let button = {
        id: req.body.id,
        state: req.body.state,
        type: req.body.type
    }

    device.buttons[button.id].set(button.state);
    res.send(JSON.stringify({ status: 200, id: button.id, state: button.state })); // try res.json() if getList() returns an object or array
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

app.post('/hold', function (req, res) {
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

app.post("/refresh", function (req, res) {
    console.log("Site has been refreshed/started up, defaulting buttons");
    device.resetButtons();
    setTimeout(() => {
        sliders.forEach(element => {
            try {
                console.log(`Setting ${element.id} to defined default value ${element.range.default}`)
                device.axes[`${element.id}`].set(element.range.default);
            } catch (error) {
                console.log("error setting default range")
            }
        });
    }, 1500);

});

console.log(`Server running at: ${serverAdress}:${userConfig.general.port}`);