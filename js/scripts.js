  /*$(document).ready(function(){
  $('.menuresponsive input').change(function(){
        if ($(this).is(':checked')){
            $('main').css('padding-top','250px');
        }
        else{
            $('main').css('padding-top','100px');
        }
    });
});



function escucharScroll(){
    window.onscroll=function(){ cambiarClasesHeader()};
}

function cambiarClasesHeader(){
    let header = document.getElementById("header");
    var sticky = header.offsetTop;
    if (window.pageYOffset >= sticky) {
        header.classList.add("sticky")
      } else {
        header.classList.remove("sticky");
    }
   
}
 */


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

