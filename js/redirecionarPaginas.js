function login(){
    const btnEntrar = document.getElementById("iEntrar");
    btnEntrar.addEventListener("click", function (e){
        e.preventDefault();
        window.location.href = "index.html";
    });
}

function cadastrar(){
    const btnCadastrar = document.getElementById("iCadastrar");

    btnCadastrar.addEventListener("click", function (e){
        e.preventDefault();
        window.location.href = "cadastro.html";
    });
}

function cadastroRealizado(){
    const btnCadastreSe = document.getElementById("iCadastre-se");

    btnCadastreSe.addEventListener("click", function (e){
        e.preventDefault();
        window.location.href = "login.html";
    });
}

document.addEventListener("DOMContentLoaded", login);
document.addEventListener("DOMContentLoaded", cadastrar);
