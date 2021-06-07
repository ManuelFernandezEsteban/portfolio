<div class="container mt-5">
    <div class="row col-12 col-lg-7">
        <form method="POST" class="col col-lg-12 mt-5 mb-5 align-self-center" id="formularioAltaUsuario">
            <h2>Regístrate como usuario</h2>
            <p>Acceso a nuevos usuarios solo para clientes.</p>
            <div class="row mb-3">
                <label for="emailAlta" class="col-sm-2 col-form-label">Email</label><span id="respuestaLogin"></span>
                <div class="col-sm-10 col-12">
                    <input type="text" class="form-control" id="emailAlta" name="emailAlta">
                </div>
            </div>
            <div class="row mb-3">
                <label for="dniAlta" class="col-sm-2 col-form-label">DNI</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="dniAlta" name="dniAlta">
                </div>
            </div>
            <button type="button" id="enviarAlta" class="btn btn-primary">Enviar</button>
            <button type="reset" id="cancelarAlta" class="btn btn-primary">Cancelar</button>
        </form>
    </div>
</div>


<script>
    $().ready(function() {
        
        const desplegarAltaUsuario = (data) =>{

        }

        const cajaAltaLogin = document.querySelector(".oculta");
        

        $('#enviarAlta').click(function() {
            console.log('en alta');
            let user = $('#emailAlta').val();
            let pass = $('#dniAlta').val();
            let datos = $('#formularioAltaUsuario').serialize();
            let url = "verificarCliente.php";
            let dataType = "json";
            /*const cajaRespuesta = document.querySelector('#caja-login');;
            let enlace;
            let parrafo;*/

            $.ajax({

                type: "POST",
                url: url,
                data: datos,

                success: function(data) {
                    if (data.status == 'ok') {
                    
                        console.log('alta');
                        /*$('#Usuario').val('');
                        $('#Password').val('');*/
                        desplegarAltaUsuario(data);                        
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
