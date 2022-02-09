import axios from "axios";
import { SerialMessage } from "./protocol";
import { initParser } from "./serialport";

async function dispatch(data: string) {
    try {
        const serialMessage: SerialMessage = JSON.parse(JSON.parse(data));
        switch (serialMessage.method) {
            case "POST": {
                const response = await axios.post(serialMessage.url, serialMessage.body);
                return JSON.stringify(response.data); 
            };
            case "GET": {
                const response = await axios.get(serialMessage.url);
                return JSON.stringify(response.data); 
            }
            default:
                throw new Error('Method not allowed');
        }
    } catch (error) {
        // Ignoring message
        throw new Error('Bad request');
    }
}

function main() {
    initParser(dispatch);
}

main();