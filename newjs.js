
//variaveis globais e arrays
let grade = [];
let itensCriados = [];
let grupos = {};



// Listener do número de grupos, cria as divisões
document.getElementById("num-grupos").addEventListener("input", function(){
    const horariosInputs = document.querySelector(".horarios-inputs");
    const botaoComparar = document.getElementById("botaoComparar");
    const numGrupos = parseInt(this.value);
    horariosInputs.innerHTML = "";
    grupos = {};


    //chama a função de criar as Divs e inputs
        if(numGrupos > 1 && numGrupos <= 4){
            for(let i = 1; i <= numGrupos; i++){
                criarDivGrupo(i, horariosInputs);
            }
            botaoComparar.classList.remove("invisivel");
        }else{
        botaoComparar.classList.add("invisivel");
        }

});


//Criar a Div de cada grupo e seus primeiros inputs
function criarDivGrupo(i, classePai){
    
            // cria a div de cada grupo
            const divGrupo = document.createElement("div");
            divGrupo.className = `form-grupo${i}`;
            divGrupo.classList.add("form-group");
            divGrupo.id = `form-grupo${i}`;
            divGrupo.innerHTML = `<h2>Grupo ${i}</h2>`;
            classePai.appendChild(divGrupo);

            // Inclui primeiros inputs
            const label = document.createElement("label");
            label.setAttribute("for", `quantidadeAulas-grupo${i}`);
            label.textContent = "Selecione a quantidade de aulas neste turno:";

            const select = document.createElement("select");
            select.setAttribute("id", `quantidadeAulas-grupo${i}`);
            select.setAttribute("name", `quantidadeAulas-grupo${i}`);
            select.classList.add("slct");
            select.onchange = function() { definirQtdAulas(`quantidadeAulas-grupo${i}`, `.form-grupo${i}`)};

            // Adiciona as options dinamicamente
                
                //Opção Padrão
                const defaultOption = document.createElement('option');
                defaultOption.setAttribute('value', '0');
                defaultOption.textContent = 'Selecionar';
                select.appendChild(defaultOption);

                // Loop para criar as opções de 1 a 20
                for (let i = 1; i <= 20; i++) {
                    const option = document.createElement('option');
                    option.setAttribute('value', i.toString());
                    option.textContent = i.toString();
                    select.appendChild(option);
                }

            // Adiciona os elementos ao container do grupo 
            divGrupo.appendChild(label);
            divGrupo.appendChild(select);

            // Adicionar os listeners para o grupo criado
            adicionarListenersParaAtualizacao(i, 1);
}



// Função que atualiza os dados do grupo no array 'grupos'
function atualizarDadosGrupo(grupoId) {
    const qtdAulas = parseInt(document.getElementById(`quantidadeAulas-grupo${grupoId}`).value);

    if (!grupos[grupoId]) grupos[grupoId] = [];

    grupos[grupoId] = []; // Limpa o array antes de atualizar

    for (let i = 1; i <= qtdAulas; i++) {
        const horarioInicio = document.getElementById(`horarioInicio${i}ªaula`).value;
        const duracaoAula = parseInt(document.getElementById(`duracao${i}ªAula`).value) || 0;
        const intervaloCheckbox = document.getElementById(`checkbox${i}`);
        const intervaloDuracao = intervaloCheckbox.checked
            ? parseInt(document.getElementById(`duracaoIntervalo${i}`).value) || 0
            : 0;

        grupos[grupoId].push({
            horarioInicio,
            duracaoAula,
            intervaloDuracao,
        });
    }

    console.log(`Grupo ${grupoId} atualizado:`, grupos[grupoId]);
}



// Adicionar listeners para atualizar os dados do grupo ao alterar os campos
function adicionarListenersParaAtualizacao(grupoId, qtdAulas) {
    for (let i = 1; i <= qtdAulas; i++) {
        const horarioInput = document.getElementById(`horarioInicio${i}ªaula`);
        const duracaoInput = document.getElementById(`duracao${i}ªAula`);
        const intervaloCheckbox = document.getElementById(`checkbox${i}`);
        const intervaloDuracaoInput = document.getElementById(`duracaoIntervalo${i}`);

        // Listener para horário de início
        if (horarioInput) {
            horarioInput.addEventListener("change", () => atualizarDadosGrupo(grupoId));
        }

        // Listener para duração da aula
        if (duracaoInput) {
            duracaoInput.addEventListener("change", () => atualizarDadosGrupo(grupoId));
        }

        // Listener para o checkbox de intervalo
        if (intervaloCheckbox) {
            intervaloCheckbox.addEventListener("change", () => {
                atualizarDadosGrupo(grupoId);

                // Adiciona listener ao campo de duração do intervalo, se existir
                if (intervaloDuracaoInput) {
                    intervaloDuracaoInput.addEventListener("change", () => atualizarDadosGrupo(grupoId));
                }
            });
        }

        // Listener para duração do intervalo, se existir
        if (intervaloDuracaoInput) {
            intervaloDuracaoInput.addEventListener("change", () => atualizarDadosGrupo(grupoId));
        }
    }
}




