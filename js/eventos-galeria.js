const imagenes = document.querySelectorAll('.img-galeria');
//const imagenesLight = document.querySelector('.agregar-imagen');
const textoLight = document.querySelector('.agregar-texto');
const contenedorLight = document.querySelector('.imagen-light');
const imagenGrande = document.querySelector('.imagen');

imagenes.forEach(imagen =>{
    imagen.addEventListener('click', ()=>{
        aparecerImagen(imagen.getAttribute('src'))
    
    })
})

contenedorLight.addEventListener('click', (e) =>{
    if(e.target !== imagenesLight){
        contenedorLight.classList.remove('show');
       // imagenesLight.classList.remove('showImage');
        textoLight.classList.remove('showImage');
        imagenGrande.classList.remove('showImage')
    }
})

const aparecerImagen = (imagen) =>{
    imagenGrande.src = imagen;
    imagenGrande.classList.add('showImage')
    contenedorLight.classList.add('show');
   // imagenesLight.classList.add('showImage');
    textoLight.classList.add('showImage');
}