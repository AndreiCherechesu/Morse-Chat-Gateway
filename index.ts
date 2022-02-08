import SerialPort from "serialport";

const serialPort = new SerialPort("/dev/ttyS10", {
    baudRate: 57600,
});

function main() {
    serialPort.on("open", () => {
        console.log("Serial port opened");
    });

    serialPort.on("data", (data: any) => {
        console.log("Data received: " + data);
    });

    serialPort.on("error", (err: any) => {
        console.log("Error: " + err.message);
    });

    serialPort.on("close", () => {
        console.log("Serial port closed");
    });

}