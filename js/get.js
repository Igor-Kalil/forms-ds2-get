const resposta = document.querySelector("#resposta");
const lista = document.querySelector ("#lista-jogos");
const modelo = document.querySelector ("#modelo-jogo");


const apiKey = "cv_211VVnuYxDpF1AAU6Xb6RSShPDUiM_W5ENadCm1UAEASUgG5Q-F1tN1Bv30afSqH";

const apiUrl = "https://api-ds.codeverse.dev.br/api/jogos";

async function buscarjogos() {
    
    //Mostra uma mensagem
    resposta.textContent="Carregando jogos..."

    try {
        //fazer o GET
        const retorno = await fetch(apiUrl, {
            method: "GET",
            headers: {"x-api-key": apiKey},
        })

        //verificar se não deu certo
        if(!retorno.ok) {
            throw new Error("Não foi possível carregar os jogos.");
        }

        //Converter o resultado para JSON, pois será um objeto.
        const resultado = await retorno.json();

        //Percorrer todos os jogos que esta dentro de resultado.
        for (const jogo of resultado.data) {
            //Fazer uma copia do modelo que criamos no html

            const card = modelo.content.cloneNode(true);

            //Preencher cada item desse card

            card.querySelector(".nome").textContent = jogo.title;
            card.querySelector(".genero").textContent = jogo.genero;
            card.querySelector(".plataforma").textContent = jogo.plataforma;
            card.querySelector(".ano_lancamento").textContent = jogo.ano_lancamento;
            card.querySelector(".desenvolvedora").textContent = jogo.desenvolvedora;

            const imagem = card.querySelector(".imagem-jogo");

            if(jogo.imageUrl) {
                imagem.src = jogo.imageUrl;
                imagem.alt = jogo.title;
                imagem.onerror = () => imagem.remove();
            } else {
                imagem.remove();
            }

            //adiciona  o card preenchido na tela

            lista.appendChild(card);
            resposta.textContent ="";
        }
    } catch (error) {
        console.error(error);
        resposta.textContent="Não foi possivel carregar os jogos. Tente novamente!"
    };
    
}
//executar no arquivo

buscarjogos();