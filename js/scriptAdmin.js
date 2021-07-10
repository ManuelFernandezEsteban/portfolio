//let usuarios = Array();
let usuario;
let proyecto;
let noticia;

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
    document.querySelector('.divTableCitas').classList.add('divTableCitas');
    document.querySelector('.divTableCitas').style.display = "table";
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
function traerCitasUsuario(idUsuario) {
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
                usuario.citas = resultado.datos;
                console.log(usuario);
                dibujarTablaCitas(resultado.datos);
            }
        },
        error: function () {
            console.log("error");
        },
        dataType: dataType

    });
}

function seleccionUsuario(ev) {

    document.querySelector('#formulariocitasUsuario').reset();
    document.querySelector('#formularioPerfilUsuario').reset();
    document.querySelector('.divTableCitas').innerHTML = '';
    let id = ev.target.parentNode.getAttribute("idUsuario");
    cargarPerfilUsuario(id);
    traerCitasUsuario(id);

}



function dibujarTablaUsuarios(datos) {

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
    celdaCabeceraApellidos.innerText = "Apellidos"
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
    document.querySelector('.divTableUsuarios').style.display = "table";
    document.querySelector('.divTableUsuarios').appendChild(cuerpoTabla);

    for (var i in datos) {
        let fila;
        let celdaUsuario, celdaNombre, celdaRole, celdaApellidos;
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

function cargarTablaUsuarios() {
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
                //usuarios = resultado.datos;
            }

        },

        error: function () {
            console.log("error");
        },
        dataType: dataType

    });

}
function cargarPerfilUsuario(idUsuario) {

    let dataType = "html";
    let datos = "usuario=" + idUsuario;
    datos += "&operacion=datosUsuario";
    console.log(datos);
    let url = "peticionesUsuarios.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {

            let resultado = JSON.parse(data);
            if (resultado.result == "ok") {
                console.log(resultado);
                usuario = new Usuario(resultado.datos[0].idUsuario, resultado.datos[0].nombre, resultado.datos[0].apellidos, resultado.datos[0].email, resultado.datos[0].telefono, resultado.datos[0].usuario, resultado.datos[0].role);
                document.formularioPerfilUser.usuario.value = usuario.nombreUsuario;
                document.formularioPerfilUser.nombre.value = usuario.nombre;
                document.formularioPerfilUser.apellidos.value = usuario.apellidos;
                document.formularioPerfilUser.email.value = usuario.email;
                document.formularioPerfilUser.telefono.value = usuario.telefono;
            }
        },
        error: function () {
            console.log("error");
        },
        dataType: dataType

    });
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
                    alert('Datos modificados');
                    if (user.roleLog == 'admin') {
                        cargarTablaUsuarios();
                    }
                }
            },
            error: function () {
                console.log("error");
            },
            dataType: dataType

        });


    }

}


function cargarCitas() {

    cargarPerfilUsuario(user.idUsuario);
    traerCitasUsuario(user.idUsuario);


}
function cargarCitasBtn() {

    if (user.roleLog == 'usuario') {
        console.log(user);
        cargarCitas();
    } else {
        console.log(user);
    }
}
function cargarPerfil() {

    cargarPerfilUsuario(user.idUsuario);
    cargarCitas();
    if (user.roleLog == 'usuario') {
        console.log(user);

    } else {
        console.log(user);
    }

}
function resetCitaUser() {//podemos enviar una cita nueva no eliminar ni editar
    document.querySelector('#formulariocitasUsuario').reset();
    document.querySelector('#editarCitaUser').disabled = true;
    document.querySelector('#eliminarCitaUser').disabled = true;
    document.querySelector('#enviarCitaUser').disabled = false;
}


function validarCita(form) {

    if ((form.fechaCita.value == '') || (form.motivoCita.value == '')) {
        return false;
    }
    let fechaActual = new Date();
    let fechaCita = new Date(form.fechaCita.value);
    let hora = fechaCita.getHours();
    let dia = fechaCita.getDay();

    if (fechaCita < fechaActual) {
        return false;
    }
    if ((dia == 0) || (dia == 6)) {//fin de semana
        return false;
    }
    if ((hora < 10) || (hora > 13)) { //horario mañana
        if ((hora < 17) || (hora > 18)) {//horario tarde
            return false;
        }
    }
    return true;
}

