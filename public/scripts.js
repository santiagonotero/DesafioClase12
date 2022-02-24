

let socket = io.connect("http://localhost:8080", { forceNew: true });

//let enviarMsg = document.getElementById('enviarMsg')
let date=new Date()

socket.on("messages", (message)=> {
    let plantillaChat=document.getElementById('plantillaChat').innerHTML
    let compile = Handlebars.compile(plantillaChat)
    let result = compile({message})
    let msgPool=document.getElementById('messagePool')
    msgPool.innerHTML = result
});

socket.on('server:productList', (items)=>{
    let plantilla=document.getElementById('plantillaProductos').innerHTML
    let compile = Handlebars.compile(plantilla)
    let result = compile({items})
    let listado=document.getElementById("listado")
    listado.innerHTML = result
})

addMessage=(e)=>{
    let message={
        author: document.getElementById('userName').value,
        text: document.getElementById('userMessage').value,
        date: date.getDate() +'/' + (date.getMonth() +1) + '/' + date.getFullYear(),
        time: date.getHours()+ ':' + date.getMinutes().toPrecision(2) + ':' + date.getSeconds().toPrecision(2)
    }

    socket.emit('new-message', message)
    return false
}

addProduct=(e)=>{
    let article={
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }

    socket.emit('new-product', article)
    return false
}