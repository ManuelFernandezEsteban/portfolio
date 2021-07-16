<?php


session_start();

if ($_SESSION['usuario']==$_POST['nombreUsuario']){

    echo 'ok';
}
else {
    echo "error". $_POST['nombreUsuario'];
}       
    

?>