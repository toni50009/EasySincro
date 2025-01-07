// Variáveis globais para armazenamento dos grupos e aulas
let grupos = {};

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
        }
        botaoComparar.classList.remove("invisivel");
    } else {
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
        <h2>Grupo ${grupoId}</h2>
        <label for="quantidadeAulas-grupo${grupoId}">
            Selecione a quantidade de aulas neste turno:
        </label>
        <select id="quantidadeAulas-grupo${grupoId}" onchange="definirQtdAulas(${grupoId})">
            <option value="0">Selecionar</option>
            ${Array.from({ length: 20 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}
        </select>
    `;
    container.appendChild(divGrupo);
}

// Define a quantidade de aulas e cria os campos de inputs correspondentes
function definirQtdAulas(grupoId) {
    const qtdAulas = parseInt(document.getElementById(`quantidadeAulas-grupo${grupoId}`).value);
    const divGrupo = document.querySelector(`.form-grupo${grupoId}`);
    divGrupo.querySelectorAll(".campoInput").forEach((campo) => campo.remove());

    for (let i = 1; i <= qtdAulas; i++) {
        criarCampoAula(grupoId, i, divGrupo);
    }
    grupos[grupoId] = Array(qtdAulas).fill({ horarioInicio: null, duracao: 0, intervalo: 0 });
}

// Cria os campos de inputs para uma aula específica
function criarCampoAula(grupoId, aulaId, container) {
    const campoInputs = document.createElement("div");
    campoInputs.className = "campoInput";
    campoInputs.innerHTML = `
        <label for="horarioInicio${grupoId}_${aulaId}">Horário de início ${aulaId}ªAula:</label>
        <input type="time" id="horarioInicio${grupoId}_${aulaId}" onchange="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">

        <label for="duracao${grupoId}_${aulaId}">Duração da aula (minutos):</label>
        <input type="number" id="duracao${grupoId}_${aulaId}" oninput="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">

        <label for="checkbox${grupoId}_${aulaId}">Intervalo após a aula:</label>
        <input type="checkbox" id="checkbox${grupoId}_${aulaId}" onchange="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">

        <label for="duracaoIntervalo${grupoId}_${aulaId}" style="display: none;">Duração do intervalo (minutos):</label>
        <input type="number" id="duracaoIntervalo${grupoId}_${aulaId}" style="display: none;" oninput="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">
    `;

    const checkbox = campoInputs.querySelector(`#checkbox${grupoId}_${aulaId}`);
    const labelIntervalo = campoInputs.querySelector(`label[for="duracaoIntervalo${grupoId}_${aulaId}"]`);
    const inputIntervalo = campoInputs.querySelector(`#duracaoIntervalo${grupoId}_${aulaId}`);

    checkbox.addEventListener("change", () => {
        const display = checkbox.checked ? "block" : "none";
        labelIntervalo.style.display = display;
        inputIntervalo.style.display = display;
    });

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



