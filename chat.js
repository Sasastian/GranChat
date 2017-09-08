var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = 3000;
var usuarios = []; 

app.get('/', function(req, res){
    //request: cabeceras, datos que llegan desde el navegador
    //response: son todo lo que se envia desde el servidor
    res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
    console.log("usuario id: ", socket.id);
    usuarios.push(socket.id);




    socket.on('message', function(msj){
        io.emit('message',msj, socket.id);
    });

    socket.on('disconnect', function(e){
        console.log("DESCONECTADO: ", socket.id)
    });
});

http.listen(PORT, function(){
    console.log('el servidor está listo');
});