import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

function ws(cb) {
    socket.on('connection', data => console.log('data'));
}
export default { ws };