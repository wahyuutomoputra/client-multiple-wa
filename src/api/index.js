import axios from 'axios';

const BASE_URL = 'localhost:8080';
export const URL = `http://${BASE_URL}`;
export const WS = `ws://${BASE_URL}`;

export const api = axios.create({
    baseURL: URL,
})