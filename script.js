//Inputs de dados
const faturamentoDia = document.getElementById("ifaturamentoDia").value
const kmRodado = document.getElementById("ikmRodado").value
const consumoPorKm = document.getElementById("iconsumoPorKm").value
const precoCombustivel = document.getElementById("iprecoCombustivel").value
const custoAlimentacao = document.getElementById("icustoAlimentacao").value


function calcularConsumoCombustivel(kmRodado, consumoPorKm){
    return kmRodado / consumoPorKm
}

function calcularCustoCombustivel(precoCombustivel, litrosCombustivel){
    return precoCombustivel * litrosCombustivel
}

function calcularFaturamentoPorKm(faturamentoDia, kmRodado){
    return faturamentoDia / kmRodado
}

function calcularLucroDia(faturamentoDia, custoAlimentacao, custoCombustivel){
    return faturamentoDia - custoAlimentacao - custoCombustivel
}



let litrosCombustivel = calcularConsumoCombustivel(kmRodado, consumoPorKm)
let custoCombustivel = calcularCustoCombustivel(precoCombustivel, litrosCombustivel)
let lucroDia = calcularLucroDia(faturamentoDia, custoAlimentacao, custoCombustivel)
let faturamentoPorKm = calcularFaturamentoPorKm(faturamentoDia, kmRodado)

console.log(`O faturamento do dia foi de: R$ ${faturamentoDia}`)
console.log(`O consumo de combustível foi de: ${litrosCombustivel.toFixed(2)} litros`)
console.log(`O custo com combustível foi de: R$ ${custoCombustivel.toFixed(2)}`)
console.log(`O custo com alimentacao foi de: R$ ${custoAlimentacao.toFixed(2)}`)
console.log(`O faturamento por KM foi de: R$ ${faturamentoPorKm.toFixed(2)}`)
console.log(`O lucro do dia foi de: R$ ${lucroDia.toFixed(2)}`)

