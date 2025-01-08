const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Вказівка на використання статичних файлів
app.use(express.static('public'));
app.use(express.static('public'));

// Головна сторінка
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Робота з підключеннями клієнтів
io.on('connection', (socket) => {
  console.log('Новий клієнт підключився');

  // Слухати подію 'send message' від клієнта
  socket.on('send message', (msg) => {
    io.emit('receive message', msg); // Відправити всім підключеним клієнтам
  });

  socket.on('disconnect', () => {
    console.log('Клієнт відключився');
  });
});

// Запуск сервера
server.listen(3000, () => {
  console.log('Сервер працює на http://localhost:3000');
});