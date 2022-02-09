import SerialPort from "serialport";

const ReadLine = SerialPort.parsers.Readline;

const serialPort = new SerialPort("/dev/ttyACM0", {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    autoOpen: false,
});

const readln = new ReadLine({
    delimiter: "\n",
    encoding: "ascii",
    includeDelimiter: false,
});

const parser = serialPort.pipe(readln);


serialPort.on("error", (err: any) => {
    console.log("Error: " + err.message);
    process.exit(1);
});

serialPort.on("close", () => {
    console.log("Serial port closed");
    process.exit(0);
});

export function initParser(callback: (data: any) => void) {
    serialPort.open(() => {
        console.log("Port open");
        parser.on('data', (data) => {
            callback(data);
        });
    })
}