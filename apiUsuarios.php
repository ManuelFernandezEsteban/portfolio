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
                    'usuario'=>$fila['usuario'],
                    'role' => $fila['role'],  
                    'nombre'=>$fila['nombre'],
                    'apellidos'=>$fila['apellidos'],
                    'email'=>$fila['email'],
                    'telefono'=>$fila['telefono']                    
                );
                array_push($usuarios,$item);
            }
            return ($usuarios);
        }else{
            return (array('mensajes'=>'No hay usuarios'));
        }

    }

    function getById($idUser){

        $usuarios = array();        
        $resultado= $this-> conexion->getUsuarioById($idUser);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'idUsuario'=> $fila['idUsuario'],
                    'usuario'=>$fila['usuario'],                    
                    'role' => $fila['role'],  
                    'nombre'=>$fila['nombre'],
                    'apellidos'=>$fila['apellidos'],
                    'email'=>$fila['email'],
                    'telefono'=>$fila['telefono']                    
                );
                array_push($usuarios,$item);
            }
            
        }else{
            echo json_encode(array('mensajes'=>'No hay usuarios'));
        }
        return($usuarios);
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
    }

    function update($user){
        $resultado = $this->conexion->updateUsuario($user);
        return $resultado;
    }


    function insert($user){        
        
        $resultado= $this->conexion->insertUsuario($user);
        return $resultado;
    }

    function delete($idUser){
        $resultado= $this->conexion->deleteUsuario($idUser);
        return $resultado;
    }


}


?>