function validarEmail(email) {
    return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/.test(email);
}

function validarCampos() {
    const email = document.getElementById("iemailRecuperar").value;
    const btnRecuperarSenha = document.getElementById("iRecuperarSenha");

    btnRecuperarSenha.disabled = !email || !validarEmail(email);
}


function ValidarErroEmail(){
    const email = document.getElementById("iemailRecuperar").value;
    if(!email){
        document.getElementById("emailObrigatorio").style.display = "block";
    } else if (email){
        document.getElementById("emailObrigatorio").style.display = "none";
    }

    if(validarEmail(email)){
        document.getElementById("emailInvalido").style.display = "none";
    } else {
        document.getElementById("emailInvalido").style.display = "block";
    }
}