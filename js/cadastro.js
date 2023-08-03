function redirecionarParaLogin() {
  const email = document.getElementById("email-passado").value;
  const urlDestino = `login.html?valor=${encodeURIComponent(email)}`;
  window.location.href = urlDestino;
}

function obterEmail() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("valor");
}

const valorEmail = obterEmail();
document.getElementById("email").value = valorEmail;

function validacao() {
  const email = document.getElementById("email-passado").value;
  const cpf = document.getElementById("cpf").value;
  const cep = document.getElementById("cep").value;
  const senha = document.getElementById("senha").value;
  const checkbox = document.getElementById("checkbox").checked;

  if (
    !cpf ||
    !email ||
    !cep ||
    senha < 4 ||
    !validarCPF(cpf) ||
    !validarFormatoEmail(email) ||
    !validarCEP(cep)
  ) {
    alert(
      "Por favor, preencha todos os campos corretamente antes de continuar."
    );
    return;
  } else if (!checkbox) {
    alert("Por favor, aceite os termos antes de continuar.");
    return;
  } else {
    redirecionarParaLogin();
    return;
  }
}

function validarFormatoEmail(email) {
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return formatoEmail.test(email);
}

function validarCPF(cpf) {
  const formatoCPF = /^\d{11}$/;
  return formatoCPF.test(cpf);
}

function validarCEP(cep) {
  const formatoCEP = /^\d{8}$/;
  return formatoCEP.test(cep);
}
