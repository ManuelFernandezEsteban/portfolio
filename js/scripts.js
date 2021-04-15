var fuera=false;
var saludo;
var objetoHttp=null;
const CUERPOINICIAL = 'cuerpoInicio.html';
const XMLNOTICIAS = 'xml/rss.xml';
const REFERENCIAMAIN=$('main');

function navega(enlace){
    
    REFERENCIAMAIN.load(enlace);  
    
    if (enlace=='cuerpoContacto.html'){
        console.log(enlace);
        //cargarMapa();
    }   
}

function escribir(){
    if (objetoHttp.readyState==4){
        var documento = objetoHttp.responseXML;
        var texto = documento.documentElement;
        var cadenaAEscribir = "";
        var i = 0;
        while (i<=6){
            cadenaAEscribir = cadenaAEscribir + "<div class=\"contenido-caja-noticia\"><h3>"+texto.getElementsByTagName("item")[i].childNodes[4].firstChild.nodeValue+"</h3>";
            cadenaAEscribir = cadenaAEscribir + "<div>"+texto.getElementsByTagName("item")[i].childNodes[6].firstChild.nodeValue+"</div>";
            cadenaAEscribir = cadenaAEscribir + "<a href=\""+texto.getElementsByTagName("item")[i].childNodes[2].firstChild.nodeValue+"\" target=\"_blank\">"+texto.getElementsByTagName("item")[i].childNodes[2].firstChild.nodeValue+"</a></div>";
            cadenaAEscribir = cadenaAEscribir + "<div class=\"separador\"></div>"
            i++;
        }
       
        $("#cajaNoticias").html(cadenaAEscribir);
        
    }
}



function escribirNoticia(){
    if(window.XMLHttpRequest){
        objetoHttp=new XMLHttpRequest();        
    }else if (window.ActiveXObject){
        objetoHttp= new ActiveXObject("Microsoft.XMLHTTP")
    }
    objetoHttp.open("GET",XMLNOTICIAS,true);
    objetoHttp.onreadystatechange=escribir;
    objetoHttp.send(null);
    
}
function cargarInicio(){

    navega(CUERPOINICIAL);
    $('.caja-disparador p').css("align-self","center"); 
    $('.noticias').css('flex-grow','0');  //cualquier otro tamaño          
    $('#cajaNoticias').css('display','none');
    if (screen.width<768){ //tamaño movil        
        $('#contenedor-secundario').css('display','block');
    }
    saludo = setTimeout(mensaje,5000);
}
function iniciar(){
    
    cargarInicio();
}

function mostrarBienvenida(){
    $('.caja-bienvenida').css('display','flex');
    
}

function mensaje(){    
    //alert("Bienvenidos a mi PortFolio");
    
    mostrarBienvenida();
    clearTimeout(saludo);
}

$(document).ready(function()
{    

    iniciar();
   
    REFERENCIAMAIN.on('click','.caja-disparador p',function(){
        
            if (fuera){            
                fuera=false;   
                $('.caja-disparador p').css("align-self","center"); 
                $('.caja-disparador p').css('top','50%');
                $('.caja-disparador p').css('transform','rotate(270deg)');
                $('.noticias').css('flex-grow','0');  //cualquier otro tamaño    
                $('#cajaNoticias').css('display','none'); 
                if (screen.width<768){ //tamaño movil
                    $('#contenedor-secundario').css('display','block');
                }
            }
            else{ 
                escribirNoticia();
                fuera=true; 
                if (screen.width=768){//tamaño ipad
                    $('.noticias').css('flex-grow','4');
                } 
                if (screen.width<768){//tamaño movil                    
                    $('#contenedor-secundario').css('display','none');
                }
                
                if (screen.width>768){  //tamaño desktop                                   
                    $('.noticias').css('flex-grow','3');
                } 
                if (screen.width>1200){  //tamaño desktop                                   
                    $('.noticias').css('flex-grow','2');
                }
                $('#cajaNoticias').css('display','block');               
                $('#cajaNoticias').css('padding-top','0px');
                $('.caja-disparador p').css('align-self','start');
                $('.caja-disparador p').css('top','0');
                $('.caja-disparador p').css('transform','rotate(0deg)');
                console.log(REFERENCIAMAIN.children());
                
            }
        }) 
        $('#boton-bienvenida').on('click',function(){
            $('.caja-bienvenida').css('display','none');            
        });

        $('.caja-logo a').on('click',function(event){            
            event.preventDefault();
            let destino=($(this).attr('href'));            
            console.log(destino);
            navega(destino);
        });

        $('.menu-enlace').on('click',function(event){            
            event.preventDefault();
            let destino=($(this).attr('href'));
            $('.seleccionado').removeClass('seleccionado'); 
            $(this).addClass('seleccionado');  
            console.log(destino);
            navega(destino);
        });


        $(window).resize(function()
        {//cerramos el panel de noticias
            if (fuera){                   
                fuera=false;   
                $('.caja-disparador p').css("align-self","center"); 
                $('.caja-disparador p').css('top','50%');
                $('.caja-disparador p').css('transform','rotate(270deg)');
                $('.noticias').css('flex-grow','0');  //cualquier otro tamaño    
                $('#cajaNoticias').css('display','none'); 
                if (screen.width<768){ //tamaño movil
                    $('#contenedor-secundario').css('display','block');
                }
            }
        });

        $('.ficha').on('click',function(){            
            let fichas = $('.ficha');
            
            fichas.each(function () {
                $(this).addClass('Oculta');
            })
            $(this).css('cursor', 'auto');
            $(this).removeClass('Oculta');
            $(this).css('width', '100%');
            $(this).css('height', '100%');
            $(this).children('.in').css('display','block');
            $(this).children('.img').css('width', '100%');
            $(this).children('.img').css('height', '100%');
            $(this).children('.img').children('img').css('width', '90%');
            $(this).children('.img').children('img').css('height', '90%');
            $(this).children('.texto-imagen').css('display', 'flex');   
            $('.galeria').css('grid-template-columns', '1fr');
        });

        $('.in').on('click',function(){  

            $(this).css('display','none');
            
        })

        
});



