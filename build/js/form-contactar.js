const nombre = document.querySelector('#nombre');
const correo = document.querySelector('#correo');
const telefono = document.querySelector('#telefono');
const servicio = document.querySelector('#servicio');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('.formulario-contratar');
const boton = document.querySelector('.boton-contratar');
const botonServicio = document.querySelectorAll('.boton-contratar-servicio button');
const contenedorServicio = document.querySelector('.contenedor-formulario-contratar');
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nombreER = new RegExp('^[a-zA-Z Ñ-ñ]+$');
const body1 = document.querySelector('body');
const btnCerrar = document.querySelector('.boton-cerrar p');

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
    eventosFormulario();
    addEventoBoton();
});

function iniciarApp() {
    boton.disabled = true;
    boton.classList.add('boton-deshabilitado');
}

function eventosFormulario() {
    nombre.addEventListener('blur', validarFormulario);
    correo.addEventListener('blur', validarFormulario);
    telefono.addEventListener('blur', validarFormulario);
    servicio.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    formulario.addEventListener('submit',enviarEmail);
}

function validarFormulario(e) {
   

    if(nombre.value === ''){
        eliminarMensajesError();
        mensajeUsuario(nombre,'error','El nombre no debe ir vacio');

    }else if(!nombreER.test(nombre.value)){
        eliminarMensajesError();
        mensajeUsuario(nombre,'error',`El nombre ${nombre.value} es invalido, el nombre solo debe incluir letras`);
       
    }else{
        eliminarMensajesError();
        mensajeUsuario(nombre,'valido');
    }

    if (e.target.type === 'email') {
        eliminarMensajesError();

        if (expresionRegular.test(e.target.value)) {
            eliminarMensajesError();
            mensajeUsuario(correo, 'valido');
        } else {
            eliminarMensajesError();
            mensajeUsuario(correo, 'error','El correo debe incluir un "@" y un dominio valido');
        }

    }

    if (e.target.type === 'tel') {
        eliminarMensajesError();
        if (isNaN(telefono.value) || telefono.value.length < 10) {
            eliminarMensajesError();
            console.log('Debes ingresar solo numeros');
            mensajeUsuario(telefono, 'error', 'El numero de telefono debe incluir solo numeros e incluir minimo diez caracteres');
        } else {
            eliminarMensajesError();
            mensajeUsuario(telefono, 'valido');
        }
    }

    if (e.target.type === 'textarea') {
        eliminarMensajesError();
        if (e.target.value === '') {
            eliminarMensajesError();
            mensajeUsuario(mensaje,'error','Este campo no debe ir vacio');
        }else{
            eliminarMensajesError();
            mensajeUsuario(mensaje,'valido');
        }
    }
    
    camposValidados();
}

function camposValidados(){

   if(expresionRegular.test(correo.value) === true && !nombreER.test(nombre.value) === false && mensaje.value !== '' && (telefono.value !== '' && telefono.value.length >= 10)){
      boton.disabled = false;
      boton.classList.remove('boton-deshabilitado');
      
      
   }else{
    iniciarApp();
   }
}
function limpiarInputs(){
    const AllInput = document.querySelectorAll('.input-form');
    
    AllInput.forEach(input =>{  
        input.removeAttribute("style");
    });
}

function enviarEmail(e){

  e.preventDefault();
  mensajeUsuario(boton,'enviar','Su mensaje se a enviado con exito!');
  setTimeout(()=>{
    limpiarInputs();
    formulario.reset();
     iniciarApp();
     
  },2500);
  
}

function mensajeUsuario(input, tipo = '', mensaje = '') {
    const parrafo = document.createElement('p');
    const errores = document.querySelectorAll('.mensaje-error');
    parrafo.textContent = mensaje;
    parrafo.classList.add('mensaje-error');

    if (tipo === 'error') {
        input.style.border = "2px solid #ff3333";

       if(errores.length === 0){
            formulario.appendChild(parrafo);
       }

    }else if(tipo === 'valido'){

        input.removeAttribute("style");
        input.style.border = "2px solid #22bb33";
    }

    if(tipo === 'enviar'){
        parrafo.classList.add('mensaje-valido');
        formulario.appendChild(parrafo);

        setTimeout(()=>{
            parrafo.remove();
        },2000);
    }
    
}

function eliminarMensajesError(){
    const error = document.querySelector('p.mensaje-error');

    if(error){
        error.remove();
    }
}


function addEventoBoton(){
    botonServicio.forEach(btnServicio =>{
        btnServicio.addEventListener('click', ()=>{
            mostrarServicio();
        });
    });
}

function mostrarServicio(){
    const nuevoDiv = document.createElement('nuevoDiv');
    formulario.classList.remove('ocultar-formulario');
    nuevoDiv.appendChild(formulario);
    nuevoDiv.classList.add('pantallaCompleta');
    body1.classList.add('fijar-body');
    body1.appendChild(nuevoDiv);

    btnCerrar.onclick = function(){
        nuevoDiv.remove();
        formulario.classList.add('ocultar-formulario');
        body1.classList.remove('fijar-body');
     }
}

