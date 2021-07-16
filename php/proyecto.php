<?php

    class Proyecto {


        public $idProyecto;
        public $nombre;        
        public $descripcion;
        public $tecnologia;
        public $duracion;
        public $foto;
        

        function __construct($idProyecto=0,$nombre,$descripcion,$tecnologia,$duracion,$foto){
        
            $this->idProyecto=$idProyecto;
            $this->nombre=$nombre;
            $this->descripcion=$descripcion;
            $this->tecnologia=$tecnologia;
            $this->duracion=$duracion;
            $this->foto=$foto;
        }
    }


?>