// ELEMENTOS
const nvCandidatura = document.querySelector('#btnNovaCandidatura');
const mlCandidatura = document.querySelector('#modalCandidatura');
const btnFecharMl = document.querySelector('#btnFecharModal');
const formCandidatura = document.querySelector('#formCandidatura');
const listaCandidaturas = document.querySelector('#listaCandidaturas');

// Campos do formulário
const cargo = document.querySelector('#cargo');
const empresa = document.querySelector('#empresa');
const localizacao = document.querySelector('#localizacao');
const salario = document.querySelector('#salario');
const dataCandidatura = document.querySelector('#dataCandidatura');
const status = document.querySelector('#status');
const linkVaga = document.querySelector('#linkVaga');
const observacoes = document.querySelector('#observacoes');


// MODAL
nvCandidatura.addEventListener('click', function () {
    mlCandidatura.showModal();
});

btnFecharMl.addEventListener('click', function () {
    mlCandidatura.close();
    formCandidatura.reset();
});

// Fecha ao clicar fora do modal
mlCandidatura.addEventListener('click', function (event) {

    if (event.target === mlCandidatura) {
        mlCandidatura.close();
        formCandidatura.reset();
    }
})


// DADOS
const candidaturas = [];

const textoStatus = {
    enviada: 'Enviada',
    analise: 'Em análise',
    entrevista: 'Entrevista',
    aprovada: 'Aprovada',
    rejeitada: 'Rejeitada'
};

const classeStatus = {
    enviada: 'status--sent',
    analise: 'status--analysis',
    entrevista: 'status--interview',
    aprovada: 'status--approved',
    rejeitada: 'status--rejected'
};


// RENDERIZAR CARDS
function renderizarCandidaturas() {
    listaCandidaturas.innerHTML = '';

    candidaturas.forEach(function (candidatura) {

        const card = document.createElement('article');
        card.classList.add('application-card');

        const conteudo = document.createElement('div');
        conteudo.classList.add('application-card__content');

        // Topo: título e empresa + badge
        const topo = document.createElement('div');
        topo.classList.add('application-card__top');

        const info = document.createElement('div');

        const titulo = document.createElement('h3');
        titulo.classList.add('application-card__title');
        titulo.textContent = candidatura.cargo;

        const nomeEmpresa = document.createElement('p');
        nomeEmpresa.classList.add('application-card__company-name');
        nomeEmpresa.textContent = candidatura.empresa;

        // Detalhes
        const dataSpan = document.createElement('span');
        dataSpan.textContent = `📅 ${candidatura.dataCandidatura}`;

        const salarioSpan = document.createElement('span');
        salarioSpan.textContent =`💰 ${candidatura.salario}`;

        const localizacaoSpan = document.createElement('span');
        localizacaoSpan.textContent = `📍 ${candidatura.localizacao}`;

        // Badge de status
        const statusSpan = document.createElement('span');
        statusSpan.classList.add('status');
        statusSpan.classList.add(classeStatus[candidatura.status]);
        statusSpan.textContent = textoStatus [candidatura.status];


        const detalhes = document.createElement('div');
        detalhes.classList.add('application-card__details');

        // Montagem do card
        topo.append(info , statusSpan);
        info.append(titulo, nomeEmpresa);
        detalhes.append(dataSpan, localizacaoSpan, salarioSpan);
        conteudo.append(topo , detalhes);

        card.append(conteudo);
        listaCandidaturas.append(card);

    }); 
}


// SALVAR CANDIDATURA
formCandidatura.addEventListener('submit', function (event) {
    event.preventDefault();

    const valorCargo = cargo.value;
    const valorEmpresa = empresa.value;
    const valorLocalizacao = localizacao.value;
    const valorSalario = salario.value;
    const valorDataCandidatura = dataCandidatura.value;
    const valorStatus = status.value;
    const valorLinkVaga = linkVaga.value;
    const valorObservacoes = observacoes.value;


    const candidatura = {
        cargo: valorCargo,
        empresa: valorEmpresa,
        localizacao: valorLocalizacao,
        salario: valorSalario,
        dataCandidatura: valorDataCandidatura,
        status: valorStatus,
        linkVaga: valorLinkVaga,
        observacoes: valorObservacoes,
        id: Date.now()
    };

    candidaturas.push(candidatura);
    mlCandidatura.close();
    formCandidatura.reset();

    renderizarCandidaturas();
});