
$(document).ready(function(){ 
     
    $('.caja-disparador p').on('click',function(){
        
        if (fuera){            
            fuera=false;   
            $('.caja-disparador p').css("align-self","center"); 
            $('.noticias').css('flex-grow','0');  //cualquier otro tamaño    
            $('#cajaNoticias').css('display','none');      
            //document.getElementById("cajaNoticias").style.display="none";
            if (screen.width<768){ //tamaño movil
                //document.getElementById("contenedor-secundario").style.display="block";
                $('#contenedor-secundario').css('display','block');
            }
        }else{ 
            fuera=true; 
            if (screen.width=768){//tamaño ipad
                $('.noticias').css('flex-grow','4');
            } 
            if (screen.width<768){//tamaño movil
                //document.getElementById("contenedor-secundario").style.display="none";
                $('#contenedor-secundario').css('display','none');
            }
        else if (screen.width>768){  //tamaño desktop o superior                                 
            $('.noticias').css('flex-grow','3');
            }            
            document.getElementById("cajaNoticias").style.display="block";
            $(".contenido-caja-noticia").each(function(){
                $(this).css("padding-top","20px");                
                $(this).css("margin-left","60px");
                $(this).css("font-family","Ubuntu");
            /* $(this).css("color","white");
                $(this).css("height","auto");*/
            });
            //$(".contenido-caja-noticia h3").css("font-size","2em");
            $("#cajaNoticias").css("padding-top","20px");
            $('.caja-disparador p').css("align-self","start");
            
        }
    })    

});

