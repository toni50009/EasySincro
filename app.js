// Variáveis globais para armazenamento dos grupos e aulas
let grupos = {};


//mostrar/esconder tutorial
function mostrarTutorial(){
       const campoTutorial = document.getElementById("campo-tutorial");
       if(campoTutorial.classList.contains("invisivel")){
        campoTutorial.classList.remove("invisivel");
        }else{
         campoTutorial.classList.add("invisivel");
       }
}


// Listener para o número de grupos
document.getElementById("num-grupos").addEventListener("input", function () {
    const numGrupos = parseInt(this.value);
    const horariosInputs = document.querySelector(".horarios-inputs");
    const botaoComparar = document.getElementById("botaoComparar");

    // Limpa os campos de entrada existentes
    horariosInputs.innerHTML = "";

    // Atualiza os grupos com base no número selecionado
    atualizarGrupos(numGrupos);

    // Cria as divisões e inputs dos grupos
    if (numGrupos >= 2 && numGrupos <= 4) {
        for (let i = 1; i <= numGrupos; i++) {
            criarDivGrupo(i, horariosInputs);
            botaoComparar.classList.remove("invisivel");
        }
    }else{
        botaoComparar.classList.add("invisivel");
    }


});

// Atualiza o objeto `grupos` com o número de grupos especificado
function atualizarGrupos(numGrupos) {
    const novosGrupos = {};
    for (let i = 1; i <= numGrupos; i++) {
        novosGrupos[i] = grupos[i] || [];
    }
    grupos = novosGrupos;
}

// Cria a divisão para cada grupo e seus primeiros inputs
function criarDivGrupo(grupoId, container) {
    const divGrupo = document.createElement("div");
    divGrupo.className = `form-grupo${grupoId}`;
    divGrupo.innerHTML = `
        <div class="container-grupos">
            <h2>Grupo ${grupoId}</h2>
            <label for="quantidadeAulas-grupo${grupoId}">
                Quantidade de Aulas:
            </label>
            <select id="quantidadeAulas-grupo${grupoId}" onchange="definirQtdAulas(${grupoId})">
                <option value="0">Selecionar</option>
                ${Array.from({ length: 20 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}
            </select>
        </div>
    `;

    container.appendChild(divGrupo);
}

// Define a quantidade de aulas e cria os campos de inputs correspondentes
function definirQtdAulas(grupoId) {

    const qtdAulas = parseInt(document.getElementById(`quantidadeAulas-grupo${grupoId}`).value);
    const divGrupo = document.querySelector(`.form-grupo${grupoId}`);
    divGrupo.querySelectorAll(".campoInput").forEach((campo) => campo.remove());

    for (let i = 1; i <= qtdAulas; i++) {
        criarCampoAula(grupoId, i, divGrupo, qtdAulas, i);
    }
    grupos[grupoId] = Array(qtdAulas).fill({ horarioInicio: null, duracao: 0, intervalo: 0 });
    console.log(grupos);
}

