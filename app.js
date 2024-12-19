const classeFormPrimeiro = document.querySelector(".conteudo__formulario");
const classeFormSegundo = document.querySelector(".conteudo__segundo-cadastro");
const classeMomentoIntervalo = document.querySelector(".momentosIntervalos");

let qtdGrupos;
let qtdAulasTotais;
let horarioAula;
let duracaoAulas;
let qtdintervaloAulas;
let duracaoIntervaloAulas;
let aposQualAula;
let tempoMinutos;
let finalDaAula;
let repeticoes;
let valorRepeticoesFinal;
let totalMinutos;
let contadorListaNumeroAulas;
let posicaoAula = 1;
let listaGrupos = ["Grupo1", "Grupo2", "Grupo3", "Grupo4"];
let listaNumeroAulas = [];
let grade = [];


function infoInicial(e){
    e.preventDefault();
    qtdGrupos = parseInt(document.getElementById("gruposTurmas").value);
    qtdAulasTotais = parseInt(document.getElementById("quantidadeAulas").value);
    for(let i = 1; i < (qtdAulasTotais + 1); i ++){
        listaNumeroAulas.push(`${i}ª aula`);
    }
    alert(listaNumeroAulas);
    segundoCadastro();
}


function segundoCadastro(){
    document.querySelector('h1').textContent = "Definir horário de Início e duração das aulas dos grupos de turmas";
    classeFormPrimeiro.classList.add('invisivel');
    classeFormSegundo.classList.remove('invisivel');
}


function gerarGrade(e){
    e.preventDefault();
    horarioAula = document.getElementById("horariosAulas").value;
    duracaoAulas = parseInt(document.getElementById("duracaoAulas").value);
    repeticoes = parseInt(document.getElementById("repeticoes").value);
    totalMinutos = converterEmMinutos(horarioAula);
    alert(totalMinutos);
    finalDaAula = totalMinutos + duracaoAulas;
    alert(finalDaAula);
    alert(valorRepeticoesFinal);
    calcularHorariosAulas(totalMinutos, duracaoAulas, duracaoIntervaloAulas, repeticoes);
    alert(grade);
    console.log(grade);
}


function calcularHorariosAulas(inicio, duracao, intervalo, qtdRepeticoes) {
    for (let i = 0; i < qtdRepeticoes; i++) {
        let inicioAula = inicio + (i * (duracao + intervalo));  // Calcula o início de cada aula (levando em consideração o intervalo)
        let fimAula = inicioAula + duracao;  // Calcula o fim da aula

        // Armazena os horários e a posição
        grade.push({
            aula: i + 1,
            inicio: converterEmHoras(inicioAula),
            fim: converterEmHoras(fimAula),
        });
    }
}

function converterEmMinutos(horario){
    tempoHoras = parseInt(horario.split(":")[0] * 60);
    tempoMinutos = parseInt(horario.split(":")[1]);
    return tempoHoras + tempoMinutos;
}


// Função auxiliar para converter minutos de volta para formato HH:MM
function converterEmHoras(minutos) {
    let horas = Math.floor(minutos / 60);
    let mins = minutos % 60;
    return `${String(horas).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}


function definirMomentosIntervalos(e){
    e.preventDefault();
    qtdintervaloAulas = parseInt(document.getElementById("intervalos").value);
    duracaoIntervaloAulas = parseInt(document.getElementById("duracaoIntervalo").value);
}