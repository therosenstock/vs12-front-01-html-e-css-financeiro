const url = 'https://my-json-server.typicode.com/therosenstock/vs12-front-01-html-e-css-financeiro/comments'

const form = document.getElementById('avaliacaoForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const titulo = document.getElementById('titulo').value;
    const comentario = document.getElementById('textarea').value;
    const nota = document.querySelector('li.ativo').textContent;

    const avaliacaoData = {
        nome: nome,
        titulo: titulo,
        nota: nota,
        comentario: comentario,
    }

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(avaliacaoData)
    })

    .then(response => {
        if(!response.ok){
            throw new Error("Erro na resposta da API");
        }
        return response.json();
    })
    .then(data => {
        console.log('Avaliação envada com sucesso',data);
        alert( 'Avaliação envada com sucesso');
    })
    .catch(error => {
        console.alert("Erro ao enviar a avaliação: ", error.message);
        alert( 'Erro ao enviar a avaliação. Tente mais tarde');
    })

})