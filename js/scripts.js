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

function escribir(datos) {

    

    if (objetoHttp.readyState == 4) {
        var documento = objetoHttp.responseXML;
        var texto = documento.documentElement;
        var cadenaAEscribir = "";
        var i = 0;
        while (i <= 6) {
            cadenaAEscribir = cadenaAEscribir + "<div class=\"contenido-caja-noticia\"><h3>" + texto.getElementsByTagName("item")[i].childNodes[4].firstChild.nodeValue + "</h3>";
            cadenaAEscribir = cadenaAEscribir + "<div>" + texto.getElementsByTagName("item")[i].childNodes[6].firstChild.nodeValue + "</div>";
            cadenaAEscribir = cadenaAEscribir + "<a href=\"" + texto.getElementsByTagName("item")[i].childNodes[2].firstChild.nodeValue + "\" target=\"_blank\">" + texto.getElementsByTagName("item")[i].childNodes[2].firstChild.nodeValue + "</a></div>";
            cadenaAEscribir = cadenaAEscribir + "<div class=\"separador\"></div>"
            i++;
        }
        $("#cajaNoticias").html(cadenaAEscribir);
    }
}

function escribirNoticia() {

    let dataType = "html";

    let datos = "&operacion=traerNoticias";

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
    if (screen.width > 768){
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


