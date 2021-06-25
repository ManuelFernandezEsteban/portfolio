function resetCitaUser(){
    document.querySelector('#formulariocitasUsuario').reset();
    document.querySelector('#editarCitaUser').disabled=true;
    document.querySelector('#enviarCitaUser').disabled=false;
}


function leerCita(idCita){
    
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
            console.log(data);
            let resultado = JSON.parse(data);
            cita = new Cita(idCita,resultado[0].fecha,resultado[0].motivo,resultado[0].usuario);
            console.log(cita);
            document.formularioCitasUser.fechaCita.value=cita.fecha;
            document.formularioCitasUser.motivoCita.value=cita.motivo;
            
        },

        error: function () {
            console.log("error");
        },
        dataType: dataType
    });
}



function cargarCita(){
    
    const select = document.querySelector('#selectCitas');
    let idCita= select.options[select.selectedIndex].value;
    leerCita(idCita);  
    document.querySelector('#editarCitaUser').disabled=false;
    document.querySelector('#enviarCitaUser').disabled=true;
    
    console.log(user);

}


function dibujarTabla(datos){

    //let data = JSON.parse(datos);
    let cuerpoTabla = document.createElement('div');
    cuerpoTabla.classList.add("divTableBody");
    let filaCabecera = document.createElement('div');
    filaCabecera.classList.add('divTableRow');
    filaCabecera.classList.add('divTableHeading');
    let celdaCabeceraFecha= document.createElement('div');
    let celdaCabeceraMotivo= document.createElement('div');
    let celdaSeleccion= document.createElement('div');
    celdaCabeceraFecha.classList.add('divTableCell');
    celdaCabeceraMotivo.classList.add('divTableCell');
    celdaSeleccion.classList.add('divTableCell');
    filaCabecera.appendChild(celdaCabeceraFecha);
    celdaCabeceraFecha.innerText="Fecha";
    celdaCabeceraMotivo.innerText="Motivo de la cita";   
    filaCabecera.appendChild(celdaCabeceraMotivo);   
    cuerpoTabla.appendChild(filaCabecera);
    document.querySelector('.divTable').appendChild(cuerpoTabla);
    let fila;
    let celdaFecha,celdaMotivo;    
    for (var i in datos){
        fila = document.createElement('div');        
        fila.setAttribute('idCita',datos[i].idCita);
        fila.classList.add('divTableRow');
        celdaFecha = document.createElement('div');
        celdaFecha.classList.add('divTableCell');
        celdaMotivo = document.createElement('div');
        celdaMotivo.classList.add('divTableCell');                
        celdaFecha.innerText= datos[i].fecha;
        celdaMotivo.innerText= datos[i].motivo;
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaMotivo);        
        cuerpoTabla.appendChild(fila);
        
    }
}


function cargarSelect(){
    const select = document.querySelector('#selectCitas');
    if (user.citas.length>0){
        for (let i in user.citas){
            let option = document.createElement('option');
            option.value=user.citas[i].idCita;
            option.innerText=user.citas[i].fecha+"-"+user.citas[i].motivo;
            select.appendChild(option);
        }
    }
}

function cargarCitas() {
    console.log('citas');
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
            
            user.citas=data;   
            cargarSelect();         
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

    console.log('en login');
    let datos = $('#formularioLogin').serialize();
    console.log(datos);
    let url = "verificarLogin.php";
    let dataType = "json";
    const cajaRespuesta = document.querySelector('#caja-login');

    let enlace;
    //let parrafo;

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
                user = new UsuarioLogado(idUsuario,usuario, rol);
                console.log(user);
                let respuesta = `Hola ${user.nombreUsuario} estas registrado como ${user.roleLog}   `;
                parrafo = document.createElement('span');
                parrafo.classList.add('estiloLogin');
                //parrafo.setAttribute('style', 'color:white');
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
        console.log(datos);
        let url = "peticionesUsuarios.php";
        $.ajax({
            type: "POST",
            url: url,
            data: datos,
            success: function (data) {
                console.log(data);
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

        console.log('en nuevo login');
        let datos;
        if ($('#NuevoUsuario').val().trim() != '' && $('#NuevoUserPassword').val().trim() != '' && ($('#NuevoUserPassword').val() == $('#NuevoUserPasswordConfirmacion').val())) {

            datos = $('#formularioNuevoUsuario').serialize();
            datos += "&operacion=insert";
            console.log(datos);
        }
        else {
            alert("faltan datos");
        }
        //let idCliente = grabarNuevoCliente();
        console.log(datos);
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
                    console.log(data);
                }
                else {
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
function LimpiarUser() {
    document.querySelector('#formularioNuevoUsuario').reset();
    $("#respuestaLogin").html("");
}



function cargarPerfil() {

    let dataType = "html";
    let datos = "usuario=" + user.nombreUsuario;
    datos += "&operacion=datosUsuario";
    console.log(datos);
    let url = "peticionesUsuarios.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {
            console.log(data);
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
        console.log(datos);

        //let idCliente = grabarNuevoCliente();
        //console.log(datos);
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
                else {
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

