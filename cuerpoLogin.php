<div class="container mt-5">
    <div class="row col-12 col-lg-7">

        <form method="POST" class="col col-lg-12 mt-5 mb-5 align-self-center" id="formularioLogin">
            <h2>Acceso al área de usuarios</h2>
            <div class="row mb-3">
                <label for="Usuario" class="col-sm-2 col-form-label">Usuario</label><span id="respuestaLogin"></span>
                <div class="col-sm-10 col-12">
                    <input type="text" class="form-control" id="Usuario" name="Usuario">
                </div>
            </div>
            <div class="row mb-3">
                <label for="Password" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="Password" name="Password">
                </div>
            </div>
            <button type="button" id="enviar" class="btn btn-primary">Login</button>
            <div class="row col-6">
                <p>¿No tienes cuenta?</p>
                <p><a href="" title="Alta de usuarios">Regístrate</a></p>
            </div>
        </form>


    </div>
</div>
<script>
    $().ready(function() {
        $('#enviar').click(function() {
            console.log('en login');
            let user = $('#Usuario').val();
            let pass = $('#Password').val();
            let datos = $('#formularioLogin').serialize();
            let url = "verificarLogin.php";
            let dataType = "html";

            $.ajax({

                type: "POST",
                url: url,
                data: datos,

                success: function(data) {
                    if (data == 0) {
                        console.log('login incorrecto');
                        $('#respuesta').html("Usuario o contraseña incorrecta");
                    } else {
                        console.log('logado');
                        $('#Usuario').val('');
                        $('#Password').val('');

                        <?php
                        session_start();
                        if ($_SESSION["valido"] == 'SI') {

                            $respuesta= "<span style='color:white'>Hola " . $_SESSION["usuario"] . "   </span>";
                            $respuesta.= "<a style='color:white'>desconectar</a>";
                        } else {
                            $respuesta= "' no logado '";
                        }

                        ?>

                        document.querySelector('#caja-login').innerHTML ="<?= $respuesta?>";
                    }
                },
                error: function() {
                    console.log("error");
                },
                dataType: dataType

            });

        })
    })
</script>