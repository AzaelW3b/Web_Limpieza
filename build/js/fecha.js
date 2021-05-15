document.addEventListener('DOMContentLoaded',()=>{
    actualizacionAnio();
});


const anio = new Date();
const anioActual = anio.getFullYear();

function actualizacionAnio(){
    const contenedorAnio = document.querySelector('#fecha');
    contenedorAnio.textContent = anioActual;
}





