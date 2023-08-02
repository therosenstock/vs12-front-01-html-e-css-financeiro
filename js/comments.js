function criarCardComentario(comentario) {
  const cardHTML = `
      <div class="col-md-4 mb-4">
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${comentario.titulo}</h5>
                  <p class="card-text"><strong>${comentario.nome}</strong> - Avaliação: ${comentario.nota}</p>
                  <p class="card-text">${comentario.comentario}</p>
              </div>
          </div>
      </div>
  `;
  return cardHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  const commentsRow = document.getElementById('commentsRow');
  commentsRow.innerHTML = ''; 
  
  fetch('https://my-json-server.typicode.com/therosenstock/vs12-front-01-html-e-css-financeiro/comments')
      .then(response => response.json())
      .then(data => {
          const comentarios = data;
          comentarios.forEach(comentario => {
              const card = criarCardComentario(comentario);
              commentsRow.innerHTML += card;
          });
      })
      .catch(error => {
          console.error('Erro ao buscar os comentários:', error.message);
      });
});
