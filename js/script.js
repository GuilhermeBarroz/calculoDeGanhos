document.addEventListener("submit", (event) =>{
    event.preventDefault()

    //Inputs de dados
    const faturamentoDia = Number(document.getElementById("ifaturamentoDia").value);
    const kmRodado = Number(document.getElementById("ikmRodado").value)
    const consumoPorKm = Number(document.getElementById("iconsumoPorKm").value);
    const precoCombustivel = Number(document.getElementById("iprecoCombustivel").value);
    const custoAlimentacao = Number(document.getElementById("icustoAlimentacao").value);

    function calcularConsumoCombustivel(kmRodado, consumoPorKm){
        return kmRodado / consumoPorKm;
    }
    
    function calcularCustoCombustivel(precoCombustivel, litrosCombustivel){
        return precoCombustivel * litrosCombustivel;
    }
    
    function calcularFaturamentoPorKm(faturamentoDia, kmRodado){
        return faturamentoDia / kmRodado;
    }
    
    function calcularLucroDia(faturamentoDia, custoAlimentacao, custoCombustivel){
        return faturamentoDia - custoAlimentacao - custoCombustivel;
    }


    let exibirResultados = document.querySelector(".span");
        exibirResultados.style.display = "block";

    let litrosCombustivel = calcularConsumoCombustivel(kmRodado, consumoPorKm);
    let custoCombustivel = calcularCustoCombustivel(precoCombustivel, litrosCombustivel);
    let lucroDia = calcularLucroDia(faturamentoDia, custoAlimentacao, custoCombustivel);
    let faturamentoPorKm = calcularFaturamentoPorKm(faturamentoDia, kmRodado);

    document.getElementById("resultadoFaturamentoDia").innerHTML = `O faturamento do dia foi de: R$ ${faturamentoDia.toFixed(2)}`;
    document.getElementById("resultadoConsumoCombustivel").innerHTML = `O consumo de combustível foi de: ${litrosCombustivel.toFixed(2)} litros`;
    document.getElementById("resultadoCustoCombustivel").innerHTML = `O custo com combustível foi de: R$ ${custoCombustivel.toFixed(2)}`;
    document.getElementById("resultadoCustoAlimentacao").innerHTML = `O custo com alimentação foi de: R$ ${custoAlimentacao.toFixed(2)}`;
    document.getElementById("resultadoFaturamentoPorKm").innerHTML = `O faturamento por KM foi de: R$ ${faturamentoPorKm.toFixed(2)}`;
    document.getElementById("resultadoLucroDia").innerHTML = `O lucro do dia foi de: R$ ${lucroDia.toFixed(2)}`;

});


document.addEventListener("reset", (e) =>{
    function limparInputs(){
        let inputs = document.querySelectorAll(".form-control");
        inputs.forEach(input => {
            input.value = "";
        });

        let exibirResultados = document.querySelector(".span");
        exibirResultados.style.display = "none";
    }

    limparInputs();
});