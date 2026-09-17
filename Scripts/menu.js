/*Todo:
1- Pinto
2- Queria jogar Pixelmon
3- Era pra tá gravando e tá numa festa na lapa
4- Alguém realmente vai ler isso?
5- :]*/

function jogar() {
    console.log("Iniciando jogo...");

    document.body.classList.add("jogo-aberto");
}


function classico() {
    /*Tive que fazer esse sistema pra impedir de colocarem valores maiores que os limites definidos.
    Obrigado, Sly, por ter feito esse sistema no mod de Mine pra eu copiar :]*/

    let total = parseInt(totalCartas.value);
    let ruins = parseInt(badCards.value);
    let rounds = parseInt(rodadas.value);

    if (isNaN(total) || total < 2) {
        total = 2;
    }

    if (total > 20) {
        total = 20;
    }

    if (isNaN(ruins) || ruins < 1) {
        ruins = 1;
    }

    if (ruins >= total) {
        ruins = total - 1;
    }

    if (isNaN(rounds) || rounds < 1) {
        rounds = 1;
    }

    if (rounds > 10) {
        rounds = 10;
    }

    totalCartas.value = total;
    badCards.value = ruins;
    rodadas.value = rounds;

    sessionStorage.setItem("totalCartas", total);
    sessionStorage.setItem("badCards", ruins);
    sessionStorage.setItem("rodadas", rounds);

    window.location.href = "jogoemsifinalmente.html";
}


//CRÉDITOS
function abrirMenu(tipo) {

    console.log("Abrindo menu...");

    menu.classList.add("aberto");
    document.body.classList.add("menu-aberto");

    if (tipo === "configuracoes") {

        menuConteudo.innerHTML = `

        <h2>CONFIGURAÇÕES</h2>

        <div class="configuracao">

            <span>Música</span>

            <button class="config-toggle" id="toggleMusica">
                ATIVADA
            </button>

        </div>

        <div class="configuracao">

            <span>Efeitos sonoros</span>

            <button class="config-toggle" id="toggleSons">
                ATIVADOS
            </button>

        </div>

        <div class="configuracao-wip">
            ███████████████████████████
            <span>W.I.P.</span>
            ███████████████████████████
        </div>

        <div class="configuracao-wip">
            ███████████████████████████
            <span>W.I.P.</span>
            ███████████████████████████
        </div>

        <div class="configuracao-wip">
            ███████████████████████████
            <span>W.I.P.</span>
            ███████████████████████████
        </div>

        `;

        configurarBotoes();

    }


    if (tipo === "creditos") {

        menuConteudo.innerHTML = `

        <h2>CRÉDITOS</h2>

<div class="creditos">

<h3>DESENVOLVIMENTO</h3>

<div class="desenvolvedores">

    <figure>
        <img src="Images/goat.jpg" class="img-redonda">
        <figcaption>Vinzy</figcaption>
    </figure>

    <figure>
        <img src="Images/VerdadeiroGoat.gif" class="img-redonda">
        <figcaption>Gustavo Lucena</figcaption>
    </figure>

</div>

<h3>INFORMAÇÕES</h3>
<div class="creditos-info">

    <p>
        <strong>Programação</strong>
        <span>Vinzy</span>
    </p>

    <p>
        <strong>Ideias e Conceito</strong>
        <span>Gustavo Lucena</span>
    </p>
    
    <p>
        <strong>Inspiração</strong>
        <span>JavaScript — Sly</span>
    </p>

    <p>
        <strong>Músicas e SFX</strong>
        <span>ULTRAKILL</span>
    </p>

    <p>
      <strong>Versão</strong>
        <span>Beta 1.0</span>
    </p>

</div>

<div class="agradecimento">
    OBRIGADO, SHIRAOKI!!!
</div>

</div>


        `;

    }

}

//CONFIGURAÇÕES
function configurarBotoes() {

    const toggleMusica = document.getElementById("toggleMusica");
    const toggleSons = document.getElementById("toggleSons");

    toggleMusica.textContent =
        musicaAtiva ? "ATIVADA" : "DESATIVADA";

    toggleSons.textContent =
        sonsAtivos ? "ATIVADOS" : "DESATIVADOS";


    if (musicaAtiva) {
        toggleMusica.classList.add("ativo");
    } else {
        toggleMusica.classList.remove("ativo");
    }


    if (sonsAtivos) {
        toggleSons.classList.add("ativo");
    } else {
        toggleSons.classList.remove("ativo");
    }


    toggleMusica.addEventListener("click", () => {

        musicaAtiva = !musicaAtiva;

        localStorage.setItem("musicaAtiva", musicaAtiva);

        if (musicaAtiva) {

            musica.play();

            toggleMusica.textContent = "ATIVADA";
            toggleMusica.classList.add("ativo");

        } else {

            musica.pause();

            toggleMusica.textContent = "DESATIVADA";
            toggleMusica.classList.remove("ativo");

        }

    });


    toggleSons.addEventListener("click", () => {

        sonsAtivos = !sonsAtivos;

        localStorage.setItem("sonsAtivos", sonsAtivos);

        if (sonsAtivos) {

            toggleSons.textContent = "ATIVADOS";
            toggleSons.classList.add("ativo");

        } else {

            toggleSons.textContent = "DESATIVADOS";
            toggleSons.classList.remove("ativo");

        }

    });

}


