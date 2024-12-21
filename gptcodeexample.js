// Seleção dos elementos principais do DOM
const classeFormPrimeiro = document.querySelector(".conteudo__primeiro-cadastro");
const classeFormSegundo = document.querySelector(".conteudo__segundo-cadastro");

// Variáveis globais
let duracaoPadraoAula = null;
let itensCriados = [];

// Botão para avançar do primeiro para o segundo formulário
function infoInicial(e) {
    e.preventDefault();

    // Atualiza o título e troca a exibição dos formulários
    document.querySelector('h1').textContent = "Definir horário de início e duração das aulas";
    classeFormPrimeiro.classList.add('invisivel');
    classeFormSegundo.classList.remove('invisivel');
}

// Função para criar campos de entrada para as aulas
function definirQtdAulas() {
    const qtdTotalAulas = parseInt(document.getElementById("quantidadeAulas").value);

    // Remove campos existentes, se necessário
    if (itensCriados.length > 0) {
        itensCriados.forEach(item => item.remove());
        itensCriados = [];
    }

    const classePai = document.querySelector('.conteudo__segundo-cadastro');

    for (let i = 0; i < qtdTotalAulas; i++) {
        let indiceAula = i + 1;

        // Criação do contêiner da linha
        const containerLinha = document.createElement("div");
        containerLinha.className = "form-group";
        itensCriados.push(containerLinha);

        // Campo para horário de início
        const labelInicio = criarLabel(`horarioInicio${indiceAula}ªaula`, 
            i === 0 ? `Que horas inicia a ${indiceAula}ª aula?` : `Então, sua ${indiceAula}ª aula começa:`);
        const inputInicio = criarInput("time", `horarioInicio${indiceAula}ªaula`);

        // Campo para duração da aula
        const labelDuracao = criarLabel(`duracao${indiceAula}ªAula`, "Duração da aula (minutos):");
        const inputDuracao = criarInput("number", `duracao${indiceAula}ªAula`);

        // Checkbox para adicionar intervalo
        const checkbox = criarInput("checkbox", `checkbox${indiceAula}`);
        const labelCheckbox = criarLabel(`checkbox${indiceAula}`, "Adicionar intervalo após esta aula");

        // Botão para checar e preencher horários
        const botaoPreencher = criarBotao(`preencher-${indiceAula}ªaula`, "Checar Horários", () => {
            atualizarHorariosDeInicio(indiceAula);
        });
        if (i > 0) botaoPreencher.style.display = 'none';

        // Evento para exibir ou ocultar campos de intervalo
        checkbox.addEventListener("change", () => {
            toggleCampoIntervalo(containerLinha, indiceAula, checkbox.checked);
        });

        // Monta a linha com os campos
        containerLinha.append(labelInicio, inputInicio, labelDuracao, inputDuracao, labelCheckbox, checkbox, botaoPreencher);
        classePai.appendChild(containerLinha);
    }
}

// Atualiza os horários de início das aulas subsequentes
function atualizarHorariosDeInicio(aulaAtual) {
    const horaAtual = document.getElementById(`horarioInicio${aulaAtual}ªaula`).value;
    const duracaoAula = parseInt(document.getElementById(`duracao${aulaAtual}ªAula`).value);
    const checkbox = document.getElementById(`checkbox${aulaAtual}`);
    const duracaoIntervalo = checkbox.checked ? parseInt(document.getElementById(`duracaoIntervalo${aulaAtual}`).value) : 0;

    if (!horaAtual || isNaN(duracaoAula) || (checkbox.checked && isNaN(duracaoIntervalo))) {
        alert("Preencha todos os campos obrigatórios nesta linha!");
        return;
    }

    if (!duracaoPadraoAula) duracaoPadraoAula = duracaoAula;

    let horarioEmMinutos = converterEmMinutos(horaAtual) + duracaoAula + duracaoIntervalo;
    preencherProximosHorarios(aulaAtual, horarioEmMinutos);
}

// Converte um horário (hh:mm) para minutos totais
function converterEmMinutos(horario) {
    if (typeof horario !== "string" || !horario.includes(":")) {
        throw new Error("O horário deve ser uma string no formato HH:MM.");
    }
    const [horas, minutos] = horario.split(":").map(Number);
    return horas * 60 + minutos;
}

// Converte minutos totais para horário (hh:mm)
function converterEmHoras(minutos) {
    const horas = Math.floor(minutos / 60);
    const restanteMinutos = minutos % 60;
    return `${horas.toString().padStart(2, '0')}:${restanteMinutos.toString().padStart(2, '0')}`;
}

// Preenche horários subsequentes com base no horário atual
function preencherProximosHorarios(aulaAtual, horarioEmMinutos) {
    let proximaAula = aulaAtual + 1;

    while (document.getElementById(`horarioInicio${proximaAula}ªaula`)) {
        const campoHorario = document.getElementById(`horarioInicio${proximaAula}ªaula`);
        const campoDuracao = document.getElementById(`duracao${proximaAula}ªAula`);

        campoHorario.value = converterEmHoras(horarioEmMinutos);
        campoDuracao.value = duracaoPadraoAula;

        horarioEmMinutos += duracaoPadraoAula;

        const checkbox = document.getElementById(`checkbox${proximaAula}`);
        if (checkbox && checkbox.checked) {
            const campoIntervalo = document.getElementById(`duracaoIntervalo${proximaAula}`);
            if (campoIntervalo && !isNaN(parseInt(campoIntervalo.value))) {
                horarioEmMinutos += parseInt(campoIntervalo.value);
            }
        }

        proximaAula++;
    }
}

// Alterna a exibição de campos de intervalo
function toggleCampoIntervalo(container, indiceAula, exibir) {
    let labelIntervalo = container.querySelector(`#labelIntervalo${indiceAula}`);
    let inputIntervalo = container.querySelector(`#duracaoIntervalo${indiceAula}`);

    if (exibir) {
        if (!labelIntervalo && !inputIntervalo) {
            labelIntervalo = criarLabel(`duracaoIntervalo${indiceAula}`, "Duração do intervalo (minutos):");
            inputIntervalo = criarInput("number", `duracaoIntervalo${indiceAula}`);
            container.append(labelIntervalo, inputIntervalo);
        }
    } else {
        if (labelIntervalo) labelIntervalo.remove();
        if (inputIntervalo) inputIntervalo.remove();
    }
}

// Funções utilitárias para criar elementos DOM
function criarLabel(forAttribute, text) {
    const label = document.createElement("label");
    label.htmlFor = forAttribute;
    label.textContent = text;
    return label;
}

function criarInput(type, id) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = id;
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
