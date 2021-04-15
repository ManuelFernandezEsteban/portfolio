
$(document).ready(function(){ 
     
    $('.ficha').on('click',function(){            
        
        $('.ficha').each(function(){
            $(this).css('display','none');
        })
        $(this).css('display','block');
        $(this).children('.in').css('display','block');
        $(this).css('cursor', 'auto');
        $(this).removeClass('Oculta');//mostramos la imagen seleccionada
        $(this).css('width', '100%');//aumentamos los tamaños
        $(this).css('height', '100%');        
        $(this).children('.img').css('width', '100%');
        $(this).children('.img').css('height', '100%');
        $(this).children('.img').children('img').css('width', '90%');
        $(this).children('.img').children('img').css('height', '90%');
        $(this).children('.texto-imagen').css('display', 'flex');   
        $('.galeria').css('grid-template-columns', '1fr');//ponemos el grid con una sola celda
    });

    $('.in').on('click',function(){          

        $('.ficha').each(function(){
            $(this).css('display','block');            
            console.log(this);
        })
        
        
        

        $(this).css('display','none');
        
    })

});

