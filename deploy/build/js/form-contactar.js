const nombre = document.querySelector('#nombre');
const correo = document.querySelector('#correo');
const telefono = document.querySelector('#telefono');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('.formulario-contratar');
const contenedorFormulario = document.querySelector('.contenedor-formulario');
const boton = document.querySelector('.boton-contratar');
const botonServicio = document.querySelectorAll('.boton-contratar-servicio button');
const contenedorServicio = document.querySelector('.contenedor-formulario-contratar');
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nombreER = new RegExp('^[a-zA-Z Ñ-ñ]+$');
const body1 = document.querySelector('body');
const btnCerrar = document.querySelector('.boton-cerrar');
const contenedorMsj = document.querySelector('.contenedor-mensajes');


export function iniciarApp() {
    boton.disabled = true;
    boton.classList.add('boton-deshabilitado');
}

export function eventosFormulario() {
    nombre.addEventListener('blur', validarFormulario);
    correo.addEventListener('blur', validarFormulario);
    telefono.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    formulario.addEventListener('submit',enviarEmail);
}

function validarFormulario(e) {
    
    if(nombre.value === ''){
        eliminarMensajesError();
        mensajeUsuario(nombre, 'error', 'El nombre no debe ir vacio');
      

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
    contenedorFormulario.reset();
     iniciarApp();
     
  },2500);
  
}

function mensajeUsuario(input, tipo = '', mensaje = '') {
    const errores = document.querySelectorAll('.msj-error');
    const msjExito = document.createElement('p');
    const msjError = document.createElement('p');
    msjError.classList.add('msj-error');
    msjError.textContent = mensaje;
 
    if (tipo === 'error') {
        input.style.borderBottom = "2px solid #ff3333";

          if(errores.length === 0){
             contenedorMsj.appendChild(msjError);
       }

    }else if(tipo === 'valido'){

        input.removeAttribute("style");
        input.style.borderBottom = "2px solid #22bb33";
    }

    if(tipo === 'enviar'){
        msjExito.classList.add('mensaje-valido');
        contenedorMsj.appendChild(msjExito);
        msjExito.textContent = mensaje;

        setTimeout(()=>{
            msjExito.remove();
        },2000);
    }
    
}

function eliminarMensajesError(){
    const error = document.querySelector('p.msj-error');

    if(error){
        error.remove();
    }
}


export function addEventoBoton(){
    botonServicio.forEach(btnServicio =>{
        btnServicio.addEventListener('click', ()=>{
            mostrarServicio();
        });
    });
}

function mostrarMjsError(){
    msjError.classList.remove('ocultar-mensaje');
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



