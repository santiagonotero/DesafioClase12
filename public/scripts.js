

let socket = io.connect("http://localhost:8080", { forceNew: true });

socket.on("messages", (message)=> {
    //console.log(message);
    let plantillaChat=document.getElementById('plantillaChat').innerHTML
    let compile = Handlebars.compile(plantillaChat)
    let result = compile(message)
    console.log('result: ')
    console.log(result)
    let messagePool=document.getElementById('messagePool')
    messagePool.innerHTML += result
});

socket.on('server:productList', (data)=>{
    console.log('Lista de productos: ' + data)
    let plantilla=document.getElementById('plantillaproductos').innerHTML
    let compile = Handlebars.compile(plantilla)
    let result = compile({data})

    let listado=document.getElementById("listado")
    listado.innerHTML += result
})
