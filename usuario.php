<?php

    class Usuario {


        public $idUsuario;
        public $user;
        public $password;
        public $role;
        public $nombre;
        public $apellidos;
        public $email;
        public $telefono;

        function __construct($idUsuario=0,$user,$password,$role='usuario',$nombre,$apellidos,$email,$telefono){
        
            $this->idUsuario=$idUsuario;
            $this->user=$user;
            $this->password=$password;
            $this->role=$role;
            $this->nombre=$nombre;
            $this->apellidos=$apellidos;
            $this->email=$email;
            $this->telefono=$telefono;
        }
    }


?>