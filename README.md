# vJoyVirtualButtonMatrix

a simple browser based tool to create and control a vjoy Device and provide an interface for LAN usage.

#### know issues:

1): Error on Startup:
`WARNING: The installed version (537) of vJoy is older than the SDK this library was built against (545). If you run into problems, please update your vJoy installation.` is due to the vJoy installation being the official build. However the node package used (https://github.com/jangxx/node-vjoy) is using this fork of vJoy: https://github.com/njz3/vJoy i am using the official build with no errors in operation so far. This is due Joystick Gremlin not being able to cope with njz3's build.

#### pre-setup-guide:

1. download node.js https://nodejs.org/en/download/
2. **download vJoy https://github.com/shauleiz/vJoy/releases
3. `npm install -g windows-build-tools` in order to build the vJoy nodejs wrapper as seen on https://github.com/jangxx/node-vjoy

**WARNING: if you use joystick gremlin, you may need to use an outdated library http://vjoystick.sourceforge.net/site/index.php/download-a-install/download


#### setup-guide:

1. clone the project
2. navigate to the folder of the project
3. install all the dependencies with `npm install`
4. copy the `sample-user-config.json` from the samples folder into the root folder of the project and then rename the file to `user-config.json`
5. start the server with `node server.js`
6. visit the server from any device that is in the same local network on your specified port. it should show the current ip&port, as long as it is wired. i havn't put much effort to check this for each network configuration. 

#### styling:

the style of the project is done with https://tailwindcss.com/docs/ as such all buttons shape and color can be configured with tailwind classes.

#### user-config:

```
"general": {
        "defaultButtonRangeStart": 61,
        "defaultButtonRangeEnd": 65,
        "port": 3000
    },
    "vJoy": {
        "deviceId": 10
    },
    "default": {
        "id": "",
        "type": "button",
        "content": "Button",
        "group": "Default",
        "style": {
            "background-color": "",
            "color": ""
        },
        "class": "rounded-lg bg-gray-300 h-24 p-2 text-md font-bold font-sans"
    },
    "customInputs": [...]
    }
```

here is the basic shape of a user-config.json file

##### general:

`defaultButtonRangeStart, defaultButtonRangeEnd`:
If you have no desire for custom inputs methods and you just need simple, singlepress buttons you can define the range of buttons to be created, based on the `default` template on the user-config

in the sample it starts at button 61 and ends with button 65, which each numbers being the ID pressed on the vJoy device. Each ID must be present on the vJoy device

`port`: the port the server will run on

##### vJoy:

`deviceId` the vJoy device to control

##### default:

`type`: defines the default behavior, only works with `button`, `hold` and `toggle` types
`content`: label infront of the number
`group`: Name of the default group
`style`: ability to change the `color` and `background-color`, tested with hex-colors
`class`: define the tailwind classes to be applied

#### input types:

`button`: simple single press button, released after `25ms`
`hold`: hold the button for `300ms` before released
`toggle`: engages the button until pressed again
`slider`: sets the slider from a range from `1` to the user-config defined max (max from vjoy is `32768`)

#### macros and indicators:

in the customInputs buttons the user can define if the button will trigger `sequence` and `subcontrol`

```
{
    "id": 1,
    "type": "button",
    "content": "Flight Ready",
    "group": "Default",
    "style": {
        "background-color": "#72192E",
        "color": "#ffffff"
    },
    "class": "rounded-lg bg-white h-24 p-2 text-md font-bold font-sans",
    "subcontrol": [
        {
            "id": 3,
            "type": "toggle"
        },
        {
            "id": 4,
            "type": "toggle"
        },
        {
            "id": 5,
            "type": "toggle"
        }
    ],
    "sequence": [
        {
            "id": "Slider0",
            "type": "slider",
            "value": 10450
        }
    ]
}
```

`subcontrol`:
as shown in this example the button `1` would toggle the subcontrol with the id of 3, 4 and 5, enabling their toggle state. This is because for example in Star citizen, when going into flight ready, power to certain systems are automatically triggered without user input. to give the user a visual indication, these are visual states are triggered, **without sending actual input**

`sequence`:
as shown in the example the press of the button `1` would trigger `Slider0` with the value of `10450`. the `type` needs to be defined so the logic knows the behavior of the button to be pressed.

#### development recommendations:

start the server with nodemon
1. `npm install -g nodemon`
2. `nodemon server.js`

this way you can make changes to the code as you wish and nodemon will watch all changes to the css, js and html files in this project.