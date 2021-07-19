<?php

    class Conexion {

        private $host;
        private $user;
        private $password;
        private $bd; 
        public $conexion;


        function __construct( $host, $usuario, $pass, $db ){
            $this -> host = $host;
            $this-> user=$usuario;
            $this-> password=$pass;
            $this-> bd=$db;
        }
            
        function crearConexion(){
                        
            $this -> conexion = new mysqli($this->host,$this->user,$this->password,$this->bd);
            //$this -> conexion = mysqli_set_charset($this->conexion,'utf8');
            if (mysqli_errno($this->conexion)){
                echo 'error';
            }
            return $this -> conexion;

        }
/*
        function getLogin($usuario,$pass){
            $consultaSQL = "SELECT `idUsuario`, `nombreUsuario`, `password`, `role`, `cliente` FROM `usuarios` WHERE 1";
            $consultaSQL .= " AND `nombreUsuario` = '".$usuario."'";
            $consultaSQL .= "AND `password` = '".$pass."'";
            return $this->conexion->query($consultaSQL);
        }*/
                
    }
    



?>
