
//variaveis globais e arrays
let duracaoPadraoAula = null;
let grade = [];
let itensCriados = [];
let grupos = {};



// Listener do número de grupos, cria as divisões e os primeiros inputs
document.getElementById("num-grupos").addEventListener("input", function(){
    const horariosInputs = document.querySelector(".horarios-inputs");
    horariosInputs.innerHTML = "";
    const numGrupos = parseInt(this.value);

    if(numGrupos > 1 && numGrupos <= 4){
        for(let i = 1; i <= numGrupos; i++){

            // cria o container de cada grupo
            const divGrupo = document.createElement("div");
            divGrupo.className = `form-group${i}`;
            divGrupo.classList.add("form-group");
            divGrupo.id = `form-grupo${i}`;
            divGrupo.innerHTML = `
            <h2>Grupo ${i}</h2>

            `
            horariosInputs.appendChild(divGrupo);

            // Inclui primeiros inputs
            const label = document.createElement("label");
            label.setAttribute("for", `quantidadeAulas-grupo${i}`);
            label.textContent = "Selecione a quantidade de aulas neste turno:";

            const select = document.createElement("select");
            select.setAttribute("id", `quantidadeAulas-grupo${i}`);
            select.setAttribute("name", `quantidadeAulas-grupo${i}`);
            select.classList.add("slct");
            select.setAttribute("onchange",`definirQtdAulas("quantidadeAulas-grupo${i}", ".form-group${i}")`);

            // Adiciona as options dinamicamente
            const defaultOption = document.createElement('option');
            defaultOption.setAttribute('value', '1');
            defaultOption.textContent = 'Selecionar';
            select.appendChild(defaultOption);

            // Loop para criar as opções de 1 a 20
            for (let i = 1; i <= 20; i++) {
                const option = document.createElement('option');
                option.setAttribute('value', i.toString());
                option.textContent = i.toString();
                select.appendChild(option);
            }

            // Adiciona os elementos ao container
            divGrupo.appendChild(label);
            divGrupo.appendChild(select);
        }
    }

});


// quantos campos serão criados baseados na quantidade de aulas
function definirQtdAulas(id, classePai){
    const qtdTotalAulas = document.getElementById(id).value;

    if(itensCriados.length > 0){
        itensCriados.forEach(item => item.remove());
        itensCriados = [];
    }


    const classeForm = document.querySelector(classePai);

        for(let i = 1; i <= qtdTotalAulas ; i++){

            const campoInputs = document.createElement("div");
            campoInputs.className = "campoInput";
            classeForm.appendChild(campoInputs);

            const horariosAulas = document.createElement("input");
            horariosAulas.type = "time";
            horariosAulas.id = `horarioInicio${i}ªaula`;
            horariosAulas.name = `horarioInicio${i}ªaula`;
            horariosAulas.setAttribute("onchange",`atualizarHorariosDeInicio(${i})`);
            itensCriados.push(horariosAulas);

            
            const labelInicio = document.createElement("label");
            labelInicio.htmlFor = `horarioInicio${i}ªaula`;
            if(i == 1){
            labelInicio.textContent += `Que horas inicia a ${i}ª aula?`;
            }else{
                labelInicio.textContent = `Sua ${i}ª aula começa:`;
            }
            itensCriados.push(labelInicio);



            const labelDuracao = document.createElement("label");
            labelDuracao.htmlFor = `duracao${i}`;
            labelDuracao.textContent = "Duração da aula (minutos):";
            itensCriados.push(labelDuracao);


            const inputDuracao = document.createElement("input");
            inputDuracao.type = "number";
            inputDuracao.id = `duracao${i}ªAula`;
            inputDuracao.name = `duracao${i}ªAula`;
            inputDuracao.setAttribute("onchange",`atualizarHorariosDeInicio(${i})`);
            itensCriados.push(inputDuracao);
            
            const labelCheckbox = document.createElement("label");
            labelCheckbox.htmlFor = `checkbox${i}`;
            labelCheckbox.textContent = "Após esta aula, a turma terá intervalo?";
            itensCriados.push(labelCheckbox);

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `checkbox${i}`;
            checkbox.name = `checkbox${i}`;
            checkbox.setAttribute("onchange" , `atualizarHorariosDeInicio(${i})`);
            itensCriados.push(checkbox);

            if(i == qtdTotalAulas){
                checkbox.style.display = "none"; 
                labelCheckbox.style.display = "none";  
            }


            checkbox.addEventListener("change", () => {
                // Verificar se já existem elementos de intervalo associados
                let labelIntervalo = campoInputs.querySelector(`#labelIntervalo${i}`);
                let duracaoIntervalo = campoInputs.querySelector(`#duracaoIntervalo${i}`);
    
                if (checkbox.checked) {
                    if (!labelIntervalo && !duracaoIntervalo){
                        // Criar elementos para intervalo, se não existirem
                        labelIntervalo = document.createElement("label");
                        labelIntervalo.id = `labelIntervalo${i}`;
                        labelIntervalo.htmlFor = `duracaoIntervalo${i}`;
                        labelIntervalo.textContent = `Duração do intervalo (minutos):`;
                        campoInputs.appendChild(labelIntervalo);
                        itensCriados.push(labelIntervalo);
    
                        duracaoIntervalo = document.createElement("input");
                        duracaoIntervalo.type = "number";
                        duracaoIntervalo.id = `duracaoIntervalo${i}`;
                        duracaoIntervalo.name = `duracaoIntervalo${i}`;
                        duracaoIntervalo.setAttribute("onchange",`atualizarHorariosDeInicio(${i})`);
                        campoInputs.appendChild(duracaoIntervalo);
                        itensCriados.push(duracaoIntervalo);
                    }
                } else {
                    // Remover elementos de intervalo, se existirem
                    if (labelIntervalo) labelIntervalo.remove();
                    if (duracaoIntervalo) duracaoIntervalo.remove();
                }
            });


            campoInputs.appendChild(labelInicio);
            campoInputs.appendChild(horariosAulas);
            campoInputs.appendChild(labelDuracao);
            campoInputs.appendChild(inputDuracao);
            campoInputs.appendChild(labelCheckbox);
            campoInputs.appendChild(checkbox);


        }
        console.log(itensCriados);



}