function enviarCita(datos) {
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
            if (resultado["result"] == "ok") {
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
function editarCitaUser() { //editar cita existente
    console.log(formularioCitasUser.fechaCita.value);

    if (validarCita(document.formularioCitasUser)) {
        let datos;

        cita.fecha = formularioCitasUser.fechaCita.value;
        cita.motivo = formularioCitasUser.motivoCita.value;
        datos = cita.serialize();
        datos += "&operacion=update";
        enviarCita(datos);
    } else {
        alert("Cita no valida");
    }
}
function enviarCitaUser() { // nueva cita

    console.log('grabando cita....');
    if (validarCita(document.formularioCitasUser)) {
        let cita = new Cita(0, formularioCitasUser.fechaCita.value, formularioCitasUser.motivoCita.value, usuario.idUsuario);
        let datos;
        datos = cita.serialize();
        datos += "&operacion=insert";
        console.log(datos);
        enviarCita(datos);
    }
    else {
        alert("Cita no válida");
    }
}

function habilitarBotonesAdmin() {
    document.querySelector('#btnProyectos').disabled = false;
    document.querySelector('#btnNoticias').disabled = false;
}

function cargarUsuarios() {

    if (user.roleLog == 'admin') {
        cargarTablaUsuarios();
        habilitarBotonesAdmin();
    }
    else {

        alert('No tiene permiso');
    }
}

function agregarCero(numero) {
    const digitos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (numero in digitos) {
        return '0' + numero;
    } else {
        return numero + '';
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
            if (resultado.result == "ok") {
                console.log(resultado);
                cita = new Cita(idCita, resultado.datos[0].fecha, resultado.datos[0].motivo, resultado.datos[0].usuario);
                let fecha = formatearFecha(cita.fecha);
                document.formularioCitasUser.fechaCita.value = fecha;
                document.formularioCitasUser.motivoCita.value = cita.motivo;
                return resultado;
            }
        },

        error: function () {
            console.log("error");
            return null;
        },
        dataType: dataType
    });
}



function cargarCita(idCita) {

    if (idCita != -1) {//podemos editar y borrar
        leerCita(idCita);
        document.querySelector('#editarCitaUser').disabled = false;
        document.querySelector('#enviarCitaUser').disabled = true;
        document.querySelector('#eliminarCitaUser').disabled = false;

    }
}


function comprobarFechaCita(id) {
    if (id != -1) {
        let dataType = "html";
        let datos = "idCita=" + id;
        datos += "&operacion=traerCita";
        console.log(datos);
        let url = "peticionesCitas.php";
        $.ajax({
            type: "POST",
            url: url,
            data: datos,
            success: function (data) {
                let resultado = JSON.parse(data);
                if (resultado.result == "ok") {
                    console.log(resultado);
                    fecha = new Date(resultado.datos[0].fecha);
                    let hoy = new Date();
                    let diferencia = fecha - hoy;
                    console.log(diferencia + '-' + hoy);
                    if (diferencia > 259200000) { // 72 horas
                        cargarCita(id);
                    }
                    else {
                        alert("Esa cita no es editable");
                    }
                }
            },
            error: function () {
                console.log("error");

            },
            dataType: dataType
        });
    }
}

function clickEnTabla(ev) {

    let id = ev.target.parentNode.getAttribute("idcita");
    comprobarFechaCita(id);
}

function eliminarCitaUser() {
    console.log('eliminado....')

    let dataType = "html";
    let idCita = cita.idCita;
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
            let resultado = JSON.parse(data);

            if (resultado.result == "ok") {
                cargarCitas();
                resetCitaUser();
            }

        },

        error: function () {
            console.log("error");
        },
        dataType: dataType
    });
}

function leerProyecto(idProyecto) {
    let dataType = "html";
    let datos = "idProyecto=" + idProyecto;
    datos += "&operacion=traerProyecto";
    console.log(datos);
    let url = "peticionesProyectos.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {
            console.log(data);
            let resultado = JSON.parse(data);
            if (resultado.result == "ok") {
                console.log(resultado);
                proyecto = new Proyecto(idProyecto, resultado.datos[0].nombre, resultado.datos[0].descripcion, resultado.datos[0].tecnologia, resultado.datos[0].duracion, resultado.datos[0].foto);
                console.log(proyecto);
                document.formularioProyecto.nombre.value = proyecto.nombre;
                document.formularioProyecto.tecnologia.value = proyecto.tecnologia;
                document.formularioProyecto.duracion.value = proyecto.duracion;
                document.querySelector('#ruta').innerHTML = proyecto.foto;
                document.querySelector('#imgProyecto').src = proyecto.foto;
                document.querySelector("#descripcion").value = proyecto.descripcion;

            }
        },

        error: function () {
            console.log("error");
            return null;
        },
        dataType: dataType
    });
}

