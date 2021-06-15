<?php

include_once('usuarios.php');

class apiUsuarios {

    private $usuario;

    function __construct( ){


        $this-> usuario=new Usuarios('localhost','root','','portfolio');

    }

    function getAll(){
        
        $usuarios = array();        
        $resultado= $this-> usuario->getAllUsuarios();
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'idUsuario'=> $fila['idUsuario'],
                    'nombreUsuario'=>$fila['nombreUsuario'],
                    'role' => $fila['role'],
                    'cliente' => $fila['cliente']
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
        $resultado= $this-> usuario->getUsuarioById($idUser);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'idUsuario'=> $fila['idUsuario'],
                    'nombreUsuario'=>$fila['nombreUsuario'],
                    'role' => $fila['role'],
                    'cliente' => $fila['cliente']
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
        $resultado= $this-> usuario->getUsuarioByName($nameUser);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'idUsuario'=> $fila['idUsuario'],
                    'nombreUsuario'=>$fila['nombreUsuario'],
                    'role' => $fila['role'],
                    'cliente' => $fila['cliente']
                );
                array_push($usuarios,$item);
            }
            
           
        }
        return $usuarios;
    }

    function insert($nombre,$pass,$role){
        $passCript=password_hash($pass,PASSWORD_BCRYPT);
        $resultado= $this->usuario->insertUsuario($nombre,$passCript,$role);
        //echo $resultado;
    }

    function delete($user){}


}


?>