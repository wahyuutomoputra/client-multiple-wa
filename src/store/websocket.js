import { createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client';

const socket = io('http://127.0.0.1:8080');
const websocket = {
    ws: socket
}

const websocketSlice = createSlice({
    name: 'websocket',
    initialState: websocket
})

socket.on('connect', () => console.log('connected'));
socket.on('disconnect', () => console.log('disconnected'));

export default websocketSlice.reducer;

