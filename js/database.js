const url = `https://my-json-server.typicode.com/therosenstock/vs12-front-01-html-e-css-financeiro/users/`;

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  login(email, senha);
});

async function login(email, senha) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Erro ao obter os usuários");
    })
    .then((users) => {
      const usuarioEncontrado = users.find(
        (user) => user.email === email && user.senha === senha
      );

      if (usuarioEncontrado) {
        window.location.href = `conta.html?id=${usuarioEncontrado.id}`;
      } else {
        alert("Credenciais inválidas. Login falhou.");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}
