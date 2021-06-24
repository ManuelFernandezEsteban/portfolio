class Usuarios {

    constructor(idUsuario,nombre,apellidos,email,telefono,nombreUsuario,role){
        this.idUsuario=idUsuario;
        this.nombre=nombre;
        this.apellidos=apellidos;        
        this.email=email;
        this.telefono=telefono;
        this.role=role;
        this.nombreUsuario=nombreUsuario;
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

