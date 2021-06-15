
const nombre = $('#nombre');
const apellidos = $('#apellidos');
const email = $('#email');
const movil = $('#movil');
const usuario = $('#NuevoUsuario');



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

function grabarNuevoCliente(){

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
}

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
        let idCliente = grabarNuevoCliente();
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