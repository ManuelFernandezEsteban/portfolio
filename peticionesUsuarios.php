<?php

include_once('usuario.php');
include_once('apiUsuarios.php');

$apiUser = new apiUsuarios();

//$peticion = $_POST["operacion"] ;

if ($_POST["operacion"]=="insert"){

   $passCript=password_hash($_POST['NuevoUserPassword'],PASSWORD_BCRYPT);

   $user = new Usuario(0, $_POST['NuevoUsuario'],$passCript,"usuario",$_POST['nombre'],$_POST['apellidos'],$_POST['email'],$_POST['movil']);

   $apiUser->insert($user);
   $data='ok';
   //$data['result']=  $res ;

}else{
    $data='error';
}

if ($_POST["operacion"]=="consultaNombreUsuario"){
    $rest = $apiUser->getByName($_POST['NombreUsuario']);
    if (sizeof($rest)>0) {
        $data = 0;        
    }else{
        $data = 1;
    }    
}
echo ($data);

?>