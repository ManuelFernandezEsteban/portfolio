<?php

include_once('claseConexion.php');
include_once('cita.php');

class Citas extends Conexion{
    
    function getAllCitasUsuario($idUser,$fecha){        
        $SQL="SELECT idCita,fecha,motivo FROM `citas` WHERE `usuario`=$idUser AND (`fecha` > '$fecha') ORDER BY `fecha`" ;
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    function getCitaById($idCita){

        $SQL="SELECT usuario,fecha,motivo FROM `citas` WHERE `idcita`=$idCita";        
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    

    function insertCita($cita){
        
        $SQL = "INSERT INTO `citas` (`idCita`, `usuario`, `fecha`, `motivo`) ";
        $SQL.= "VALUES (NULL, '".$cita->usuario."', '";
        $SQL .= "$cita->fecha', '$cita->motivo')";
        $query = $this -> crearConexion()->query($SQL);
        return $query;

    }

    function deleteCita($idCita){
        
        $SQL = "DELETE FROM `citas` ";
        $SQL.="WHERE `idCita` = '".$idCita."'";
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }

    function updateCita($cita){

        $SQL=" UPDATE `citas` SET ";
        $SQL.=" `fecha`='$cita->fecha',`motivo`='$cita->motivo'";  
        $SQL.="WHERE `idCita` = ".$cita->idCita;      
        $query = $this -> crearConexion()->query($SQL);
        return $query;
    }
}


?>