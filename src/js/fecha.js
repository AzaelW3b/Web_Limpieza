
const anio = new Date();
const anioActual = anio.getFullYear();

export function actualizacionAnio(){
    const contenedorAnio = document.querySelector('#fecha');
    contenedorAnio.textContent = anioActual;
}