// quantos campos serão criados baseados na quantidade de aulas
function definirQtdAulas(id, classePai){
    const qtdTotalAulas = document.getElementById(id).value;
    const grupoId = id.split("-")[1].replace("grupo", ""); // Extrai o grupoId do ID

    //Para não criar campos de inputs duplicados
    if(itensCriados.length > 0){
        itensCriados.forEach(item => item.remove());
        itensCriados = [];
    }


    const classeForm = document.querySelector(classePai);

        //loop para criar cada campoInput de aula , div denominada campoInputs
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
            labelInicio.textContent = `Sua ${i}ª aula começa:`;
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


            // quando a checkbox é clicada
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
                        labelIntervalo.textContent = "Duração do intervalo (minutos):";
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



            //Incluir na DOM
            campoInputs.appendChild(labelInicio);
            campoInputs.appendChild(horariosAulas);
            campoInputs.appendChild(labelDuracao);
            campoInputs.appendChild(inputDuracao);
            campoInputs.appendChild(labelCheckbox);
            campoInputs.appendChild(checkbox);


        }

        // para referência
        console.log(itensCriados);

        adicionarListenersParaAtualizacao(grupoId, qtdTotalAulas);

     // Inicializar o array do grupo se ainda não existir
    if (!grupos[grupoId]) {
        grupos[grupoId] = [];
    }


}



function atualizarHorariosDeInicio(checkAula) {
    let duracaoPadraoAula;

    const campoHoraAtual = document.getElementById(`horarioInicio${checkAula}ªaula`).value;
    const campoDuracaoAula = parseInt(document.getElementById(`duracao${checkAula}ªAula`).value);
    const checkbox = document.getElementById(`checkbox${checkAula}`);
    const campoIntervaloInput = document.getElementById(`duracaoIntervalo${checkAula}`);
    const campoIntervalo = (checkbox.checked && campoIntervaloInput) ? parseInt(campoIntervaloInput.value) || 0 : 0;



    // Definir a duração padrão das aulas, assim atualiza as próximas com a padrão de duração da aula informado
    duracaoPadraoAula = campoDuracaoAula;

    const horarioAtualEmMinutos = converterEmMinutos(campoHoraAtual);
    const somaDuracao = horarioAtualEmMinutos + campoDuracaoAula + campoIntervalo;

    preencherProximosHorarios(checkAula, somaDuracao, duracaoPadraoAula);
}


function preencherProximosHorarios(checkAula, horarioAtualEmMinutos, duracaoPadrao) {
    let proximaAula = checkAula + 1;


    while (document.getElementById(`horarioInicio${proximaAula}ªaula`)) {
        const proximoCampoHorario = document.getElementById(`horarioInicio${proximaAula}ªaula`);
        const proximoCampoDuracao = document.getElementById(`duracao${proximaAula}ªAula`);

        // Atualizar horário de início
        proximoCampoHorario.value = converterEmHoras(horarioAtualEmMinutos);
        

        // Manter a duração padrão
        proximoCampoDuracao.value = duracaoPadrao;

        // Incrementar para a próxima aula
        horarioAtualEmMinutos += duracaoPadrao;

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


//funções para conversão de valores
function converterEmMinutos(horario){
    const [horas, minutos] = horario.split(":").map(Number);
    return horas * 60 + minutos;
}


function converterEmHoras(minutos) {
    let horas = Math.floor(minutos / 60);
    let restanteMinutos = minutos % 60;
    return `${horas.toString().padStart(2, '0')}:${restanteMinutos.toString().padStart(2, '0')}`;
}


// Alteração - Função compararHorarios para validar e exibir o array 'grupos'
function compararHorarios() {
    const erros = [];
    const gruposIds = Object.keys(grupos);

    gruposIds.forEach((grupoId) => {
        const aulas = grupos[grupoId];
        if (!aulas || aulas.length === 0) {
            erros.push(`Grupo ${grupoId} está incompleto ou vazio.`);
        } else {
            aulas.forEach((aula, index) => {
                if (!aula.inicio || aula.duracao === null) {
                    erros.push(`Grupo ${grupoId}, Aula ${index + 1} está incompleta.`);
                }
            });
        }
    });

    if (erros.length > 0) {
        console.error("Erros encontrados:", erros);
    } else {
        console.log("Grupos:", grupos);
    }
}