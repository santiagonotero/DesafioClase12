// >> Consigna 1:  Modificar el último entregable para que disponga de un canal de websocket que permita representar, por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real. 
// Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los productos sin necesidad de recargar la vista.
// Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.

// >> Aspectos a incluir en el entregable:
// Para construir la tabla dinámica con los datos recibidos por websocket utilizar Handlebars en el frontend. Considerar usar archivos públicos para alojar la plantilla vacía, y obtenerla usando la función fetch( ). Recordar que fetch devuelve una promesa.

// >> Consigna 2:  Añadiremos al proyecto un canal de chat entre los clientes y el servidor.

// >> Aspectos a incluir en el entregable:
// En la parte inferior del formulario de ingreso se presentará el centro de mensajes almacenados en el servidor, donde figuren los mensajes de todos los usuarios identificados por su email. 
// El formato a representar será: email (texto negrita en azul) [fecha y hora (DD/MM/YYYY HH:MM:SS)](texto normal en marrón) : mensaje (texto italic en verde) 
// Además incorporar dos elementos de entrada: uno para que el usuario ingrese su email (obligatorio para poder utilizar el chat) y otro para ingresar mensajes y enviarlos mediante un botón. 
// Los mensajes deben persistir en el servidor en un archivo (ver segundo entregable).


let chatFile = require('fs')
let prodFile = require('fs')
let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);

app.use(express.static("public"));

let messagePool={}
let productList={}

messagePool =JSON.parse(chatFile.readFileSync('./messages/msgPool.json','utf-8'))
productList=JSON.parse(prodFile.readFileSync('./Productos/Productos.json', 'utf-8'))

io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado")
  socket.emit("messages", messagePool)
  socket.emit('server:productList', productList)

  socket.on('new-message', (data)=>{
      messagePool.push(data)
      chatFile.writeFileSync('./messages/msgPool.json', JSON.stringify(messagePool), 'utf-8')
      io.sockets.emit("messages", messagePool)
    })

    socket.on('new-product', prodInfo=>{
        console.log(prodInfo)
        productList.push(prodInfo)
        prodFile.writeFileSync('./Productos/Productos.json', JSON.stringify(productList), 'utf-8')
        io.sockets.emit('server:productList', productList)
    })    
    
});


server.listen(8080, function () {
    console.log("Servidor corriendo en http://localhost:8080");
  });

