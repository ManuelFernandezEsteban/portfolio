var fuera=false;
$(document).ready(function(){

    
    $('.caja-disparador p').click(function(){
        //alert("hola");
        if (fuera){            
            fuera=false;   
            $('.caja-disparador p').css("align-self","center"); 
            $('.noticias').css('flex-grow','0');  //cualquier otro tamaño          
            document.getElementById("cajaNoticias").style.display="none";
            if (screen.width<768){ //tamaño movil
                document.getElementById("contenedor-secundario").style.display="block";
            }
        }else{ 
            fuera=true; 
            if (screen.width=768){//tamaño ipad
                $('.noticias').css('flex-grow','4');
            } 
            if (screen.width<768){//tamaño movil
                document.getElementById("contenedor-secundario").style.display="none";
            }
           else if (screen.width>768){  //tamaño desktop o superior                                 
               $('.noticias').css('flex-grow','2');
            }            
            document.getElementById("cajaNoticias").style.display="block";
            $(".contenido-caja-noticia").each(function(){
                $(this).css("padding-top","20px");
                $(this).css("padding-left","20px");
                $(this).css("margin-left","60px");
                $(this).css("font-family","Ubuntu");
               /* $(this).css("color","white");
                $(this).css("height","auto");*/
            });
            //$(".contenido-caja-noticia h3").css("font-size","2em");
            $("#cajaNoticias").css("padding-top","20px");
            $('.caja-disparador p').css("align-self","start");
            
        }
    })
})

var objetoHttp=null;
function escribirNoticia(){
    if (objetoHttp.readyState==4){
        var documento = objetoHttp.responseXML;
        var texto = documento.documentElement;
        var cadenaAEscribir = "";
        var i = 0;
        while (i<=6){
            cadenaAEscribir = cadenaAEscribir + "<div class=\"contenido-caja-noticia\"><h3>"+texto.getElementsByTagName("item")[i].childNodes[4].firstChild.nodeValue+"</h3>";
            cadenaAEscribir = cadenaAEscribir + "<div>"+texto.getElementsByTagName("item")[i].childNodes[6].firstChild.nodeValue+"</div>";
            cadenaAEscribir = cadenaAEscribir + "<a href=\""+texto.getElementsByTagName("item")[i].childNodes[2].firstChild.nodeValue+"\" target=\"_blank\">"+texto.getElementsByTagName("item")[i].childNodes[2].firstChild.nodeValue+"</a></div>";
            i++;
        }
        document.getElementById("cajaNoticias").innerHTML=cadenaAEscribir;
        
    }
}


function cargarNoticia(){
    
    if(window.XMLHttpRequest){
        objetoHttp=new XMLHttpRequest();        
    }else if (window.ActiveXObject){
        objetoHttp= new ActiveXObject("Microsoft.XMLHTTP")
    }
    objetoHttp.open("GET","xml/rss.xml",true);
    objetoHttp.onreadystatechange=escribirNoticia;
    objetoHttp.send(null);
}



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

