function exibirLoading(){
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.classList.add("loading");
    span.classList.add("spinner-grow");

    // Adiciona o div ao body
    document.body.appendChild(div);

    // Adiciona o span como filho do div
    div.appendChild(span);
    setTimeout(5000)
}

function esconderLoading(){
    const loadings = document.getElementsByClassName("loading", "spinner-grow");
    if(loadings.length){
        loadings[0].remove();
    }
}