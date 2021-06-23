class Cliente {

    constructor(idCliente,nombreCliente,apellidosCliente,DNI,emailCliente,telefonoCliente,fechaAlta,nombreUsuario="",password=""){
        this.idCliente=idCliente;
        this.nombreCliente=nombreCliente;
        this.apellidosCliente=apellidosCliente;
        this.DNI=DNI;
        this.emailCliente=emailCliente;
        this.telefonoCliente=telefonoCliente;
        this.fechaAlta=fechaAlta;

    }
}

class UsuarioLogado{
    constructor(idUsuario,nombreUsuario,roleLog){
        this.idUsuario = idUsuario;
        this.nombreUsuario=nombreUsuario;
        this.roleLog=roleLog;
    }
}

