<?php

include_once('claseConexion.php');

class Usuarios extends Conexion{
    
    function getAllUsuarios(){

        $SQL="SELECT `idUsuario`, `nombreUsuario`, `password`, `role`, `cliente` FROM `usuarios`";
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    function getUsuarioByName($nombreUsuario){

        $SQL = "SELECT `idUsuario`, `nombreUsuario`, `password`, `role`, `cliente` ";
        $SQL.="FROM `usuarios` WHERE 1 AND `nombreUsuario` = '".$nombreUsuario."'";
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    function getUsuarioById($idUsuario){

        $SQL = "SELECT `idUsuario`, `nombreUsuario`, `password`, `role`, `cliente` ";
        $SQL.="FROM `usuarios` WHERE 1 AND `idUsuario` = '".$idUsuario."'";
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    function insertUsuario($nombre,$pass,$role){
        
        $SQL = "INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `password`, `role`, `cliente`) ";
        $SQL.= "VALUES (NULL, '$nombre', '$pass', '$role', '1')";
        $query = $this -> crearConexion()->query($SQL);
        //return $query;

    }
}


?>