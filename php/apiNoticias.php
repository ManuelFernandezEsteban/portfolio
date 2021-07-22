<?php

include_once('noticias.php');
include_once('noticia.php');

class apiNoticias {

    private $conexion;

    function __construct( ){


        $this-> conexion=new Noticias('localhost','root','admin','portfolio');

    }

    function getCincoNoticias(){

        $noticias = array();   
           
        $resultado= $this-> conexion->getAllNoticias();
        if($resultado->num_rows>0){
            $j = 1;
            while (($fila=$resultado->fetch_assoc()) && ($j<= 5) ){
                $item=array(
                    'idNoticia'=> $fila['idNoticia'],
                    'fecha'=>$fila['fecha'],
                    'titular' => $fila['titular'],
                    'noticia'=>$fila['noticia']                    
                );
                array_push($noticias,$item);                
                $j=$j+1;
            }            
        }else{
            echo json_encode(array('mensajes'=>'No hay noticias'));
        }
        return ($noticias);
    }

    function getAll(){
        
        $noticias = array();     
           
        $resultado= $this-> conexion->getAllNoticias();
        if($resultado->num_rows>0){
            
            while ($fila=$resultado->fetch_assoc() ){
                $item=array(
                    'idNoticia'=> $fila['idNoticia'],
                    'fecha'=>$fila['fecha'],
                    'titular' => $fila['titular'],
                    'noticia'=>$fila['noticia']                    
                );
                array_push($noticias,$item);
                
            }
            
        }else{
            echo json_encode(array('mensajes'=>'No hay noticias'));
        }
        return ($noticias);
    }

    function getById($idNoticia){

        $noticia = array();        
        $resultado= $this-> conexion->getNoticiaById($idNoticia);
        if($resultado->num_rows>0){
            while ($fila=$resultado->fetch_assoc()){
                $item=array(                    
                    'fecha'=>$fila['fecha'],
                    'titular' => $fila['titular'],
                    'noticia'=>$fila['noticia']                    
                );
                array_push($noticia,$item);
            }
            
        }else{
            echo json_encode(array('mensajes'=>'No hay noticias'));
        }
        return $noticia;
    }
 

    function update($noticia){
        $resultado = $this->conexion->updateNoticia($noticia);
        return $resultado;
    }


    function insert($noticia){               
        $resultado= $this->conexion->insertNoticia($noticia);
        return $resultado;
    }

    function delete($idnoticia){
        $resultado= $this->conexion->deleteNoticia($idnoticia);
        return $resultado;
    }


}


?>