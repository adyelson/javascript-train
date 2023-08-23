var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
const req = require("express/lib/request");
const res = require("express/lib/response");

var app = express();
// var urlencodedParser = bodyParser.urlencoded({extend:false});
let responseJSON;
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extend: false }));
app.use(multer({ dest: "temp" }).single("foto"));

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/pages/")
});

app.get("/processar_dados", (request, response) => {
    // responseJSON = {
    //     nome: request.query.nome,
    //     idade: request.query.idade
    // };
    // response.end(JSON.stringify(responseJSON));
    response.end("Bem-vindo " + request.query.nome + "; Idade: " + request.query.idade);
});

// app.post("/enviar_dados",urlencodedParser, (request, response)=>{
app.post("/enviar_dados", (request, response) => {
    // responseJSON = {
    //     nome: request.body.nome,
    //     idade: request.body.idade
    // };
    // response.end(JSON.stringify(responseJSON));
    response.end("Bem-vindo " + request.body.nome + " ; Idade: " + request.body.idade);
});

app.post("/upload", (request, response) => {
    var file = "public/" + request.file.originalname;
    fs.readFile(request.file.path, (err, data) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                console.log("Erro: " + err);
            } else {
                responseJSON = {
                    nome: request.body.nome,
                    idade: request.body.idade,
                    mensagem: "Upload concluído",
                    arquivo: request.file.originalname
                }
            }
            response.end(JSON.stringify(responseJSON));
        });
    })
});

app.post("/logar", (request, response) => {
    let usuario = request.body.usuario;
    let senha = request.body.senha;

    if (usuario == "admin" && senha == "123") {
        response.sendFile(__dirname +"/pages/dashboard/")
    } else {
        response.end("Senha invalida")
    }
});

app.listen(3000);




// var http = require("http");
// var dt = require("./meumodulo")
// var calc = require("./calculadora")

// var x = 3, y= 4;


// http.createServer(function(requisicao,resposta){
//     resposta.writeHead(200, {'Content-type':'text/html'});
//     resposta.write("<h1>Olá mundo!</h1>" + dt.getDataHora()+"<br>");
//     resposta.write("<h1>Calculadora</h1><br>");
//     resposta.write("x + y" + calc.somar(x,y) + "<br>");
//     resposta.end('Aula node.js');
// }).listen(8080);

