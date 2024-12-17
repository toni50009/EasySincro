const classeBotoes = document.querySelector(".conteudo__botoes");



let colunas = 1;
let grupos;

function criarGrupos(){
    let grupos = Number(document.getElementById("digitarGrupos").value);
    if(grupos < 1 && grupos > 4){
        alert('Digite um número entre 1 e 4!');
        console.log(grupos);
    }else{
    alert('Caso positivo!');
    classeBotoes.classList.add('.invisivel');
    console.log(grupos);
    }
}
