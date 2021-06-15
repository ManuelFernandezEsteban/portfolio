<?php


include_once('apiUsuarios.php');

$apiUser = new apiUsuarios();

//$peticion = $_POST["operacion"] ;

if ($_POST["operacion"]=="insert"){

   $apiUser->insert($_POST['NuevoUsuario'],$_POST['NuevoUserPassword'],"usuario");
   $data='ok';
   //$data['result']=  $res ;

}else{
    $data='error';
}

if ($_POST["operacion"]=="consultaNombreUsuario"){
    $rest = $apiUser->getByName($_POST['NombreUsuario']);
    if (sizeof($rest)>0) {
        $data = 0;        
    }else{
        $data = 1;
    }    
}
echo ($data);

?>