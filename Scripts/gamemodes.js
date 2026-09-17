/*
Modo de jogo: Clássico
Data: 13.09.2026
Autor: Vinzy 
*/

let partidaFinalizada = false;

const sonsAtivos = localStorage.getItem("sonsAtivos") !== "false";
const musicaAtiva = localStorage.getItem("musicaAtiva") !== "false";

const somHover = new Audio("Sounds/hover.mp3");
const somSelect = new Audio("Sounds/select.mp3");
const musica2 = new Audio("Sounds/gameplay.ogg");

musica2.loop = true;
musica2.volume = 0.5;

if (musicaAtiva) {
    musica2.play();
}

somHover.volume = 0.4;
somSelect.volume = 0.3;

const total = parseInt(sessionStorage.getItem("totalCartas"));
const ruins = parseInt(sessionStorage.getItem("badCards"));

const totalRodadas = parseInt(sessionStorage.getItem("rodadas"));
let rodadaAtual = 1;

let pontosRound = 0;
let pontosTotais = 0;

const pontuacaoMaxima = (total - ruins) * totalRodadas;

const objetivo = Math.max(
    1,
    Math.ceil(pontuacaoMaxima * 0.65)
);

const limiteVermelhas = Math.max(
    1,
    Math.ceil(ruins * totalRodadas / 2)
);

let vermelhasPegas = 0;



const baralho = document.getElementById("baralho");

const contadorRodadas = document.createElement("div");
contadorRodadas.classList.add("contador-rodadas");
contadorRodadas.textContent = `${ rodadaAtual }/${totalRodadas}`;
document.body.appendChild(contadorRodadas);

const contadorPontos = document.createElement("div");
contadorPontos.classList.add("contador-pontos");
contadorPontos.textContent = `Pontuação: ${pontosTotais}/${objetivo}`;
document.body.appendChild(contadorPontos);

const contadorVermelhas = document.createElement("div");
contadorVermelhas.classList.add("contador-vermelhas");
contadorVermelhas.textContent = `Vermelhas: ${ vermelhasPegas }/${limiteVermelhas}`;
document.body.appendChild(contadorVermelhas);


const botaoRound = document.createElement("button");
botaoRound.classList.add("botao-round");
botaoRound.textContent = "Próximo Round";
document.body.appendChild(botaoRound);

function criarBaralho() {

    baralho.innerHTML = "";

    for (let i = 0; i < total; i++) {
        const carta = document.createElement("div");
        carta.classList.add("carta-jogo");
        baralho.appendChild(carta);
    }

    const cartasJogo = document.querySelectorAll(".carta-jogo");

    let tiposCartas = [];

    for (let i = 0; i < ruins; i++) {
        tiposCartas.push("ruim");
    }

    for (let i = ruins; i < total; i++) {
        tiposCartas.push("boa");
    }

    tiposCartas.sort(() => Math.random() - 0.5);

    cartasJogo.forEach((carta, index) => {
        carta.dataset.tipo = tiposCartas[index];
    });

    setTimeout(() => {

        const meio = Math.ceil(cartasJogo.length / 2);

        cartasJogo.forEach((carta, index) => {

            let posicao;
            let fileira;

            if (index < meio) {
                fileira = 0;
                posicao = index;
            } else {
                fileira = 1;
                posicao = index - meio;
            }

            const quantidadeNaFileira =
                fileira === 0 ? meio : cartasJogo.length - meio;

            const centro =
                (quantidadeNaFileira - 1) / 2;

            let espacamento = 180;

            if (quantidadeNaFileira > 1) {
                espacamento =
                    Math.min(180, (window.innerWidth - 200) / (quantidadeNaFileira - 1));
            }

            const x = (posicao - centro) * espacamento;
            const y = fileira === 0 ? -140 : 140;
            const angulo = (posicao - centro) * 4;

            carta.style.transform =
                `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angulo}deg)`;

            carta.addEventListener("mouseenter", () => {

                if (carta.classList.contains("escolhida")) {
                    return;
                }

                if (sonsAtivos) {
                    somHover.currentTime = 0;
                    somHover.play();
                }

                carta.style.transform =
                    `translate(calc(-50% + ${x}px), calc(-50% + ${y - 25}px)) rotate(${angulo}deg)`;

                carta.style.zIndex = "10";
                carta.style.boxShadow =
                    "0 30px 40px rgba(0, 0, 0, 0.55)";

            });

            carta.addEventListener("mouseleave", () => {

                if (carta.classList.contains("escolhida")) {
                    return;
                }

                carta.style.transform =
                    `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angulo}deg)`;

                carta.style.zIndex = "";
                carta.style.boxShadow =
                    "0 15px 30px rgba(0, 0, 0, 0.45)";

            });

            carta.addEventListener("click", () => {
                if (carta.classList.contains("escolhida")) {
                    return;
                }

                if (sonsAtivos) {
                    somSelect.currentTime = 0;
                    somSelect.play();
                }

                carta.classList.add("escolhida");

                if (carta.dataset.tipo === "ruim") {

    carta.classList.add("ruim");

    vermelhasPegas++;

    Estatisticas.registrarVermelha();

    contadorVermelhas.textContent =
        `Vermelhas: ${vermelhasPegas}/${limiteVermelhas}`;

    pontosRound = 0;

    if (vermelhasPegas >= limiteVermelhas) {
        perder();
        return;
    }

} else {

    carta.classList.add("boa");

    pontosRound++;

    Estatisticas.registrarVerde();
}
            });

        });

    }, 500);
}

