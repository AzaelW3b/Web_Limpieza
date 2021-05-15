//Seleccionamos el cotenedor de los valores
const btnPlus = document.querySelectorAll('.valor');

document.addEventListener('DOMContentLoaded', ()=>{
    iniciarApp();
});

function iniciarApp(){
    btnPlus.forEach(boton =>{
        boton.addEventListener('click',(e)=>{
          
            e.currentTarget.classList.toggle('activar');
         

            btnPlus.forEach((repetida)=>{
                
                if(boton !== repetida){
                    repetida.classList.remove('activar');
                 
                }
            })
        });
    });
}