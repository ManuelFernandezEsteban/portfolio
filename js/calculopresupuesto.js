const CORPORATIVO = 500;
const PORTFOLIO = 450;
const TIENDA = 700;
const MAGAZINE = 400;
const OPCION = 400;

function calcularPresupuesto() {
    
    let descuento = 0;
    let presupuesto = 0;
    let base = 0;
    let tiempo = 0;
    let tipoPagina = $(':selected').val();
    
    switch (tipoPagina) {
        case 'corporativo':
            base = CORPORATIVO;
            break;
        case 'portfolio':
            base = PORTFOLIO;
            break;
        case 'tienda':
            base = TIENDA;
            break;
        case 'magazine':
            base = MAGAZINE;
            break;
        default:
            base = 0;
            break;
    }
    
    if (base == 0) {
        alert("Seleccione un tipo de web");
    } 
    else 
    {        
        tiempo = $('#plazo').val();        
        if (tiempo < 0) {
            tiempo = 0;
            $('#plazo').val(0);
        }
        switch (tiempo) {
            case '1':
                descuento = 0.05;
                break;
            case '2':
                descuento = 0.1;
                break;
            case '3':
                descuento = 0.15;
                break;
            case '0':
                descuento = 0;
                break;
            default:
                descuento = 0.2;
                break;
        }        
        var extras = $('input:checkbox:checked');
        var valorExtras = 0;
        extras.each(function () {
            if ($(this).prop("id") != "lopd") {
                valorExtras = valorExtras + 400;
            }
        })        
        let rebaja = 0;
        if (descuento != 0) {
            rebaja = (base + valorExtras) * descuento
        }  
        presupuesto=(base+valorExtras)-rebaja;      
        $('#total').val(presupuesto + '€');        
    }
}