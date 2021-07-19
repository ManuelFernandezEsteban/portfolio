<?php

    class Noticia {


        public $idNoticia;
        public $titular;        
        public $fecha;
        public $noticia;
        

        function __construct($idNoticia=0,$titular,$fecha,$noticia){
        
            $this->idNoticia=$idNoticia;
            $this->titular=$titular;
            $this->fecha=$fecha;
            $this->noticia=$noticia;
            
        }
    }


?>