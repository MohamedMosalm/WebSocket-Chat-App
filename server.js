import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path, { join } from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('a user connected with socket id = ', socket.id);

  socket.on('chat message', msg => {
    console.log('message: ' + msg);
    io.emit('msgToAllUsers', msg);
  });

  socket.on('typing', () => {
    socket.broadcast.emit('someoneIsTyping', socket.id);
  });

  socket.on('notTyping', () => {
    socket.broadcast.emit('stoppedTyping');
  });
});

server.listen(5000, () => {
  console.log('listenng on http://localhost:5000');
});
