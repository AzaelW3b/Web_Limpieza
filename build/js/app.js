document.addEventListener('DOMContentLoaded', ()=>{

	ObservarSeccion();
	actualizacionAnio();
	

});


//Mostrar video
const video = document.querySelector('.video');
const body = document.querySelector('body');

function ObservarSeccion(){

    const observar = new IntersectionObserver(entries =>{

        if(entries[0].isIntersecting){
            mostrarVideo();
        }
    });

    observar.observe(document.querySelector('.boton-info-nosotros'));
}

function mostrarVideo(){

    const divVideo = document.createElement('div');
    
    video.classList.remove('ocultar');
    divVideo.appendChild(video);
    divVideo.classList.add('pantallaCompleta');
    body.classList.add('fijar-body');
    body.appendChild(divVideo);
    btnCerrarVideo(divVideo);
}

function btnCerrarVideo(divVideo){
    const btnCerrar = document.createElement('p');
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    divVideo.appendChild(btnCerrar);

     btnCerrar.onclick = function(){
        divVideo.remove();
        body.classList.remove('fijar-body');
     }
     divVideo.onclick = function(){
         divVideo.remove();
         body.classList.remove('fijar-body');
     }
}
