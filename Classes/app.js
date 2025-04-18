'use strict';

async function pesquisarClasses() {
    const url = 'https://eldenring.fanapis.com/api/classes?limit=10';
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
}

async function telaEspecifica(nome) {
    const url = `https://eldenring.fanapis.com/api/classes?name=${encodeURIComponent(nome)}`;
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
    titulo.textContent = `Informações:`;

    const descricao = document.createElement('p');
    descricao.textContent = `Description: ${classe.description}`;

    const stats = document.createElement('div');
    stats.innerHTML = `
        <p><strong>Level:</strong> ${classe.stats.level}</p>
        <p><strong>Vigor:</strong> ${classe.stats.vigor}</p>
        <p><strong>Mind:</strong> ${classe.stats.mind}</p>
        <p><strong>Endurance:</strong> ${classe.stats.endurance}</p>
        <p><strong>Strength:</strong> ${classe.stats.strength}</p>
        <p><strong>Dexterity:</strong> ${classe.stats.dexterity}</p>
        <p><strong>Intelligence:</strong> ${classe.stats.intelligence}</p>
        <p><strong>Faith:</strong> ${classe.stats.faith}</p>
        <p><strong>Arcane:</strong> ${classe.stats.arcane}</p>
    `;

    infos.appendChild(titulo);
    infos.appendChild(descricao);
    infos.appendChild(stats);

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

async function preencherClasses() {
    const classes = await pesquisarClasses();
    const container = document.getElementById('containerCards');

    container.innerHTML = ''; // Limpa para garantir

    classes.forEach(criarImgLink);
}

preencherClasses();