function cargarProyecto(idProyecto) {
    if (idProyecto != -1) {//podemos editar y borrar
        leerProyecto(idProyecto);
        document.querySelector('#editarProyecto').disabled = false;
        document.querySelector('#enviarProyecto').disabled = true;
        document.querySelector('#eliminarProyecto').disabled = false;

    }
}

function seleccionProyecto(ev) {
    let id = ev.target.parentNode.getAttribute("idProyecto");
    cargarProyecto(id);
}

function dibujarTablaProyectos(datos) {

    console.log(datos);
    let cuerpoTabla = document.createElement('div');
    cuerpoTabla.classList.add("divTableBody");
    let filaCabecera = document.createElement('div');
    filaCabecera.classList.add('divTableRow');
    filaCabecera.classList.add('divTableHeading');

    let celdaCabeceraNombre = document.createElement('div');
    let celdaCabeceraTecnologia = document.createElement('div');
    let celdaCabeceraDuracion = document.createElement('div');

    celdaCabeceraTecnologia.classList.add('divTableCellHeader');
    celdaCabeceraDuracion.classList.add('divTableCellHeader');
    celdaCabeceraNombre.classList.add('divTableCellHeader');

    celdaCabeceraTecnologia.innerText = "Tecnologia";
    celdaCabeceraDuracion.innerText = "Duracion";
    celdaCabeceraNombre.innerText = "Nombre";


    filaCabecera.appendChild(celdaCabeceraNombre);
    filaCabecera.appendChild(celdaCabeceraTecnologia);
    filaCabecera.appendChild(celdaCabeceraDuracion);

    cuerpoTabla.appendChild(filaCabecera);
    document.querySelector('.divTableProyectos').classList.add('divTableProyectos');
    document.querySelector('.divTableProyectos').innerHTML = '';
    document.querySelector('.divTableProyectos').style.display = "table";
    document.querySelector('.divTableProyectos').appendChild(cuerpoTabla);

    for (var i in datos) {
        let fila;
        let celdaNombre, celdaDuracion, celdaTecnologia;
        fila = document.createElement('div');
        fila.setAttribute('idProyecto', datos[i].idProyecto);
        fila.classList.add('divTableRow');

        celdaDuracion = document.createElement('div');
        celdaDuracion.classList.add('divTableCell');
        celdaNombre = document.createElement('div');
        celdaNombre.classList.add('divTableCell');
        celdaTecnologia = document.createElement('div');
        celdaTecnologia.classList.add('divTableCell');

        celdaNombre.innerText = datos[i].nombre;
        celdaDuracion.innerText = datos[i].duracion;
        celdaTecnologia.innerText = datos[i].tecnologia;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaTecnologia);
        fila.appendChild(celdaDuracion);
        fila.addEventListener('click', seleccionProyecto);
        cuerpoTabla.appendChild(fila);
    }
}

function leerProyectos() {
    let dataType = "html";

    let datos = "&operacion=traerProyectos";
    console.log(datos);
    let url = "peticionesProyectos.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {

            let resultado = JSON.parse(data);
            if (resultado.result == "ok") {

                console.log(resultado);
                dibujarTablaProyectos(resultado.datos);
            }
        },
        error: function () {
            console.log("error");
        },
        dataType: dataType

    });
}

function validarProyecto(form) {
    // valida el formulario de proyecto

    if (form.nombre.value.length == 0) {
        alert("Indique un nombre para el proyecto");
        return false;
    }
    /* if (form.descripcion.innerText == '') {
         alert("Indique una descripcion del proyecto");
         return false;
     }   */
    if (form.tecnologia.value.length == 0) {
        alert("Indique al menos una tecnología empleada");
        return false;
    }
    listacaracteres = /^\d+$/
    if (!listacaracteres.test(form.duracion.value)) {
        alert("Indique la duración del proyecto en semanas");
        return false;
    }
    alert("Formulario correcto");
    //formularioPresupuesto.submit();
    return true;
}


