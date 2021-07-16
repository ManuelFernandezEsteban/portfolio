<?php

include_once('claseConexion.php');
include_once('usuario.php');

class Usuarios extends Conexion{
    
    function getAllUsuarios(){

        $SQL="SELECT `idUsuario`, `usuario`, `password`, `role`, `nombre`, `apellidos`, `email`, `telefono` FROM `usuarios`";
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    function getUsuarioByName($nombreUsuario){

        $SQL = "SELECT `idUsuario`, `usuario`, `password`, `role`, `nombre`, `apellidos`, `email`, `telefono` ";
        $SQL.="FROM `usuarios` WHERE 1 AND `usuario` = '".$nombreUsuario."'";
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    function getUsuarioById($idUsuario){

        $SQL = "SELECT `idUsuario`, `usuario`, `password`, `role`, `nombre`, `apellidos`, `email`, `telefono`";
        $SQL.="FROM `usuarios` WHERE 1 AND `idUsuario` = '".$idUsuario."'";
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    function insertUsuario($user){
        
        $SQL = "INSERT INTO `usuarios` (`idUsuario`, `usuario`, `password`, `role`, `nombre`, `apellidos`, `email`, `telefono`) ";
        $SQL.= "VALUES (NULL, '".$user->user."', '";
        $SQL .= "$user->password', '$user->role', '$user->nombre','$user->apellidos','$user->email','$user->telefono')";
        $conexion = $this -> crearConexion();
        mysqli_query($conexion,$SQL); 
        $resultado = mysqli_affected_rows($conexion);
        return $resultado;       

    }

    function deleteUsuario($idUsuario){
        
        $SQL = "DELETE FROM `usuarios` ";
        $SQL.="WHERE `idUsuario` = '".$idUsuario."'";
        $conexion = $this -> crearConexion();
        mysqli_query($conexion,$SQL); 
        $resultado = mysqli_affected_rows($conexion);
        return $resultado;
    }

    function updateUsuario($user){

        $SQL=" UPDATE `usuarios` SET ";
        $SQL.=" `role`='$user->role',`nombre`='$user->nombre',`apellidos`='$user->apellidos',`email`='$user->email',`telefono`='$user->telefono' WHERE 1 AND ";
        $SQL.=" `usuario`='$user->user'";
        $conexion = $this -> crearConexion();
        mysqli_query($conexion,$SQL); 
        $resultado = mysqli_affected_rows($conexion);
        return $resultado;
    }

    function updateAccesso($user){
        $SQL=" UPDATE `usuarios` SET  `usuario`= '".$user->user."',";
        $SQL .= "`password`= '$user->password' WHERE `idUsuario`=".$user->idUsuario;
        $conexion = $this -> crearConexion();
        mysqli_query($conexion,$SQL); 
        $resultado = mysqli_affected_rows($conexion);
        return $resultado;
    }
}


?>