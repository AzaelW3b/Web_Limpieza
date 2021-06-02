const botonesMenu = document.querySelectorAll('.botones-cotizacion button');
const contenidoCotizacion = document.querySelectorAll('.contenido-cotizacion');
const listaServicios = document.querySelector('.listado-servicios');
const serviciosIngresados = document.querySelector('.servicios-ingresados');
const totalContenedor = document.querySelector('.total-servicios');
let servicioActivo = null;
const cotizacion ={
    nombre:'',
    telefono:'', 
    correo:'', 
    fecha:'',
    hora:'', 
    servicios:[]
}
document.addEventListener("DOMContentLoaded", () => {
    mostrarServicio();
    cambioSeccion();
  
   
});

function cambioSeccion() {

    botonesMenu.forEach(boton => {
        boton.addEventListener('click', (e) => {

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
        });

    });

}


async function mostrarServicio() {
    try{
        const resultado = await fetch('./src/js/servicios.json');
        const datos = await resultado.json();
        const { servicios } = datos;
    
        servicios.forEach(servicio => {
            const {id, precio, nombre, dias } = servicio;
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
    
            const divServicios = document.createElement('div');
            divServicios.classList.add('servicio-cotizacion');
            divServicios.dataset.idServicio = id;
            listaServicios.appendChild(divServicios);
            divServicios.appendChild(precioServicio);
            divServicios.appendChild(nombreServicio);
            divServicios.appendChild(detallesServicio);
            divServicios.appendChild(diasServicio);

        });
         //seleccionamos todos los servicios creados con js con la clase .servicio-cotizacion
        const serviciosArray = document.querySelectorAll('.listado-servicios .servicio-cotizacion');
        seleccionarServicio(serviciosArray);

        
        
      
    }catch(error){
        const parrafoError = document.createElement('p');
        parrafoError.classList.add('no-disponible');
        parrafoError.textContent = 'De momento no hay servicios disponibles, vuelva pronto.';
        listaServicios.appendChild(parrafoError);
    }
   
}

function seleccionarServicio(servicio) {
    let contadorServicios = 0;
    const numeroServicios = document.querySelector('.numero-ingresados');

    servicio.forEach(servicioSeleccionado =>{
        servicioSeleccionado.addEventListener('click',()=>{
                servicioSeleccionado.classList.toggle('servicio-click');
                if(servicioSeleccionado.classList.contains('servicio-click')){
                    contadorServicios++;
                    numeroServicios.textContent = contadorServicios;
                    const servicioObj = {
                        id: parseInt(servicioSeleccionado.dataset.idServicio),
                        precio: servicioSeleccionado.firstElementChild.textContent,
                        nombre: servicioSeleccionado.firstElementChild.nextElementSibling.textContent
                    }
              
                    agregarServicioTicket(servicioObj);
                    sumarPrecios();
                    serviciosAcumulados();
                }else{
                    const id = parseInt(servicioSeleccionado.dataset.idServicio);
                    eliminarServicio(id);
                    contadorServicios--;
                    restarPrecios();
                    numeroServicios.textContent = contadorServicios;

                   if(contadorServicios === 0){
                    while(totalContenedor.firstElementChild.nextElementSibling){
                        totalContenedor.removeChild(totalContenedor.firstElementChild.nextElementSibling);
                    }
                   }
                   
                }
        });
    });
   
}

function  agregarServicioTicket(servicioObj) {
    const {servicios} = cotizacion;
    cotizacion.servicios = [...servicios, servicioObj];
    
    //limpia el html previo, ya que el contenido se repetia
    while(serviciosIngresados.firstElementChild.nextElementSibling){
        serviciosIngresados.removeChild(serviciosIngresados.firstElementChild.nextElementSibling);
    }

    cotizacion.servicios.forEach(servicio=>{       
        const {nombre, precio} = servicio;
        const pServicioIngresado = document.createElement('p');
        pServicioIngresado.classList.add('servicio-seleccionado');
        pServicioIngresado.innerHTML = `${nombre} <span>${precio}</span>`;
        serviciosIngresados.appendChild(pServicioIngresado);
    });
   
}

function eliminarServicio(id){
    const {servicios} = cotizacion;

    cotizacion.servicios = servicios.filter(servicio => servicio.id !== id);
    while(serviciosIngresados.firstElementChild.nextElementSibling){
        serviciosIngresados.removeChild(serviciosIngresados.firstElementChild.nextElementSibling);
    }
    cotizacion.servicios.forEach(servicioRestante =>{
        const {nombre, precio} = servicioRestante;
        const parrafoEliminado = document.createElement('p');
        parrafoEliminado.classList.add('servicio-seleccionado');
        parrafoEliminado.innerHTML = `${nombre} <span>${precio}</span>`;
        serviciosIngresados.appendChild(parrafoEliminado);
        
       

    });
}

function sumarPrecios(){
    const {servicios} = cotizacion;
    
    let suma = 0;
    servicios.forEach(servicio =>{
    
  
    const totalTexto = document.createElement('p');
    const totalSpan = document.createElement('span');

    while(totalContenedor.firstElementChild){
        totalContenedor.removeChild(totalContenedor.firstElementChild);
    }
       totalTexto.textContent = 'Total:';
       const precioActual = servicio.precio.split("$");
       suma+=parseInt(precioActual[1].trim());
       totalSpan.classList.add('suma-total');
       totalSpan.innerHTML = `$${suma}`;
       totalContenedor.appendChild(totalTexto);
       totalContenedor.appendChild(totalSpan);
       
    });
}

function restarPrecios(){
    const {servicios} = cotizacion;
   
   
    let resta = 0;
    servicios.forEach(servicio =>{
    
    const totalContenedor = document.querySelector('.total-servicios');
    const totalTexto = document.createElement('p');
    const totalSpan = document.createElement('span');
    while(totalContenedor.firstElementChild){
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

//Validacion formulario
function validacionFormulario(){
    const nombre = document

}