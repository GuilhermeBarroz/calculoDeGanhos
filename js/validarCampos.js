function validarCampos() {
    const email = document.getElementById("iemail").value;
    const senha = document.getElementById("isenha").value;
    const btnEntrar = document.getElementById("iEntrar");

    btnEntrar.disabled = !email || !senha || !validarEmail(email);
}

function validarEmail(email) {
    return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/.test(email);
}
