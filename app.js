const classeFormPrimeiro = document.querySelector(".conteudo__formulario");
const classeFormSegundo = document.querySelector(".conteudo__segundo-cadastro");

let numeroGrupos;
let numeroAulas;
let grupoAtual;
let listaGrupos = ["Grupo1" , "Grupo2", "Grupo3","Grupo4"];


function primeiroCadastro(e){
    e.preventDefault();
    numeroGrupos = document.getElementById("gruposTurmas").value;
    numeroAulas = document.getElementById("quantidadeAulas").value;
    segundoCadastro();
}


function segundoCadastro(){
    document.querySelector('h1').textContent = "Definir horário de Início e duração das aulas das turmas do grupo 1 ";
    classeFormPrimeiro.classList.add('invisivel');
    classeFormSegundo.classList.remove('invisivel');
}


function inputsSegundoCadastro(){
    
}