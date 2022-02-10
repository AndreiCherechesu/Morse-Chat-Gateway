import axios from "axios";
import { DecodedJSON, SerialMessage } from "./protocol";
import { initParser } from "./serialport";

async function dispatch(data: string) {
    try {
        console.log("[DEBUG] Am primit: " + data);
        const message: string[] = data.replace(/\s+/g,' ').split(" ")
        const serialMessage: SerialMessage = {
            method: message[0],
            url: message[1],
        }
        // console.log("[DEBUG] " + JSON.stringify(serialMessage, null, 2));

        switch (serialMessage.method) {
            case "POST": {
                serialMessage.body = JSON.parse(message.slice(2).join(" "))
                const response = await axios.post(serialMessage.url, serialMessage.body);
                return JSON.stringify(response.data); 
            };
            case "GET": {
                const response = await axios.get(serialMessage.url);

                if (serialMessage.url.endsWith("/users")) {
                    return `${response.data.id}`
                } else if (serialMessage.url.includes("/messages/")) {
                    return  `${response.data.length},${response.data.map((message: DecodedJSON) => {
                        return `${message.uid},${message.message}`;
                    }).join(' ')}`
                } else {
                    return "Invalid endpoint";
                }
            }
            default:
                throw new Error('Method not allowed');
        }
    } catch (error) {
        // Ignoring message
        // console.log(error);
        throw new Error('Bad request');
    }
}

function main() {
    initParser(dispatch);
}

main();