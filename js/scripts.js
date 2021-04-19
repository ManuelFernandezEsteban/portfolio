var fuera = false;
var saludo;
var objetoHttp = null;


const CUERPOINICIAL = 'cuerpoInicio.html';
const XMLNOTICIAS = 'xml/rss.xml';
const REFERENCIAMAIN = $('main');

function navega(enlace) {

    REFERENCIAMAIN.load(enlace);

}

function escribir() {
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
    if (window.XMLHttpRequest) {
        objetoHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        objetoHttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    objetoHttp.open("GET", XMLNOTICIAS, true);
    objetoHttp.onreadystatechange = escribir;
    objetoHttp.send(null);

}
function mostrarBienvenida() {
    //$('.caja-bienvenida').css('display', 'flex');
    alert("Bienvenidos a mi PortFolio");
}

function mensaje() {
    mostrarBienvenida();
    clearTimeout(saludo);
}
function iniciar() {

    navega(CUERPOINICIAL);
    $('.caja-disparador p').css("align-self", "center");
    $('.noticias').css('flex-grow', '0');  //cualquier otro tamaño          
    $('#cajaNoticias').css('display', 'none');
    if (screen.width < 768) { //tamaño movil        
        $('#contenedor-secundario').css('display', 'block');
    }
    saludo = setTimeout(mensaje, 5000);

}



$(document).ready(function () {

    iniciar();

    REFERENCIAMAIN.on('click', '.caja-disparador p', function () { //controla el despligue del aside de noticias

        if (fuera) {
            fuera = false;
            $('.caja-disparador p').css("align-self", "center");
            $('.caja-disparador p').css('top', '50%');
            $('.caja-disparador p').css('transform', 'rotate(270deg)');
            $('.noticias').css('flex-grow', '0');  //cualquier otro tamaño    
            $('#cajaNoticias').css('display', 'none');
            if (screen.width < 768) { //tamaño movil
                $('#contenedor-secundario').css('display', 'block');
            }
        }
        else {
            escribirNoticia();
            fuera = true;
            if (screen.width = 768) {//tamaño ipad
                $('.noticias').css('flex-grow', '4');
            }
            if (screen.width < 768) {//tamaño movil                    
                $('#contenedor-secundario').css('display', 'none');
            }

            if (screen.width > 768) {  //tamaño desktop                                   
                $('.noticias').css('flex-grow', '3');
            }
            if (screen.width > 1200) {  //tamaño desktop                                   
                $('.noticias').css('flex-grow', '2');
            }
            $('#cajaNoticias').css('display', 'block');
            $('#cajaNoticias').css('padding-top', '0px');
            $('.caja-disparador p').css('align-self', 'start');
            $('.caja-disparador p').css('top', '0');
            $('.caja-disparador p').css('transform', 'rotate(0deg)');
            console.log(REFERENCIAMAIN.children());

        }
    })
    $('#boton-bienvenida').on('click', function () {
        $('.caja-bienvenida').css('display', 'none');
    });

    $('.caja-logo a').on('click', function (event) {
        event.preventDefault();
        let destino = ($(this).attr('href'));
        console.log(destino);
        navega(destino);
    });

    $('.menu-enlace').on('click', function (event) {
        event.preventDefault();
        let destino = ($(this).attr('href'));
        $('.seleccionado').removeClass('seleccionado');
        $(this).addClass('seleccionado');
        $('#opcion').empty();
        switch (destino) {
            case "cuerpoInicio.html":                
                $('#opcion').append("Home");
                break;
            case "cuerpoPortfolio.html":                
                $('#opcion').append("Portfolio");
                break;
            case "cuerpoContacto.html":                
                $('#opcion').append("Contacto");
                break;
            case "cuerpoPresupuesto.html":                
                $('#opcion').append("Presupuesto");
                break;
                                
            default:                
                $('#opcion').append("Home");
                break;
        }
        
       // $('.menuresponsive ul').css('display','none');
        $('.menuresponsive').children('input').prop('checked',false);
        console.log($('.menuresponsive').children('input'));
        navega(destino);
    });
   

    $(window).resize(function () {//cerramos el panel de noticias
        if (fuera) {
            fuera = false;
            $('.caja-disparador p').css("align-self", "center");
            $('.caja-disparador p').css('top', '50%');
            $('.caja-disparador p').css('transform', 'rotate(270deg)');
            $('.noticias').css('flex-grow', '0');  //cualquier otro tamaño    
            $('#cajaNoticias').css('display', 'none');
            if (screen.width < 768) { //tamaño movil
                $('#contenedor-secundario').css('display', 'block');
            }
        }
    });

    $('.ficha').on('click', function () {
        let fichas = $('.ficha');

        fichas.each(function () {
            $(this).addClass('Oculta');
        })
        $(this).css('cursor', 'auto');
        $(this).removeClass('Oculta');
        $(this).css('width', '100%');
        $(this).css('height', '100%');
        $(this).children('.in').css('display', 'block');
        $(this).children('.img').css('width', '100%');
        $(this).children('.img').css('height', '100%');
        $(this).children('.img').children('img').css('width', '90%');
        $(this).children('.img').children('img').css('height', '90%');
        $(this).children('.texto-imagen').css('display', 'flex');
        $('.galeria').css('grid-template-columns', '1fr');
    });

    $('.in').on('click', function () {

        $(this).css('display', 'none');

    });


});

function resetbtnSubmmit() {
    document.getElementById('btnSubmit').disabled = true;
}

function validar(formularioPresupuesto) { // valida el formulario de contacto y el de presupuesto
    if (formularioPresupuesto.nombre.value.length == 0) {
        alert("Indique un nombre");
        return false;
    }
    if (formularioPresupuesto.email.value.length == 0) {
        alert("Indique un email");
        return false;
    }
    listacaracteres = /^[_a-z0-9-]+(.[a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
    if (!listacaracteres.test(document.getElementById('email').value)) {
        alert("Debe indicar un email valido");
        return false;
    }
    if (formularioPresupuesto.movil.value.length == 0) {
        alert("Indique un movil de contacto");
        return false;
    }
    listacaracteres = /^[0-9]{9}$/
    if (!listacaracteres.test(document.getElementById('movil').value)) {
        alert("Debe indicar un movil valido");
        return false;
    }
    alert("Formulario correcto");
    formularioPresupuesto.submit();

}
var map;
var mostrar_direcciones;
var servicios_rutas = new google.maps.DirectionsService();




function cargarMapa() {
    mostrar_direcciones = new google.maps.DirectionsRenderer();
    var punto = new google.maps.LatLng(36.741118, -4.489761);

    var opciones = {
        zoom: 16,
        center: punto,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": "-8"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#acacac"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#484848"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ff0000"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "-3"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": "72"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": "23"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": "30"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "-19"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": "2"
                    },
                    {
                        "gamma": "1.21"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "saturation": "15"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": "-43"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "22"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "weight": "0.12"
                    },
                    {
                        "lightness": "-23"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "lightness": "71"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 30
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 40
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "5"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "5"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffff00"
                    },
                    {
                        "lightness": "-24"
                    },
                    {
                        "saturation": -97
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "-88"
                    },
                    {
                        "lightness": "-23"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "weight": "0.01"
                    },
                    {
                        "lightness": "9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "lightness": "-32"
                    },
                    {
                        "gamma": "2.99"
                    }
                ]
            }
        ]

    };
    map = new google.maps.Map(document.getElementById("mapa"), opciones);

    var marca = new google.maps.Marker({
        position: punto,
        map: map,
        icon: "ico/map-pin.svg"

    });
    var caja = new google.maps.InfoWindow({
        content: 'Oficina: <b>Manuel Fernández Esteban</b><br>Teléfono:677 230 977</br>Dirección: Avenida Arquitecto Luís Bono, 7 <br> Málaga 29190</br>'
    });
    google.maps.event.addListener(marca, 'click', function () {
        caja.open(map, marca);
    });
    mostrar_direcciones.setMap(map);
    mostrar_direcciones.setPanel(document.getElementById("ruta"));
    var opciones_fotos = {
        position: punto,
        pov: {
            heading: 34,
            pitch: 0,
            zoom: 1
        }
    };
}
function geolocalizar() {

    var geocoder = new google.maps.Geocoder();

    var direccion = $("#direccion").val();
    geocoder.geocode({ 'address': direccion }, function (results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('No se ha podido localizar la dirección. ' + status);
        }
    });
}

