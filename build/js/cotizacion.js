const botonesMenu = document.querySelectorAll('.botones-cotizacion button');
const contenidoCotizacion = document.querySelectorAll('.contenido-cotizacion');
const listaServicios = document.querySelectorAll('.listado-servicios .servicio-cotizacion');
let servicioActivo = null;
document.addEventListener("DOMContentLoaded",()=>{
    
    cambioSeccion();
    seleccionarServicio();
});


function cambioSeccion(){

    botonesMenu.forEach(boton =>{
        boton.addEventListener('click', (e) =>{
           
            botonesMenu.forEach(elemento =>{
                elemento.classList.remove('activo-cotizacion');
            });
            e.currentTarget.classList.toggle('activo-cotizacion');

            servicioActivo = boton.dataset.paso;

            contenidoCotizacion.forEach(contenido=>{
                if(contenido.dataset.paso === servicioActivo){
    
                  contenido.classList.add('cotizacion-activa');
    
                }else{
    
                    contenido.classList.remove('cotizacion-activa');
                }
            });
        });
       
    });
    
}



function seleccionarServicio(){
    let contadorServicios = 0;
    const numeroServicios = document.querySelector('.numero-ingresados');
    
    listaServicios.forEach(servicioSeleccionado=>{
        servicioSeleccionado.addEventListener('click',(e)=>{
           servicioSeleccionado.classList.toggle('servicio-click');

           if(servicioSeleccionado.classList.contains('servicio-click')){
               contadorServicios++;
             
               if(contadorServicios >= 2  || contadorServicios === 0){
                    numeroServicios.innerHTML = `${contadorServicios} servicios`;
               }else{
                numeroServicios.innerHTML = `${contadorServicios} servicio`;
               }
               
           }else{
               contadorServicios--;
                if(contadorServicios >= 2 || contadorServicios === 0 ){
                        numeroServicios.innerHTML = `${contadorServicios} servicios`;
                }else{
                    numeroServicios.innerHTML = `${contadorServicios} servicio`;
                }    
           }
        });
    })
}