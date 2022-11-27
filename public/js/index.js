const socket = io.connect()


//Productos 

const addProducts = ()=>{

    const nombreProducto = document.getElementById("nombre").value
    const precioProducto = document.getElementById("precio").value
    const fotoProducto = document.getElementById("foto").value

    const product = {
        name: nombreProducto,
        price: precioProducto,
        thumbnail: fotoProducto
    }

    socket.emit("new product", product)
}

const formProductos = document.getElementById('formAgregarProducto')

formProductos.addEventListener('submit', e => {
    e.preventDefault()
    addProducts()

})

socket.on("productsList", products =>{
    tableMaker(products)
})

const tableMaker = (products)=>{
    if(products.length > 0){
    let tabla =
       `<h2>Lista de Productos</h2>
        <div class="table-responsive">
        <table class="table table-dark">
           <tr>
               <th>Nombre</th>
               <th>Precio</th>
               <th>Imagen</th>
           </tr>`

    
        products.map((prod)=>{
            tabla +=
            `
            <tr>
                <td>${prod.name}</td>
                <td>${prod.price}</td>
                <td class="imgTable"><img src="${prod.thumbnail}"/></td>
            </tr>
    
            `
        })       
        document.getElementById("tablaProductos").innerHTML = tabla
    }
    
}
                

// Mensajes

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')


const formPublicarMensaje = document.getElementById('formPublicarMensaje')

formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = {
        usuario: inputUsername.value,
        mensaje: inputMensaje.value
    }

    socket.emit("new message", mensaje)


    formPublicarMensaje.reset()
    inputMensaje.focus()
})


socket.on('mensajes', mensajes => {
    const chat = chatMaker(mensajes)

})

const chatMaker = (mensajes)=>{

    let fecha = new Date().toLocaleString()

    const chat = mensajes.map(msj => {
        return (`<div> <strong class="nombreUsuario">${msj.usuario}</strong>: <em class="fechaMsj">[${fecha}]</em> <em class="msjUsuario">${msj.mensaje}</em></div>`)
    }).join(' ')

    document.getElementById('chat').innerHTML = chat;
}











inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})