// Cria os campos de inputs para uma aula específica
function criarCampoAula(grupoId, aulaId, container, checadorQuantidade , i) {
    const campoInputs = document.createElement("div");
    campoInputs.className = "campoInput";
    if(checadorQuantidade == i){
    campoInputs.innerHTML = `
    <label for="horarioInicio${grupoId}_${aulaId}">Horário de início <strong>${aulaId}</strong>ªAula:</label>
    <input type="time" id="horarioInicio${grupoId}_${aulaId}" onchange="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">

    <label for="duracao${grupoId}_${aulaId}">Duração da aula:</label>
    <input type="number" id="duracao${grupoId}_${aulaId}" oninput="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">

        <div class="checkbox-container">
            <label for="checkbox${grupoId}_${aulaId}"  style="display: none;" >Intervalo?</label>
            <input type="checkbox" id="checkbox${grupoId}_${aulaId}" style="display: none;" onchange="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">

            <label for="duracaoIntervalo${grupoId}_${aulaId}" style="display: none;">Duração:</label>
            <input type="number" id="duracaoIntervalo${grupoId}_${aulaId}" style="display: none;"  oninput="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">
        </div>
            `;

    }else{
        campoInputs.innerHTML = `
            <label for="horarioInicio${grupoId}_${aulaId}" >Horário de início <strong>${aulaId}</strong>ªAula:</label>
            <input type="time" id="horarioInicio${grupoId}_${aulaId}" onchange="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">

            <label for="duracao${grupoId}_${aulaId}">Duração da aula:</label>
            <input type="number" id="duracao${grupoId}_${aulaId}" oninput="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">

            <div class="checkbox-container">
                <label for="checkbox${grupoId}_${aulaId}" >Intervalo?</label>
                <input type="checkbox" id="checkbox${grupoId}_${aulaId}" onchange="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">

                <label for="duracaoIntervalo${grupoId}_${aulaId}" style="display: none;" >Duração:</label>
                <input type="number" id="duracaoIntervalo${grupoId}_${aulaId}" style="display: none;"  class="input-pequeno" oninput="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">
            </div>
            `;
        }

    const checkbox = campoInputs.querySelector(`#checkbox${grupoId}_${aulaId}`);
    const labelIntervalo = campoInputs.querySelector(`label[for="duracaoIntervalo${grupoId}_${aulaId}"]`);
    const inputIntervalo = campoInputs.querySelector(`#duracaoIntervalo${grupoId}_${aulaId}`);

    if(checkbox){
        checkbox.addEventListener("change", () => {
        const display = checkbox.checked ? "block" : "none";
        labelIntervalo.style.display = display;
        inputIntervalo.style.display = display;
    });
}

    container.appendChild(campoInputs);
}



// Atualiza os horários e durações automaticamente
function atualizarHorariosDeInicio(checkAula, grupoId) {
    const horarioAtual = document.getElementById(`horarioInicio${grupoId}_${checkAula}`).value;
    const duracaoAtual = parseInt(document.getElementById(`duracao${grupoId}_${checkAula}`).value) || 0;
    const intervaloCheckbox = document.getElementById(`checkbox${grupoId}_${checkAula}`);
    const intervaloAtual = intervaloCheckbox.checked
        ? parseInt(document.getElementById(`duracaoIntervalo${grupoId}_${checkAula}`).value) || 0
        : 0;

    // Valida se o horário atual foi preenchido
    if (!horarioAtual) return;

    // Converte o horário atual para minutos
    const horarioAtualEmMinutos = converterEmMinutos(horarioAtual);

    // Atualizar a array com os dados atuais
    grupos[grupoId][checkAula - 1] = {
        horarioInicio: horarioAtual,
        duracao: duracaoAtual,
        intervalo: intervaloAtual,
    };

    // Soma a duração da aula e o intervalo
    const somaDuracao = horarioAtualEmMinutos + duracaoAtual + intervaloAtual;

    // Chama a função para preencher os próximos horários e durações
    preencherProximosHorarios(checkAula, somaDuracao, duracaoAtual, grupoId);
    console.log(grupos);
}

function preencherProximosHorarios(checkAula, horarioAtualEmMinutos, duracaoPadraoAula, grupoId) {
    let proximaAula = checkAula + 1;

    while (document.getElementById(`horarioInicio${grupoId}_${proximaAula}`)) {
        const proximoHorarioInput = document.getElementById(`horarioInicio${grupoId}_${proximaAula}`);
        const proximaDuracaoInput = document.getElementById(`duracao${grupoId}_${proximaAula}`);
        const proximoIntervaloCheckbox = document.getElementById(`checkbox${grupoId}_${proximaAula}`);
        const proximoIntervaloInput = document.getElementById(`duracaoIntervalo${grupoId}_${proximaAula}`);

        // Preenche o próximo horário
        proximoHorarioInput.value = converterEmHoras(horarioAtualEmMinutos);

        // Atualiza a duração padrão para os campos subsequentes
        proximaDuracaoInput.value = duracaoPadraoAula;

        // Preenche o intervalo, se o checkbox estiver marcado
        if (proximoIntervaloCheckbox.checked && (proximoIntervaloInput.value === "" || parseInt(proximoIntervaloInput.value) === 0)) {
            proximoIntervaloInput.value = parseInt(document.getElementById(`duracaoIntervalo${grupoId}_${checkAula}`).value) || 0;
        }

        // Incrementa o horário com a duração e o intervalo
        const proximaDuracao = parseInt(proximaDuracaoInput.value) || duracaoPadraoAula;
        const proximoIntervalo = proximoIntervaloCheckbox.checked
            ? parseInt(proximoIntervaloInput.value) || 0
            : 0;

        // Atualiza o objeto do grupo com os próximos valores
        grupos[grupoId][proximaAula - 1] = {
        horarioInicio: converterEmHoras(horarioAtualEmMinutos),
        duracao: proximaDuracao,
        intervalo: proximoIntervalo,
        };

        horarioAtualEmMinutos += proximaDuracao + proximoIntervalo;
        proximaAula++;
    }
}


