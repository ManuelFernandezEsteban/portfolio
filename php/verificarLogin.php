<?php
$host = 'localhost';
$user = 'root';
$password = 'admin';
$bd = 'portfolio';

$mysqli = new mysqli($host, $user, $password, $bd);
if ($mysqli->connect_errno) {
    echo 'Algo falla';
} else {
    $usuario = $_POST['usuario'];
    $pass = $_POST['password'];
    $consultaSQL = "SELECT `idUsuario`, `usuario`, `password`, `role` FROM `usuarios` WHERE 1";
    $consultaSQL .= " AND `usuario` = '" . $usuario . "'";
    //$consultaSQL .= "AND `password` = '".$pass."'";

    $resultado = $mysqli->query($consultaSQL);
    //echo $consultaSQL;
    
    if ($resultado->num_rows==1) {
        $userData = $resultado->fetch_assoc();
        if (password_verify($pass, $userData['password'])) {
            session_start();
            $_SESSION["valido"] = 'SI';
            $_SESSION['usuario'] = $userData['usuario'];
            $data['status'] = 'ok';
            $data['result'] = $userData;
        }
    } else {
        $data['status'] = 'error';
        $data['result'] = '';
    }

    mysqli_close($mysqli);
    echo json_encode($data);
}
?>