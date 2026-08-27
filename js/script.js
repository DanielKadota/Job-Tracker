const nvCandidatura = document.querySelector('#btnNovaCandidatura');
const mlCandidatura = document.querySelector('#modalCandidatura');
const btnFecharMl = document.querySelector('#btnFecharModal');

nvCandidatura.addEventListener('click' ,function() {

    mlCandidatura.showModal();

})

btnFecharMl.addEventListener('click', function(){
    
    mlCandidatura.close();
})