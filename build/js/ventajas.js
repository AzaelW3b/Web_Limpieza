const btnVentaja = document.querySelectorAll('.ventaja');

document.addEventListener('DOMContentLoaded', ()=>{
    mostrarVentaja();
});

function mostrarVentaja(){
    btnVentaja.forEach(ventaja =>{
        ventaja.addEventListener('click', (e)=>{
            e.currentTarget.classList.toggle('activar');


            
        });
    });
}