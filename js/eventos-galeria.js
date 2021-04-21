
$(document).ready(function(){
    const imagenes = document.querySelectorAll('.img-galeria');
    //const imagenesLight = document.querySelector('.agregar-imagen');
    const textoLight = document.querySelector('.agregar-texto');
    var contenedorLight = document.querySelector('.imagen-light');
    const imagenGrande = document.querySelector('.imagenGaleria');
    const descripcion = document.querySelector('.agregar-texto p');
    const encabezado = document.querySelector('.agregar-texto h1');
    var fotosPeluqueria;



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
        descripcion.innerHTML = fotosPeluqueria[imagen.getAttribute('numero')].descripcion;
        encabezado.innerHTML = fotosPeluqueria[imagen.getAttribute('numero')].titulo;
    }

    function cargarFotos(objetoFotos) {
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
        }

    }

    function traerFotos() {
        const requestURL = "json/peluqueria.json";
        const request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            fotosPeluqueria = request.response;
            cargarFotos(fotosPeluqueria);
        }
    }
})