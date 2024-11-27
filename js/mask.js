$(document).ready(function(){
    $('#ifaturamentoDia').on('input', function() {
        var faturamentodia = $(this).val();
        
        if (faturamentodia.length === 4) {
            $(this).mask('00.00');
        } else if (faturamentodia.length === 5) {
            $(this).mask('000.00');
        } else if (faturamentodia.length === 6){
            $(this).mask('0000.00')
        }
    });

    $('#ikmRodado').on('input', function(){
        var kmrodado = $(this).val();

        if (kmrodado.length === 4){
            $(this).mask('00.00');
        } else if (kmrodado.length === 5){
            $(this).mask('000.00');
        } else if (kmrodado.length === 6){
            $(this).mask('0000.00');
        }
    });

    $('#iprecoCombustivel').on('input', function(){
        var precoCombustivel = $(this).val();

        if (precoCombustivel.length === 3){
            $(this).mask('0.00');
        } else if (precoCombustivel.length === 4){
            $(this).mask('00.00');
        }
    });

    $('#iconsumoPorKm').mask('00.00');

    $('#icustoAlimentacao').mask('00.00')

});