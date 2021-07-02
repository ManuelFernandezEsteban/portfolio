let usuarios = Array();
let usuarioSeleccionado;

function cargarPerfil(idUsuario) {

    let dataType = "html";
    let datos = "usuario=" + idUsuario;
    datos += "&operacion=datosUsuario";
    console.log(datos)    ;
    let url = "peticionesUsuarios.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {  

            let resultado = JSON.parse(data);
            if (resultado.result == "ok") {
                console.log(resultado);
                usuarioSeleccionado = new Usuario(resultado.datos[0].idUsuario,resultado.datos[0].nombre,resultado.datos[0].apellidos,resultado.datos[0].email,resultado.datos[0].telefono,resultado.datos[0].usuario,resultado.datos[0].role);                
                document.formularioPerfilUser.usuario.value=usuarioSeleccionado.nombreUsuario;
                document.formularioPerfilUser.nombre.value=usuarioSeleccionado.nombre;
                document.formularioPerfilUser.apellidos.value=usuarioSeleccionado.apellidos;
                document.formularioPerfilUser.email.value=usuarioSeleccionado.email;
                document.formularioPerfilUser.telefono.value=usuarioSeleccionado.telefono;
            }
        },
        error: function () {
            console.log("error");
        },
        dataType: dataType

    });
}
function dibujarTablaCitas(datos) {

    let cuerpoTabla = document.createElement('div');
    cuerpoTabla.classList.add("divTableBody");
    let filaCabecera = document.createElement('div');
    filaCabecera.classList.add('divTableRow');
    filaCabecera.classList.add('divTableHeading');
    let celdaCabeceraFecha = document.createElement('div');
    let celdaCabeceraMotivo = document.createElement('div');
    let celdaSeleccion = document.createElement('div');
    celdaCabeceraFecha.classList.add('divTableCellHeader');
    celdaCabeceraMotivo.classList.add('divTableCellHeader');
    celdaSeleccion.classList.add('divTableCell');
    filaCabecera.appendChild(celdaCabeceraFecha);
    celdaCabeceraFecha.innerText = "Fecha";
    celdaCabeceraMotivo.innerText = "Motivo de la cita";
    filaCabecera.appendChild(celdaCabeceraMotivo);
    cuerpoTabla.appendChild(filaCabecera);
    document.querySelector('.divTableCitas').innerHTML = '';
    document.querySelector('.divTableCitas').appendChild(cuerpoTabla);
    for (var i in datos) {
        let fila;
        let celdaFecha, celdaMotivo;
        fila = document.createElement('div');
        fila.setAttribute('idCita', datos[i].idCita);
        fila.classList.add('divTableRow');
        celdaFecha = document.createElement('div');
        celdaFecha.classList.add('divTableCell');
        celdaMotivo = document.createElement('div');
        celdaMotivo.classList.add('divTableCell');
        celdaFecha.innerText = datos[i].fecha;
        celdaMotivo.innerText = datos[i].motivo;
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaMotivo);
        fila.addEventListener('click', clickEnTabla);
        cuerpoTabla.appendChild(fila);
    }
}
function traerCitas(idUsuario) {
    let dataType = "html";
    let datos = "usuario=" + idUsuario;
    datos += "&operacion=traerCitasUsuario";
    console.log(datos);
    let url = "peticionesCitas.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {

            let resultado = JSON.parse(data);
            if (resultado.result == "ok") {

                //dibujarTabla(resultado.datos);
                console.log(usuarioSeleccionado);
                usuarioSeleccionado.citas = resultado.datos;
                console.log(usuarioSeleccionado);
                dibujarTablaCitas(usuarioSeleccionado.citas);
            }

        },

        error: function () {
            console.log("error");
        },
        dataType: dataType

    });

}

function seleccionUsuario(ev){
    let id = ev.target.parentNode.getAttribute("idUsuario");
    cargarPerfil(id);
    traerCitas(id);
    
}



