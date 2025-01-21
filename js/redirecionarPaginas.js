function login() {
    const btnEntrar = document.getElementById("iEntrar");
    
    btnEntrar.addEventListener("click", function(e) {
        e.preventDefault();
        
        const email = document.getElementById("iemail").value;
        const senha = document.getElementById("isenha").value;
        
        exibirLoading();
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(response => {
                esconderLoading();
                window.location.href = "index.html";
            })
            .catch(error => {
                esconderLoading();
                alert(getErrorMessage(error));
            });
    });
}

function getErrorMessage(error){
    if (error.code == 'auth/invalid-login-credentials'){
        return "Usuário não encontrado"
    } else {
        return error.message
    }
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
document.addEventListener("DOMContentLoaded", cadastroRealizado);