function fecharAviso() {

    const aviso = document.getElementById("aviso");

    aviso.remove();

    if (musicaAtiva) {
        musica.play();
    }

}


/* Guarda qual foi a última opção sobre a qual o jogador passou o mouse. */

const opcoesJogo = document.querySelectorAll(".opcao-jogo");
const nomeOpcao = document.getElementById("nomeOpcao");
const conteudoOpcao = document.getElementById("conteudoOpcao");
const configuracaoJogo = document.getElementById("configuracaoJogo");

opcoesJogo.forEach(opcao => {

    opcao.addEventListener("mouseenter", () => {

        if (!document.body.classList.contains("jogo-aberto")) {
            return;
        }

        nomeOpcao.textContent = opcao.dataset.nome;


        // INICIAR PARTIDA

        if (opcao.dataset.nome === "Iniciar partida") {

            configuracaoJogo.style.display = "block";

            conteudoOpcao.textContent = "";

            conteudoOpcao.appendChild(configuracaoJogo);

        }


        // ESTATÍSTICAS

        else if (opcao.dataset.tipo === "estatisticas") {

            configuracaoJogo.style.display = "none";

            const dados = Estatisticas.obterResumo();

            conteudoOpcao.innerHTML = `

                <div class="estatisticas">

                    <h2>ESTATÍSTICAS</h2>

                    <div class="estatistica">
                        <span>🟢 Verdes pegas</span>
                        <strong>${dados.verdesPegas}</strong>
                    </div>

                    <div class="estatistica">
                        <span>🔴 Vermelhas pegas</span>
                        <strong>${dados.vermelhasPegas}</strong>
                    </div>

                    <div class="estatistica">
                        <span>🏆 Vitórias</span>
                        <strong>${dados.vitorias}</strong>
                    </div>

                    <div class="estatistica">
                        <span>💀 Derrotas</span>
                        <strong>${dados.derrotas}</strong>
                    </div>

                    <div class="estatistica">
                        <span>🔄 Rounds feitos</span>
                        <strong>${dados.roundsFeitos}</strong>
                    </div>

                    <div class="estatistica">
                        <span>🎯 Taxa de acerto</span>
                        <strong>${dados.taxaAcerto.toFixed(1)}%</strong>
                    </div>

                </div>
            `;

        }


        else {

            configuracaoJogo.style.display = "none";

            conteudoOpcao.innerHTML =
                opcao.dataset.conteudo;
        }


        document.body.classList.add("opcao-selecionada");

        if (sonsAtivos) {
            somOpHover.currentTime = 0;
            somOpHover.play();
        }

    });

});

const modosJogo = document.querySelectorAll(".gamemode");
const descricaoModo = document.getElementById("gamemodeDesc");
const botaoIniciar = document.getElementById("botaoIniciar");
const camposConfiguracao = document.querySelectorAll(".configuracao-campo");
const campoEspecial = document.querySelector(".wip-only");
const specialCards = document.getElementById("specialCards");

function configurarModo(modoSelecionado) {

    modosJogo.forEach(outroModo => {
        outroModo.classList.remove("ativo");
    });

    const modo = document.querySelector(
        `.gamemode[data-modo="${modoSelecionado}"]`
    );

    if (modo) {
        modo.classList.add("ativo");
    }


    if (modoSelecionado === "Original") {

        descricaoModo.textContent =
            "Modo original de Risco. Escolha as cartas certas para acumular pontos. Escolha a errada e sofra as consequências.";

        if (botaoIniciar) {
            botaoIniciar.style.display = "block";
        }

        totalCartas.disabled = false;
        badCards.disabled = false;
        document.getElementById("rodadas").disabled = false;

        totalCartas.closest(".configuracao-campo").classList.remove("bloqueado");
        badCards.closest(".configuracao-campo").classList.remove("bloqueado");
        document.getElementById("rodadas").closest(".configuracao-campo").classList.remove("bloqueado");


        campoEspecial.style.display = "none";
        campoEspecial.classList.remove("bloqueado");
        specialCards.disabled = true;

    }


    if (modoSelecionado === "W.I.P") {

        descricaoModo.textContent =
            "Work In Progress. Este modo ainda está em desenvolvimento (Se der tempo eu termino :]).";

        if (botaoIniciar) {
            botaoIniciar.style.display = "none";
        }

        totalCartas.disabled = true;
        badCards.disabled = true;
        document.getElementById("rodadas").disabled = true;

        totalCartas.closest(".configuracao-campo").classList.add("bloqueado");
        badCards.closest(".configuracao-campo").classList.add("bloqueado");
        document.getElementById("rodadas").closest(".configuracao-campo").classList.add("bloqueado");


        campoEspecial.style.display = "flex";
        campoEspecial.classList.add("bloqueado");
        specialCards.disabled = true;

    }

}


