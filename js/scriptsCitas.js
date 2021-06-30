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
    let fechaCita = new Date(form.fechaCita.value);    
    let hora = fechaCita.getHours();    
    let dia = fechaCita.getDay();    
    let fechaLimite = fechaCita.setDate(fechaCita.getDate() + 3); // 3 dias son 72 horas
    console.log(fechaLimite);

   

    if (fechaCita<fechaActual){
        return false;
    }    
    if ((dia==0) || (dia==6)){//fin de semana
        return false;
    }    
    if ((hora<10) || (hora>13)){ //horario mañana
        if ((hora<17) || (hora>18)){//horario tarde
            return false;
        }
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
    }else{
        alert("Cita no valida");
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
    else{
        alert("Cita no válida");
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
            if (resultado.result=="ok"){           
                console.log(resultado);
                cita = new Cita(idCita,resultado.datos[0].fecha , resultado.datos[0].motivo, resultado.datos[0].usuario);    
                let fecha = formatearFecha(cita.fecha);
                document.formularioCitasUser.fechaCita.value = fecha;
                document.formularioCitasUser.motivoCita.value = cita.motivo;
            }
        },

        error: function () {
            console.log("error");
        },
        dataType: dataType
    });
}



function cargarCita(idCita) {

    //const select = document.querySelector('#selectCitas');
    //let idCita = select.options[select.selectedIndex].value;    
    if (idCita != -1) {
        leerCita(idCita);
        document.querySelector('#editarCitaUser').disabled = false;
        document.querySelector('#enviarCitaUser').disabled = true;
        document.querySelector('#eliminarCitaUser').disabled = false;        
    }

}

function clickEnTabla(ev){
    
    cargarCita(ev.target.parentNode.getAttribute("idcita"))
}

function dibujarTabla(datos) {

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
        fila.addEventListener('click',clickEnTabla);
        cuerpoTabla.appendChild(fila);

    }
}
function cargarCitas(){
    cargarCitasTabla();
    //cargarCitasSelect();
}
/*function cargarSelect(datos) {
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
    let dataType = "html";
    let datos = "usuario=" + user.idUsuario;
    datos += "&operacion=traerCitasUsuarioEditable";
    console.log(datos);
    let url = "peticionesCitas.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {
           
            let resultado = JSON.parse(data);
            if (resultado.result=="ok"){
           
                cargarSelect(resultado.datos);       
            }     
        },

        error: function () {
            console.log("error");
        },
        dataType: dataType

    });

}
*/
function cargarCitasTabla() {
    let dataType = "html";
    let datos = "usuario=" + user.idUsuario;
    datos += "&operacion=traerCitasUsuario";
    console.log(datos);
    let url = "peticionesCitas.php";
    $.ajax({
        type: "POST",
        url: url,
        data: datos,
        success: function (data) {
           
            let resultado = JSON.parse(data);
            if (resultado.result=="ok"){
           
                dibujarTabla(resultado.datos);
                user.citas = resultado.datos;       
            }
            
        },

        error: function () {
            console.log("error");
        },
        dataType: dataType

    });

}
function eliminarCitaUser(){
    console.log('eliminado....')
    //const select = document.querySelector('#selectCitas');
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
            
            if(resultado.result=="ok"){
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
