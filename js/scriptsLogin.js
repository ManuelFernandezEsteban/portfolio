function resetCitaUser() {
    document.querySelector('#formulariocitasUsuario').reset();
    document.querySelector('#editarCitaUser').disabled = true;
    document.querySelector('#eliminarCitaUser').disabled = true;
    document.querySelector('#enviarCitaUser').disabled = false;
}


function validarCita(form){

    if ((form.fechaCita.value=='')||(form.motivoCita.value=='')){
        return false;
    }
    let fechaActual = new Date();

    if (form.fechaCita.value<fechaActual){
        return false;
    }
    return true;

}

function enviarCita(datos){
    let url = "peticionesCitas.php";
    let dataType = "html";

    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {                   
            console.log(data);
            let resultado = JSON.parse(data);
            console.log(resultado);
            if (resultado["result"]=="ok"){
                resetCitaUser();
                cargarCitas();
            }
        },
        error: function () {
            console.log("error");
        },
        dataType: dataType

    });
}

function editarCitaUser(){ //editar cita existente
    console.log(formularioCitasUser.fechaCita.value);


    if (validarCita(document.formularioCitasUser)) {           
        let datos;
        cita.fecha=formularioCitasUser.fechaCita.value;
        cita.motivo=formularioCitasUser.motivoCita.value;
        datos = cita.serialize();
        datos += "&operacion=update";
        enviarCita(datos);       
    }
}

function enviarCitaUser() { // nueva cita

    console.log('grabando cita....');
    if (validarCita(document.formularioCitasUser)) {
        let cita = new Cita(0, formularioCitasUser.fechaCita.value, formularioCitasUser.motivoCita.value, user.idUsuario);
        let datos;
        datos = cita.serialize();
        datos += "&operacion=insert";
        console.log(datos);
        enviarCita(datos);
    }
}
function agregarCero(numero) {
    const digitos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (numero in digitos) {
        return '0' + numero;
    }else{
        return numero+'';
    }
}
function formatearFecha(fecha) {

    f = new Date(fecha);
    let res = f.getFullYear() + "-" + agregarCero(f.getMonth() + 1) + "-" + agregarCero(f.getDate()) + "T" + agregarCero(f.getHours()) + ":" + agregarCero(f.getMinutes());
    
    return res;
    
}


function leerCita(idCita) {

    let dataType = "html";
    let datos = "idCita=" + idCita;
    datos += "&operacion=traerCita";
    console.log(datos);
    let url = "peticionesCitas.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {            
            let resultado = JSON.parse(data);            
            cita = new Cita(idCita,resultado[0].fecha , resultado[0].motivo, resultado[0].usuario);    
            let fecha = formatearFecha(resultado[0].fecha);
            document.formularioCitasUser.fechaCita.value = fecha;
            document.formularioCitasUser.motivoCita.value = cita.motivo;

        },

        error: function () {
            console.log("error");
        },
        dataType: dataType
    });
}



function cargarCita() {

    const select = document.querySelector('#selectCitas');
    let idCita = select.options[select.selectedIndex].value;    
    if (idCita != -1) {
        leerCita(idCita);
        document.querySelector('#editarCitaUser').disabled = false;
        document.querySelector('#enviarCitaUser').disabled = true;
        document.querySelector('#eliminarCitaUser').disabled = false;        
    }

}


function dibujarTabla(datos) {

    //let data = JSON.parse(datos);
    let cuerpoTabla = document.createElement('div');
    cuerpoTabla.classList.add("divTableBody");
    let filaCabecera = document.createElement('div');
    filaCabecera.classList.add('divTableRow');
    filaCabecera.classList.add('divTableHeading');
    let celdaCabeceraFecha = document.createElement('div');
    let celdaCabeceraMotivo = document.createElement('div');
    let celdaSeleccion = document.createElement('div');
    celdaCabeceraFecha.classList.add('divTableCell');
    celdaCabeceraMotivo.classList.add('divTableCell');
    celdaSeleccion.classList.add('divTableCell');
    filaCabecera.appendChild(celdaCabeceraFecha);
    celdaCabeceraFecha.innerText = "Fecha";
    celdaCabeceraMotivo.innerText = "Motivo de la cita";
    filaCabecera.appendChild(celdaCabeceraMotivo);
    cuerpoTabla.appendChild(filaCabecera);
    document.querySelector('.divTable').innerHTML='';
    document.querySelector('.divTable').appendChild(cuerpoTabla);
    let fila;
    let celdaFecha, celdaMotivo;
    for (var i in datos) {
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
        cuerpoTabla.appendChild(fila);

    }
}
function cargarCitas(){
    cargarCitasTabla();
    cargarCitasSelect();
}
function cargarSelect(datos) {
    const select = document.querySelector('#selectCitas');
    select.innerHTML = '';
    let option = document.createElement('option');
    option.value = -1;
    option.innerText = "Seleccione una cita";
    select.appendChild(option);
    if (datos.length > 0) {
        for (let i in datos) {
            option = document.createElement('option');
            option.value = datos[i].idCita;
            option.innerText = datos[i].fecha + "-" + datos[i].motivo;
            select.appendChild(option);
        }
    }
}
function cargarCitasSelect() {
    let dataType = "json";
    let datos = "usuario=" + user.idUsuario;
    datos += "&operacion=traerCitasUsuarioEditable";
    console.log(datos);
    let url = "peticionesCitas.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {
            console.log(data);
            cargarSelect(data);            
        },

        error: function () {
            console.log("error");
        },
        dataType: dataType

    });

}

