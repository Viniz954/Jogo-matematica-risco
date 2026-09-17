/*
Sistema de Estatísticas 
Autor: Slyminho e Vinzy
*/

const Estatisticas = {

    chave: "estatisticasJogo",

    dadosPadrao: {
        verdesPegas: 0,
        vermelhasPegas: 0,
        vitorias: 0,
        derrotas: 0,
        roundsFeitos: 0
    },

    obter() {

        const dadosSalvos =
            localStorage.getItem(this.chave);

        if (!dadosSalvos) {
            return { ...this.dadosPadrao };
        }

        try {

            const dados =
                JSON.parse(dadosSalvos);

            return {
                ...this.dadosPadrao,
                ...dados
            };

        } catch (erro) {

            console.error(
                "Erro ao carregar estatísticas:",
                erro
            );

            return { ...this.dadosPadrao };
        }
    },


    salvar(dados) {

        localStorage.setItem(
            this.chave,
            JSON.stringify(dados)
        );
    },


    registrarVerde() {

        const dados = this.obter();

        dados.verdesPegas++;

        this.salvar(dados);
    },


    registrarVermelha() {

        const dados = this.obter();

        dados.vermelhasPegas++;

        this.salvar(dados);
    },


    registrarRound() {

        const dados = this.obter();

        dados.roundsFeitos++;

        this.salvar(dados);
    },


    registrarVitoria() {

        const dados = this.obter();

        dados.vitorias++;

        this.salvar(dados);
    },


    registrarDerrota() {

        const dados = this.obter();

        dados.derrotas++;

        this.salvar(dados);
    },


    obterTaxaAcerto() {

        const dados = this.obter();

        const totalCartas =
            dados.verdesPegas +
            dados.vermelhasPegas;

        if (totalCartas === 0) {
            return 0;
        }

        return (
            dados.verdesPegas /
            totalCartas
        ) * 100;
    },


    obterResumo() {

        const dados = this.obter();

        return {

            verdesPegas: dados.verdesPegas,

            vermelhasPegas: dados.vermelhasPegas,

            vitorias: dados.vitorias,

            derrotas: dados.derrotas,

            roundsFeitos: dados.roundsFeitos,

            taxaAcerto: this.obterTaxaAcerto()

        };
    },


    resetar() {

        this.salvar({
            ...this.dadosPadrao
        });
    }

};