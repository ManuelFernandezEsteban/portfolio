


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
                let usuario = data.result.usuario;
                let rol = data.result.role;
                user = new UsuarioLogado(usuario, rol);
                let respuesta = `Hola ${user.nombreUsuario} estas registrado como ${user.roleLog}   `;
                parrafo = document.createElement('span');
                parrafo.setAttribute('style', 'color:white');
                parrafo.innerText = respuesta;
                cajaRespuesta.appendChild(parrafo);
                enlace = document.createElement('a');
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

        let datos = "NombreUsuario=" + nombreNuevoUser;
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

function validarDatosFormulario() {
    const nombre = $('#nombre');
    const apellidos = $('#apellidos');
    const email = $('#email');
    const movil = $('#movil');
    const usuario = $('#NuevoUsuario');

    if (usuario.val() == '') {
        alert("Indique un usuario");
        return false;
    }

    if (apellidos.val() == '') {
        alert("Indique los apellidos");
        return false;
    }

    if (nombre.val() == '') {
        alert("Indique un nombre");
        return false;
    }
    if (email.val() == '') {
        alert("Indique un email");
        return false;
    }
    let listacaracteres = /^[_a-z0-9-]+(.[a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
    if (!listacaracteres.test(email.val())) {
        alert("Debe indicar un email valido");
        return false;
    }
    if (movil.val() == '') {
        alert("Indique un movil de contacto");
        return false;
    }
    listacaracteres = /^[0-9]{9}$/
    if (!listacaracteres.test(movil.val())) {
        alert("Debe indicar un movil valido");
        return false;
    }
    return true;
}

/*function grabarNuevoCliente(){

    datosCliente = "nombre="+nombre.val()+"&apellidos="+apellidos.val()+"&email="+email.val()+"&movil="+movil.val();
    let url = "grabarCliente.php";
    let dataType = "html";
    $.ajax({
        type: "POST",
        url: url,
        data: datosCliente,
        success: function (data) {
            if (data == 0) { //error
                
            }
            else {//nuevo cliente
                
            }
        },
        error: function () {
            console.log("error");
        },
        dataType: dataType

    });

    return data; // el id del cliente o 0 si error
}*/

function NuevoUser() {


    if (validarDatosFormulario()) {

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
    let datos = "NombreUsuario=" + user.nombreUsuario;
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
function resetCambiosPerfil(){
    document.querySelector('#formularioPerfilUsuario').reset();
    
}

function enviarCambiosPerfil(){
    if (validarDatosFormulario()) {
        
        
            datos = $('#formularioPerfilUsuario').serialize();
            datos += "&operacion=modificarPerfil";
            console.log(datos);
       
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
                    $('#formularioPerfilUsuario').reset();
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