
$(document).ready(function(){

    var fuera=false;
    $('.caja-disparador p').click(function(){
        //alert("hola");
        if (!fuera){
            fuera=true;   
            $(this).css('transform','rotate(0deg)');      
            $('.noticias').animate({
                width:'500px'
            });
            //$('.cajaNoticias').css('display','block');
            document.getElementById("cajaNoticias").style.display="block";
            $(".contenido-caja-noticia").each(function(){
                $(this).css("padding-top","20px");
                $(this).css("padding-left","20px");
            });
            $("#cajaNoticias").css("padding-top","20px");
        }else{ 
            fuera=false;
            $(this).css('transform','rotate(270deg)');           
            $('.noticias').animate({
                width:'50px'
            })
            //$('.cajaNoticias').css('display','none');
            document.getElementById("cajaNoticias").style.display="none";
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
            cadenaAEscribir = cadenaAEscribir + "<div class=\"contenido-caja-noticia\"><h3>Titular: "+texto.getElementsByTagName("item")[i].childNodes[4].firstChild.nodeValue+"</h3>";
            cadenaAEscribir = cadenaAEscribir + "<h4>Descripción: </h4> <div>"+texto.getElementsByTagName("item")[i].childNodes[6].firstChild.nodeValue+"</div>";
            cadenaAEscribir = cadenaAEscribir + "Enlace: <a href=\""+texto.getElementsByTagName("item")[i].childNodes[2].firstChild.nodeValue+"\" target=\"_blank\">"+texto.getElementsByTagName("item")[i].childNodes[2].firstChild.nodeValue+"</a></div>";
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

