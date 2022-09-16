let carrito = JSON.parse(localStorage.getItem("carrito"))||[];
let productosJSON = [];
let dolarVenta;
let lista


window.onload=()=>{
    lista=document.getElementById("milista");
    document.getElementById("fila_prueba").style.background="#F6EFE7";
    obtenerValorDolar();
};
function renderizarProductos() {
    //renderizamos los productos 
    console.log(productosJSON)
    for (const prod of productosJSON) {
        lista.innerHTML+=(`<li class="col-sm-3 list-group-item">
        <h3>ID: ${prod.id}</h3>
        <img src="${prod.foto}" width="250px" height="450px">
        <p>Producto: ${prod.nombre}</p>
        <p>Precio $ ${prod.precio}</p>
        <p>Precio U$ ${(prod.precio/dolarVenta).toFixed(1)}</p>
        <button class="btn btn-danger" id='btn${prod.id}'>COMPRAR</button>
    </li>`);
    }
    //EVENTOS
    productosJSON.forEach(prod=> {
         //Evento para cada boton
        document.getElementById(`btn${prod.id}`).onclick= function() {
            agregarACarrito(prod);
        };
    });
}


function agregarACarrito(productoNuevo) {
    let encontrado = carrito.find(p => p.id == productoNuevo.id);
    console.log(encontrado);
    if (encontrado == undefined) {
        let prodACarrito = {
            ...productoNuevo,
            cantidad:1
        };
        carrito.push(prodACarrito);
        console.log(carrito);
        Swal.fire(
            'Nuevo producto agregado al carrito',
            productoNuevo.nombre,
            'success'
        );
        //Carrito
        document.getElementById("tablabody").innerHTML+=(`
            <tr id='fila${prodACarrito.id}'>
            <td> ${prodACarrito.id} </td>
            <td> ${prodACarrito.nombre}</td>
            <td id='${prodACarrito.id}'> ${prodACarrito.cantidad}</td>
            <td> ${prodACarrito.precio}</td>
            <td> <button class='btn btn-light' onclick='eliminar(${prodACarrito.id})'>🗑️</button>`);
        } else {
            //el producto ya existe en el carro
            //pido al carro la posicion del producto 
            let posicion = carrito.findIndex(p => p.id == productoNuevo.id);
            console.log(posicion);
            carrito[posicion].cantidad += 1;
            //con querySelector falla
            document.getElementById(productoNuevo.id).innerHTML=carrito[posicion].cantidad;
        }
    //siempre debo recalcular el total
    document.getElementById("gastoTotal").innerText=(`Total: $ ${calcularTotal()}`);
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

function calcularTotal() {
    let suma = 0;
    for (const elemento of carrito) {
        suma = suma + (elemento.precio * elemento.cantidad);
    }
    return suma;
}

function eliminar(id){
    let indice=carrito.findIndex(prod => prod.id==id);
    carrito.splice(indice,1);//eliminando del carro
    let fila=document.getElementById(`fila${id}`);
    document.getElementById("tablabody").removeChild(fila);//eliminando de la tabla
    document.getElementById("gastoTotal").innerText=(`Total: $ ${calcularTotal()}`);
    localStorage.setItem("carrito",JSON.stringify(carrito));
    Swal.fire("Producto eliminado del carro!")
}

//GETJSON de productos.json
async function obtenerJSON() {
    const URLJSON="productos.json"
    const resp=await fetch(URLJSON)
    const data= await resp.json()
    productosJSON = data;
    //ya tengo el dolar y los productos, renderizo las cartas
    renderizarProductos();
}


//function para obtener el valor del dolar blue en tiempo real
async function obtenerValorDolar() {
    const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    const resp=await fetch(URLDOLAR)
    const data=await resp.json()
    document.getElementById("fila_prueba").innerHTML+=(`<p align="center">Dolar compra: $ ${data.compra}  Dolar venta: $ ${data.venta}</p>`);
    dolarVenta = data.venta;
    //ya tengo los datos del dolar, llamo al json
    obtenerJSON();
}

//Finalizar compra
let finalizar=document.getElementById("finalizar");
finalizar.onclick=()=>{
    Swal.fire({
        title: 'Pedido confirmado!',
        text: 'Estamos preparando todo para el envío.',
        imageUrl: '/imgs/compra.png',
        imageWidth: 204,
        imageHeight: 60,
        imageAlt: 'ok',
    });}