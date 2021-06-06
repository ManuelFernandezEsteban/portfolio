<?php

    $host='localhost';
    $user='root';
    $password='';
    $bd='portfolio';

    $mysqli = new mysqli($host,$user,$password,$bd);
    if ($mysqli->connect_errno){
        echo 'Algo falla';
    }
    else{
        $usuario = $_POST['Usuario'];
        $pass = $_POST['Password'];
        $consultaSQL = "SELECT `idUsuario`, `nombreUsuario`, `password`, `role`, `cliente` FROM `usuarios` WHERE 1";
        $consultaSQL .= " AND `nombreUsuario` = '".$usuario."'";
        $consultaSQL .= "AND `password` = '".$pass."'";

        $resultado = $mysqli->query($consultaSQL);
        //echo $consultaSQL;
        if ($resultado->num_rows>0){
            session_start();
            $_SESSION["valido"]='SI';
            
            while ($fila=$resultado->fetch_assoc()){
                $_SESSION["usuario"]=$fila["nombreUsuario"];
                $_SESSION["role"]=$fila["role"];
                echo 1;
            }
        }else{
            echo 0;
        }

    }   




?>