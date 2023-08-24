const socket = io();
socket.nickname = ''
var form = document.getElementById('form');
var msg = document.getElementById('msg');
var statusDiv = document.getElementById('status');

form.addEventListener("submit", submitForm);
socket.on('chat msg', addMensagem)
socket.on('status', statusDigitando)

function submitForm(evt) {
    if (socket.nickname === '') {
        socket.nickname = msg.value;
        socket.emit('login', socket.nickname);
        msg.setAttribute('placeholder', 'Escreva a mensagem...')
        msg.addEventListener("keydown", mostraDigitando)
        msg.addEventListener("keyup", limparDigitando)
    } else {
        socket.emit('chat msg', msg.value);
    }
    msg.value = '';
    evt.preventDefault();
}

function mostraDigitando() {
    socket.emit('status', `${socket.nickname} está digitando...`)
}

function limparDigitando() {
    setTimeout(() => {
        socket.emit('status', ``)
    }, 4000);
}

function addMensagem(mensagem) {
    var liel = document.createElement('li');
    liel.innerHTML = mensagem;
    document.getElementById('mensagens').appendChild(liel);
}

function statusDigitando(mensagem) {
    statusDiv.innerHTML = mensagem;
}
