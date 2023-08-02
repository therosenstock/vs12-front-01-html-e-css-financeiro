const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id")); // Convertemos o ID para um número inteiro

const url = `https://my-json-server.typicode.com/therosenstock/vs12-front-01-html-e-css-financeiro/users/${id}`;

fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Erro ao obter os usuários");
  })
  .then((user) => {
    if (user) {
      render(user);
    }
    render(user);
  })
  .catch((error) => {
    console.log("Erro", error);
  });

function render(user) {
  console.log(user);
  const nomeConta = document.getElementById("nomeConta");
  const agenciaConta = document.getElementById("agenciaConta");
  const contaConta = document.getElementById("contaConta");
  const agenciaContaMB = document.getElementById("agenciaContaMB");
  const contaContaMB = document.getElementById("contaContaMB");
  const saldo = document.getElementById("saldo");

  nomeConta.innerHTML = user.nome;
  agenciaConta.innerHTML = user.agencia;
  contaConta.innerHTML = user.conta;
  agenciaContaMB.innerHTML = user.agencia;
  contaContaMB.innerHTML = user.conta;
  let round = parseFloat(user.saldo);
  round = round.toFixed(2);
  round = round.replace(".", ",");
  saldo.innerHTML = `R$ ${round}`;
}
