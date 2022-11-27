const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const PORT = 8080

const products = []
const mensajes = []

io.on('connection', socket => {
    console.log("Nuevo cliente conectado")

    //Productos

    socket.emit("productsList", products)

    socket.on("new product", data=>{
        products.push(data)


        io.sockets.emit('productsList', products)
    })

    //Mensajes

    socket.emit("mensajes", mensajes)

    socket.on("new message", data =>{
        mensajes.push(data)

        io.sockets.emit('mensajes', mensajes)
    })
});





const Server = httpServer.listen(PORT, () => {
    console.log(`Server running on Port ${Server.address().port}`)
})
Server.on('error', error => console.log(`Error en servidor ${error}`))