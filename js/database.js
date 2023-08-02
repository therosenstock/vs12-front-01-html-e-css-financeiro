const url = `https://my-json-server.typicode.com/therosenstock/vs12-front-01-html-e-css-financeiro/users/`;

const email = "fabiolars2009@hotmail.com";
const senha = "1234";

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
      console.log("Login bem-sucedido:", usuarioEncontrado);
    } else {
      console.log("Credenciais inválidas. Login falhou.");
    }
  })
  .catch((error) => {
    console.error("Erro:", error);
  });