function aceptalopd(opcion)
{
    if (opcion)/*acepta la lopd habilitamos boton submit*/
    {
        document.getElementById('btnSubmit').disabled=false;

    }
    else/*no acepta la lopd deshabilitamos boton submit*/
    {
        document.getElementById('btnSubmit').disabled=true;
    }
}

function resetbtnSubmmit()
{
    document.getElementById('btnSubmit').disabled=true;
}

function validar(formularioPresupuesto)
{
    if (formularioPresupuesto.nombre.value.length==0){
        alert("Indique un nombre");
        return false;
    }
    if (formularioPresupuesto.email.value.length==0)
    {
        alert("Indique un email");
        return false;
    }
    listacaracteres=/^[_a-z0-9-]+(.[a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
    if (!listacaracteres.test(document.getElementById('email').value))
    {
        alert("Debe indicar un email valido");
        return false;
    }
    if (formularioPresupuesto.movil.value.length==0) {
        alert("Indique un movil de contacto");
        return false;
    }
    listacaracteres=/^[0-9]{9}$/
    if (!listacaracteres.test(document.getElementById('movil').value))
    {
        alert("Debe indicar un movil valido");
        return false;
    }
    alert("Formulario correcto");
    formularioPresupuesto.submit();

}
var map;
var mostrar_direcciones; 
var servicios_rutas = new google.maps.DirectionsService();




function cargarMapa(){    
    mostrar_direcciones = new google.maps.DirectionsRenderer();
    var punto = new google.maps.LatLng(36.741118,-4.489761);
    
    var opciones = {
        zoom: 15,
        center: punto,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };    
    map = new google.maps.Map(document.getElementById("mapa"),opciones);
    console.log(document.getElementById("mapa"));
    var marca = new google.maps.Marker({
        position:punto,
        map:map                
    });
    var caja = new google.maps.InfoWindow({
        content:'Oficina: <b>Manuel Fernández Esteban</b><br>Teléfono:677 230 977</br>Dirección: Avenida Arquitecto Luís Bono, 7'});
        google.maps.event.addListener(marca,'click',function(){
        caja.open(map,marca);
    });
    mostrar_direcciones.setMap(map); 
    mostrar_direcciones.setPanel(document.getElementById("ruta"));
    var opciones_fotos = {
        position:punto,
        pov:{
            heading:34,
            pitch:0,
            zoom:1
        }
    };    
}
function geolocalizar(){
    
    var geocoder = new google.maps.Geocoder();
    
    var direccion = $("#direccion").val();    
    geocoder.geocode({'address':direccion},function(results,status){
        if(status=='OK'){
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map:map,
                position:results[0].geometry.location
            });
        }else{
            alert('No se ha podido localizar la dirección. '+ status);
        }
    });
}

function calcularRuta(){
    let partida = $("#partida").val();
    let destino = $("#destino").val();
    let opciones ={
        origin:partida,
        destination:destino,
        travelMode:google.maps.DirectionsTravelMode.DRIVING
    };
    servicios_rutas.route(opciones,function(response,status){
        if(status==google.maps.DirectionsStatus.OK){
            mostrar_direcciones.setDirections(response);
        }
    })

}
