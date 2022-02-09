import { initParser } from "./serialport";

function dispatch(data: any) {
    console.log(data);
}

function main() {
    initParser(dispatch);
}

main();