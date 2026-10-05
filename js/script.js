// ==============================
// ELEMENTOS
// ==============================

const nvCandidatura = document.querySelector('#btnNovaCandidatura');
const mlCandidatura = document.querySelector('#modalCandidatura');
const btnFecharMl = document.querySelector('#btnFecharModal');
const formCandidatura = document.querySelector('#formCandidatura');
const listaCandidaturas = document.querySelector('#listaCandidaturas');

const totalCandidaturas = document.querySelector('#totalCandidaturas');
const candidaturasAnalise = document.querySelector('#candidaturasAnalise');
const candidaturasEntrevista = document.querySelector('#candidaturasEntrevista');
const candidaturasAprovadas = document.querySelector('#candidaturasAprovadas');

// Campos do formulário
const cargo = document.querySelector('#cargo');
const empresa = document.querySelector('#empresa');
const localizacao = document.querySelector('#localizacao');
const salario = document.querySelector('#salario');
const dataCandidatura = document.querySelector('#dataCandidatura');
const status = document.querySelector('#status');
const linkVaga = document.querySelector('#linkVaga');
const observacoes = document.querySelector('#observacoes');


// ==============================
// MODAL
// ==============================

// Abre o modal no modo de criação
nvCandidatura.addEventListener('click', function () {
    idEditando = null;
    formCandidatura.reset();
    mlCandidatura.showModal();
});

// Fecha o modal e limpa os dados do formulário
btnFecharMl.addEventListener('click', function () {
    mlCandidatura.close();
    formCandidatura.reset();
});

// Permite fechar o modal ao clicar fora do conteúdo
mlCandidatura.addEventListener('click', function (event) {

    if (event.target === mlCandidatura) {
        mlCandidatura.close();
        formCandidatura.reset();
    }
});


// ==============================
// DADOS
// ==============================

// Identifica a candidatura que está sendo editada
let idEditando = null;

// Fonte de dados das candidaturas
const candidaturas = [];

// Textos exibidos para cada status
const textoStatus = {
    enviada: 'Enviada',
    analise: 'Em análise',
    entrevista: 'Entrevista',
    aprovada: 'Aprovada',
    rejeitada: 'Rejeitada'
};

// Classes CSS associadas aos status
const classeStatus = {
    enviada: 'status--sent',
    analise: 'status--analysis',
    entrevista: 'status--interview',
    aprovada: 'status--approved',
    rejeitada: 'status--rejected'
};


// ==============================
// RENDERIZAÇÃO
// ==============================

