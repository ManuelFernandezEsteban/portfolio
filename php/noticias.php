<?php

include_once('claseConexion.php');
include_once('noticia.php');

class Noticias extends Conexion{
    
    function getAllNoticias(){
        
        $SQL="SELECT idNoticia,fecha,titular,noticia FROM `noticias` ORDER BY fecha";
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    function getNoticiaById($idNoticia){

        $SQL="SELECT titular,fecha,noticia FROM `noticias` WHERE `idNoticia`=$idNoticia";        
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    

    function insertNoticia($noticia){
        
        $SQL = "INSERT INTO `noticias` (`idNoticia`, `titular`, `fecha`, `noticia`) ";
        $SQL.= "VALUES (NULL, '".$noticia->titular."', '";
        $SQL .= "$noticia->fecha', '$noticia->noticia')";
        $conexion = $this -> crearConexion();
        mysqli_query($conexion,$SQL); 
        $resultado = mysqli_affected_rows($conexion);
        return $resultado;

    }

    function deleteNoticia($idNoticia){
        
        $SQL = "DELETE FROM `noticias` WHERE `idNoticia` = $idNoticia";
        //$query = $this -> crearConexion()->query($SQL);
        $conexion = $this -> crearConexion();
        mysqli_query($conexion,$SQL); 
        $resultado = mysqli_affected_rows($conexion);
        return $resultado;
    }

    function updateNoticia($noticia){

        $SQL=" UPDATE `noticias` SET ";
        $SQL.=" `fecha`='$noticia->fecha',`titular`='$noticia->titular',";  
        $SQL.=" `noticia`='$noticia->noticia'";
        $SQL.=" WHERE `idNoticia` = $noticia->idNoticia";      
        $conexion = $this -> crearConexion();
        mysqli_query($conexion,$SQL); 
        $resultado = mysqli_affected_rows($conexion);
        return $resultado;
    }
}


?>