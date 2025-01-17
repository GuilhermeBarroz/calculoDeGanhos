function validarEmail(email) {
    return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/.test(email);
}

function validarErroEmail() {
    const email = document.getElementById("iemail");
    const emailInvalido = document.getElementById("emailInvalido");
    const emailObrigatorio = document.getElementById("emailObrigatorio");
    
    if (!email.value) {
        emailObrigatorio.style.display = "block";
        emailInvalido.style.display = "none";
    } else if (!validarEmail(email.value)) {
        emailInvalido.style.display = "block";
        emailObrigatorio.style.display = "none";
    } else {
        emailInvalido.style.display = "none";
        emailObrigatorio.style.display = "none";
    }
    validarCampos();
}

function validarErroSenha() {
    const senha = document.getElementById("isenha");
    const confirmarSenha = document.getElementById("iConfirmarsenha");
    const senhaObrigatoria = document.getElementById("senhaObrigatoria");
    
    if (!senha.value || !confirmarSenha.value) {
        senhaObrigatoria.textContent = "Senha é obrigatória";
        senhaObrigatoria.style.display = "block";
    } else if (senha.value !== confirmarSenha.value) {
        senhaObrigatoria.textContent = "As senhas não conferem";
        senhaObrigatoria.style.display = "block";
    } else {
        senhaObrigatoria.style.display = "none";
    }
    validarCampos();
}

function validarCampos() {
    const nome = document.getElementById("Inome").value;
    const email = document.getElementById("iemail").value;
    const senha = document.getElementById("isenha").value;
    const confirmarSenha = document.getElementById("iConfirmarsenha").value;
    const btnCadastrarse = document.getElementById("iCadastre-se");
    
    // Validações
    const senhasIguais = senha === confirmarSenha;
    const todosPreenchidos = nome && email && senha && confirmarSenha;
    const emailValido = validarEmail(email);
    
    // Habilita/desabilita o botão baseado nas validações
    btnCadastrarse.disabled = !todosPreenchidos || !emailValido || !senhasIguais;
}

// Adiciona os event listeners para todos os campos
document.addEventListener('DOMContentLoaded', function() {
    const campos = {
        'Inome': validarCampos,
        'iemail': validarErroEmail,
        'isenha': validarErroSenha,
        'iConfirmarsenha': validarErroSenha
    };

    for (const [id, func] of Object.entries(campos)) {
        document.getElementById(id).addEventListener('input', func);
    }
});