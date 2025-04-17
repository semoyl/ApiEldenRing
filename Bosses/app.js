'use strict';

async function pesquisarChefe() {
    const url = 'https://eldenring.fanapis.com/api/bosses';
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

async function telaEspecifica(nome) {
    const url = `https://eldenring.fanapis.com/api/bosses?name=${encodeURIComponent(nome)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
        alert("Classe não encontrada");
        return;
    }

    const classe = data.data[0];
    const container = document.getElementById('containerCards');
    container.innerHTML = ''; // Limpa a tela

    const tela = document.createElement('div');
    tela.id = 'telaEspecifica';

    const img = document.createElement('img');
    img.src = classe.image;

    const infos = document.createElement('div');
    infos.id = 'infosClasse';

    const titulo = document.createElement('h2');
    titulo.textContent = `Informações sobre: ${classe.name}`;

    const descricao = document.createElement('p');
    descricao.textContent = `Descrição: ${classe.description}`;

    const localizacao = document.createElement('p');
    localizacao.textContent = `Localização: ${classe.location}`;

    const drops = document.createElement('p');
    drops.textContent = `Itens que caem: ${classe.drops.join(', ')}`;

    const vida = document.createElement('p');
    vida.textContent = `Pontos de Vida: ${classe.healthPoints}`;

    infos.appendChild(titulo);
    infos.appendChild(descricao);
    infos.appendChild(localizacao);
    infos.appendChild(drops);
    infos.appendChild(vida);

    tela.appendChild(img);
    tela.appendChild(infos);

    container.appendChild(tela);
}

function criarImgLink(dados) {
    const container = document.getElementById('containerCards');
    const card = document.createElement('div');
    const img = document.createElement('img');
    const botao = document.createElement('button');

    card.className = 'card';

    img.src = dados.image;
    img.alt = dados.name;

    botao.textContent = "See More";
    botao.onclick = () => telaEspecifica(dados.name);

    card.appendChild(img);
    card.appendChild(botao);
    container.appendChild(card);
}

async function preencherChefe() {
    const classes = await pesquisarChefe();
    const container = document.getElementById('containerCards');

    container.innerHTML = ''; // Limpa para garantir

    classes.forEach(criarImgLink);
}

preencherChefe();
