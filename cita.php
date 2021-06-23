<?php

    class Cita {


        public $idCita;
        public $usuario;        
        public $fecha;
        public $motivo;
        

        function __construct($idCita=0,$usuario,$fecha,$motivo){
        
            $this->idCita=$idCita;
            $this->usuario=$usuario;
            $this->fecha=$fecha;
            $this->motivo=$motivo;
            
        }
    }


?>