function calcularRuta() {
    let partida = $("#partida").val();
    let destino = $("#destino").val();

    if ((partida != "") && (destino != "")) {
        console.log(partida + "," + destino);
        let opciones = {
            origin: partida,
            destination: destino,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        servicios_rutas.route(opciones, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                mostrar_direcciones.setDirections(response);
            }
        })
    }

}
const CORPORATIVO = 500;
const PORTFOLIO = 450;
const TIENDA = 700;
const MAGAZINE = 400;
const OPCION = 400;
let descuento = 0;

function mirarLopd(check) {

    if ($('#lopd').is(':checked')) {
        $('#btnSubmit').prop('disabled', false);
    } else {
        $('#btnSubmit').prop('disabled', true);
    }
}


function calcularPresupuesto() {
    
    let descuento = 0;
    let presupuesto = 0;
    let base = 0;
    let tiempo = 0;
    let tipoPagina = $(':selected').val();
    
    switch (tipoPagina) {
        case 'corporativo':
            base = CORPORATIVO;
            break;
        case 'portfolio':
            base = PORTFOLIO;
            break;
        case 'tienda':
            base = TIENDA;
            break;
        case 'magazine':
            base = MAGAZINE;
            break;
        default:
            base = 0;
            break;
    }
    
    if (base == 0) {
        alert("Seleccione un tipo de web");
    } 
    else 
    {
        
        tiempo = $('#plazo').val();
        
        if (tiempo < 0) {
            tiempo = 0;
            $('#plazo').val(0);
        }
        switch (tiempo) {
            case '1':
                descuento = 0.05;
                break;
            case '2':
                descuento = 0.1;
                break;
            case '3':
                descuento = 0.15;
                break;
            case '0':
                descuento = 0;
                break;
            default:
                descuento = 0.2;
                break;
        }
        
        var extras = $('input:checkbox:checked');
        var valorExtras = 0;
        extras.each(function () {
            if ($(this).prop("id") != "lopd") {
                valorExtras = valorExtras + 400;
            }
        })
        
        let rebaja = 0;
        if (descuento != 0) {
            rebaja = (base + valorExtras) * descuento
        }  
        presupuesto=(base+valorExtras)-rebaja;      
        $('#total').val(presupuesto + '€');
        
    }
}


