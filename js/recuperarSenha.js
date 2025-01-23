function recuperarSenha(){
    const email = document.getElementById("iemailRecuperar").value;

    exibirLoading();
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        esconderLoading();
        document.getElementById("sucesso").style.display = "block";
        setTimeout(() =>{
            window.location.href = "login.html";
        }, 2000);
        
    })
    .catch(error => {
        esconderLoading();
        alert(pegarMensagemErro(error));
    })
}