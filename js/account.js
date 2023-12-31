const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
let icones = [];
const btnSearch = document.getElementById("btn-search");
const search = document.getElementById("search");

const url = `https://my-json-server.typicode.com/therosenstock/vs12-front-01-html-e-css-financeiro/users/${id}`;

async function load() {
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
}

function render(user) {
  const nomeConta = document.getElementById("nomeConta");
  const agenciaConta = document.getElementById("agenciaConta");
  const contaConta = document.getElementById("contaConta");
  const agenciaContaMB = document.getElementById("agenciaContaMB");
  const contaContaMB = document.getElementById("contaContaMB");
  const saldo = document.getElementById("saldo");
  const fatura = document.getElementById("fatura");
  const limiteUsado = document.getElementById("utilizado");
  const limiteDisponivel = document.getElementById("disponivel");
  const nomePerfil = document.getElementById("nomePerfil");
  const cpfPerfil = document.getElementById("cpfPerfil");
  const enderecoPerfil = document.getElementById("enderecoPerfil");
  const emailPerfil = document.getElementById("emailPerfil");

  nomeConta.innerHTML = user.nome;
  nomePerfil.innerHTML = "Nome: " + user.nome;
  cpfPerfil.innerHTML = "CPF: " + user.cpf;
  enderecoPerfil.innerHTML = `Endereço: ${user.endereco}, 3, ${user.cidadeuf}`;
  emailPerfil.innerHTML = "E-mail: " + user.email;
  agenciaConta.innerHTML = user.agencia;
  contaConta.innerHTML = user.conta;
  agenciaContaMB.innerHTML = user.agencia;
  contaContaMB.innerHTML = user.conta;
  let convert = conversion(user.saldo);
  saldo.innerHTML = `R$ ${convert}`;
  convert = conversion(user.fatura);
  fatura.innerHTML = `R$ ${convert}`;
  convert = conversion(user.limiteUtilizado);
  limiteUsado.innerHTML = `R$ ${convert}`;
  let disponivel = user.limiteCartao - user.limiteUtilizado;
  convert = conversion(disponivel);
  limiteDisponivel.innerHTML = `R$ ${convert}`;
  let width = user.limiteUtilizado / (user.limiteCartao / 100);
  const progresso = document.querySelector("#bar-progress");
  progresso.style.width = `${width}%`;
  renderTransacoes(user.transacoesDebito);
}

function renderTransacoes(transacoes) {
  const container = document.getElementById("list-transaction");
  const div = document.getElementById("modal");
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

    div.innerHTML += `  
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

function conversion(valor) {
  let round = parseFloat(valor);
  round = round.toFixed(2);
  round = round.replace(".", ",");
  return round;
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

search.addEventListener("input", () => {
  if (search.value === "") {
    load();
  } else {
    searchTransaction(search.value);
  }
});
async function searchTransaction(search) {
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
    .then((users) => {
      console.log(users);
      const transacaoEncontrada = users.transacoesDebito.filter(
        (user) => user.destino === search
      );
      console.log(transacaoEncontrada);
      if (transacaoEncontrada) {
        renderTransacoes(transacaoEncontrada);
      }
    })
    .catch((error) => {
      console.log("Erro", error);
    });
}
function verificarSenha() {
  const atual = document.getElementById("atual").value;
  const nova = document.getElementById("nova").value;
  const confirme = document.getElementById("confirme").value;
  const resposta = document.getElementById("respostaSenha");
  if (atual.length < 4) {
    resposta.style.color = "red";
    resposta.innerHTML = "Senha atual incorreta!";
  } else if (nova == confirme) {
    resposta.style.color = "green";
    resposta.innerHTML = "Senha alterada com sucesso!";
  } else {
    resposta.style.color = "red";
    resposta.innerHTML = "As senhas não conferem!";
  }
}
load();

function transferir() {
  const conta = document.getElementById("contaTransferencia").value;
  const agencia = document.getElementById("agenciaTransferencia").value;
  const valor = document.getElementById("valorTransferencia").value;
  const alerta = document.getElementById("alerta");

  if (!conta.trim() || !agencia.trim() || !valor.trim()) {
    mostrarAlerta("Preencha os campos");
  } else {
    mostrarAlerta("Transação realizada com sucesso!", alerta);
    limparTransferencia();
  }
}
function limparTransferencia() {
  document.getElementById("contaTransferencia").value = "";
  document.getElementById("agenciaTransferencia").value = "";
  document.getElementById("valorTransferencia").value = "";
}

function pix() {
  const cpf = document.getElementById("cpfPix").value;
  const celular = document.getElementById("celularPix").value;
  const aleatoria = document.getElementById("aleatoriaPix").value;
  const pixTransferencia = document.getElementById("pixTransferencia").value;
  const alerta3 = document.getElementById("alerta3");

  if (
    (!cpf.trim() && !celular.trim() && !aleatoria.trim()) ||
    !pixTransferencia.trim()
  ) {
    mostrarAlerta("Preencha os campos", alerta3);
  } else {
    mostrarAlerta("Transação realizada com sucesso!", alerta3);
    limparPix();
  }
}

function limparPix() {
  document.getElementById("cpfPix").value = "";
  document.getElementById("celularPix").value = "";
  document.getElementById("aleatoriaPix").value = "";
  document.getElementById("pixTransferencia").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  const chavesPix = document.querySelectorAll(".chavePix");

  chavesPix.forEach((input) => {
    input.addEventListener("input", function () {
      if (input.value.trim() !== "") {
        chavesPix.forEach((otherInput) => {
          if (otherInput !== input) {
            otherInput.disabled = true;
          }
        });
      } else {
        chavesPix.forEach((otherInput) => {
          otherInput.disabled = false;
        });
      }
    });
  });
});

function boleto() {
  const codigo = document.getElementById("codigoBoleto").value;
  const descricao = document.getElementById("descricaoBoleto").value;
  const valor = document.getElementById("valorBoleto").value;
  const alerta2 = document.getElementById("alerta2");
  if (codigo == "" || descricao == "" || valor == "") {
    console.log("entra no if");
    mostrarAlerta("Preencha os campos", alerta2);
  } else {
    console.log("else da massa");
    mostrarAlerta("Transação realizada com sucesso!", alerta2);
    limparBoleto();
  }
}

function limparBoleto() {
  document.getElementById("codigoBoleto").value = "";
  document.getElementById("descricaoBoleto").value = "";
  document.getElementById("valorBoleto").value = "";
}

function mostrarAlerta(texto, alerta) {
  alerta.classList.add("show");
  alerta.innerText = texto;

  setTimeout(() => {
    alerta.classList.remove("show");
  }, 2000);
}
