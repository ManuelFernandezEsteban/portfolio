<?php

include_once('usuario.php');
include_once('apiUsuarios.php');

$apiUser = new apiUsuarios();

$peticion = $_POST["operacion"];

switch ($peticion) {
    case 'insert':
        $passCript = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $user = new Usuario(0, $_POST['usuario'], $passCript, "usuario", $_POST['nombre'], $_POST['apellidos'], $_POST['email'], $_POST['telefono']);
        $apiUser->insert($user);
        $data = 'ok';
        break;

    case 'consultaNombreUsuario':
        $rest = $apiUser->getByName($_POST['usuario']);
        if (sizeof($rest) > 0) {
            $data = 0;
        } else {
            $data = 1;
        }
        break;
    case 'datosUsuario':
        $rest = $apiUser->getByName($_POST['usuario']);
        if (sizeof($rest) > 0) {

            $data = json_encode($rest);
        }
        break;
    case 'modificarPerfil':
        $user = new Usuario(null, $_POST['usuario'], null, "usuario", $_POST['nombre'], $_POST['apellidos'], $_POST['email'], $_POST['telefono']);
        $apiUser->update($user);
        $data = 'ok';
        break;
    default:
        break;
}

echo ($data);


/*

if ($_POST["operacion"]=="insert"){

   $passCript=password_hash($_POST['NuevoUserPassword'],PASSWORD_BCRYPT);

   $user = new Usuario(0, $_POST['NuevoUsuario'],$passCript,"usuario",$_POST['nombre'],$_POST['apellidos'],$_POST['email'],$_POST['movil']);

   $apiUser->insert($user);
   $data='ok';
   //$data['result']=  $res ;

}



if ($_POST["operacion"]=="consultaNombreUsuario"){
    $rest = $apiUser->getByName($_POST['NombreUsuario']);
    if (sizeof($rest)>0) {
        $data = 0;        
    }else{
        $data = 1;
    }    
}
echo ($data);*/
