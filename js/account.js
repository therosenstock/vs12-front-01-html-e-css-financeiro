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
  })
  .catch((error) => {
    console.log("Erro", error);
  });

function render(user) {
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
  const body = document.getElementsByTagName("body");
  container.innerHTML = "";
  transacoes.forEach(async (transacao) => {
    let tipos = await renderTipo(transacao.tipo);
    console.log(tipos);
    container.innerHTML += `<div class="transaction">
    <div class="content-aside">
      <div class="transaction-icon">
        <${tipos.tag} ${tipos.icone}"></${tipos.tag}>
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
        ${transacao.sinal} ${transacao.valor}

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${transacao.modal}">
          <i class="ph-fill ph-eye"></i>
        </button>
      </h2>
    </div>
  </div>`;

    body.innerHTML += `  
    <div class="modal fade" id="${transacao.modal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Detalhes</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${transacao.tipo} realizado/recebido em ${transacao.data} às ${transacao.hora}.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
`;
  });
}

async function renderTipo(tipo) {
  let url2 = `https://my-json-server.typicode.com/therosenstock/vs12-front-01-html-e-css-financeiro/tipos`;

  return fetch(url2, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Retorne o JSON da resposta
      }
      throw new Error("Erro ao obter os tipos");
    })
    .then((types) => {
      const tipoEncontrado = types.find((type) => type.tipo === tipo);
      if (tipoEncontrado) {
        return tipoEncontrado;
      }
    })
    .catch((error) => {
      console.log("Erro", error);
    });
}
