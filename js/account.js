const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id")); // Convertemos o ID para um número inteiro
let icones = [];

const url = `https://my-json-server.typicode.com/therosenstock/vs12-front-01-html-e-css-financeiro/users/${id}`;

fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
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
  renderTransacoes(user.transacoesDebito);
}

function renderTransacoes(transacoes) {
  const container = document.getElementById("list-transaction");
  let list = "";
  transacoes.forEach((transacao) => {
    list += `<div class="transaction">
    <div class="content-aside">
      <div class="transaction-icon">
        <img src="../assets/ico-01.svg" alt="" srcset="">
      </div>
      <div class="transaction-info">
        <span class="notice">${transacao.tipo}</span>
        <h2 class="transaction-title">
          ${transacao.destino}
        </h2>
      </div>
    </div>
    <div class="transation-value">
      <h2 class="value-title ${transacao.classe}">
        - R$ 50,00

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#001">
          <i class="ph-fill ph-eye"></i>
        </button>
      </h2>
    </div>
  </div>`;
  });
}
