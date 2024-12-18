const classeBotoes = document.querySelector(".conteudo__botoes");
const botaoGrupo = document.getElementById("botaoGrupo");
const titulo = document.querySelector(".conteudo__informacoes__descricao");
const subtitulo = document.querySelector(".conteudo__informacoes__explicacao");


let colunas = 1;
let grupos;
let faseCadastro = 1;
let aulasDasTurmas;


// imported plus minus counter
$(document).ready(function() {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        if(faseCadastro == 1){
            count = count < 1 ? 1 : count;
        }else if(faseCadastro == 2){
            count = count < 1 ? 1 : count;
        }
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) + 1;
        if(faseCadastro == 1){
            count = count > 4 ? 4 : count;
        }else if(faseCadastro == 2){
            count = count > 30 ? 30 : count;
            
        }
        $input.val(count);
        $input.change();
        return false;
    });
});



function criarGrupos(){
    grupos = Number(document.getElementById("digitarGrupos").value);
    if(grupos < 1 || grupos > 4){
        alert('Digite um número entre 1 e 4!');
        console.log(grupos);
    }else{
    alert('Caso positivo!');
    botaoGrupo.classList.add('invisivel');
    segundoCadastro();
    console.log(grupos);
    }
}


function segundoCadastro(){
    var onChange = function(evt) {
        console.info(this.value);
      };
      var input = document.getElementById('digitarGrupos');
      input.addEventListener('input', onChange, false);
    btnQtdAulas = document.createElement("button");
    btnQtdAulas.textContent = 'Proximo';
    btnQtdAulas.classList.add('btn');
    btnQtdAulas.id = 'botaoQtdAulas';
    btnQtdAulas.addEventListener('click',terceiroCadastro);
    classeBotoes.appendChild(btnQtdAulas);
    faseCadastro ++;
    titulo.textContent = "Quantas aulas as turmas têm neste turno?";
    subtitulo.textContent = " ";
    console.log(aulasDasTurmas);
    alert(aulasDasTurmas);
}



function terceiroCadastro(){
    aulasDasTurmas = Number(document.getElementById("digitarGrupos").value);
    alert("é o terceiro cadastro");
    console.log(aulasDasTurmas);
    alert(aulasDasTurmas);
}




