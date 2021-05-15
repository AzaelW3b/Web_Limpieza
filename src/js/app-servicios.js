const servicios = document.querySelectorAll('.menu-servicio');
let servicioActivo = null;
const descripcionServicios = document.querySelectorAll('.descripcion-servicio');
document.addEventListener('DOMContentLoaded',()=>{
    agregarAtributoServicios();
});

function agregarAtributoServicios(){

    servicios.forEach(servicio =>{ 
       servicio.addEventListener('click', (e) =>{
           servicios.forEach(elemento =>{
             elemento.classList.remove('servicio-activo');
           });
           //agregamos la clase de servicio-activo, a lo que el usuario le de click
           e.currentTarget.classList.toggle('servicio-activo');
           servicioActivo = servicio.dataset.servicio;


           descripcionServicios.forEach(descripcion =>{
               if(descripcion.dataset.servicio === servicioActivo){
                   descripcion.classList.add('descripcion-activa');
               }else{
                   descripcion.classList.remove('descripcion-activa');
               }
           });

       });  
    });

    
}