function enviarProyecto() {

    if (validarProyecto(document.formularioProyecto)) {
        let datos = new FormData(formularioProyecto);
        datos.append('operacion', 'insert');

        console.log(datos);
        let url = "peticionesProyectos.php";
        let dataType = "html";
        $.ajax({
            type: "POST",
            url: url,
            data: datos,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                let resultado = JSON.parse(data);
                if (resultado['result'] == 'ok') {
                    document.querySelector('#formularioProyecto').reset();
                    alert('Proyecto añadido');
                    leerProyectos();
                }
            },
            error: function () {
                console.log("error");
            },
            dataType: dataType

        });
    }
}



function resetProyecto() {
    document.formularioProyecto.reset();
    document.formularioProyecto.descripcion.innerText = '';
    document.querySelector('#ruta').innerHTML = '';
    proyecto = null;
    document.querySelector('#editarProyecto').disabled = true;
    document.querySelector('#eliminarProyecto').disabled = true;
    document.querySelector('#enviarProyecto').disabled = false;
    document.querySelector('#imgProyecto').src = "";

}

function eliminarProyecto() {
    console.log('eliminado....')

    let dataType = "html";
    let idProyecto = proyecto.idProyecto;
    let datos = "idProyecto=" + idProyecto;
    datos += "&operacion=delete";
    console.log(datos);
    let url = "peticionesProyectos.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {
            console.log(data);
            let resultado = JSON.parse(data);

            if (resultado.result == "ok") {
                leerProyectos();
                resetProyecto();
            }

        },

        error: function () {
            console.log("error");
        },
        dataType: dataType
    });
}

function editarProyecto() {
    if (validarProyecto(document.formularioProyecto)) {

        let datos = new FormData(formularioProyecto);
        datos.append('idProyecto', proyecto.idProyecto);
        datos.append('operacion', 'update');
        let url = "peticionesProyectos.php";
        console.log(datos);
        let dataType = "html";
        $.ajax({
            type: "POST",
            url: url,
            data: datos,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                let resultado = JSON.parse(data);
                if (resultado['result'] == 'ok') {
                    document.querySelector('#formularioProyecto').reset();
                    alert('Proyecto modificado');
                    leerProyectos();
                } else {
                    console.log(resultado);
                }
            },
            error: function () {
                console.log("error");
            },
            dataType: dataType

        });


    }
}
function mostrarImgSeleccionada() {
    let files = document.querySelector('#foto').files;
    console.log(files);
    console.log(files[0].name);
    document.querySelector('#ruta').innerHTML = files[0].name;
    document.querySelector('#imgProyecto').src = '';
}
function cargarProyectos() {
    document.querySelector('.boxProyectos').style.display = 'flex';
    leerProyectos();

}
function leerNoticia(idNoticia) {

    let dataType = "html";
    let datos = "idNoticia=" + idNoticia;
    datos += "&operacion=traerNoticia";
    console.log(datos);
    let url = "peticionesNoticias.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {
            console.log(data);
            let resultado = JSON.parse(data);
            if (resultado.result == "ok") {
                console.log(resultado);
                noticia = new Noticia(idNoticia, resultado.datos[0].fecha, resultado.datos[0].titular, resultado.datos[0].noticia);
                console.log(noticia);
                document.formularioNoticias.titular.value = noticia.titular;
                document.formularioNoticias.fecha.value = noticia.fecha;
                document.querySelector("#noticia").value = noticia.noticia;
            } else {
                console.log(resultado);
            }
        },

        error: function () {
            console.log("error");
            return null;
        },
        dataType: dataType
    });
}

function cargarNoticia(idNoticia) {
    if (idNoticia != -1) {//podemos editar y borrar
        leerNoticia(idNoticia);
        document.querySelector('#eliminarNoticia').disabled = false;
        document.querySelector('#enviarNoticia').disabled = true;
        document.querySelector('#editarNoticia').disabled = false;

    }
}

function seleccionNoticia(ev) {
    let id = ev.target.parentNode.getAttribute("idNoticia");
    cargarNoticia(id);
}

