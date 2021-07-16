<?php

include_once('proyecto.php');
include_once('apiProyectos.php');

define("RUTA", "imgProyectos/");

$apiProyecto = new apiProyectos();

$peticion = $_POST["operacion"];


function borrarFoto($idProyecto)
{
    $apiProyecto = new apiProyectos();
    $res = $apiProyecto->getById($idProyecto);
    if (sizeof($res) > 0) {
        $rutaImagen = $res[0]['foto'];
        if (file_exists($rutaImagen)) {
            unlink($rutaImagen);
            return true;
        }
    }
    return $rutaImagen;
}


switch ($peticion) {
    case 'insert':
        if (isset($_FILES)) {
            $imagen = $_FILES['foto'];
            $nombreImagen = $imagen['name'];
            $tipo = $imagen['type'];

            if ($tipo == "image/jpg" || $tipo == "image/jpeg" || $tipo == "image/gif" || $tipo == "image/png") {
                if (!is_dir('imgProyectos')) {
                    mkdir('imgProyectos', 0777);
                }
                $destinoImagen = RUTA . $nombreImagen;
            }
        } else {
            $destinoImagen = '';
        }

        $proyecto = new Proyecto(0, $_POST['nombre'], $_POST['descripcion'], $_POST['tecnologia'], $_POST['duracion'], $destinoImagen);
        $resultado = $apiProyecto->insert($proyecto);
        if ($resultado > 0) {
            $data["result"] = "ok";
            $data['datos'] = $resultado;
            move_uploaded_file($imagen['tmp_name'], $destinoImagen);
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;

    case 'traerProyecto':
        $resultado = $apiProyecto->getById($_POST['idProyecto']);
        if (sizeof($resultado) > 0) {
            $data["result"] = "ok";
            $data["datos"] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'traerProyectos':
        $resultado = $apiProyecto->getAll();
        if (sizeof($resultado) > 0) {
            $data["result"] = "ok";
            $data["datos"] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'update':      
        $imagen = $_FILES['foto'];
        $nombreImagen = $imagen['name'];
        $tipo = $imagen['type'];
        if ($nombreImagen!=''){
            if ($tipo == "image/jpg" || $tipo == "image/jpeg" || $tipo == "image/gif" || $tipo == "image/png") {
                if (!is_dir('imgProyectos')) {
                    mkdir('imgProyectos', 0777);
                }
                $destinoImagen = RUTA . $nombreImagen;
                move_uploaded_file($imagen['tmp_name'], $destinoImagen);
                $test = borrarFoto($_POST['idProyecto']);
            }
        }else{
            $res = $apiProyecto->getById($_POST['idProyecto']);
            if (sizeof($res) > 0) {
                $destinoImagen = $res[0]['foto'];
            }
        }
        $proyecto = new Proyecto($_POST['idProyecto'], $_POST['nombre'], $_POST['descripcion'], $_POST['tecnologia'], $_POST['duracion'], $destinoImagen);
        $resultado = $apiProyecto->update($proyecto);
        if ($resultado > 0) {
            $data["result"] = "ok";
            $data['datos'] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'delete':
        $test = borrarFoto($_POST['idProyecto']);
        $resultado = $apiProyecto->delete($_POST['idProyecto']);
        if ($resultado > 0) {

            $data["result"] = "ok";
            $data['datos'] = $resultado;
            $data["test"] = $test;
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
