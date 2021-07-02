<?php

include_once('usuario.php');
include_once('apiUsuarios.php');

$apiUser = new apiUsuarios();

$peticion = $_POST["operacion"];

switch ($peticion) {
    case 'insert':
        $passCript = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $user = new Usuario(0, $_POST['usuario'], $passCript, "usuario", $_POST['nombre'], $_POST['apellidos'], $_POST['email'], $_POST['telefono']);
        $resultado = $apiUser->insert($user);
        if ($resultado > 0) {
            $data["result"] = "ok";
            $data['datos'] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
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
        $rest = $apiUser->getById($_POST['usuario']);
        if (sizeof($rest) > 0) {
            $data["result"] = "ok";
            $data["datos"] = $rest;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'modificarPerfil':
        $user = new Usuario(null, $_POST['usuario'], null, "usuario", $_POST['nombre'], $_POST['apellidos'], $_POST['email'], $_POST['telefono']);
        $resultado = $apiUser->update($user);
        if ($resultado > 0) {
            $data["result"] = "ok";
            $data['datos'] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'traerUsuarios':
        $rest = $apiUser->getAll();
        if (sizeof($rest) > 0) {
            $data["result"] = "ok";
            $data["datos"] = $rest;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;

    default:
        break;
}

echo json_encode($data);
?>