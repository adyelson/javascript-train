const express = require('express');
const app = express();
const http = require('http').Server(app);// rever

const serverSocket = require('socket.io')(http);
const porta = 3000;

app.use(express.static('public'));

http.listen(porta, () => {
    console.log("servidor iniciado.")
})


app.get('/', (req, resp) => {
    resp.sendFile(__dirname + '/');
})


serverSocket.on('connection', (socket) => {

    socket.on('login', (nickname) => {
        console.log("cliente conectado: " + nickname);
        serverSocket.emit('chat msg', "Usuário " + nickname + " conectou");
        socket.nickname = nickname;
    })


    socket.on('chat msg', (mensagem) => {
        console.log(`Msg recbida do cliente ${socket.nickname}: ${mensagem}`);
        serverSocket.emit('chat msg', `${socket.nickname}: ${mensagem}`);
    })

    socket.on('status', (mensagem) => {
        socket.broadcast.emit('status', mensagem);
    })
})