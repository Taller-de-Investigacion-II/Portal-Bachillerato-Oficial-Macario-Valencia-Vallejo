document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreNosotros = document.querySelector('.sobre-nosotros');
    const body = document.querySelector('body');

    // window.addEventListener('scroll', function() {
    //     //console.log(sobreFestival.getBoundingClientRect());

    //     if( sobreNosotros.getBoundingClientRect().top < 0){
    //         //console.log('Ya te pasaste')
    //         barra.classList.add('fijo');
    //         body.classList.add('body-scroll');
    //     }else{
    //         //console.log('Aun no');
    //         barra.classList.remove('fijo');
    //         body.classList.remove('body-scroll');
    //     }
    // })
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    //iterar enlaces para agregar un eventlistener
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {

            e.preventDefault();
            //console.log(e.target.attributes.href.value)
            const seccionScroll = e.target.attributes.href.value
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behaviour: "smooth"});
        });
    });
}

function  crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    
    for(let i = 1; i<=9; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen galeria${i}">
        `;
        //console.log(imagen);
        imagen.onclick = function () {
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    //console.log('mostrando', id);
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" src="build/img/grande/${id}.jpg" alt="imagen galeria${id}">
    `;

    //Crear el overlay con la imagen
    const overlay = document.createElement('DIV')
    overlay.appendChild(imagen);
    overlay.classList.add('overlay')
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //Boton para cerrar el modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X'
    cerrarModal.classList.add('btn-cerrar');

    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    overlay.appendChild(cerrarModal);

    //Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}