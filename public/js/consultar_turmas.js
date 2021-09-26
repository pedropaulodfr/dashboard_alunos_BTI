function PegarNomeDisciplinas(params) {
    let dadosDisciplinas = document.getElementById("dadosDisciplinas").innerHTML;

    dadosDisciplinas = JSON.parse(dadosDisciplinas);

    let dadosSelectDisciplinas = [];
    for(let i = 0; i < dadosDisciplinas.length; i++){
        let nome = dadosDisciplinas[i].Nome;
        let codigo = dadosDisciplinas[i].Codigo;
        let quantidade = dadosDisciplinas[i].Turmas;

        dadosSelectDisciplinas.push([
            nome, quantidade, codigo
        ]);

        AddOptions(nome);
    };

}

window.onload = PegarNomeDisciplinas;

function AddOptions(disciplina) {
    let select = document.getElementById("select-disciplinas");
    let  option = document.createElement("option");

    option.text = disciplina;
    option.value = disciplina;
    option.className = 'select-option';
    
    select.add(option);
}

function pegarDisciplinaSelecionada() {
    let disciplinaSelecionada = document.getElementById("select-disciplinas").value;
    
    console.log("Disciplina selecionada: " + disciplinaSelecionada);

    alert("Disciplina selecionada: " + disciplinaSelecionada);
}













