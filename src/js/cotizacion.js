
const botonesMenu = document.querySelectorAll('.botones-cotizacion button');
const contenidoCotizacion = document.querySelectorAll('.contenido-cotizacion');
const listaServicios = document.querySelector('.listado-servicios');
const serviciosIngresados = document.querySelector('.servicios-ingresados');
const totalContenedor = document.querySelector('.total-servicios');
const servicioCliente = document.querySelector('.servicios-cliente');
const nombre = document.querySelector('#nombre-cotizacion');
const telefono = document.querySelector('#telefono-cotizacion');
const correo = document.querySelector('#correo-cotizacion');
const fecha = document.querySelector('#fecha-cotizacion');
const hora = document.querySelector('#hora-cotizacion');
let servicioActivo = null;
let contadorServicios = 0;
const cotizacion = {
    nombre: '',
    telefono: '',
    correo: '',
    fecha: '',
    hora: '',
    servicios: []
}
document.addEventListener("DOMContentLoaded", () => {
    mostrarServicio();
    cambioSeccion();
    eventosInputs();


});

function cambioSeccion() {

    botonesMenu.forEach(boton => {
        boton.addEventListener('click', (e) => {
            if (contadorServicios === 0) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Debes ingresar un servicio',
                    icon: 'error',
                    confirmButtonText: 'Confirmar'
                })
            } else {
                botonesMenu.forEach(elemento => {
                    elemento.classList.remove('activo-cotizacion');
                });
                e.currentTarget.classList.toggle('activo-cotizacion');
                servicioActivo = boton.dataset.paso;

                contenidoCotizacion.forEach(contenido => {
                    if (contenido.dataset.paso === servicioActivo) {

                        contenido.classList.add('cotizacion-activa');

                    } else {

                        contenido.classList.remove('cotizacion-activa');
                    }
                });
            }

        });

    });

}


async function mostrarServicio() {
    try {
        const resultado = await fetch('./build/js/servicios.json');
        const datos = await resultado.json();
        const { servicios } = datos;

        servicios.forEach((servicio, i) => {
            const { id, precio, nombre, dias } = servicio;
            const precioServicio = document.createElement('p');
            precioServicio.classList.add('precio');
            precioServicio.innerHTML = `<span>$</span> ${precio}`;

            const nombreServicio = document.createElement('p');
            nombreServicio.classList.add('nombre-servicio');
            nombreServicio.textContent = nombre;

            const detallesServicio = document.createElement('p');
            detallesServicio.classList.add('detalles-cotizacion');
            detallesServicio.textContent = '*Incluye productos de higiene y limpieza*';

            const diasServicio = document.createElement('p');
            diasServicio.classList.add('dias-servicio');
            diasServicio.innerHTML = `por <span>${dias} </span>`;

            const imagenServicio = document.createElement('img');
            imagenServicio.src = 'src/img/escoba.png';
            imagenServicio.classList.add('escoba');

            console.log(imagenServicio);

            const divServicios = document.createElement('div');
            divServicios.classList.add('servicio-cotizacion');
            divServicios.dataset.id= 
            divServicios.dataset.idServicio = i;
            listaServicios.appendChild(divServicios);
            divServicios.appendChild(precioServicio);
            divServicios.appendChild(nombreServicio);
            divServicios.appendChild(detallesServicio);
            divServicios.appendChild(diasServicio);
            divServicios.appendChild(imagenServicio);

        });
        //seleccionamos todos los servicios creados con js con la clase .servicio-cotizacion
        const serviciosArray = document.querySelectorAll('.listado-servicios .servicio-cotizacion');
        seleccionarServicio(serviciosArray);




    } catch (error) {
        const parrafoError = document.createElement('p');
        parrafoError.classList.add('no-disponible');
        parrafoError.textContent = 'De momento no hay servicios disponibles, vuelva pronto.';
        listaServicios.appendChild(parrafoError);
    }

}

function seleccionarServicio(servicio) {
    // const mostrarAnimacion = document.querySelector('.escoba'); 
    const numeroServicios = document.querySelector('.numero-ingresados');

    servicio.forEach(servicioSeleccionado => {
        servicioSeleccionado.addEventListener('click', () => {   

            servicioSeleccionado.classList.toggle('servicio-click');
            if (servicioSeleccionado.classList.contains('servicio-click')) {
                // mostrarAnimacion.style.display = 'block';
                // setTimeout(() =>{
                //     mostrarAnimacion.style.display = 'none'
                // },2000);
                contadorServicios++;
                numeroServicios.textContent = contadorServicios;
                const servicioObj = {
                    id: parseInt(servicioSeleccionado.dataset.idServicio),
                    precio: servicioSeleccionado.firstElementChild.textContent,
                    nombre: servicioSeleccionado.firstElementChild.nextElementSibling.textContent
                }
                agregarServicioTicket(servicioObj);
                sumarPrecios();
                



            } else {
                // mostrarAnimacion.style.display = 'none';
                const id = parseInt(servicioSeleccionado.dataset.idServicio);
                eliminarServicio(id);
                contadorServicios--;
                restarPrecios();
                numeroServicios.textContent = contadorServicios;
                if (contadorServicios <= 0) {

                    while (totalContenedor.firstElementChild.nextElementSibling) {
                        totalContenedor.removeChild(totalContenedor.firstElementChild.nextElementSibling);
                    }
                }


            }

        });
    });

}