criarBaralho();

function vencer() {

    if (partidaFinalizada) {
        return;
    }

    partidaFinalizada = true;

    Estatisticas.registrarVitoria();
    document.body.innerHTML = "";

    document.body.classList.add("tela-vitoria");

    const telaVitoria = document.createElement("div");
    telaVitoria.classList.add("conteudo-vitoria");

    const tituloVitoria = document.createElement("h1");
    tituloVitoria.textContent = "VITÓRIA";

    const botaoMenu = document.createElement("button");
    botaoMenu.textContent = "Voltar ao menu";

    botaoMenu.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    telaVitoria.appendChild(tituloVitoria);
    telaVitoria.appendChild(botaoMenu);

    document.body.appendChild(telaVitoria);
}

function perder() {

    if (partidaFinalizada) {
        return;
    }

    partidaFinalizada = true;

    Estatisticas.registrarDerrota();

    if (sonsAtivos) {
        setTimeout(() => {
            const somDerrota = new Audio("Sounds/skull.ogg");
            somDerrota.loop = true;
            somDerrota.volume = 0.5;
            somDerrota.play();
        }, 3400);
    }

    document.body.innerHTML = "";

    document.body.classList.add("tela-derrota");

    if (musicaAtiva) {
        const musicaMorte = new Audio("Sounds/death.mp3");
        musicaMorte.volume = 0.5;
        musicaMorte.play();
    }

    const conteudoDerrota = document.createElement("div");
    conteudoDerrota.classList.add("conteudo-derrota");

    const gif = document.createElement("img");
    gif.src = "Images/death.gif";
    gif.classList.add("gif-derrota");

    const botoes = document.createElement("div");
    botoes.classList.add("botoes-derrota");

    const botaoRejogar = document.createElement("button");
    botaoRejogar.textContent = "Rejogar";

    const botaoMenu = document.createElement("button");
    botaoMenu.textContent = "Voltar ao menu";

    botaoRejogar.addEventListener("click", () => {
        window.location.reload();
    });

    botaoMenu.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    botoes.appendChild(botaoRejogar);
    botoes.appendChild(botaoMenu);

    conteudoDerrota.appendChild(gif);
    conteudoDerrota.appendChild(botoes);

    document.body.appendChild(conteudoDerrota);
}
botaoRound.addEventListener("click", () => {

    pontosTotais += pontosRound;

    Estatisticas.registrarRound();

    pontosRound = 0;


    if (rodadaAtual === totalRodadas) {

        if (pontosTotais >= objetivo) {
            vencer();
        } else {
            perder();
        }

        return;
    }


    rodadaAtual++;

    contadorRodadas.textContent =
        `${rodadaAtual}/${totalRodadas}`;

    contadorPontos.textContent =
        `Pontuação: ${pontosTotais}/${objetivo}`;


    criarBaralho();


    if (rodadaAtual === totalRodadas) {
        botaoRound.textContent =
            "Finalizar partida";
    }

});