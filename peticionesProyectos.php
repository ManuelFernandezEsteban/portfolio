<?php

include_once('proyecto.php');
include_once('apiProyectos.php');

$apiProyecto = new apiProyectos();

$peticion = $_POST["operacion"];

switch ($peticion) {
    case 'insert':

        $proyecto = new Proyecto(0, $_POST['nombre'], $_POST['descripcion'], $_POST['tecnologia'],$_POST['duracion'], $_POST['foto']);
        $resultado = $apiProyecto->insert($proyecto);
        if ($resultado > 0) {
            $data["result"] = "ok";
            $data['datos'] = $resultado;
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
        $proyecto = new Proyecto($_POST['idProyecto'], $_POST['nombre'], $_POST['descripcion'], $_POST['tecnologia'],$_POST['duracion'], $_POST['foto']);
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
        $resultado = $apiProyecto->delete($_POST['idProyecto']);
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
?>