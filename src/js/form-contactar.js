// const nombre = document.querySelector('#nombre');
// const correo = document.querySelector('#correo');
// const telefono = document.querySelector('#telefono');
// const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('.formulario-contratar');
// const boton = document.querySelector('.boton-contratar');
const botonServicio = document.querySelectorAll('.boton-contratar-servicio button');
// const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const nombreER = new RegExp('^[a-zA-Z Ñ-ñ]+$');
const body1 = document.querySelector('body');
const btnCerrar = document.querySelector('.boton-cerrar');
const inputs = document.querySelectorAll('.input-form');



iniciarApp();

function iniciarApp(){
    deshabilitarInputs();
}

function deshabilitarInputs (){
    console.log(inputs)
    inputs.forEach(input=>{
        input.addEventListener('submit', (e)=>{
           
        })
    })
}
export function addEventoBoton(){
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



