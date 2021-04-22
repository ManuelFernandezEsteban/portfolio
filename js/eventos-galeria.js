
function iniciarGaleria(){
    const imagenes = document.querySelectorAll('.img-galeria');
    //const imagenesLight = document.querySelector('.agregar-imagen');
    const textoLight = document.querySelector('.agregar-texto');
    const contenedorLight = document.querySelector('.imagen-light');
    const imagenGrande = document.querySelector('.imagenGaleria');
    const descripcion = document.querySelector('.agregar-texto p');
    const encabezado = document.querySelector('.agregar-texto h1');
    var fotosPeluqueria;
    var request;
    cargarFotos();


    imagenes.forEach(imagen => {
        imagen.addEventListener('click', () => {
            aparecerImagen(imagen)

        })
    })

    contenedorLight.addEventListener('click', (e) => {
        if (e.target !== imagenGrande) {
            contenedorLight.classList.remove('show');
            // imagenesLight.classList.remove('showImage');
            textoLight.classList.remove('showImage');
            imagenGrande.classList.remove('showImage')
        }
    })

    const aparecerImagen = (imagen) => {
        imagenGrande.src = imagen.getAttribute('src');
        imagenGrande.classList.add('showImage')
        contenedorLight.classList.add('show');
        // imagenesLight.classList.add('showImage');
        textoLight.classList.add('showImage');
        console.log(imagen)
        descripcion.innerHTML = fotosPeluqueria[imagen.getAttribute('numero')].descripcion;
        encabezado.innerHTML = fotosPeluqueria[imagen.getAttribute('numero')].titulo;
    }

    function cargarFotos() {
        fetch("json/peluqueria.json")
        .then(response=>response.json())
        .then(data=>{
            var objetoFotos=data;
            fotosPeluqueria=data;
            console.log(objetoFotos);
            var limite = 0;
            if (objetoFotos.length > imagenes.length) {
                limite = imagenes.length - 1;
            }
            else {
                limite = objetoFotos.length - 1;
            }
            console.log(limite);
            for (var i = 0; i <= limite; i++) {
                imagenes[i].setAttribute('src', objetoFotos[i].src);
                imagenes[i].setAttribute('numero', i);
                console.log(imagenes[i]);
            }
        })
    }

}