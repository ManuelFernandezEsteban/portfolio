<?php

include_once('claseConexion.php');
include_once('proyecto.php');

class Proyectos extends Conexion{
    
    function getAllProyectos(){
        
        $SQL="SELECT idProyecto,nombre,descripcion,tecnologia,duracion,foto FROM `proyectos`";
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    function getProyectoById($idProyecto){

        $SQL="SELECT nombre,descripcion,tecnologia,duracion,foto FROM `proyectos` WHERE `idProyecto`=$idProyecto";        
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    

    function insertProyecto($proyecto){
        
        $SQL = "INSERT INTO `proyectos` (`idProyecto`, `nombre`, `descripcion`, `tecnologia`,`duracion`,`foto`) ";
        $SQL.= "VALUES (NULL, '".$proyecto->nombre."', '";
        $SQL .= "$proyecto->descripcion', '$proyecto->tecnologia','$proyecto->duracion', '$proyecto->foto')";
        $conexion = $this -> crearConexion();
        mysqli_query($conexion,$SQL); 
        $resultado = mysqli_affected_rows($conexion);
        return $resultado;

    }

    function deleteProyecto($idProyecto){
        
        $SQL = "DELETE FROM `proyectos` WHERE `idProyecto` = $idProyecto";        
        $conexion = $this -> crearConexion();
        mysqli_query($conexion,$SQL); 
        $resultado = mysqli_affected_rows($conexion);
        return $resultado;
    }

    function updateProyecto($proyecto){

        $SQL=" UPDATE `proyectos` SET ";
        $SQL.=" `nombre`='$proyecto->nombre',`descripcion`='$proyecto->descripcion',"; 
        $SQL.="`tecnologia`='$proyecto->tecnologia',`duracion`='$proyecto->duracion',`foto`='$proyecto->foto' "; 
        $SQL.="WHERE `idProyecto`=".$proyecto->idProyecto;      
        $conexion = $this -> crearConexion();
        mysqli_query($conexion,$SQL); 
        $resultado = mysqli_affected_rows($conexion);
        return $resultado;
    }
}


?>