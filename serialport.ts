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

async function handleData(
    data: string,
    callback: (data: any) => Promise<string>
) : Promise<void> {

    try {
        const result = await callback(data);
        serialPort.write(result, (err) => {
            if (err) {
                return console.log("Couldn't write to serial " + err.message);
            }
            console.log("Message written"); 
        });
    } catch (error) {
        console.log(error);
    }
}

export function initParser(callback: (data: any) => Promise<string>) {
    serialPort.open(() => {
        console.log("Port open");
        parser.on('data', async (data) => {
            await handleData(data, callback);
        });
    })
}