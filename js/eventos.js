
$(document).ready(function(){ 
     
    $('.ficha').on('click',function(){            
        let fichas = $('.ficha');
        
        fichas.each(function () {
            $(this).addClass('Oculta');
        })
        $(this).css('cursor', 'auto');
        $(this).removeClass('Oculta');
        $(this).css('width', '100%');
        $(this).css('height', '100%');
        $(this).children('.in').css('display','block');
        $(this).children('.img').css('width', '100%');
        $(this).children('.img').css('height', '100%');
        $(this).children('.img').children('img').css('width', '90%');
        $(this).children('.img').children('img').css('height', '90%');
        $(this).children('.texto-imagen').css('display', 'flex');   
        $('.galeria').css('grid-template-columns', '1fr');
    });

    $('.in').on('click',function(){  

        $(this).css('display','none');
        
    })

});

