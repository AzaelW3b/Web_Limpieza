 export function menuHamburguesa(){
	const nav = document.querySelector('#hamburguesa button');
	const navegacionNormal = document.querySelector('.navegacion');
	const enlaces = document.querySelectorAll('.navegacion a');
	const btnMenuMovil = document.querySelector('.menu-movil button');

	nav.addEventListener('click', e =>{
		
		//.toggle, lo que hace es añadir la clase si no esta o desaparecerla si, si lo esta
		nav.classList.toggle('abrir'); 
		navegacionNormal.classList.toggle('abrir');
		
		
	});	
	//cuando en un elemento hay multiples nodos, debemos iterarlo para agregarle un evento
	enlaces.forEach(enlace =>{
		
		enlace.addEventListener('click', e =>{

			if(e.target.tagName === 'A'){
				navegacionNormal.classList.remove('abrir');
				btnMenuMovil.classList.remove('abrir');
			}
		});
	});
	
	
}