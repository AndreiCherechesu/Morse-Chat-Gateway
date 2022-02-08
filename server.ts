import axios from 'axios';
import { Message } from './protocol';

const serverUrl = 'http://localhost:8000';
const messageUrl = `${serverUrl}/messages`;
const usersUrl = `${serverUrl}/users`;

export const sendMessage = async (message: Message) => {
    try {
        const response = await axios.post(messageUrl, message);
        return response.data;
    } catch (err) {
        throw new Error('Failed to send message ' + err);
    }
};

export const getMessages = async (uid: String): Promise<Message[]> => {
    try {
        const response = await axios.get(`${messageUrl}/${uid}`);
        return response.data;
    } catch (err) {
        return [];
    }
}

export const registerUser = async (): Promise<String> => {
    try {
        const response = await axios.post(usersUrl);
        return response.data.id;
    } catch (err) {
        throw new Error('Failed to register user ' + err);
    }
}

