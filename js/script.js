// Seleção dos elementos
const nvCandidatura = document.querySelector('#btnNovaCandidatura');
const mlCandidatura = document.querySelector('#modalCandidatura');
const btnFecharMl = document.querySelector('#btnFecharModal');
const formCandidatura = document.querySelector('#formCandidatura');

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
        id: Date.now() // útil para identificar depois, ex: ao editar/excluir
    };
    console.log(candidatura);


})