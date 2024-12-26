function validarCampos() {
    const email = document.getElementById("iemail").value;
    const senha = document.getElementById("isenha").value;
    const btnEntrar = document.getElementById("iEntrar");

    btnEntrar.disabled = !email || !senha || !validarEmail(email);
}

function ValidarErroEmail(){
    const email = document.getElementById("iemail").value;
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

function ValidarErroSenha(){
    const senha = document.getElementById("isenha").value;
    if(!senha){
        document.getElementById("senhaObrigatoria").style.display = "block"
    } else{
        document.getElementById("senhaObrigatoria").style.display = "none"
    }
}

function validarEmail(email) {
    return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/.test(email);
}
