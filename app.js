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
            const containerLinha = document.createElement("div");
            containerLinha.className = "form-group";  
            itensCriados.push(containerLinha);
            
            const horariosAulas = document.createElement("input");
            horariosAulas.type = "time";
            horariosAulas.id = `horarioInicio${i+ 1}ªaula`;
            horariosAulas.name = `horarioInicio${i+ 1}ªaula`;

            
            const labelInicio = document.createElement("label");
            labelInicio.htmlFor = `horarioInicio${i+ 1}ªaula`;
            if(i == 0){
            labelInicio.textContent = `Que horas inicia a ${i+ 1}ª aula?`;
            }else{
                labelInicio.textContent = `Então, sua ${i+ 1}ª aula começa:`;
            }



            const labelDuracao = document.createElement("label");
            labelDuracao.htmlFor = `duracao${i + 1}`;
            labelDuracao.textContent = "Duração da aula (minutos):";
    
            const inputDuracao = document.createElement("input");
            inputDuracao.type = "number";
            inputDuracao.id = `duracao${i + 1}`;
            inputDuracao.name = `duracao${i + 1}`;

            
            const labelCheckbox = document.createElement("label");
            labelCheckbox.htmlFor = `checkbox${i+ 1}`;
            labelCheckbox.textContent = "Após essa aula, as turmas têm intervalo?";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `checkbox${i+ 1}`;
            checkbox.name = `checkbox${i +1}`;

            if(i == 0){
                const horariosAulas = document.createElement("input");
                horariosAulas.type = "time";
                horariosAulas.id = `horarioInicio${i+ 1}ªaula`;
                horariosAulas.name = `horarioInicio${i+ 1}ªaula`;
            }

            checkbox.addEventListener("change", () => {
                // Verificar se já existem elementos de intervalo associados
                let labelIntervalo = containerLinha.querySelector(`#labelIntervalo${i + 1}`);
                let duracaoIntervalo = containerLinha.querySelector(`#duracaoIntervalo${i + 1}`);
    
                if (checkbox.checked) {
                    if (!labelIntervalo && !duracaoIntervalo) {
                        // Criar elementos para intervalo, se não existirem
                        labelIntervalo = document.createElement("label");
                        labelIntervalo.id = `labelIntervalo${i + 1}`;
                        labelIntervalo.htmlFor = `duracaoIntervalo${i + 1}`;
                        labelIntervalo.textContent = `Duração do intervalo (minutos):`;
                        containerLinha.appendChild(labelIntervalo);
    
                        duracaoIntervalo = document.createElement("input");
                        duracaoIntervalo.type = "number";
                        duracaoIntervalo.id = `duracaoIntervalo${i + 1}`;
                        duracaoIntervalo.name = `duracaoIntervalo${i + 1}`;
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
            classePai.appendChild(containerLinha);

        }
        console.log(itensCriados);

}

