<?php

include_once('noticia.php');
include_once('apiNoticias.php');

$apiNoticia = new apiNoticias();

$peticion = $_POST["operacion"];

switch ($peticion) {
    case 'insert':

        $noticia = new Noticia(0, $_POST['titular'], $_POST['fecha'], $_POST['noticia']);
        $resultado = $apiNoticia->insert($noticia);
        if ($resultado > 0) {
            $data["result"] = "ok";
            $data['datos'] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'traerNoticias':
        $resultado = $apiNoticia->getAll();
        if (sizeof($resultado) > 0) {
            $data["result"] = "ok";
            $data["datos"] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'traerNoticia':
        $resultado = $apiNoticia->getById($_POST['idNoticia']);
        if (sizeof($resultado) > 0) {
            $data["result"] = "ok";
            $data["datos"] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'update':
        $noticia = new Noticia($_POST['idNoticia'], $_POST['titular'], $_POST['fecha'], $_POST['noticia']);
        $resultado = $apiNoticia->update($noticia);
        if ($resultado > 0) {
            $data["result"] = "ok";
            $data['datos'] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'delete':
        $resultado = $apiNoticia->delete($_POST['idNoticia']);
        if ($resultado > 0) {
            $data["result"] = "ok";
            $data['datos'] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;



    default:
        $data["result"] = "error";
        $data["datos"] = array();
        break;
}

echo json_encode($data);
