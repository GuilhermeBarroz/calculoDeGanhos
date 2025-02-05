function pegarMensagemErro(error){
    if (error.code == 'auth/invalid-login-credentials'){
        return "Usuário não encontrado"
    }
    if(error.code == 'auth/user-not-found'){
        return "Usuário não encontrado";
    } 
    if(error.code == 'auth/missing-email'){
        return "Email inválido"
    }
    if(error.code == 'auth/invalid-emai'){
        return "Email inválido"
    }
    if(error.code == 'auth/weak-password'){
        return "Senha deve ter pelo menos 6 caracteres"
    }
    if(error.code == 'auth/email-already-in-use'){
        return "E-mail ja cadastrado"
    }
    else {
        return error.message
    }
}

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
                alert(pegarMensagemErro(error));
            });
    });
}


function cadastrar(){
    const btnCadastrar = document.getElementById("iCadastrar");
    btnCadastrar.addEventListener("click", function (e){
        e.preventDefault();
        window.location.href = "cadastro.html";
    });
}

function cadastrarUsuario(){
    const btnCadastreSe = document.getElementById("iCadastre-se");

    btnCadastreSe.addEventListener("click", function (e){
        e.preventDefault();

        const email = document.getElementById("iemail").value;
        const senha = document.getElementById("isenha").value;

        exibirLoading();
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(() =>{
            esconderLoading();
            document.getElementById("sucesso").style.display = "block";
            setTimeout(() =>{
            window.location.href = "login.html";
            }, 2000);
        }).catch(error =>{
            esconderLoading();
            alert(pegarMensagemErro(error));
        })
    });
}

function esqueciMinhaSenha(){
    const btnEsqueciMinhaSenha = document.getElementById("iEsqueciMinhaSenha");

    btnEsqueciMinhaSenha.addEventListener("click", function(e){
        e.preventDefault();
        window.location.href = "recuperarSenha.html"
    });

}

function recuperarSenha(){
    const btnRecuperarSenha = document.getElementById("iRecuperarSenha");

    btnRecuperarSenha.addEventListener("click", function(e){
        e.preventDefault()
        
    });
}

document.addEventListener("DOMContentLoaded", recuperarSenha);
document.addEventListener("DOMContentLoaded", esqueciMinhaSenha);
document.addEventListener("DOMContentLoaded", login);
document.addEventListener("DOMContentLoaded", cadastrar);
document.addEventListener("DOMContentLoaded", cadastrarUsuario);
