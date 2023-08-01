let cep = document.getElementById("cep");

function setCEP(result) {
  console.log(result);
  let logradouro = document.getElementById("logradouro");
  let bairro = document.getElementById("bairro");
  let cidade = document.getElementById("cidade");

  logradouro.value = result.logradouro;
  bairro.value = result.bairro;
  cidade.value = `${result.localidade} - ${result.uf}`;
}

cep.addEventListener("blur", (event) => {
  let search = cep.value;
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };
  url = `https://viacep.com.br/ws/${search}/json/`;
  fetch(url, options)
    .then((response) => {
      response.json().then((data) => setCEP(data));
    })
    .catch((event) => console.log("CEP não encontrado" + event.message));
});
