const express = require('express');
const app = express();
const http = require('http').createServer(app);// rever
const serverSocket = require('socket.io')(http);

const porta = 3000;
app.use(express.static('public'));

http.listen(porta, () => {
    console.log("servidor iniciado.")
})

app.get('/', (req, resp) => {
    resp.sendFile(__dirname + '/');
})

serverSocket.on('connection', receberConexaoUsuario)

function receberConexaoUsuario(socket) {
    socket.on('login', (nickname)=> registraLoginUsuario(socket, nickname))
    socket.on('chat msg',(mensagem)=> registraMsgUsuario(socket, mensagem))
    socket.on('disconnect', ()=>console.log('cliente desconectado ' + socket.nickname))
    socket.on('status', (mensagem)=>registraStatusDigitando(socket, mensagem))
}

function registraLoginUsuario(socket, nickname) {
    console.log("cliente conectado: " + nickname);
    serverSocket.emit('chat msg', "Usuário " + nickname + " conectou");
    socket.nickname = nickname;
}

function registraMsgUsuario(socket,mensagem) {
    console.log(`Msg recbida do cliente ${socket.nickname}: ${mensagem}`);
    serverSocket.emit('chat msg', `${socket.nickname}: ${mensagem}`);
}

function registraStatusDigitando(socket,mensagem) {
    socket.broadcast.emit('status', mensagem);
}
