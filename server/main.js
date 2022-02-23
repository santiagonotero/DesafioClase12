let chatFile = require('fs')
let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

app.use(express.static("public"));


let messagePool={}

messagePool =JSON.parse(chatFile.readFileSync('./messages/msgPool.json','utf-8'))



io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", {messagePool});
});




server.listen(8080, function () {
    console.log("Servidor corriendo en http://localhost:8080");
  });