function cargarCitasTabla() {
    let dataType = "json";
    let datos = "usuario=" + user.idUsuario;
    datos += "&operacion=traerCitasUsuario";
    console.log(datos);
    let url = "peticionesCitas.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {
            console.log(data);
            dibujarTabla(data);
            user.citas = data;
        },

        error: function () {
            console.log("error");
        },
        dataType: dataType

    });

}
function eliminarCitaUser(){
    console.log('eliminado....')
    const select = document.querySelector('#selectCitas');
    let dataType = "json";
    let idCita = select.options[select.selectedIndex].value;
    let datos = "idCita=" + idCita;
    datos += "&operacion=delete";
    console.log(datos);
    let url = "peticionesCitas.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {
            console.log(data);
            //let resultado = JSON.parse(data);
            //console.log(resultado);
            if(data["result"]=="ok"){
                cargarCita();
                resetCitaUser();
            }

        },

        error: function () {
            console.log("error");
        },
        dataType: dataType
    });
}



function enviarANuevoUsuario() {

    navega('nuevoUser.html');

}


function logearUsuario() {    
    let datos = $('#formularioLogin').serialize();
    console.log(datos);
    let url = "verificarLogin.php";
    let dataType = "json";
    const cajaRespuesta = document.querySelector('#caja-login');
    let enlace;    
    $.ajax({

        type: "POST",
        url: url,
        data: datos,

        success: function (data) {
            if (data.status == 'ok') {

                console.log('logado');
                $('#Usuario').val('');
                $('#Password').val('');
                let idUsuario = data.result.idUsuario;
                let usuario = data.result.usuario;
                let rol = data.result.role;
                user = new UsuarioLogado(idUsuario, usuario, rol);
                console.log(user);
                let respuesta = `Hola ${user.nombreUsuario} estas registrado como ${user.roleLog}   `;
                parrafo = document.createElement('span');
                parrafo.classList.add('estiloLogin');
                parrafo.innerText = respuesta;
                cajaRespuesta.appendChild(parrafo);
                enlace = document.createElement('a');
                enlace.classList.add('estiloLogin');
                enlace.setAttribute('href', 'cerrarSesion.php');
                enlace.setAttribute('title', 'salir de la sesión');
                enlace.innerText = 'Salir';
                cajaRespuesta.appendChild(enlace);
                navega('usuarios.html');
            }
        },
        error: function () {
            console.log("error");
        },
        dataType: dataType

    });


}

function ComprobarUser() {

    let dataType = "html";
    console.log('Comprobamos nuevo nombre usuario');
    let nombreNuevoUser = $('#NuevoUsuario').val();
    if (nombreNuevoUser.trim() != '') {

        let datos = "usuario=" + nombreNuevoUser;
        datos += "&operacion=consultaNombreUsuario";
        
        let url = "peticionesUsuarios.php";
        $.ajax({
            type: "POST",
            url: url,
            data: datos,
            success: function (data) {
        
                if (data == 1) {
                    $("#respuestaLogin").html("El usuario esta disponible");
                    console.log(data);
                }
                else if (data == 0) {
                    $("#respuestaLogin").html("El usuario no esta disponible");
                    $('#NuevoUsuario').val('');
                    $('#NuevoUsuario').focus();
                    console.log(data);
                }

            },

            error: function () {
                console.log("error");
            },
            dataType: dataType

        });
    }

}



function NuevoUser() {
    if (validar(document.formularioNuevoUser)) {
        let datos;
        if ($('#NuevoUsuario').val().trim() != '' && $('#NuevoUserPassword').val().trim() != '' && ($('#NuevoUserPassword').val() == $('#NuevoUserPasswordConfirmacion').val())) {

            datos = $('#formularioNuevoUsuario').serialize();
            datos += "&operacion=insert";
            console.log(datos);
        }
        else {
            alert("faltan datos");
        }
        let url = "peticionesUsuarios.php";
        let dataType = "html";

        $.ajax({
            type: "POST",
            url: url,
            data: datos,
            success: function (data) {
                if (data == 'ok') {
                    $('#NuevoUsuario').val('');
                    $('#NuevoUserPassword').val('');
                    $('#NuevoUserPasswordConfirmacion').val('');
                    document.querySelector('#formularioNuevoUsuario').reset();         
                }
            },            
            error: function () {
                console.log("error");
            },
            dataType: dataType

        });
    }
}
function LimpiarUser() {
    document.querySelector('#formularioNuevoUsuario').reset();
    $("#respuestaLogin").html("");
}



function cargarPerfil() {

    let dataType = "html";
    let datos = "usuario=" + user.nombreUsuario;
    datos += "&operacion=datosUsuario";    
    let url = "peticionesUsuarios.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {            
            datos = JSON.parse(data);
            $('#usuarioPerfil').val(datos[0].usuario);
            $('#nombrePerfil').val(datos[0].nombre);
            $('#apellidosPerfil').val(datos[0].apellidos);
            $('#emailPerfil').val(datos[0].email);
            $('#movilPerfil').val(datos[0].telefono);

        },

        error: function () {
            console.log("error");
        },
        dataType: dataType

    });


}
function resetCambiosPerfil() {
    document.querySelector('#formularioPerfilUsuario').reset();

}

function enviarCambiosPerfil() {
    if (validar(document.formularioPerfilUser)) {
        datos = $('#formularioPerfilUsuario').serialize();
        datos += "&operacion=modificarPerfil";
        let url = "peticionesUsuarios.php";
        let dataType = "html";
        $.ajax({
            type: "POST",
            url: url,
            data: datos,
            success: function (data) {
                if (data == 'ok') {
                    document.querySelector('#formularioPerfilUsuario').reset();
                    alert('Datos modificados')
                }                
            },
            error: function () {
                console.log("error");
            },
            dataType: dataType

        });
    }

}

