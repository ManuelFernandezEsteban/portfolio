$(document).ready(function () {
    const REFERENCIAMAIN = $('main');

    REFERENCIAMAIN.on('click', '.caja-disparador p', function () { //controla el despligue del aside de noticias

        if (fuera) {
            fuera = false;
            $('.caja-disparador p').css("align-self", "center");
            $('.caja-disparador p').css('top', '50%');
            $('.caja-disparador p').css('transform', 'rotate(270deg)');
            $('.noticias').css('flex-grow', '0');  //cualquier otro tamaño    
            $('#cajaNoticias').css('display', 'none');
            if (screen.width < 768) { //tamaño movil
                $('#contenedor-secundario').css('display', 'block');
            }
        }
        else {
            escribirNoticia();
            fuera = true;
            if (screen.width = 768) {//tamaño ipad
                $('.noticias').css('flex-grow', '4');
            }
            if (screen.width < 768) {//tamaño movil                    
                $('#contenedor-secundario').css('display', 'none');
            }
            if (screen.width > 768) {  //tamaño desktop                                   
                $('.noticias').css('flex-grow', '3');
            }
            if (screen.width > 1200) {  //tamaño desktop                                   
                $('.noticias').css('flex-grow', '2');
            }
            $('#cajaNoticias').css('display', 'block');
            $('#cajaNoticias').css('padding-top', '0px');
            $('.caja-disparador p').css('align-self', 'start');
            $('.caja-disparador p').css('top', '0');
            $('.caja-disparador p').css('transform', 'rotate(0deg)');
        }
    })

    $('#boton-bienvenida').on('click', function () {

        $('.caja-bienvenida').css('display', 'none');
    });

    $('.caja-logo a').on('click', function (event) {

        event.preventDefault();
        let destino = ($(this).attr('href'));
        navega(destino);
    });

    $('.menu-enlace').on('click', function (event) {

        event.preventDefault();
        let destino = ($(this).attr('href'));
        $('.seleccionado').removeClass('seleccionado');
        $(this).addClass('seleccionado');
        $('#opcion').empty();
        console.log(destino);
        switch (destino) {
            case "cuerpoInicio.html":
                $('#opcion').append("Home");
                break;
            case "cuerpoPortfolio.html":
                $('#opcion').append("Portfolio");
                break;
            case "cuerpoProyectos.html":
                $('#opcion').append("Proyectos");
                break;
            case "cuerpoContacto.html":
                $('#opcion').append("Contacto");
                break;
            case "cuerpoPresupuesto.html":
                $('#opcion').append("Presupuesto");
                break;
            case "cuerpoLogin.html":
                $('#opcion').append("Área usuarios");
                break;
            default:
                $('#opcion').append("Home");
                break;
        }
        $('.menuresponsive').children('input').prop('checked', false);
        if (destino == 'cuerpoLogin.html') {
            console.log(user);
            if (user != null) {

                let datos = user;
                let url = "verificarSiLogado.php";
                let dataType = "text";
                console.log("comnprobar si logado");
                $.ajax({

                    type: "POST",
                    url: url,
                    data: datos,
                    success: function (data) {

                        if (data == 'ok') {

                            console.log(user.roleLog);
                            destino = "usuariosAdmin.html";
                        }
                        navega(destino);
                    },
                    error: function () {
                        console.log("error");
                    },
                    dataType: dataType
                });
            }

        }
        navega(destino);

    });

    $(window).resize(function () {//cerramos el panel de noticias

        if (fuera) {
            fuera = false;
            $('.caja-disparador p').css("align-self", "center");
            $('.caja-disparador p').css('top', '50%');
            $('.caja-disparador p').css('transform', 'rotate(270deg)');
            $('.noticias').css('flex-grow', '0');  //cualquier otro tamaño    
            $('#cajaNoticias').css('display', 'none');
            if (screen.width < 768) { //tamaño movil
                $('#contenedor-secundario').css('display', 'block');
            }
        }
    });

    $('.ficha').on('click', function () {

        let fichas = $('.ficha');
        fichas.each(function () {
            $(this).addClass('Oculta');
        })
        $(this).css('cursor', 'auto');
        $(this).removeClass('Oculta');
        $(this).css('width', '100%');
        $(this).css('height', '100%');
        $(this).children('.in').css('display', 'block');
        $(this).children('.img').css('width', '100%');
        $(this).children('.img').css('height', '100%');
        $(this).children('.img').children('img').css('width', '90%');
        $(this).children('.img').children('img').css('height', '90%');
        $(this).children('.texto-imagen').css('display', 'flex');
        $('.galeria').css('grid-template-columns', '1fr');
    });

    $('.in').on('click', function () {

        $(this).css('display', 'none');

    });




});