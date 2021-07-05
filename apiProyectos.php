<?php

include_once('proyectos.php');
include_once('proyecto.php');

class apiProyectos {

    private $conexion;

    function __construct( ){


        $this-> conexion=new Proyectos('localhost','root','','portfolio');

    }

    function getAll(){
        
        $proyectos = array();        
        $resultado= $this-> conexion->getAllProyectos();
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(
                    'idProyecto'=> $fila['idProyecto'],
                    'nombre'=>$fila['nombre'],
                    'descripcion' => $fila['descripcion'],  
                    'tecnologia'=>$fila['tecnologia'],
                    'duracion'=>$fila['duracion'],
                    'foto'=>$fila['foto']                   
                );
                array_push($proyectos,$item);
            }
            return ($proyectos);
        }else{
            return (array());
        }

    }

    function getById($idProyecto){

        $proyectos = array();        
        $resultado= $this-> conexion->getProyectoById($idProyecto);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(                    
                    'nombre'=>$fila['nombre'],
                    'descripcion' => $fila['descripcion'],  
                    'tecnologia'=>$fila['tecnologia'],
                    'duracion'=>$fila['duracion'],
                    'foto'=>$fila['foto']                   
                );
                array_push($proyectos,$item);
            }
            
        }else{
            return (array());
        }
        return($proyectos);
    }    

    function update($proyecto){
        $resultado = $this->conexion->updateProyecto($proyecto);
        return $resultado;
    }


    function insert($proyecto){        
        
        $resultado= $this->conexion->insertProyecto($proyecto);
        return $resultado;
    }

    function delete($idProyecto){
        $resultado= $this->conexion->deleteProyecto($idProyecto);
        return $resultado;
    }
}
?>