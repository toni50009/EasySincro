const classeFormPrimeiro = document.querySelector(".conteudo__primeiro-cadastro");
const classeFormSegundo = document.querySelector(".conteudo__segundo-cadastro");


let duracaoPadraoAula = null;
let grade = [];
let grupos = [];
let itensCriados = [];





// Botao Info primeiro Cadastro
function infoInicial(e){
    e.preventDefault();
    let qtdGrupos = parseInt(document.getElementById("gruposTurmas").value);

    document.querySelector('h1').textContent = "Definir horário de Início e duração das aulas dos grupos de turmas";
    classeFormPrimeiro.classList.add('invisivel');
    classeFormSegundo.classList.remove('invisivel');

}

// Incluir aula
function definirQtdAulas(){

    const qtdTotalAulas = document.getElementById("quantidadeAulas").value;

    if(itensCriados.length > 0){
        itensCriados.forEach(item => item.remove());
        itensCriados = [];
    }

    const classePai = document.querySelector('.conteudo__segundo-cadastro');

        for(let i = 0; i < qtdTotalAulas ; i++){
            let indiceAulaInicio = i + 1;

            const containerLinha = document.createElement("div");
            containerLinha.className = "form-group";  
            itensCriados.push(containerLinha);
            
            const horariosAulas = document.createElement("input");
            horariosAulas.type = "time";
            horariosAulas.id = `horarioInicio${indiceAulaInicio}ªaula`;
            horariosAulas.name = `horarioInicio${indiceAulaInicio}ªaula`;

            
            const labelInicio = document.createElement("label");
            labelInicio.htmlFor = `horarioInicio${indiceAulaInicio}ªaula`;
            if(i == 0){
            labelInicio.textContent = `Que horas inicia a ${indiceAulaInicio}ª aula?`;
            }else{
                labelInicio.textContent = `Então, sua ${indiceAulaInicio}ª aula começa:`;
            }



            const labelDuracao = document.createElement("label");
            labelDuracao.htmlFor = `duracao${indiceAulaInicio}`;
            labelDuracao.textContent = "Duração da aula (minutos):";
    
            const inputDuracao = document.createElement("input");
            inputDuracao.type = "number";
            inputDuracao.id = `duracao${indiceAulaInicio}ªAula`;
            inputDuracao.name = `duracao${indiceAulaInicio}ªAula`;

            
            const labelCheckbox = document.createElement("label");
            labelCheckbox.htmlFor = `checkbox${indiceAulaInicio}`;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `checkbox${indiceAulaInicio}`;
            checkbox.name = `checkbox${indiceAulaInicio}`;

            if(i == 0){
                const horariosAulas = document.createElement("input");
                horariosAulas.type = "time";
                horariosAulas.id = `horarioInicio${indiceAulaInicio}ªaula`;
                horariosAulas.name = `horarioInicio${indiceAulaInicio}ªaula`;
            }

            const preencherHorariosInicio = document.createElement("button");
            preencherHorariosInicio.type = "button";
            preencherHorariosInicio.id = `preencher-${indiceAulaInicio}ªaula`;
            preencherHorariosInicio.name = `preencher-${indiceAulaInicio}ªaula`;
            preencherHorariosInicio.textContent = "Checar Horários";
            preencherHorariosInicio.addEventListener("click", () => {
                atualizarHorariosDeInicio(indiceAulaInicio);
            });

            if(i > 0){
                preencherHorariosInicio.style.display = 'none';
            }


            checkbox.addEventListener("change", () => {
                // Verificar se já existem elementos de intervalo associados
                let labelIntervalo = containerLinha.querySelector(`#labelIntervalo${indiceAulaInicio}`);
                let duracaoIntervalo = containerLinha.querySelector(`#duracaoIntervalo${indiceAulaInicio}`);
    
                if (checkbox.checked) {
                    if (!labelIntervalo && !duracaoIntervalo) {
                        // Criar elementos para intervalo, se não existirem
                        labelIntervalo = document.createElement("label");
                        labelIntervalo.id = `labelIntervalo${indiceAulaInicio}`;
                        labelIntervalo.htmlFor = `duracaoIntervalo${indiceAulaInicio}`;
                        labelIntervalo.textContent = `Duração do intervalo (minutos):`;
                        containerLinha.appendChild(labelIntervalo);
    
                        duracaoIntervalo = document.createElement("input");
                        duracaoIntervalo.type = "number";
                        duracaoIntervalo.id = `duracaoIntervalo${indiceAulaInicio}`;
                        duracaoIntervalo.name = `duracaoIntervalo${indiceAulaInicio}`;
                        containerLinha.appendChild(duracaoIntervalo);
                    }
                } else {
                    // Remover elementos de intervalo, se existirem
                    if (labelIntervalo) labelIntervalo.remove();
                    if (duracaoIntervalo) duracaoIntervalo.remove();
                }
            });

            
            containerLinha.appendChild(labelInicio);
            containerLinha.appendChild(horariosAulas);
            containerLinha.appendChild(labelDuracao);
            containerLinha.appendChild(inputDuracao);
            containerLinha.appendChild(labelCheckbox);
            containerLinha.appendChild(checkbox);
            containerLinha.appendChild(preencherHorariosInicio);
            classePai.appendChild(containerLinha);

        }
        console.log(itensCriados);

}



function atualizarHorariosDeInicio(checkAula) {
    const campoHoraAtual = document.getElementById(`horarioInicio${checkAula}ªaula`).value;
    const campoDuracaoAula = parseInt(document.getElementById(`duracao${checkAula}ªAula`).value);
    const checkbox = document.getElementById(`checkbox${checkAula}`);
    const campoIntervalo = checkbox.checked ? parseInt(document.getElementById(`duracaoIntervalo${checkAula}`).value) : 0;

    if (!campoHoraAtual || isNaN(campoDuracaoAula) || (checkbox.checked && isNaN(campoIntervalo))) {
        alert("Preencha todos os campos obrigatórios nesta linha!");
        return;
    }

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


