


// Listener do número de Grupos, cria as divisões de grupos e primeiros inputs
document.getElementById("num-grupos").addEventListener("input",function(){
    const horariosInputs = document.querySelector(".horarios-inputs");
    horariosInputs.innerHTML = '';
    const numGrupos = parseInt(this.value);

    //loop para criar os inputs baseado na quantidade de grupos
    if(numGrupos > 1 && numGrupos <= 4){
        for(let i = 1; i <= numGrupos ; i ++){
            
            // div de cada grupo
            const divGrupo = document.createElement('div');
            divGrupo.className = `form-grupo${i}`;
            divGrupo.classList.add("form-group");
            divGrupo.id = `form-grupo${i}`;
            divGrupo.innerHTML = `<h2>Grupo ${i}</h2>`;
            horariosInputs.appendChild(divGrupo);

        }

    }


});



//funções para criar elementos na DOM

function criarLabel(forAttribute , text , classePai){
    const label = document.createElement('label');
    label.htmlFor = forAttribute;
    label.textContent = text;
    classePai.appendChild(label);
    return label;
}


function criarInput(type, id , classePai){
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = id;
    classePai.appendChild(input);
    return input;
}