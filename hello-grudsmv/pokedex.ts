//Script para buscar informaçõe de pokémons pela API PokéAPI


// Interface para a estrutura do tipo de pokemon
interface ApiPokemonInfoTipo {

    type: {
        name: string;
        url: string;
    };
}

// Interface para a estrutra JSON do pokemon

interface ApiPokemonDados {
    name: string;
    height: number;
    weight: number;
    types: ApiPokemonInfoTipo[];
}

class PokemonNaoEncontrado extends Error {
    constructor(pokemon: string) {
        super(`Pokémon não encontrado: ${pokemon}`);
        this.name = 'PokemonNaoEncontrado';
    }
    
}

// Classe para erro de Rede

class ErroDeRede extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = 'ErroDeRede';
    }
}

// Funcao para capitatar informações do pokemon
function capitalizarNomePokemon(text: string): string {

    // Verifica se o texto está vazio
    if (!text) {
        return '';
    }
    // Retorna o texto com a primeira letra maiúscula usando slice
    // para obter o restante do texto a partir do segundo caractere
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Buscar os dados

async function buscarPokemon(pokemon: string): Promise<ApiPokemonDados> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
    console.log(`🔍 Buscando dados para "${pokemon}"...`);
    console.log(' ------------------------------------');
    console.log(`Fazendo requisição para URL: ${url}`);

    let resposta: Response;

    try {
        resposta = await fetch(url);
    } catch (erro) {
        throw new ErroDeRede('⚠️ Erro de rede. Tente novamente.'); 
    }
    if (resposta.status === 404) {
        console.error(`❌ Pokémon não encontrado: ${pokemon}`);
        throw new PokemonNaoEncontrado(pokemon);
    }
    if (!resposta.ok) {
        console.error(`❌ Erro ao buscar dados do Pokémon: ${pokemon}`);
        throw new ErroDeRede('⚠️ Erro de rede. Tente novamente.');
    }

        return await resposta.json() as ApiPokemonDados;
}

// formatar dados brutos que vem da API
function formatarDadosPokemon(dados: ApiPokemonDados): string {
    const nome = capitalizarNomePokemon(dados.name);
    const altura = dados.height / 10;
    const peso = dados.weight / 10;
const tipos = dados.types.map(tipo => capitalizarNomePokemon(tipo.type.name)).join(' / ');

    return `${nome} – ${altura} m – ${peso} kg – ${tipos}`;
}

//Funcao principal para buscar e formatar os dados do pokemon

async function pokedexCLI(): Promise<void> {
    const pokemon = process.argv[2];

    if (!pokemon) {
        console.error('❌ Por favor, forneça o nome de um Pokémon.');
        return;
    }

    try {
        const dadosPokemon = await buscarPokemon(pokemon);
        const dadosFormatados = formatarDadosPokemon(dadosPokemon);
        console.log(`\n✅ Pokémon Encontrado!`);
        console.log(`------------------------------------`);
        console.log(dadosFormatados);
        console.log(`------------------------------------`);
    } catch (erro) {
        if (erro instanceof PokemonNaoEncontrado) {
            console.error('❌ Pokémon não encontrado!');
        } else {
            console.error('❌ Ocorreu um erro inesperado:', erro);
        }
    }
}

//  chamando a função principal
pokedexCLI();

