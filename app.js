const classeFormPrimeiro = document.querySelector(".conteudo__primeiro-cadastro");
const classeFormSegundo = document.querySelector(".conteudo__segundo-cadastro");



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
function criarQtdAulas(){

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



function atualizarHorariosDeInicio(checkAula){
    let campoConfereAula = document.getElementById(`horarioInicio${checkAula}ªaula`).value;
    let campoConfereDuracaoAula = parseInt(document.getElementById(`duracao${checkAula}ªAula`).value);

    if(campoConfereAula == "" || campoConfereDuracaoAula == ""){
        alert("Digite todos os campos desta linha!");
        return;
    }

    let confereAulaEmMinutos = converterEmMinutos(campoConfereAula);
    let somaAulaDuracao = confereAulaEmMinutos + campoConfereDuracaoAula;
    let somaAulaDuracaoHoras = converterEmHoras(somaAulaDuracao);
    alert(confereAulaEmMinutos);
    alert(somaAulaDuracao);
    preencherProximosHorarios(checkAula,somaAulaDuracao);
    alert(campoConfereAula);
}



function converterEmMinutos(horario){
    let tempoHoras = parseInt(horario.split(":")[0] * 60);
    let tempoMinutos = parseInt(horario.split(":")[1]);
    return tempoHoras + tempoMinutos;
}


function converterEmHoras(minutos) {
    let horas = Math.floor(minutos / 60);
    let restanteMinutos = minutos % 60;
    return `${horas}:${restanteMinutos < 10 ? '0' + restanteMinutos : restanteMinutos}`;
}


function preencherProximosHorarios(checkAula, horario) {
    let proximaAula = checkAula + 1;
    let proximoCampo = document.getElementById(`horarioInicio${proximaAula}ªaula`);
    let horarioFormatado = horario.padStart(5, '0');

    while (proximoCampo) {
        proximoCampo.value = horarioFormatado;
        proximaAula++;
        proximoCampo = document.getElementById(`horarioInicio${proximaAula}ªaula`);
    }
}

