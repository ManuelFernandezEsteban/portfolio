
$(document).ready(function(){

    var fuera=false;
    $('.noticias p').click(function(){
        //alert("hola");
        if (!fuera){
            fuera=true;   
            $(this).css('transform','rotate(0deg)')         
            $('.noticias').animate({
                width:'500px'
            });
            document.getElementById("cajaNoticias").style.display="block";
        }else{ 
            $(this).css('transform','rotate(270deg)');           
            $('.noticias').animate({
                width:'50px'
            })
            fuera=false;
            document.getElementById("cajaNoticias").style.display="none";
        }
    })
})

var objetoHttp=null;
function escribirNoticia(){
    if (objetoHttp.readyState==4){
        var documento= objetoHttp.responseXML;
        var texto=documento.documentElement;
        var cadenaAEscribir="";
        var i = 0;
        while (texto.getElementsByTagName("item")[i]!=null){
            cadenaAEscribir += "<h3>Titular: "+texto.getElementsByTagName("item")[i].childNodes[4].firstChild.nodeValue+"</h3>";
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