function dibujarTablaUsuarios(datos){

    console.log(datos);
    let cuerpoTabla = document.createElement('div');
    cuerpoTabla.classList.add("divTableBody");
    let filaCabecera = document.createElement('div');
    filaCabecera.classList.add('divTableRow');
    filaCabecera.classList.add('divTableHeading');
    
    //let celdaCabeceraId = document.createElement('div');
    let celdaCabeceraUsuario = document.createElement('div');   
    let celdaCabeceraRole = document.createElement('div');
    let celdaCabeceraNombre = document.createElement('div');
    let celdaCabeceraApellidos = document.createElement('div');
   /* let celdaCabeceraEmail = document.createElement('div');
    let celdaCabeceraTelefono = document.createElement('div');*/

    //celdaCabeceraId.classList.add('divTableCellHeader');
    celdaCabeceraUsuario.classList.add('divTableCellHeader');
    celdaCabeceraRole.classList.add('divTableCellHeader');    
    celdaCabeceraNombre.classList.add('divTableCellHeader');
    celdaCabeceraApellidos.classList.add('divTableCellHeader');
 /*   celdaCabeceraEmail.classList.add('divTableCell');
    celdaCabeceraTelefono.classList.add('divTableCell');    */
    
    //celdaCabeceraId.innerText = "Id User";
    celdaCabeceraUsuario.innerText = "Usuario";
    celdaCabeceraRole.innerText = "Role";
    celdaCabeceraNombre.innerText = "Nombre";
    celdaCabeceraApellidos.innerText="Apellidos"
 /*   celdaCabeceraEmail.innerText = "Email";
    celdaCabeceraTelefono.innerText="Teléfono"*/
    
    //filaCabecera.appendChild(celdaCabeceraId);
    filaCabecera.appendChild(celdaCabeceraUsuario);
    filaCabecera.appendChild(celdaCabeceraNombre);
    filaCabecera.appendChild(celdaCabeceraApellidos);
    filaCabecera.appendChild(celdaCabeceraRole);
    
    cuerpoTabla.appendChild(filaCabecera);
    document.querySelector('.divTableUsuarios').classList.add('divTableUsuarios');
    document.querySelector('.divTableUsuarios').innerHTML = '';

    document.querySelector('.divTableUsuarios').appendChild(cuerpoTabla);
    for (var i in datos) {
        let fila;
        let celdaUsuario,celdaNombre,celdaRole,celdaApellidos;
        fila = document.createElement('div');
        fila.setAttribute('idUsuario', datos[i].idUsuario);
        fila.classList.add('divTableRow');
        celdaUsuario = document.createElement('div');
        celdaUsuario.classList.add('divTableCell');
        celdaNombre = document.createElement('div');
        celdaNombre.classList.add('divTableCell');
        celdaRole = document.createElement('div');
        celdaRole.classList.add('divTableCell');
        celdaApellidos = document.createElement('div');
        celdaApellidos.classList.add('divTableCell');
        celdaUsuario.innerText = datos[i].usuario;
        celdaNombre.innerText = datos[i].nombre;
        celdaRole.innerText = datos[i].role;
        celdaApellidos.innerText = datos[i].apellidos;    
        fila.appendChild(celdaUsuario);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellidos);
        fila.appendChild(celdaRole);
        fila.addEventListener('click', seleccionUsuario);
        cuerpoTabla.appendChild(fila);
    }


}

function cargarTablaUsuarios(){
    let dataType = "html";    
    let datos = "operacion=traerUsuarios";
    console.log(datos);
    let url = "peticionesUsuarios.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {

            let resultado = JSON.parse(data);
            
            if (resultado.result == "ok") {

                dibujarTablaUsuarios(resultado.datos);
                usuarios = resultado.datos;
            }

        },

        error: function () {
            console.log("error");
        },
        dataType: dataType

    });

}




function cargarUsuarios(){

    if (user.roleLog=='admin'){
        cargarTablaUsuarios();
    }
    else{
        alert('No tiene permiso');
    }
}

