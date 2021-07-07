<?php

include_once('proyecto.php');
include_once('apiProyectos.php');

define("RUTA","imgProyectos/");

$apiProyecto = new apiProyectos();

$peticion = $_POST["operacion"];



switch ($peticion) {
    case 'insert':
        $imagen = $_FILES['foto'];
        $nombreImagen = $imagen['name'];
        $tipo = $imagen['type'];

        if ($tipo=="image/jpg"||$tipo=="image/jpeg"||$tipo=="image/gif"||$tipo=="image/png"){
            if (!is_dir('imgProyectos')){
                mkdir('imgProyectos',0777);
            }
            $destinoImagen=RUTA.$nombreImagen;           
        }

        
        $proyecto = new Proyecto(0, $_POST['nombre'], $_POST['descripcion'], $_POST['tecnologia'],$_POST['duracion'], $destinoImagen);
        $resultado = $apiProyecto->insert($proyecto);
        if ($resultado > 0) {
            $data["result"] = "ok";
            $data['datos'] = $resultado;
            move_uploaded_file($imagen['tmp_name'],$destinoImagen);
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
        $Imagen = $_FILES["foto"]["name"];
        $destinoImagen=RUTA.$Imagen;
        $proyecto = new Proyecto($_POST['idProyecto'], $_POST['nombre'], $_POST['descripcion'], $_POST['tecnologia'],$_POST['duracion'], $destinoImagen);
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