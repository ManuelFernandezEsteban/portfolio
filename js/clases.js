class Usuario {

    constructor(idUsuario,nombre,apellidos,email,telefono,nombreUsuario,role){
        this.idUsuario=idUsuario;
        this.nombre=nombre;
        this.apellidos=apellidos;        
        this.email=email;
        this.telefono=telefono;
        this.role=role;
        this.nombreUsuario=nombreUsuario;
        this.citas=Array();
    }
}



class UsuarioLogado{
    constructor(idUsuario,nombreUsuario,roleLog){
        this.idUsuario = idUsuario;
        this.nombreUsuario=nombreUsuario;
        this.roleLog=roleLog;
        this.citas=Array();
    }
}

class Cita {
    constructor(idCita,fecha,motivo,usuario){
        this.idCita=idCita;
        this.fecha=fecha;
        this.motivo=motivo;
        this.usuario=usuario;
    }

    serialize() {
        return "idCita="+this.idCita+"&fechaCita="+this.fecha+"&motivo="+this.motivo+"&usuario="+this.usuario;

    }
}