function renderizarCandidaturas() {
    listaCandidaturas.innerHTML = '';

    // Reconstrói a lista com base nos dados atuais
    candidaturas.forEach(function (candidatura) {

        const card = document.createElement('article');
        card.classList.add('application-card');

        const conteudo = document.createElement('div');
        conteudo.classList.add('application-card__content');

        // Topo: informações principais e status
        const topo = document.createElement('div');
        topo.classList.add('application-card__top');

        const info = document.createElement('div');

        const titulo = document.createElement('h3');
        titulo.classList.add('application-card__title');
        titulo.textContent = candidatura.cargo;

        const nomeEmpresa = document.createElement('p');
        nomeEmpresa.classList.add('application-card__company-name');
        nomeEmpresa.textContent = candidatura.empresa;

        // Informações complementares
        const dataSpan = document.createElement('span');
        dataSpan.textContent = `📅 ${candidatura.dataCandidatura}`;

        const salarioSpan = document.createElement('span');
        salarioSpan.textContent = `💰 ${candidatura.salario}`;

        const localizacaoSpan = document.createElement('span');
        localizacaoSpan.textContent = `📍 ${candidatura.localizacao}`;

        // Status visual da candidatura
        const statusSpan = document.createElement('span');
        statusSpan.classList.add('status');
        statusSpan.classList.add(classeStatus[candidatura.status]);
        statusSpan.textContent = textoStatus[candidatura.status];


        // ==============================
        // EXCLUSÃO
        // ==============================

        const botaoExcluir = document.createElement('button');
        botaoExcluir.setAttribute('data-action', 'delete');
        botaoExcluir.setAttribute('data-id', candidatura.id);
        botaoExcluir.textContent = 'Excluir';

        botaoExcluir.addEventListener('click', function (event) {

            const id = Number(event.target.dataset.id);

            // Localiza a candidatura pelo ID antes de removê-la
            const indice = candidaturas.findIndex(function (candidatura) {
                return candidatura.id === id;
            });

            candidaturas.splice(indice, 1);

            // Sincroniza os dados com a interface
            renderizarCandidaturas();
            atualizarContadores();
        });


        // ==============================
        // EDIÇÃO
        // ==============================

        const botaoEditar = document.createElement('button');
        botaoEditar.setAttribute('data-action', 'edit');
        botaoEditar.setAttribute('data-id', candidatura.id);
        botaoEditar.textContent = 'Editar';

        botaoEditar.addEventListener('click', function (event) {

            const id = Number(event.target.dataset.id);

            // Localiza a candidatura que será editada
            const indice = candidaturas.findIndex(function (candidatura) {
                return candidatura.id === id;
            });

            const candidatura = candidaturas[indice];

            // Carrega os dados atuais no formulário
            cargo.value = candidatura.cargo;
            empresa.value = candidatura.empresa;
            localizacao.value = candidatura.localizacao;
            salario.value = candidatura.salario;
            dataCandidatura.value = candidatura.dataCandidatura;
            status.value = candidatura.status;
            linkVaga.value = candidatura.linkVaga;
            observacoes.value = candidatura.observacoes;

            idEditando = id;

            mlCandidatura.showModal();
        });


        // ==============================
        // ESTRUTURA DO CARD
        // ==============================

        const detalhes = document.createElement('div');
        detalhes.classList.add('application-card__details');

        const acoes = document.createElement('div');
        acoes.append(botaoExcluir, botaoEditar);

        topo.append(info, statusSpan);
        info.append(titulo, nomeEmpresa);
        detalhes.append(dataSpan, localizacaoSpan, salarioSpan);
        conteudo.append(topo, detalhes, acoes);

        card.append(conteudo);
        listaCandidaturas.append(card);
    });
}


// ==============================
// CONTADORES
// ==============================

function atualizarContadores() {

    const total = candidaturas.length;
    totalCandidaturas.textContent = total;

    // Filtra as candidaturas pelo status e contabiliza os resultados
    const analise = candidaturas.filter(function (candidatura) {
        return candidatura.status === 'analise';
    }).length;

    candidaturasAnalise.textContent = analise;

    const entrevistas = candidaturas.filter(function (candidatura) {
        return candidatura.status === 'entrevista';
    }).length;

    candidaturasEntrevista.textContent = entrevistas;

    const aprovadas = candidaturas.filter(function (candidatura) {
        return candidatura.status === 'aprovada';
    }).length;

    candidaturasAprovadas.textContent = aprovadas;
}


// ==============================
// FORMULÁRIO
// ==============================

formCandidatura.addEventListener('submit', function (event) {
    event.preventDefault();

    // Captura os valores preenchidos pelo usuário
    const valorCargo = cargo.value;
    const valorEmpresa = empresa.value;
    const valorLocalizacao = localizacao.value;
    const valorSalario = salario.value;
    const valorDataCandidatura = dataCandidatura.value;
    const valorStatus = status.value;
    const valorLinkVaga = linkVaga.value;
    const valorObservacoes = observacoes.value;


    // Cria o objeto que representa a candidatura
    const candidatura = {
        cargo: valorCargo,
        empresa: valorEmpresa,
        localizacao: valorLocalizacao,
        salario: valorSalario,
        dataCandidatura: valorDataCandidatura,
        status: valorStatus,
        linkVaga: valorLinkVaga,
        observacoes: valorObservacoes,

        // Mantém o ID durante a edição ou gera um novo para uma candidatura
        // criada do zero
        id: idEditando ?? Date.now()
    };


    // Diferencia uma nova candidatura de uma edição
    if (idEditando === null) {
        candidaturas.push(candidatura);
    } else {

        const indice = candidaturas.findIndex(function (candidatura) {
            return candidatura.id === idEditando;
        });

        candidaturas[indice] = candidatura;
    }


    // Finaliza a operação e atualiza a interface
    mlCandidatura.close();
    formCandidatura.reset();
    idEditando = null;

    renderizarCandidaturas();
    atualizarContadores();
});