

function agregarManejadores(){
    let spans = document.querySelectorAll('.card-title');
    spans.forEach(element => {
        addEventListener('click',mostrarOcultar);
    });
    console.log(spans);
}

function mostrarOcultar(){
    let cardImg=document.querySelector('.img-card');
    let cardReveal = document.querySelector('.card-reveal');
    let cardContent=document.querySelector('.card-content');
    if (cardImg.style.visibility=='collapse'){
        cardImg.style.visibility='visible';
        cardReveal.style.visibility='collapse';
        cardContent.style.visibility='visible';
    }else{
        cardImg.style.visibility='collapse';
        cardReveal.style.visibility='visible';
        cardContent.style.visibility='collapse';
    }
}