function agregarServicioTicket(servicioObj) {
    const { servicios} = cotizacion;
    cotizacion.servicios = [...servicios, servicioObj];
     //limpiamos el html previo del contenedor del formulario
     while (servicioCliente.firstElementChild) {
        servicioCliente.removeChild(servicioCliente.firstElementChild);
    }
    //limpia el html previo, ya que el contenido se repetia
    while (serviciosIngresados.firstElementChild.nextElementSibling) {
        serviciosIngresados.removeChild(serviciosIngresados.firstElementChild.nextElementSibling);
    }

   
    cotizacion.servicios.forEach(servicio => {
        const { nombre, precio } = servicio;
        const pServicioIngresado = document.createElement('p');
        const btnBorrar = document.createElement('p');
        const divSeparador = document.createElement('div');
        divSeparador.classList.add('separado-precios');
        btnBorrar.classList.add('btn-borrar');
        btnBorrar.textContent ='x';
        pServicioIngresado.classList.add('servicio-seleccionado');
        pServicioIngresado.innerHTML = `${nombre} <span>${precio}</span>`;
        divSeparador.appendChild(pServicioIngresado);
        divSeparador.appendChild(btnBorrar);
        serviciosIngresados.appendChild(divSeparador);
        borrarBotones(servicio.id,btnBorrar,divSeparador);
        // const id = parseInt(servicio.dataset.idServicio);
       
    });
   
    

}
function borrarBotones(id,btnBorrar,div){
    const {servicios} = cotizacion;
    btnBorrar.addEventListener('click',()=>{
       const eliminado =  servicios.filter(servicio => servicio.id !== id);
       while (div.firstElementChild.nextElementSibling) {
        div.removeChild(div.firstElementChild.nextElementSibling);
    }
    
       eliminado.forEach(serviciosRestantes =>{
            const {nombre, precio} = serviciosRestantes;
            const serviciosSobrantes = document.createElement('p');
            serviciosSobrantes.classList.add('servicio-seleccionado');
            serviciosSobrantes.innerHTML = `${nombre} <span>${precio}</span>`;
            div.appendChild(serviciosSobrantes);
            div.appendChild(btnBorrar);
            

       });
    })

}

function eliminarServicio(id) {

    const { servicios } = cotizacion;

    cotizacion.servicios = servicios.filter(servicio => servicio.id !== id);
    while (serviciosIngresados.firstElementChild.nextElementSibling) {
        serviciosIngresados.removeChild(serviciosIngresados.firstElementChild.nextElementSibling);
    }
    cotizacion.servicios.forEach(servicioRestante => {
        const { nombre, precio } = servicioRestante;
        const parrafoEliminado = document.createElement('p');
        parrafoEliminado.classList.add('servicio-seleccionado');
        parrafoEliminado.innerHTML = `${nombre} <span>${precio}</span>`;
        serviciosIngresados.appendChild(parrafoEliminado);
    });
}

function sumarPrecios() {
    const { servicios } = cotizacion;

    let suma = 0;
    servicios.forEach(servicio => {


        const totalTexto = document.createElement('p');
        const totalSpan = document.createElement('span');

        while (totalContenedor.firstElementChild) {
            totalContenedor.removeChild(totalContenedor.firstElementChild);
        }
        totalTexto.textContent = 'Total:';
        const precioActual = servicio.precio.split("$");
        suma += parseInt(precioActual[1].trim());
        totalSpan.classList.add('suma-total');
        totalSpan.innerHTML = `$${suma}`;
        totalContenedor.appendChild(totalTexto);
        totalContenedor.appendChild(totalSpan);

    });
}

function restarPrecios() {
    const { servicios } = cotizacion;


    let resta = 0;
    servicios.forEach(servicio => {

        const totalContenedor = document.querySelector('.total-servicios');
        const totalTexto = document.createElement('p');
        const totalSpan = document.createElement('span');
        while (totalContenedor.firstElementChild) {
            totalContenedor.removeChild(totalContenedor.firstElementChild);
        }

        totalTexto.textContent = 'Total:';
        const precioActual = servicio.precio.split("$");
        resta -= parseInt(precioActual[1].trim());
        totalSpan.classList.add('suma-total');
        totalSpan.innerHTML = `$${Math.abs(resta)}`;
        totalContenedor.appendChild(totalTexto);
        totalContenedor.appendChild(totalSpan);


    });

}
function eventosInputs(){
    nombre.addEventListener('blur',validarFormulario);
    telefono.addEventListener('blur',validarFormulario);
    correo.addEventListener('blur',validarFormulario);
    
}

function validarFormulario(e){
    
    if(nombre.value === ''){
        console.log('Debe ingresar un nombre valido');
    }else{
        console.log('nombre valido');
    }

    if(e.target.type === 'tel'){
        console.log('si');
    }
}