function dibujarTablaNoticias(datos) {

    console.log(datos);
    let cuerpoTabla = document.createElement('div');
    cuerpoTabla.classList.add("divTableBody");
    let filaCabecera = document.createElement('div');
    filaCabecera.classList.add('divTableRow');
    filaCabecera.classList.add('divTableHeading');

    let celdaCabeceraFecha = document.createElement('div');
    let celdaCabeceraTitular = document.createElement('div');

    celdaCabeceraFecha.classList.add('divTableCellHeader');
    celdaCabeceraTitular.classList.add('divTableCellHeader');

    celdaCabeceraFecha.innerText = "Fecha";
    celdaCabeceraTitular.innerText = "Titular";

    filaCabecera.appendChild(celdaCabeceraFecha);
    filaCabecera.appendChild(celdaCabeceraTitular);

    cuerpoTabla.appendChild(filaCabecera);
    document.querySelector('.divTableNoticias').classList.add('divTableNoticias');
    document.querySelector('.divTableNoticias').innerHTML = '';
    document.querySelector('.divTableNoticias').style.display = "table";
    document.querySelector('.divTableNoticias').appendChild(cuerpoTabla);

    for (var i in datos) {
        let fila;
        let celdaFecha, celdaTitular;
        fila = document.createElement('div');
        fila.setAttribute('idNoticia', datos[i].idNoticia);
        fila.classList.add('divTableRow');

        celdaFecha = document.createElement('div');
        celdaFecha.classList.add('divTableCell');
        celdaTitular = document.createElement('div');
        celdaTitular.classList.add('divTableCell');

        celdaFecha.innerText = datos[i].fecha;
        celdaTitular.innerText = datos[i].titular;

        fila.appendChild(celdaFecha);
        fila.appendChild(celdaTitular);

        fila.addEventListener('click', seleccionNoticia);
        cuerpoTabla.appendChild(fila);
    }
}

function leerNoticias() {
    let dataType = "html";

    let datos = "&operacion=traerNoticias";
    console.log(datos);
    let url = "peticionesNoticias.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {

            let resultado = JSON.parse(data);
            if (resultado.result == "ok") {

                console.log(resultado);
                dibujarTablaNoticias(resultado.datos);
            }
            else {
                console.log(resultado);
            }
        },
        error: function () {
            console.log("error");
        },
        dataType: dataType

    });
}

function resetNoticia() {
    document.formularioNoticias.reset();
    document.formularioNoticias.noticia.innerText = '';
    noticia = null;
    document.querySelector('#editarNoticia').disabled = true;
    document.querySelector('#eliminarNoticia').disabled = true;
    document.querySelector('#enviarNoticia').disabled = false;

}

function validarNoticia(form) {
    // valida el formulario de noticias

    if (form.titular.value.length == 0) {
        alert("Indique un titular para la noticia");
        return false;
    }
    if (form.noticia.value == '') {
        alert("Inserte el cuerpo de la noticia");
        return false;
    }   
    if (form.fecha.value =='') {
        alert("Seleccione la fecha para la noticia");
        return false;
    }    
    alert("Formulario correcto");
    //formularioPresupuesto.submit();
    return true;
}

function enviarNoticia() {
    if (validarNoticia(document.formularioNoticias)) {
        let datos = new FormData(formularioNoticias);
        
        datos.append('operacion','insert');
        console.log(datos);
        let url = "peticionesNoticias.php";
        let dataType = "html";
        $.ajax({
            type: "POST",
            url: url,
            data: datos,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                let resultado = JSON.parse(data);
                if (resultado['result'] == 'ok') {
                    document.querySelector('#formularioNoticias').reset();
                    alert('Noticia añadida');
                    leerNoticias();
                }
            },
            error: function () {
                console.log("error");
            },
            dataType: dataType

        });
    }
}

function editarNoticia(){
    if (validarNoticia(document.formularioNoticias)) {
        //let datos = new FormData(formularioNoticias);
        //datos.append('idNoticia',noticia.idNoticia);
        //datos.append('operacion','update');
        let datos = new Noticia(noticia.idNoticia,document.formularioNoticias.fecha.value,document.formularioNoticias.titular.value,document.formularioNoticias.noticia.value);
        datos.serialize();
        console.log(datos);
        datos+="&operacion=update";
        console.log(datos);
        let url = "peticionesNoticias.php";
        let dataType = "html";
        $.ajax({
            type: "POST",
            url: url,
            data: datos,
           // processData: false,
           // contentType: false,
            success: function (data) {
                console.log(data);
                let resultado = JSON.parse(data);
                if (resultado['result'] == 'ok') {
                    document.querySelector('#formularioNoticias').reset();
                    alert('Noticia modificada');
                    leerNoticias();
                }else{
                    console.log(resultado);
                }
            },
            error: function () {
                console.log("error");
            },
            dataType: dataType

        });
    }
}

function cargarNoticias() {
    document.querySelector('.boxNoticias').style.display = 'flex';
    leerNoticias();
}