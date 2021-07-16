<?php

include_once('cita.php');
include_once('apiCitas.php');

$apiCita = new apiCitas();

$peticion = $_POST["operacion"];

switch ($peticion) {
    case 'insert':

        $cita = new Cita(0, $_POST['usuario'], $_POST['fechaCita'], $_POST['motivo']);
        $resultado = $apiCita->insert($cita);
        if ($resultado > 0) {
            $data["result"] = "ok";
            $data['datos'] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;

    case 'traerCita':
        $resultado = $apiCita->getById($_POST['idCita']);
        if (sizeof($resultado) > 0) {
            $data["result"] = "ok";
            $data["datos"] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();


        }
        break;
    case 'traerCitasUsuario':
        $fecha = date("Y-m-d H:i:s");
        $resultado = $apiCita->getAll($_POST['usuario'], $fecha);
        if (sizeof($resultado) > 0) {
            $data["result"] = "ok";
            $data["datos"] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'traerCitasUsuarioEditable':
        $fecha72 = date("Y-m-d H:i:s", mktime(72));
        $resultado = $apiCita->getAll($_POST['usuario'], $fecha72);
        if (sizeof($resultado) > 0) {
            $data["result"] = "ok";
            $data["datos"] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'update':
        $cita = new Cita($_POST['idCita'], $_POST['usuario'], $_POST['fechaCita'], $_POST['motivo']);
        $resultado = $apiCita->update($cita);
        if ($resultado > 0) {
            $data["result"] = "ok";
            $data['datos'] = $resultado;
        } else {
            $data["result"] = "error";
            $data["datos"] = array();
        }
        break;
    case 'delete':
        $resultado = $apiCita->delete($_POST['idCita']);
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