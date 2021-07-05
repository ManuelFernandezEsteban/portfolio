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

class Proyecto{
    constructor(idProyecto,nombre,descripcion,tecnologia,duracion,foto){
        this.idProyecto=idProyecto;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.tecnologia=tecnologia;
        this.duracion=duracion;
        this.foto=foto;
    }
    serialize() {
        return "idProyecto="+this.idProyecto+"&nombre="+this.nombre+"&descripcion="+this.descripcion+"&tecnologia="+this.tecnologia+"&duracion="+this.duracion+"&foto="+this.foto;

    }
}


class UsuarioLogado{
    constructor(idUsuario,nombreUsuario,roleLog){
        this.idUsuario = idUsuario;
        this.nombreUsuario=nombreUsuario;
        this.roleLog=roleLog;        
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
