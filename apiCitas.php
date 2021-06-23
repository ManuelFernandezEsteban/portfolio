<?php

include_once('citas.php');
include_once('cita.php');

class apiCitas {

    private $conexion;

    function __construct( ){


        $this-> conexion=new Citas('localhost','root','','portfolio');

    }

    function getAll($idUser){
        
        $citas = array();        
        $resultado= $this-> conexion->getAllCitasUsuario($idUser);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'idCita'=> $fila['idCita'],
                    'fecha'=>$fila['fecha'],
                    'motivo' => $fila['motivo']                    
                );
                array_push($citas,$item);
            }
            //echo json_encode($resultado);
        }else{
            echo json_encode(array('mensajes'=>'No hay citas'));
        }
        return ($citas);
    }

    function getById($idCita){

        $citas = array();        
        $resultado= $this-> conexion->getCitaById($idCita);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'fecha'=> $fila['fecha'],
                    'usuario'=>$fila['usuario'],
                    'motivo' => $fila['motivo']                    
                );
                array_push($citas,$item);
            }
            echo json_encode($citas);
        }else{
            echo json_encode(array('mensajes'=>'No hay citas'));
        }
    }

  /*  function getByName($nameUser){
        $usuarios = array();        
        $resultado= $this-> conexion->getUsuarioByName($nameUser);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'idUsuario'=> $fila['idUsuario'],
                    'usuario'=>$fila['usuario'],
                    'password'=>$fila['password'],
                    'role' => $fila['role'],  
                    'nombre'=>$fila['nombre'],
                    'apellidos'=>$fila['apellidos'],
                    'email'=>$fila['email'],
                    'telefono'=>$fila['telefono']
                );
                array_push($usuarios,$item);
            }
            
           
        }
        return $usuarios;
    }*/

    function update($cita){
        $resultado = $this->conexion->updateCita($cita);
        echo $resultado;
    }


    function insert($cita){        
        
        $resultado= $this->conexion->insertCita($cita);
        echo $resultado;
    }

    function delete($idCita){
        $resultado= $this->conexion->deleteCita($idCita);
    }


}


?>