// Variáveis globais e arrays
let grupos = [];

// Listener do número de grupos, cria as divisões e os primeiros inputs
document.getElementById("num-grupos").addEventListener("input", function () {
    const horariosInputs = document.querySelector(".horarios-inputs");
    horariosInputs.innerHTML = "";
    const numGrupos = parseInt(this.value);

    if (numGrupos > 1 && numGrupos <= 4) {
        for (let i = 1; i <= numGrupos; i++) {
            // Cria o container de cada grupo
            const divGrupo = document.createElement("div");
            divGrupo.className = `form-group${i}`;
            divGrupo.classList.add("form-group");
            divGrupo.id = `form-grupo${i}`;
            divGrupo.innerHTML = `<h2>Grupo ${i}</h2>`;
            horariosInputs.appendChild(divGrupo);

            // Inclui primeiros inputs
            const label = document.createElement("label");
            label.textContent = "Selecione a quantidade de aulas neste turno:";
            divGrupo.appendChild(label);

            const select = document.createElement("select");
            select.setAttribute("id", `quantidadeAulas-grupo${i}`);
            select.addEventListener("change", () => definirQtdAulas(i, parseInt(select.value)));
            divGrupo.appendChild(select);

            // Adiciona as options dinamicamente
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecionar";
            select.appendChild(defaultOption);

            for (let j = 1; j <= 20; j++) {
                const option = document.createElement("option");
                option.value = j.toString();
                option.textContent = j.toString();
                select.appendChild(option);
            }
        }
    }
});

// Função para definir a quantidade de aulas por grupo
function definirQtdAulas(grupoId, qtdAulas) {
    const divGrupo = document.getElementById(`form-grupo${grupoId}`);

    // Limpar inputs antigos
    const camposAntigos = divGrupo.querySelectorAll(".campoInput");
    camposAntigos.forEach((campo) => campo.remove());

    // Criar novos campos
    for (let i = 1; i <= qtdAulas; i++) {
        const campoInputs = document.createElement("div");
        campoInputs.className = "campoInput";

        const labelInicio = document.createElement("label");
        labelInicio.textContent = `Que horas inicia a ${i}ª aula?`;
        campoInputs.appendChild(labelInicio);

        const horarioInicio = document.createElement("input");
        horarioInicio.type = "time";
        horarioInicio.id = `horarioInicio-grupo${grupoId}-aula${i}`;
        campoInputs.appendChild(horarioInicio);

        const labelDuracao = document.createElement("label");
        labelDuracao.textContent = "Duração da aula (minutos):";
        campoInputs.appendChild(labelDuracao);

        const duracao = document.createElement("input");
        duracao.type = "number";
        duracao.id = `duracao-grupo${grupoId}-aula${i}`;
        campoInputs.appendChild(duracao);

        const labelIntervalo = document.createElement("label");
        labelIntervalo.textContent = "Duração do intervalo (minutos):";
        campoInputs.appendChild(labelIntervalo);

        const intervalo = document.createElement("input");
        intervalo.type = "number";
        intervalo.id = `intervalo-grupo${grupoId}-aula${i}`;
        intervalo.value = "0"; // Valor padrão 0
        campoInputs.appendChild(intervalo);

        divGrupo.appendChild(campoInputs);
    }
}

// Função para capturar os dados de todos os grupos
function capturarDadosGrupos() {
    grupos = []; // Limpa o array antes de capturar novamente

    const numGrupos = parseInt(document.getElementById("num-grupos").value);

    for (let grupoId = 1; grupoId <= numGrupos; grupoId++) {
        const grupoDiv = document.getElementById(`form-grupo${grupoId}`);
        if (!grupoDiv) continue;

        const campos = grupoDiv.querySelectorAll(".campoInput");
        const aulas = Array.from(campos).map((campo, index) => {
            const horarioInicio = campo.querySelector(`#horarioInicio-grupo${grupoId}-aula${index + 1}`)?.value || "00:00";
            const duracao = campo.querySelector(`#duracao-grupo${grupoId}-aula${index + 1}`)?.value || "0";
            const intervalo = campo.querySelector(`#intervalo-grupo${grupoId}-aula${index + 1}`)?.value || "0";
            return {
                aula: index + 1,
                horarioInicio,
                duracao: parseInt(duracao),
                intervalo: parseInt(intervalo),
            };
        });

        grupos.push({ grupo: grupoId, aulas });
    }

    console.log(grupos); // Exibe o array no console
    analisarHorarios();
}

// Função para analisar os horários e gerar os resultados
function analisarHorarios() {
    const resultados = document.querySelector(".resultados");
    resultados.innerHTML = ""; // Limpa os resultados anteriores

    grupos.forEach((grupo1) => {
        grupos.forEach((grupo2) => {
            if (grupo1.grupo === grupo2.grupo) return; // Ignorar o mesmo grupo

            grupo1.aulas.forEach((aula1) => {
                grupo2.aulas.forEach((aula2) => {
                    const fimAula1 = calcularHorarioFinal(aula1.horarioInicio, aula1.duracao + aula1.intervalo);
                    const inicioAula2 = aula2.horarioInicio;

                    const mensagem = document.createElement("div");
                    mensagem.innerHTML = `
                        Se na ${aula1.aula}ª aula o professor tiver aula com alguma turma do Grupo ${grupo1.grupo}, 
                        poderá lecionar a próxima aula para alguma turma do Grupo ${grupo2.grupo}?
                    `;

                    if (fimAula1 > inicioAula2) {
                        mensagem.innerHTML += `<div style="color: white; background-color: red; padding: 10px;">Não!</div>`;
                    } else {
                        mensagem.innerHTML += `<div style="color: white; background-color: green; padding: 10px;">Sim!</div>`;
                    }

                    resultados.appendChild(mensagem);
                });
            });
        });
    });
}

// Função para calcular o horário final da aula
function calcularHorarioFinal(horarioInicio, duracaoTotal) {
    const [horas, minutos] = horarioInicio.split(":").map(Number);
    const totalMinutos = horas * 60 + minutos + duracaoTotal;
    const horasFinais = Math.floor(totalMinutos / 60);
    const minutosFinais = totalMinutos % 60;
    return `${horasFinais.toString().padStart(2, "0")}:${minutosFinais.toString().padStart(2, "0")}`;
}

// Adiciona o botão para capturar os dados
const botaoCapturar = document.createElement("button");
botaoCapturar.textContent = "Verificar Dados dos Grupos";
botaoCapturar.addEventListener("click", capturarDadosGrupos);
document.body.appendChild(botaoCapturar);

// Container para exibir os resultados
const resultadosContainer = document.createElement("div");
resultadosContainer.className = "resultados";
document.body.appendChild(resultadosContainer);
