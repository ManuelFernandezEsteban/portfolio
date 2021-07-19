const CUERPOINICIAL = 'cuerpoInicio.html';
const XMLNOTICIAS = 'xml/rss.xml';
const REFERENCIAMAIN = $('main');

var fuera = false;
var saludo;
var objetoHttp = null;
let user = null;
let cita = null;


function navega(enlace) {

    REFERENCIAMAIN.load(enlace);
}

function escribirNoticiaSeleccionada(idNoticia) {

    let dataType = "html";
    let datos = "idNoticia=" + idNoticia;
    datos += "&operacion=traerNoticia";
    console.log(datos);

    let url = "php/peticionesNoticias.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,

        success: function (data) {

            let resultado = JSON.parse(data);
            if (resultado.result == "ok") {
                let titular = document.querySelector('#titular');
                let cuerpoNoticia = document.querySelector('#noticia');
                let fecha = document.querySelector('#fecha');
                let cajaNoticiaSeleccionada = document.querySelector('#cajaNoticiaSeleccionada');
                cajaNoticiaSeleccionada.style.display = 'block';
                noticia = new Noticia(idNoticia, resultado.datos[0].fecha, resultado.datos[0].titular, resultado.datos[0].noticia);
                titular.innerHTML = noticia.titular;
                cuerpoNoticia.innerHTML = noticia.noticia;
                fecha.innerHTML = noticia.fecha;
            } else {
                console.log(resultado);
            }
        },

        error: function () {
            console.log("error");
            return null;
        },
        dataType: dataType
    });
}

function mostrarNoticia(ev) {
    console.log(ev.target.parentNode);
    console.log(ev.target.parentNode.getAttribute('idNoticia'))
    let idNoticia = ev.target.parentNode.getAttribute('idNoticia');
    escribirNoticiaSeleccionada(idNoticia);
    if (screen.width < 768) {
        cerrarPanelNoticias();
    }
}

function escribir(datos) {

    let cajaNoticias = document.querySelector('#cajaNoticias');
    cajaNoticias.innerHTML = '';

    for (let i in datos) {

        let contenidoCajaNoticia = document.createElement('div');
        contenidoCajaNoticia.classList.add('contenido-caja-noticia');
        contenidoCajaNoticia.setAttribute('idNoticia', datos[i].idNoticia);
        let hTitular = document.createElement('h3');
        hTitular.innerText = datos[i].titular;
        hTitular.addEventListener('click', mostrarNoticia);
       /* let dNoticia = document.createElement('div');
        dNoticia.innerHTML = datos[i].noticia;
        let pFecha = document.createElement('div');
        pFecha.innerText = datos[i].fecha;*/
        let separador = document.createElement('div');
        separador.classList.add('separador');
        contenidoCajaNoticia.appendChild(hTitular);
       // contenidoCajaNoticia.appendChild(dNoticia);
      //  contenidoCajaNoticia.appendChild(pFecha);
        contenidoCajaNoticia.appendChild(separador);
        cajaNoticias.appendChild(contenidoCajaNoticia);

    }

}

function escribirNoticia() {

    let dataType = "html";
    let datos = "&operacion=traerCincoUltimasNoticias";
    let url = "php/peticionesNoticias.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {
            let resultado = JSON.parse(data);
            if (resultado.result == "ok") {
                escribir(resultado.datos);
            }
            else {
                console.log(resultado);
            }
        },
        error: function () {
            console.log("error");
        },
        dataType: dataType

    });

}

function mostrarBienvenida() {

    //$('.caja-bienvenida').css('display', 'flex');
    //alert("Bienvenidos a mi PortFolio");
}

function mensaje() {
    mostrarBienvenida();
    clearTimeout(saludo);
}

function iniciar() {

    navega(CUERPOINICIAL);
    if (screen.width > 768) {
        abrirPanelNoticias();
    }
    $('.caja-disparador p').css("align-self", "center");
    $('.noticias').css('flex-grow', '4');  //cualquier otro tamaño          
    $('#cajaNoticias').css('display', 'block');
    if (screen.width < 768) { //tamaño movil        
        $('#contenedor-secundario').css('display', 'block');
    }

    saludo = setTimeout(mensaje, 5000);

}

function resetbtnSubmmit() {

    document.getElementById('btnSubmit').disabled = true;
}

function validar(formularioPresupuesto) {     // valida el formulario de contacto y el de presupuesto

    if (formularioPresupuesto.nombre.value.length == 0) {
        alert("Indique un nombre");
        return false;
    }
    if (formularioPresupuesto.email.value.length == 0) {
        alert("Indique un email");
        return false;
    }
    listacaracteres = /^[_a-z0-9-]+(.[a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
    if (!listacaracteres.test(formularioPresupuesto.email.value)) {
        alert("Debe indicar un email valido");
        return false;
    }
    if (formularioPresupuesto.telefono.value.length == 0) {
        alert("Indique un movil de contacto");
        return false;
    }
    listacaracteres = /^[0-9]{9}$/
    if (!listacaracteres.test(formularioPresupuesto.telefono.value)) {
        alert("Debe indicar un movil valido");
        return false;
    }
    alert("Formulario correcto");
    //formularioPresupuesto.submit();
    return true;
}

function mirarLopd(check) {

    if ($('#lopd').is(':checked')) {
        $('#btnSubmit').prop('disabled', false);
    } else {
        $('#btnSubmit').prop('disabled', true);
    }
}


