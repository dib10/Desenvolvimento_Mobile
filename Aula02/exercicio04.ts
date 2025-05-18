interface Produto {
    nome: string;
    preco: number;
}

//funcao generica
function obterPrimeiro<T>(Lista: T[]) : T | undefined {
    if(Lista.length === 0) {
        //a lista está vazia
        console.log('A lista está vazia');
        return undefined;
    }
    return Lista[0];
}


// exemplo - String

const ListaDeProdutos: string[] = ['Produto 1', 'Produto 2', 'Produto 3'];
const primeiroProduto = obterPrimeiro(ListaDeProdutos);
console.log(`Primeiro produto: ${primeiroProduto}`);

//exemplo - number

const ListaDePrecos: number [] = [10,20,30,40];
const primeiroPreco = obterPrimeiro(ListaDePrecos);
console.log(`Primeiro preço: ${primeiroPreco}`);


//exemplo - tipo personalizado

const ListaDeProdutosPersonalizados: Produto[] = [
    { nome: 'Produto 1', preco: 10 },
    { nome: 'Produto 2', preco: 20 },
    { nome: 'Produto 3', preco: 30 }
];

const primeiroProdutoPersonalizado = obterPrimeiro(ListaDeProdutosPersonalizados);
console.log(`Primeiro produto personalizado: ${primeiroProdutoPersonalizado}`);

console.log(`Nome do produto: ${primeiroProdutoPersonalizado?.nome}`);
