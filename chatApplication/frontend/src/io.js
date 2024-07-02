import io from 'socket.io-client';
const BACKEND = 'localhost:4047/';

let socket;

export default socket = io(BACKEND);