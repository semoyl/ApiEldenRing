'use strict';

async function pesquisarClasses() {
    const url = 'https://eldenring.fanapis.com/api/classes?limit=10';

    const response  = await fetch(url)
    const data      = await response.json()

    return data.data
}

async function telaEspecifica(nome){

    const url = 'https://eldenring.fanapis.com/api/classes?name={nome}'

    const response = await fetch(url)
    const data = await response.json()


    const dataDesc = data.data

    return dataDesc
}

function renderizarClasse (classe){

    dataDesc.forEach(function(classe){
        classe.description
        classe.stats.level
        classe.stats.vigor
        classe.stats.mind
        classe.stats.endurance
        classe.stats.strength
        classe.stats.dexterity
        classe.stats.intelligence
        classe.stats.faith
        classe.stats.arcane
        classe.image
    })

    const container     = document.getElementById('containerCards')
    const divImagem     = document.createElement('div')
    const imagenzona    = document.createElement('img')
    const divInfo       = document.createElement('div')
    const title         = document.createElement('h2')
    const description   = document.createElement('h3')
    const stats         = document.createElement('h3')

    imagenzona.src = classe.image
    description.textContent = classe.description
    stats.textContent = "stats"

    divImagem.className  = 'divImage'
    divInfo.className    = 'infos'

    title.textContent = 'Informations'

}


function criarImgLink(dados) {
    const container = document.getElementById('containerCards')
    const card      = document.createElement('div')
    const img       = document.createElement('img')
    const botao     = document.createElement('button')
    const nome      = dados.name

    card.className = 'card'

    botao.onclick = () => telaEspecifica(nome)

    img.src = dados.image 
    img.alt = dados.name
    
    botao.textContent = "See More" 
    card.appendChild(img)
    card.appendChild(botao) 

    container.appendChild(card);
}

async function preencherClasses() {
    const classes = await pesquisarClasses()
    const container = getElementById('containerCards')

    console.log(classes);
    

    classes.forEach(criarImgLink)
    container.replaceChildren('')
}

preencherClasses()