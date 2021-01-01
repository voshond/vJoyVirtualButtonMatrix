# vJoyVirtualButtonMatrix
a simple browser based tool to create and control a vjoy Device and provide an interface for LAN usage.

#### know issues:

1): Error on Startup:
`WARNING: The installed version (537) of vJoy is older than the SDK this library was built against (545). If you run into problems, please update your vJoy installation.` is due to the vJoy installation being the official build. However the node package used (https://github.com/jangxx/node-vjoy) is using this fork of vJoy: https://github.com/njz3/vJoy i am using the official build with no errors in operation so far. This is due Joystick Gremlin not being able to cope with njz3's build.
