<?php

include_once('cita.php');
include_once('apiCitas.php');

$apiCita = new apiCitas();

$peticion = $_POST["operacion"];

switch ($peticion) {
    case 'insert':

        $cita = new Cita(0, $_POST['usuario'], $_POST['fechaCita'], $_POST['motivo']);
        $resultado = $apiCita->insert($cita);
<<<<<<< HEAD
        $data['result'] = 'ok';
        $data['datos'] = $resultado;
        break;

    case 'traerCita':
        $rest = $apiCita->getById($_POST['idCita']);
        if (sizeof($rest) > 0) {
            $data = ($rest);
        } else {
            $data = array();
=======
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
>>>>>>> 873602a5d5dedfe8b7a71c66405cfd7b47e01cec
        }
        break;
    case 'traerCitasUsuario':
        $fecha = date("Y-m-d H:i:s");
<<<<<<< HEAD
        $rest = $apiCita->getAll($_POST['usuario'], $fecha);
        if (sizeof($rest) > 0) {
            $data = ($rest);
        } else {
            $data = array();
        }


        break;
    case 'traerCitasUsuarioEditables':
        $fecha72 = date("Y-m-d H:i:s",mktime(72));
        $rest = $apiCita->getAll($_POST['usuario'], $fecha72);
        if (sizeof($rest) > 0) {
            $data = ($rest);
        } else {
            $data = array();
        }


=======
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
>>>>>>> 873602a5d5dedfe8b7a71c66405cfd7b47e01cec
        break;
    case 'update':
        $cita = new Cita($_POST['idCita'], $_POST['usuario'], $_POST['fechaCita'], $_POST['motivo']);
        $resultado = $apiCita->update($cita);
<<<<<<< HEAD
        $data['result'] = 'ok';
        $data['datos'] = $resultado;
=======
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
>>>>>>> 873602a5d5dedfe8b7a71c66405cfd7b47e01cec
        break;



    default:
        $data["result"] = "error";
        $data["datos"] = array();
        break;
}

echo json_encode($data);
<<<<<<< HEAD
=======
?>
>>>>>>> 873602a5d5dedfe8b7a71c66405cfd7b47e01cec
