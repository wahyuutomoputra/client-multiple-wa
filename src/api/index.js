import axios from 'axios';

export const URL = 'http://localhost:8080';
export const api = axios.create({
    baseURL: URL,
})