'use strict';

async function pesquisarClasses() {
    const url = 'https://eldenring.fanapis.com/api/classes?limit=10';
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

function criarImgLink(fotoimg) {
    const container = document.getElementById('container-cards');
    const card = document.createElement('div');
    const img = document.createElement('img');
    const botao = document.createElement('button');

    card.className = 'card';

    img.src = fotoimg.image;
    img.alt = fotoimg.name;

    botao.textContent = "See More";
    botao.addEventListener('click', () => carregarDetalhesClasse(fotoimg.name));

    card.appendChild(img);
    card.appendChild(botao);
    container.appendChild(card);
}

async function carregarDetalhesClasse(nomeClasse) {
    const url = `https://eldenring.fanapis.com/api/classes?name=${nomeClasse}`;
    const response = await fetch(url);
    const data = await response.json();
    const classe = data.data[0];

    const container = document.getElementById('container');
    
    // Criando a estrutura dos detalhes
    const detalhesDiv = document.createElement('div');
    detalhesDiv.className = 'detalhes-classe';

    const img = document.createElement('img');
    img.src = classe.image;
    img.alt = classe.name;
    img.className = 'classe-imagem';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'classe-info';

    const titulo = document.createElement('h2');
    titulo.textContent = classe.name;

    const descricao = document.createElement('p');
    descricao.textContent = `Description: ${classe.description}`;

    const statsTitulo = document.createElement('h3');
    statsTitulo.textContent = "Stats:";

    const statsContainer = document.createElement('div');
    Object.keys(classe.stats).forEach(stat => {
        const p = document.createElement('p');
        p.textContent = `${stat}: ${classe.stats[stat]}`;
        statsContainer.appendChild(p);
    });

    // Botão de voltar
    const botaoVoltar = document.createElement('button');
    botaoVoltar.textContent = "Voltar";
    botaoVoltar.addEventListener('click', preencherClasses);

    // Montando a estrutura
    infoDiv.appendChild(titulo);
    infoDiv.appendChild(descricao);
    infoDiv.appendChild(statsTitulo);
    infoDiv.appendChild(statsContainer);
    infoDiv.appendChild(botaoVoltar);

    detalhesDiv.appendChild(img);
    detalhesDiv.appendChild(infoDiv);

    // Substituir os elementos no container
    container.replaceChildren(detalhesDiv);
}

async function preencherClasses() {
    const classes = await pesquisarClasses();
    const container = document.getElementById('container');

    // Criando novo container para os cards
    const novoContainer = document.createElement('div');
    novoContainer.id = 'container-cards';

    classes.forEach(fotoimg => criarImgLink(fotoimg));

    // Substituir os elementos no container principal
    container.replaceChildren(novoContainer);
}

// Iniciar a tela com as classes
preencherClasses();
