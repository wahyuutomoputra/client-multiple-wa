import axios from 'axios';

export const URL = 'http://10.14.22.67:8080';
export const api = axios.create({
    baseURL: URL,
})