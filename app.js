// Variáveis globais para armazenamento dos grupos e aulas
let grupos = {};


//mostrar,esconder tutorial
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



// Atualiza o objeto "grupos" com o número de grupos especificado
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
        criarCampoAula(grupoId ,i , divGrupo, qtdAulas);
    }
    grupos[grupoId] = Array(qtdAulas).fill({ horarioInicio: null, duracao: 0, intervalo: 0 });


}

// Cria os campos de inputs para uma aula específica
function criarCampoAula(grupoId, aulaId, container, contador) {
    const campoInputs = document.createElement("div");
    campoInputs.className = "campoInput";
    container.appendChild(campoInputs);
    restringirCampoInput(campoInputs, grupoId, aulaId, contador);

}





// especifica como deve criar o campo input, dependendo de qual o Id da aula
function restringirCampoInput(campoInputs, grupoId, aulaId, contador){
    
    if(aulaId === 1){

    //Primeira aula
    campoInputs.innerHTML = `
    <label for="horarioInicio${grupoId}_${aulaId}">Horário de início <strong>${aulaId}</strong>ªAula:</label>
    <input type="time" id="horarioInicio${grupoId}_${aulaId}" onchange="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">

    <label for="duracao${grupoId}_${aulaId}">Duração da aula:</label>
    <input type="number" id="duracao${grupoId}_${aulaId}" onKeyPress="if(this.value.length==3) return false;" max="200" oninput="atualizarHorariosDeInicio(${aulaId}, ${grupoId})" >

        <div class="intervalo-container">

            <label for="duracaoIntervalo${grupoId}_${aulaId}">Duração intervalo(se houver):</label>
            <input type="number" id="duracaoIntervalo${grupoId}_${aulaId}" onKeyPress="if(this.value.length==3) return false;" max="200" class="input-pequeno"  oninput="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">
       
        </div>
            `;

        
    }else if(aulaId > 1 && aulaId != contador){
        campoInputs.innerHTML = `
        <div class="bloqueio-cadastro_${grupoId}_${aulaId}">
            <label for="horarioInicio${grupoId}_${aulaId}">Horário de início <strong>${aulaId}</strong>ªAula:</label>
            <input type="time" id="horarioInicio${grupoId}_${aulaId}">
        
            <label for="duracao${grupoId}_${aulaId}">Duração da aula:</label>
            <input type="number" id="duracao${grupoId}_${aulaId}" onKeyPress="if(this.value.length==3) return false;" max="200" oninput="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">
        
                <div class="intervalo-container">
                    
                    <label for="duracaoIntervalo${grupoId}_${aulaId}">Duração intervalo(se houver):</label>
                    <input type="number" id="duracaoIntervalo${grupoId}_${aulaId}" onKeyPress="if(this.value.length==3) return false;" max="200" class="input-pequeno" oninput="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">
               
                    </div>
        </div>
                    `
                ;
     // Adiciona a mensagem de tooltip ao campo de horário
     document.getElementById(`horarioInicio${grupoId}_${aulaId}`).addEventListener("keydown", (event) => {
        criarMensagemErros(`Defina o horário de início somente na primeira aula!`, `horarioInicio${grupoId}_${aulaId}`);
        event.preventDefault();
    });
     bloquearInteracao(true,`bloqueio-cadastro_${grupoId}_${aulaId}`);

            }else if(aulaId === contador){
                campoInputs.innerHTML = `
                <div class="bloqueio-cadastro_${grupoId}_${aulaId}">
                    <label for="horarioInicio${grupoId}_${aulaId}">Horário de início <strong>${aulaId}</strong>ªAula:</label>
                    <input type="time" id="horarioInicio${grupoId}_${aulaId}">
                
                    <label for="duracao${grupoId}_${aulaId}">Duração da aula:</label>
                    <input type="number" id="duracao${grupoId}_${aulaId}" onKeyPress="if(this.value.length==3) return false;" max="200" oninput="atualizarHorariosDeInicio(${aulaId}, ${grupoId})">
                
                        <div class="intervalo-container" style="display: none;">
                            
                            <label for="duracaoIntervalo${grupoId}_${aulaId}"  >Duração intervalo(se houver):</label>
                            <input type="number" id="duracaoIntervalo${grupoId}_${aulaId}" onKeyPress="if(this.value.length==3) return false;" max="200" class="input-pequeno" >
                       
                            </div>
                </div>
                            `
                        ;
             // Adiciona a mensagem de tooltip ao campo de horário
             document.getElementById(`horarioInicio${grupoId}_${aulaId}`).addEventListener("keydown", (event) => {
                criarMensagemErros(`Defina o horário de início somente na primeira aula!`, `horarioInicio${grupoId}_${aulaId}`);
                event.preventDefault();
            });
             bloquearInteracao(true,`bloqueio-cadastro_${grupoId}_${aulaId}`);
        
                    }


}





// Atualiza os horários e durações automaticamente
function atualizarHorariosDeInicio(checkAula, grupoId) {
    const horarioAtual = document.getElementById(`horarioInicio${grupoId}_${checkAula}`).value;
    const duracaoAtual = parseInt(document.getElementById(`duracao${grupoId}_${checkAula}`).value) || 0;
    const intervaloAtual = parseInt(document.getElementById(`duracaoIntervalo${grupoId}_${checkAula}`).value) || 0;



    // Valida se o horário atual foi preenchido
    if (!horarioAtual){
        let contadorLoop = grupos[grupoId].length - 1;
        for(let i = 0; i < contadorLoop; i ++ ){
            if(document.getElementById(`horarioInicio${grupoId}_${(checkAula + (i+1))}`)){
            bloquearInteracao(true,`bloqueio-cadastro_${grupoId}_${(checkAula + (i+1))}`);

        }
    }
        return;
    };

    

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


    
}