// Função para converter horário no formato HH:MM para minutos
function converterEmMinutos(horario) {
    const [horas, minutos] = horario.split(":").map(Number);
    return horas * 60 + minutos;
}

// Função para converter minutos para o formato HH:MM
function converterEmHoras(minutos) {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}



// Função para verificar se os cadastros estão preenchidos
function verificarCadastros() {
    for (const grupoId in grupos) {
        const aulas = grupos[grupoId];

        // Verifica se o grupo está vazio
        if (aulas.length === 0) {
            alert(`O grupo ${grupoId} está vazio.`);
            return;
        }

        // Verifica se alguma aula está com cadastro incompleto
        for (const aula of aulas) {
            if (aulas.length != 0 && !aula.horarioInicio) {
                alert(`Algum cadastro está faltando no grupo ${grupoId}.`);
                return;
            }
        }
    }
    compararHorarios();
}



// Função para comparar os horários e mostrar o resultado na tela
    function compararHorarios() {
        const resultadosDiv = document.getElementById("resultados");
        const campoResultado = document.getElementById("campo-resultados");
        resultadosDiv.innerHTML = ""; // Limpa os resultados anteriores
        resultadosDiv.classList.remove("invisivel");
    
        const gruposIds = Object.keys(grupos);
    
        for (let i = 0; i < gruposIds.length; i++) {
            const grupo1 = grupos[gruposIds[i]];
    
            for (let j = 0; j < gruposIds.length; j++) {
                if (i === j) continue; // Não comparar o mesmo grupo consigo mesmo
                const grupo2 = grupos[gruposIds[j]];
    
                for (let k = 0; k < grupo1.length; k++) {
                    const aulaGrupo1 = grupo1[k];
    
                    // Calcula o horário de início da próxima aula no grupo 1
                    const inicioProximaAulaGrupo1 =
                        converterEmMinutos(aulaGrupo1.horarioInicio) +
                        aulaGrupo1.duracao;
    
                    if (k + 1 < grupo2.length) {
                        const aulaGrupo2 = grupo2[k + 1];
                        const inicioAulaGrupo2 = converterEmMinutos(aulaGrupo2.horarioInicio);
    
                        // Faz a comparação e adiciona os resultados
                        if (inicioAulaGrupo2 < inicioProximaAulaGrupo1) {
                            resultadosDiv.innerHTML += `
                                <p>Se na ${k + 1}ª Aula o professor tiver aula com turma do Grupo ${gruposIds[i]}, pode ter a próxima aula com turma do Grupo ${gruposIds[j]}? <span class="vermelho">NÃO</span></p>`;
                        } else if((inicioAulaGrupo2 - inicioProximaAulaGrupo1) > 20 ) {
                            resultadosDiv.innerHTML += `
                                <p>Se na ${k + 1}ª Aula o professor tiver aula com turma do Grupo ${gruposIds[i]}, pode  ter a próxima aula com turma do Grupo ${gruposIds[j]}? <span class="vermelho">É RUIM</span></p>`;
                        }  else{
                            resultadosDiv.innerHTML += `
                                <p>Se na ${k + 1}ª Aula o professor tiver aula com turma do Grupo ${gruposIds[i]}, pode  ter a próxima aula com turma do Grupo ${gruposIds[j]}? <span class="verde">SIM</span></p>`;
                        }

                    }
                }
            }
        }
         // mostrar resultado na tela
         campoResultado.style = "display: flex";
         campoResultado.scrollIntoView();
    }
    


// resetar a página
function resetar(){
   location.reload();
}
