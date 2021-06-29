<?php

include_once('citas.php');
include_once('cita.php');

class apiCitas {

    private $conexion;

    function __construct( ){


        $this-> conexion=new Citas('localhost','root','','portfolio');

    }

    function getAll($idUser,$fecha){
        
        $citas = array();     
           
        $resultado= $this-> conexion->getAllCitasUsuario($idUser,$fecha);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'idCita'=> $fila['idCita'],
                    'fecha'=>$fila['fecha'],
                    'motivo' => $fila['motivo']                    
                );
                array_push($citas,$item);
            }
            
        }else{
            echo json_encode(array('mensajes'=>'No hay citas'));
        }
        return ($citas);
    }

    function getById($idCita){

        $cita = array();        
        $resultado= $this-> conexion->getCitaById($idCita);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'fecha'=> $fila['fecha'],                    
                    'motivo' => $fila['motivo'],
                    'usuario'=>$fila['usuario']                
                );
                array_push($cita,$item);
            }
            
        }else{
            echo json_encode(array('mensajes'=>'No hay citas'));
        }
        return $cita;
    }
 

    function update($cita){
        $resultado = $this->conexion->updateCita($cita);
        //echo $resultado;
    }


    function insert($cita){               
        $resultado= $this->conexion->insertCita($cita);
        //echo $resultado;
    }

    function delete($idCita){
        $resultado= $this->conexion->deleteCita($idCita);
        return $resultado;
    }


}


?>