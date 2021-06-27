<?php

include_once('cita.php');
include_once('apiCitas.php');

$apiCita = new apiCitas();

$peticion = $_POST["operacion"];



switch ($peticion) {
    case 'insert':
        
        $cita = new Cita(0, $_POST['usuario'], $_POST['fechaCita'], $_POST['motivo']);
        $resultado = $apiCita->insert($cita);
        $data='ok';
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
    /*case 'modificarPerfil':
        $user = new Usuario(null, $_POST['usuario'], null, "usuario", $_POST['nombre'], $_POST['apellidos'], $_POST['email'], $_POST['telefono']);
        $apiUser->update($user);
        $data = 'ok';
        break;*/
    default:
        break;
}

echo json_encode($data);


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
?>