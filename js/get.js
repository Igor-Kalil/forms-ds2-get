const resposta = document.querySelector("Resposta");
const lista = document.querySelector ("#lista-herois");
const modelo = document.querySelector ("#modelo-heroi");


const apiKey = "cv_211VVnuYxDpF1AAU6Xb6RSShPDUiM_W5ENadCm1UAEASUgG5Q";

const apiUrl = "https://api-ds.codeverse.dev.br/api/jogos";

async function buscarherois() {
    
    //Mostra uma mensagem
    resposta.textContent="Carregando heróis..."

    try {
        //fazer o GET
        const retorno = await fetch(apiUrl, {
            method: "GET",
            headers: {"x-api-key": apiKey},
        })

        //verificar se não deu certo
        if(!retorno.ok) {
            throw new Error("Não foi possível carregar os heróis.");
        }

        //Converter o resultado para JSON, pois será um objeto.
        const resultado = await retorno.json();

        //Percorrer todos os heróis que esta dentro de resultado.
        for (const heroi of resultado.data) {
            //Fazer uma copia do modelo que criamos no html

            const card = modelo.textContent.cloneNode(true);

            //Preencher cada item desse card

            card.queryselector(".nome").textContent = heroi.title;
            card.queryselector(".poder").textContent = heroi.poder;
            card.queryselector(".universo").textContent = heroi.universo;
            card.queryselector(".fraqueza").textContent = heroi.fraqueza;

            const imagem = card.querySelector(".imagem-heroi");

            if(heroi.imageUrl) {
                imagem.src = heroi.imageUrl;
                imagem.alt = heroi.title;
                imagem.oneerror = () => imagem.remove
            } else {
                imagem.remove();
            }

            //adiciona  o card preenchido na tela

            lista.appendChild(card);


        }
    } catch (error) {
        console.error(error);
        resposta.textContent="Não foi possivel carregar os heróis. Tente novamente!"
    };
    
}
//executar no arquivo

buscarherois()