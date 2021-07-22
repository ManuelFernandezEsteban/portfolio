
function enviarANuevoUsuario() {

    navega('nuevoUser.html');

}


function logearUsuario() {
    let datos = $('#formularioLogin').serialize();
    
    let url = "php/verificarLogin.php";
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
                navega('usuariosAdmin.html');
            }
        },
        error: function () {
            console.log("error");
        },
        dataType: dataType

    });


}

function ComprobarUser(nombreUser) {
    
    let dataType = "html";
   
    if (nombreUser.trim() != '') {

        let datos = "usuario=" + nombreUser;
        datos += "&operacion=consultaNombreUsuario";

        let url = "php/peticionesUsuarios.php";
        $.ajax({
            type: "POST",
            url: url,
            data: datos,
            success: function (data) {

                if (data == 1) {

                    $(".respuestaLogin").html("El usuario esta disponible");
                    
                }
                else if (data == 0) {
                    $(".respuestaLogin").html("El usuario no esta disponible");
                    $('.NuevoUsuario').val('');
                    $('.NuevoUsuario').focus();                   
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
            //console.log(datos);
        }
        else {
            alert("faltan datos");
        }
        let url = "php/peticionesUsuarios.php";
        let dataType = "html";

        $.ajax({
            type: "POST",
            url: url,
            data: datos,
            success: function (data) {
                let result=JSON.parse(data);
                if (result['result'] == 'ok') {
                    $('#NuevoUsuario').val('');
                    $('#NuevoUserPassword').val('');
                    $('#NuevoUserPasswordConfirmacion').val('');
                    document.querySelector('#formularioNuevoUsuario').reset();
                }else{
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


function resetCambiosPerfil() {
    document.querySelector('#formularioPerfilUsuario').reset();

}


