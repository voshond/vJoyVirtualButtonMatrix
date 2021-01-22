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
4. copy and modify the user-config.json from the samples folder into the root folder of the project
5 start the server with `node server.js`