function atualizarHorariosDeInicio(checkAula) {
    const campoHoraAtual = document.getElementById(`horarioInicio${checkAula}ªaula`).value;
    const campoDuracaoAula = parseInt(document.getElementById(`duracao${checkAula}ªAula`).value);
    const checkbox = document.getElementById(`checkbox${checkAula}`);
    const campoIntervaloInput = document.getElementById(`duracaoIntervalo${checkAula}`);
    const campoIntervalo = (checkbox.checked && campoIntervaloInput) ? parseInt(campoIntervaloInput.value) || 0 : 0;



    // Definir a duração padrão na primeira aula
    if (!duracaoPadraoAula) duracaoPadraoAula = campoDuracaoAula;

    const horarioAtualEmMinutos = converterEmMinutos(campoHoraAtual);
    const somaDuracao = horarioAtualEmMinutos + campoDuracaoAula + campoIntervalo;

    preencherProximosHorarios(checkAula, somaDuracao);
}



function converterEmMinutos(horario){
    const [horas, minutos] = horario.split(":").map(Number);
    return horas * 60 + minutos;
}


function converterEmHoras(minutos) {
    let horas = Math.floor(minutos / 60);
    let restanteMinutos = minutos % 60;
    return `${horas.toString().padStart(2, '0')}:${restanteMinutos.toString().padStart(2, '0')}`;;
}


function preencherProximosHorarios(checkAula, horarioAtualEmMinutos) {
    let proximaAula = checkAula + 1;


    while (document.getElementById(`horarioInicio${proximaAula}ªaula`)) {
        const proximoCampoHorario = document.getElementById(`horarioInicio${proximaAula}ªaula`);
        const proximoCampoDuracao = document.getElementById(`duracao${proximaAula}ªAula`);

        // Atualizar horário de início
        proximoCampoHorario.value = converterEmHoras(horarioAtualEmMinutos);
        

        // Manter a duração padrão
        proximoCampoDuracao.value = duracaoPadraoAula;

        // Incrementar para a próxima aula
        horarioAtualEmMinutos += duracaoPadraoAula;

        // Considerar intervalo se existir
        const checkbox = document.getElementById(`checkbox${proximaAula}`);
        if (checkbox && checkbox.checked) {
            const campoIntervalo = document.getElementById(`duracaoIntervalo${proximaAula}`);
            if (campoIntervalo && !isNaN(parseInt(campoIntervalo.value))) {
                horarioAtualEmMinutos += parseInt(campoIntervalo.value);
            }
        }

        proximaAula++;
    }
}




// funções para criar os campos input 
function criarLabel(forAttribute, texto, classePai) {
    const label = document.createElement("label");
    label.htmlFor = forAttribute;
    label.textContent = texto;
    classePai.appendChild(label);
    return label;
}

function criarInput(type, id, classePai) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = id;
    classePai.appendChild(input);
    return input;
}

function criarBotao(id, text, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.id = id;
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
}