//preencher os próximos horários e atualizar a array grupos
function preencherProximosHorarios(checkAula, horarioAtualSomado, duracaoPadraoAula, grupoId) {
    let proximaAula = checkAula + 1;


    while (document.getElementById(`horarioInicio${grupoId}_${proximaAula}`)) {
        const proximoHorarioInput = document.getElementById(`horarioInicio${grupoId}_${proximaAula}`);
        const proximaDuracaoInput = document.getElementById(`duracao${grupoId}_${proximaAula}`);
        const proximoIntervaloInput = document.getElementById(`duracaoIntervalo${grupoId}_${proximaAula}`);



        if(checkAula == 1){
            if(horarioAtualSomado && duracaoPadraoAula > 0){
                bloquearInteracao(false,`bloqueio-cadastro_${grupoId}_${proximaAula}`);
            }
        }

        // Preenche o próximo horário
        proximoHorarioInput.value = converterEmHoras(horarioAtualSomado);

        // Atualiza a duração padrão para os campos subsequentes
        proximaDuracaoInput.value = duracaoPadraoAula || "";

        //trata o intervalo
        const proximoIntervaloValor = proximoIntervaloInput ? parseInt(proximoIntervaloInput.value) || 0 : 0;


        // Incrementa o horário com a duração e o intervalo
        const proximaDuracao = parseInt(proximaDuracaoInput.value) || duracaoPadraoAula;


        //atualiza o grupo
        grupos[grupoId][proximaAula - 1] = {
            horarioInicio: converterEmHoras(horarioAtualSomado),
            duracao: proximaDuracao,
            intervalo: proximoIntervaloValor,
        }

        // atualiza o horário somado
        horarioAtualSomado += proximaDuracao + proximoIntervaloValor;
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
            criarMensagemErros(`O Grupo ${grupoId} está vazio!`, `quantidadeAulas-grupo${grupoId}`);
            return;
        }

        //Verifica se o horarioInicio é nulo ou vazio
        if(!document.getElementById(`horarioInicio${grupoId}_1`).value){
            criarMensagemErros(`Informe o horário de início da primeira aula do grupo ${grupoId}!`,`horarioInicio${grupoId}_1`);
            return;
        } 



        //Verifica cada aula do grupo
        for(let aulaId = 1; aulaId <= aulas.length; aulaId++){
            const duracaoInput = document.getElementById(`duracao${grupoId}_${aulaId}`);

            // Verifica se a duração desta aula analisada é nula ou 0
            const duracaoValor = parseInt(duracaoInput.value) || 0;
            if(duracaoValor === 0){
                document.getElementById("campo-erro").classList.remove("invisivel");
                criarMensagemErros(`A duração da ${aulaId}ª aula do grupo ${grupoId} não pode ser 0!`, `duracao${grupoId}_${aulaId}`);
                return;
            }
            // caso seja negativa
            else if(duracaoValor < 0 ){
                document.getElementById("campo-erro").classList.remove("invisivel");
                criarMensagemErros(`A duração da ${aulaId}ª aula do grupo ${grupoId} não pode ser negativa!`, `duracao${grupoId}_${aulaId}` );
                return;
            }

        }


        //verifica cada intervalo
        for(let aulaId = 1; aulaId <= aulas.length; aulaId++){
            const duracaoIntervaloInput = document.getElementById(`duracaoIntervalo${grupoId}_${aulaId}`);
                    // caso seja negativo
                    if(duracaoIntervaloInput){
                        if(duracaoIntervaloInput  && duracaoIntervaloInput.value < 0 ){
                            document.getElementById("campo-erro").classList.remove("invisivel");
                            criarMensagemErros(`A duração do intervalo depois da ${aulaId}ª aula do grupo ${grupoId} não pode ser negativa!`, `duracaoIntervalo${grupoId}_${aulaId}`);
                            return;
                        }
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
         // mostrar somente resultado na tela
         campoResultado.style = "display: flex";
         campoResultado.scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
         document.getElementById("container__conteudo__extra").style.display = "block";

    }

    function criarMensagemErros(mensagem, campoReferencia) {
        const corpo = document.getElementById("campo-erro"); 
    
        // Adicionar a mensagem de erro
        corpo.innerHTML = `
        <section id="campo-erro" class="container-erro overlay">
            <p><span class="branco">${mensagem}</span></p>
            <button class="botao-tutorial" onclick="voltarTela()">Ok!</button>
        </section>
        `;

        // Bloquear todos os botões e inputs dentro do container principal
        bloquearInteracao(true, "container");

        
        //Move a tela e centraliza o campo com erro
        document.getElementById(`${campoReferencia}`).scrollIntoView({block: "center", inline: "nearest", behavior: "smooth"});
    }


    
    function voltarTela() {
        const secao = document.querySelector(".container-erro");
        if(secao){
        secao.remove();
        }
    
        // Reativar os botões e inputs após a remoção do container de erro
        bloquearInteracao(false, "container");
    }
    


    function bloquearInteracao(bloquear, containerId) {
        // Selecionar todos os botões e inputs dentro do container principal
        const containerPrincipal = document.querySelector(`.${containerId}`); // Substitua pelo seletor correto se necessário
    
        // Bloqueia os inputs com a classe bloqueado
        if(bloquear){
            containerPrincipal.classList.add("bloqueado");
        }else{
            containerPrincipal.classList.remove("bloqueado");
        }
    }



