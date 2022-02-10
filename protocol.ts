export type SerialMessage = {
    method: string;
    url: string;
    body?: object;
}


export type DecodedJSON = {
    uid: string;
    message: string;
}
