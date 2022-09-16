let formulario = document.getElementById("contacto");
let nombreContacto = document.getElementById("nombreContacto");
let errorNombre = document.getElementById("errorNombre");
let emailContacto = document.getElementById("emailContacto");
let errorEmail = document.getElementById("errorEmail");
let mensajeContacto = document.getElementById("mensajeContacto");
let errorMensaje = document.getElementById("errorMensaje");

formulario.addEventListener("submit", validarFormulario);


//FORMULARIO DE CONTACTO

async function validarFormulario(e){
e.preventDefault();

const form = new FormData(this);
const respuesta = await fetch(this.action, {
    method: this.method,
    body: form,
    headers: {
        "Accept": "application/json"
    }
})
validarInputsSubmit();
    if(respuesta.ok) {
    this.reset()
    Toastify({
        text: "¡Mensaje enviado! Nos contactaremos lo mas pronto posible",
        duration: 3000,
        position: 'center',
        className: "toastPersonalizado",
        style: {
        background: "#F2FF8D",
        }
        }).showToast();
}
}

function validarInputsSubmit() {
!nombreContacto.value? nombreContacto.placeholder = "❌ Nombre obligatorio": "";
!emailContacto.value? emailContacto.placeholder = "❌ Email obligatorio": "";
!mensajeContacto.value? mensajeContacto.placeholder = "❌ Mensaje obligatorio": "";
nombreContacto.addEventListener("input", () => {
    !nombreContacto.value? nombreContacto.placeholder = "❌ Nombre obligatorio": !isNaN(nombreContacto.value)? errorNombre.innerText = "❌ El nombre no puede ser un número": errorNombre.innerText = "";
})
emailContacto.addEventListener("input", () => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    !emailContacto.value? emailContacto.placeholder = "❌ Email obligatorio": !emailContacto.value.match(validRegex)? errorEmail.innerText = "❌ Ingrese una casilla válida(nombre@casilla)": errorEmail.innerText = "";
})
mensajeContacto.addEventListener("input", () => {
    !mensajeContacto.value? mensajeContacto.placeholder = "❌ Mensaje obligatorio": "";
})
}


(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')

  // Envio de info
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        }

        form.classList.add('was-validated')
    }, false)
    })
})()