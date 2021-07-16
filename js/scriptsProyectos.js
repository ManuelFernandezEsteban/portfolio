
function mostrarOcultar(ev){
    
    let elementReference=ev.target;
    if (ev.target.nodeName!='SPAN'){
            elementReference=ev.target.parentElement;
    }
    let card = elementReference.parentElement.parentElement;
    if(elementReference.parentElement.classList.contains('card-reveal')){
        
        elementReference.parentElement.parentElement.childNodes[1].style.visibility='visible';
        elementReference.parentElement.parentElement.childNodes[2].style.visibility='collapse';
        elementReference.parentElement.parentElement.childNodes[0].style.visibility='visible';
        //card.style.marginBottom='30px';
    }else{//mostramos el texto y ocultamos la imagen
        
        elementReference.parentElement.parentElement.childNodes[1].style.visibility='collapse';//titulo
        elementReference.parentElement.parentElement.childNodes[2].style.visibility='visible';//datos
        elementReference.parentElement.parentElement.childNodes[0].style.visibility='collapse';//imagen
        //card.style.marginBottom='200px';

        
    }
}

function dibujarProyectos(datos){

    let contenedorTarjeta = document.querySelector('#contenedorProyectos')
    
    for (let i in datos){
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        let imageContent = document.createElement('div');
        imageContent.classList.add('img-card');
        let image = document.createElement('img');
        image.src=datos[i].foto;
        imageContent.appendChild(image);
        let contenidoTarjeta = document.createElement('div');
        contenidoTarjeta.classList.add('card-content');
        let tituloTarjeta = document.createElement('span');
        tituloTarjeta.classList.add('card-title');
        let encabezado= document.createElement('h3');
        encabezado.innerText=datos[i].nombre;        
        tituloTarjeta.appendChild(encabezado);
        let iconoPuntos = document.createElement('i');
        iconoPuntos.classList.add('fas');
        iconoPuntos.classList.add('fa-ellipsis-h');
        tituloTarjeta.appendChild(iconoPuntos);
        tituloTarjeta.addEventListener('click',mostrarOcultar);
        tarjeta.appendChild(imageContent);
        contenidoTarjeta.appendChild(tituloTarjeta);
        tarjeta.appendChild(contenidoTarjeta);
        let datosProyecto = document.createElement('div');
        datosProyecto.classList.add('card-reveal');
        let tituloTarjeta2 = document.createElement('span');
        tituloTarjeta2.classList.add('card-title'); 
        let encabezado2= document.createElement('h3');
        encabezado2.innerText=datos[i].nombre;              
        tituloTarjeta2.appendChild(encabezado2);
        let iconoCross = document.createElement('i');
        iconoCross.classList.add('fas');
        iconoCross.classList.add('fa-times');
        tituloTarjeta2.appendChild(iconoCross);
        tituloTarjeta2.addEventListener('click',mostrarOcultar);
        datosProyecto.appendChild(tituloTarjeta2);
        let hDescripcion=document.createElement('h4');
        hDescripcion.innerText='Descripción';
        datosProyecto.appendChild(hDescripcion);
        let pDescripcion = document.createElement('p');
        pDescripcion.innerHTML=datos[i].descripcion;
        datosProyecto.appendChild(pDescripcion);
        let hTecnologia = document.createElement('h4');
        hTecnologia.innerText='Tecnologías';
        datosProyecto.appendChild(hTecnologia);
        let pTecnologia = document.createElement('p');
        pTecnologia.innerText=datos[i].tecnologia;
        datosProyecto.appendChild(pTecnologia);
        let hDuracion= document.createElement('h4');
        hDuracion.innerText='Duración';
        datosProyecto.appendChild(hDuracion);
        let pDuracion = document.createElement('p');        
        pDuracion.innerText=datos[i].duracion+' semanas';                
        datosProyecto.appendChild(pDuracion);
        tarjeta.appendChild(datosProyecto);
        contenedorTarjeta.appendChild(tarjeta);
    }
    
}

function pintarProyectos() {
    let dataType = "html";

    let datos = "&operacion=traerProyectos";
    
    let url = "php/peticionesProyectos.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {

            let resultado = JSON.parse(data);
            if (resultado.result == "ok") {
                
                dibujarProyectos(resultado.datos);
            }
        },
        error: function () {
            console.log("error");
        },
        dataType: dataType

    });
}