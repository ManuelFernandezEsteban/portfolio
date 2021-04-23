
function iniciarGaleria() {
    const PELUQUERIA = 'portafolioPeluqueria';
    const OFFBEAT = 'portafolioOffbeat';
    const RUTATRABAJOS = "json/trabajos.json";
    const RESUMENPELUQUERIAH2=document.querySelector("#peluqueria h2");
    const RESUMENPELUQUERIAP=document.querySelector("#peluqueria p");
    const RESUMENOFFBEATH2=document.querySelector("#offbeat h2");
    const RESUMENOFFBEATP=document.querySelector("#offbeat p");
    const imagenesPeluqueria = document.querySelectorAll('#portafolioPeluqueria .img-galeria');
    const imagenesOffbeat = document.querySelectorAll('#portafolioOffbeat .img-galeria');    
    const textoLight = document.querySelector('.agregar-texto');
    const contenedorLight = document.querySelector('.imagen-light');
    const imagenGrande = document.querySelector('.imagenGaleria');
    const descripcion = document.querySelector('.agregar-texto p');
    const encabezado = document.querySelector('.agregar-texto h1');
    var fotosPeluqueria;
    var fotosOffbeat;

    cargarFotos();

    imagenesOffbeat.forEach(imagen => {
        imagen.addEventListener('click', () => {
            aparecerImagen(imagen)

        })
    })

    imagenesPeluqueria.forEach(imagen => {
        imagen.addEventListener('click', () => {
            aparecerImagen(imagen)

        })
    })

    contenedorLight.addEventListener('click', (e) => {
        if (e.target !== imagenGrande) {
            contenedorLight.classList.remove('show');            
            textoLight.classList.remove('showImage');
            imagenGrande.classList.remove('showImage')
        }
    })

    const aparecerImagen = (imagen) => {
        imagenGrande.src = imagen.getAttribute('src');
        var tipo = imagen.getAttribute('trabajo');
        imagenGrande.classList.add('showImage')
        contenedorLight.classList.add('show');        
        textoLight.classList.add('showImage');  
        if (tipo == PELUQUERIA) {
            descripcion.innerHTML = fotosPeluqueria[imagen.getAttribute('numero')].descripcion;
            encabezado.innerHTML = fotosPeluqueria[imagen.getAttribute('numero')].titulo;
        } else {
            descripcion.innerHTML = fotosOffbeat[imagen.getAttribute('numero')].descripcion;
            encabezado.innerHTML = fotosOffbeat[imagen.getAttribute('numero')].titulo;
        }

    }
    

    function cargarFotos() 
    {
        fetch(RUTATRABAJOS)
            .then(response => response.json())
            .then(data => {
                var objetoFotos;
                var trabajo;
                var limite = 0;
              
                for (var j = 0; j <= data.length - 1; j++) {
                    trabajo = data[j].trabajo;
                    objetoFotos = data[j].fotos;
                                      
                    if (trabajo == PELUQUERIA) {//cargo fotos en pluqueria 
                        RESUMENPELUQUERIAH2.innerHTML=data[j].nombre;
                        RESUMENPELUQUERIAP.innerHTML=data[j].descripcion;
                        fotosPeluqueria = objetoFotos;
                        if (objetoFotos.length > imagenesPeluqueria.length) {
                            limite = imagenesPeluqueria.length - 1;
                        }
                        else {
                            limite = objetoFotos.length - 1;
                        }
                       
                        for (var i = 0; i <= limite; i++) {
                            imagenesPeluqueria[i].setAttribute('src', objetoFotos[i].src);
                            imagenesPeluqueria[i].setAttribute('numero', i);
                            imagenesPeluqueria[i].setAttribute('trabajo', trabajo);
                            
                        }
                    }
                    else (trabajo == OFFBEAT) //cargo fotos en offbeat
                    {             
                        RESUMENOFFBEATH2.innerHTML=data[j].nombre;
                        RESUMENOFFBEATP.innerHTML=data[j].descripcion;    
                        fotosOffbeat = objetoFotos;
                        if (objetoFotos.length > imagenesOffbeat.length) {
                            limite = imagenesOffbeat.length - 1;
                        }
                        else {
                            limite = objetoFotos.length - 1;
                        }
                        
                        for (var i = 0; i <= limite; i++) {
                            imagenesOffbeat[i].setAttribute('src', objetoFotos[i].src);
                            imagenesOffbeat[i].setAttribute('numero', i);
                            imagenesOffbeat[i].setAttribute('trabajo', trabajo);
                            
                        }
                    }
                }
            })

    }

}

