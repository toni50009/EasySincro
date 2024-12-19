const classeFormPrimeiro = document.querySelector(".conteudo__formulario");
const classeFormSegundo = document.querySelector(".conteudo__segundo-cadastro");

let numeroGrupos;
let numeroAulas;
let grupoAtual;
let horariosAulas;
let duracaoAulas;
let tempoMinutos;
let finalDaAula;
let repeticoes;
let valorRepeticoesFinal;
let listaGrupos = ["Grupo1" , "Grupo2", "Grupo3","Grupo4"];
let posicaoAula = [];


function primeiroCadastro(e){
    e.preventDefault();
    numeroGrupos = document.getElementById("gruposTurmas").value;
    numeroAulas = document.getElementById("quantidadeAulas").value;
    segundoCadastro();
}


function segundoCadastro(){
    document.querySelector('h1').textContent = "Definir horário de Início e duração das aulas dos grupos de turmas";
    classeFormPrimeiro.classList.add('invisivel');
    classeFormSegundo.classList.remove('invisivel');
}


function horarioAula(e){
    e.preventDefault();
    horarioAula = document.getElementById("horariosAulas").value;
    duracaoAulas = document.getElementById("duracaoAulas").value;
    repeticoes = document.getElementById("repeticoes").value;
    converterHoras(horarioAula);
    finalDaAula = parseInt(Number(horario) + Number(duracao));
    alert(finalDaAula);
    repetePadraoAulas(finalDaAula,duracaoAulas,repeticoes);
    alert(valorRepeticoesFinal);
}


function converterHoras(horario,duracao){
    tempoHoras = parseInt(horario.split(":")[0] * 60);
    tempoMinutos = parseInt(horario.split(":")[1]);
    alert(tempoHoras);
    alert(tempoMinutos);
}

function repetePadraoAulas(final,duracao,qtdrepete){
    valorRepeticoesFinal = Number(final + (qtdrepete * duracao));
    return valorRepeticoesFinal;
}

function criarHorarios(){
    novaLinha = document.createElement("")
}