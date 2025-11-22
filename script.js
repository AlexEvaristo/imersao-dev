const cardContainer = document.querySelector(".card-container");
let dados = [];

// Função que carrega os dados iniciais e prepara o ambiente
async function inicializar() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Exibe todos os cards inicialmente
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        cardContainer.innerHTML = "<p>Não foi possível carregar os dados.</p>";
    }
}

// Função chamada pelo onclick do botão "Buscar"
function iniciarBuscar() {
    const caixaBusca = document.querySelector("#caixa-busca"); // Adicionado id no HTML
    const termoBusca = caixaBusca.value.toLowerCase();

    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

// Função que cria e exibe os cards na tela
function renderizarCards(dadosParaExibir) {
    cardContainer.innerHTML = ""; // Limpa a tela antes de mostrar os resultados
    dadosParaExibir.forEach(dado => {
        cardContainer.innerHTML += `
            <article class="card">
                <h2>${dado.nome}</h2>
                <p>Ano: ${dado.data_criacao}</p>
                <p>${dado.descricao}</p>
                <a href="${dado.link}" target="_blank">Saiba mais</a>
            </article>
        `;
    });
}

// Inicia tudo quando a página carrega
inicializar();