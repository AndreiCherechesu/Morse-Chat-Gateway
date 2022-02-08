# Morse Chat Gateway

Morse Chat Gateway is a client application that runs on a PC which is connected via serial to a Micro:bit v2 board.
It is used for acting as a gateway between the board (which does not have networking capabilities) and a web server.

The Morse packets are sent by the board via UART Serial connection to a PC which listens on the exposed char device in
Linux devfs. Then, the packets are unwrapped, interpreted and wrapped in a request, which is sent to the web server.
