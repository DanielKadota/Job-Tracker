// Seleção dos elementos
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

// Abrir modal
nvCandidatura.addEventListener('click', function () {
    mlCandidatura.showModal();
});

// Fechar modal (botão)
btnFecharMl.addEventListener('click', function () {
    mlCandidatura.close();
    formCandidatura.reset();
});
mlCandidatura.addEventListener('click', function (event) {

    if (event.target === mlCandidatura) {
        mlCandidatura.close();
        formCandidatura.reset();
    }
})

const candidaturas = [];

function renderizarCandidaturas() {
    listaCandidaturas.innerHTML = '';   // limpa a lista antes de desenhar

    candidaturas.forEach(function (candidatura) {

        const card = document.createElement('article');
        card.classList.add('application-card');

        const conteudo = document.createElement('div');
        conteudo.classList.add('application-card__content');

        const titulo = document.createElement('h3');
        titulo.classList.add('application-card__title');
        titulo.textContent = candidatura.cargo;

        const nomeEmpresa = document.createElement('p');
        nomeEmpresa.classList.add('application-card__company-name');
        nomeEmpresa.textContent = candidatura.empresa;

        const dataSpan = document.createElement('span');
        dataSpan.textContent = `📅 ${candidatura.dataCandidatura}`;

        const salarioSpan = document.createElement('span');
        salarioSpan.textContent =`💰 ${candidatura.salario}`;

        const localizacaoSpan = document.createElement('span');
        localizacaoSpan.textContent = `📍 ${candidatura.localizacao}`;


        const detalhes = document.createElement('div');
        detalhes.classList.add('application-card__details');

        detalhes.append(dataSpan, localizacaoSpan, salarioSpan);
        conteudo.append(titulo, nomeEmpresa, detalhes);

        card.append(conteudo);
        listaCandidaturas.append(card);

    });
}


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
        id: Date.now() // Cria um id para cada 1 das candidaturas
    };

    candidaturas.push(candidatura);
    mlCandidatura.close();
    formCandidatura.reset();// para poder fechar o modal após salvar 



    renderizarCandidaturas();
});


