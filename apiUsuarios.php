<?php

include_once('usuarios.php');
include_once('usuario.php');

class apiUsuarios {

    private $conexion;

    function __construct( ){


        $this-> conexion=new Usuarios('localhost','root','','portfolio');

    }

    function getAll(){
        
        $usuarios = array();        
        $resultado= $this-> conexion->getAllUsuarios();
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'idUsuario'=> $fila['idUsuario'],
                    'nombreUsuario'=>$fila['usuario'],
                    'role' => $fila['role'],
                    
                );
                array_push($usuarios,$item);
            }
            echo json_encode($usuarios);
        }else{
            echo json_encode(array('mensajes'=>'No hay usuarios'));
        }

    }

    function getById($idUser){

        $usuarios = array();        
        $resultado= $this-> conexion->getUsuarioById($idUser);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'idUsuario'=> $fila['idUsuario'],
                    'nombreUsuario'=>$fila['usuario'],
                    'role' => $fila['role']                    
                );
                array_push($usuarios,$item);
            }
            echo json_encode($usuarios);
        }else{
            echo json_encode(array('mensajes'=>'No hay usuarios'));
        }
    }

    function getByName($nameUser){
        $usuarios = array();        
        $resultado= $this-> conexion->getUsuarioByName($nameUser);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'idUsuario'=> $fila['idUsuario'],
                    'usuario'=>$fila['usuario'],
                    'password'=>$fila['password'],
                    'role' => $fila['role']                    
                );
                array_push($usuarios,$item);
            }
            
           
        }
        return $usuarios;
    }

    function insert($user){        
        
        $resultado= $this->conexion->insertUsuario($user);
        //echo $resultado;
    }

    function delete($idUser){
        $resultado= $this->conexion->insertUsuario($idUser);
    }


}


?>