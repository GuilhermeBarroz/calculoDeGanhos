function cadastrarUsuario(){
    const nomeCompleto = document.getElementById("Inome").value;
    const email = document.getElementById("iemail").value;
    const senha = document.getElementById("isenha").value;
    const btnCadastreSe = document.getElementById("iCadastre-se");

    exibirLoading();
    btnCadastreSe.addEventListener("click", function (e){
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(() =>{
            esconderLoading();
            window.location.href = "login.html"
        }).catch(error =>{
            esconderLoading();
            alert(pegarMensagemErro(error));
        })
    })
    
}

function pegarMensagemErro(){
    return error.message;
}

document.addEventListener("DOMContentLoaded", cadastrarUsuario());


// const btnCadastreSe = document.getElementById("iCadastre-se");
// function cadastroRealizado(){

//     btnCadastreSe.addEventListener("click", function (e){
//         e.preventDefault();
//         window.location.href = "login.html";
//     });
// }