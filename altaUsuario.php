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
        $usuario = $_POST['NuevoUsuario'];
        $pass = $_POST['NuevoUserPassword'];

        $sql = "INSERT INTO `usuarios` (`nombreUsuario`, `password`, `role`, `cliente`)";
        $sql .= "VALUES ('$usuario', '$pass', 'usuario', '')";

        $resultado = $mysqli ->query($sql);
        if ($resultado){
            $data['status'] = 'ok';
        }
        else{
            $data['status'] = 'error';
        }

    }
    echo json_encode($data);
    mysqli_close($mysqli);

    ?>

