const contenedorPadre = document.querySelectorAll('.contenedor-padre');

document.addEventListener('DOMContentLoaded', ()=>{

    mostrarParrafos();
});


function mostrarParrafos(){
    contenedorPadre.forEach(contenido =>{
       
        contenido.addEventListener('click',(e)=>{
            //currentTarget se utiliza para eventos de varios elementos
            e.currentTarget.classList.toggle('activar');

            contenedorPadre.forEach(contenidoRepetido =>{
                /*Si el contenido actual, contiene la clase activar
                se la quitamos cuando se de click a otro elemento */
                if(contenidoRepetido !== contenido){
                     contenidoRepetido.classList.remove('activar');
                }
            });
        });
    });
}