modosJogo.forEach(modo => {

    modo.addEventListener("click", () => {

        configurarModo(modo.dataset.modo);

        if (sonsAtivos) {
            somSelect.currentTime = 0;
            somSelect.play();
        }

    });

});


configurarModo("Original");


/* Remove a classe que movimenta o menu "Play", e faz tudo voltar ao lugar.
Fácil, mas demorei pra entender. Código 1 - Vinzy 0*/

function voltarMenu() {

    document.body.classList.remove("jogo-aberto");
    document.body.classList.remove("opcao-selecionada");
    document.body.classList.remove("opcoes-abertas");
    document.body.classList.remove("menu-aberto");

    nomeOpcao.textContent = "Jogar";

    configuracaoJogo.style.display = "none";

    menu.classList.remove("aberto");

}


/* Vou explicar essa parte, pq foi confusa na hora de fazer.*/
const cartas = document.querySelectorAll(".carta"); //Pega todas as cartas (definidas pelo ".carta" no CSS), e define que elas = cartas

cartas.forEach(carta => { //Para cada carta(.carta), vai adicionar os eventos abaixo

    carta.addEventListener("mouseenter", () => { //detecta o evento (Mouse "entrou" na carta)

        if (sonsAtivos) {

            somHover.currentTime = 0; //define que o tempo volta pra 0 toda vez, então o som toca se passar por várias rapidamente
            somHover.play(); //toca o som de Hover

        }

    });


    carta.addEventListener("click", () => {

        if (sonsAtivos) {

            somSelect.currentTime = 0;
            somSelect.play();

        }

    });

});


/*Vantagens:
1- Poupa tempo, já que não precisa ficar criando eventos para cada carta singularmente, já cria para todas as definidas como ".carta"
2- É legal :]*/


const somHover = new Audio("Sounds/hover.mp3"); //Som das cartas
const somSelect = new Audio("Sounds/select.mp3");//Selecionou uma carta
const musica = new Audio("Sounds/fundo.ogg"); //Música ultrakill omega blaster banger gyat
const somOpHover = new Audio("Sounds/options-hover.mp3") //Hover dos botões (Talvez eu mude)

somSelect.volume = 0.3;
somHover.volume = 0.4;
somOpHover.volume = 0.4;

musica.loop = true;
musica.volume = 0.5;


let sonsAtivos = localStorage.getItem("sonsAtivos") !== "false";
let musicaAtiva = localStorage.getItem("musicaAtiva") !== "false";


const menu = document.getElementById("menu");
const menuConteudo = document.getElementById("menuConteudo");

totalCartas.addEventListener("input", () => {

    let total = parseInt(totalCartas.value);

    if (isNaN(total) || total < 2) {
        totalCartas.value = 2;
        total = 2;
    }

    if (total > 20) {
        totalCartas.value = 20;
        total = 20;
    }

    if (parseInt(badCards.value) >= total) {
        badCards.value = total - 1;
    }

});


badCards.addEventListener("input", () => {

    let total = parseInt(totalCartas.value);
    let ruins = parseInt(badCards.value);

    if (isNaN(total) || total < 2) {
        totalCartas.value = 2;
        total = 2;
    }

    if (isNaN(ruins) || ruins < 1) {
        badCards.value = 1;
        ruins = 1;
    }

    if (ruins >= total) {
        badCards.value = total - 1;
    }

});


rodadas.addEventListener("input", () => {

    let rounds = parseInt(rodadas.value);

    if (isNaN(rounds) || rounds < 1) {
        rodadas.value = 1;
    }

});

const botaoEstatisticas =
    document.getElementById("botao-estatisticas");

const telaEstatisticas =
    document.getElementById("tela-estatisticas");

const fecharEstatisticas =
    document.getElementById("fechar-estatisticas");


function atualizarEstatisticas() {

    const dados =
        Estatisticas.obterResumo();


    document.getElementById("verdes-pegas")
        .textContent =
        dados.verdesPegas;


    document.getElementById("vermelhas-pegas")
        .textContent =
        dados.vermelhasPegas;


    document.getElementById("vitorias")
        .textContent =
        dados.vitorias;


    document.getElementById("derrotas")
        .textContent =
        dados.derrotas;


    document.getElementById("rounds-feitos")
        .textContent =
        dados.roundsFeitos;


    document.getElementById("taxa-acerto")
        .textContent =
        `${dados.taxaAcerto.toFixed(1)}%`;
}


botaoEstatisticas.addEventListener("click", () => {

    atualizarEstatisticas();

    telaEstatisticas.classList.add("ativa");

});


fecharEstatisticas.addEventListener("click", () => {

    telaEstatisticas.classList.remove("ativa");

});
