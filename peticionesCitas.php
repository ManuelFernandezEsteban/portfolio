<?php

include_once('cita.php');
include_once('apiCitas.php');

$apiCita = new apiCitas();

$peticion = $_POST["operacion"];

$data = array();

switch ($peticion) {
    case 'insert':
        
        $cita = new Cita(0, $_POST['usuario'], $_POST['fechaCita'], $_POST['motivo']);
        $resultado = $apiCita->insert($cita);
        $data['result']='ok';
        $data['datos']=$resultado;
        break;
        
    case 'traerCita':
        $rest = $apiCita->getById($_POST['idCita']);
            if (sizeof($rest)>0){
                $data = ($rest);
            }else{
                $data = array();
            }
        break;
    case 'traerCitasUsuario':
        $rest = $apiCita->getAll($_POST['usuario']);
            if (sizeof($rest)>0){
                $data = ($rest);
            }else{
                $data = array();
            }
                        
       
        break;
    case 'update':
        $cita = new Cita($_POST['idCita'], $_POST['usuario'], $_POST['fechaCita'], $_POST['motivo']);
        $resultado = $apiCita->update($cita);        
        $data['result']='ok';
        $data['datos']=$resultado;
        break;
    default:
        break;
}

echo json_encode($data);

?>