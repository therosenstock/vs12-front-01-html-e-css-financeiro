function criarCardComentario(comentario) {
  const cardHTML = `
          <div class="card m-5 text" style="width: 14rem; height: 19rem">
            <div class="card-header">
              Avaliações dos clientes
            </div>
          
            <div class="card-body d-flex flex-column ">
                <h5 class="card-title fw-bolder">${comentario.titulo}</h5>
                <p class="card-text "><strong>${comentario.nome}</strong> - Avaliação: ${comentario.nota}</p>
                <p class="card-text">${comentario.comentario}</p>
            </div>
          </div>
  `;
  return cardHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  const commentsRow = document.getElementById("comments");
  commentsRow.innerHTML = "";

  fetch(
    "https://my-json-server.typicode.com/therosenstock/vs12-front-01-html-e-css-financeiro/comments"
  )
    .then((response) => response.json())
    .then((data) => {
      const comentarios = data;
      comentarios.forEach((comentario) => {
        const card = criarCardComentario(comentario);
        commentsRow.innerHTML += card;
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar os comentários:", error.message);
    });
});
