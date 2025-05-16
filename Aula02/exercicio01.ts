// Exercício 01 - Tipos, interfaces e métodos de array

interface Livro {
    titulo: string;
    autor: string;
    ano: number;
    disponivel: boolean;
}

//criando o array de livros

const biblioteca: Livro [] =  [
    {
        titulo: "A metamorfose",
        autor: "Franz Kafka",
        ano: 1915,
        disponivel: true

    },
    {
        titulo: "Sherlock Holmes",
        autor: "Arthur Conan Doyle",
        ano: 1892,
        disponivel: false
    },
    {
        titulo: "Harry Potter e a Pedra Filosofal",
        autor: "J.K. Rowling",
        ano: 1997,
        disponivel: true
    },
    {
        titulo: " A revolução dos bichos",
        autor: "George Orwell",
        ano: 1945,
        disponivel: true
    }
]

// função para listar os livros disponíveis

function listarLivrosDisponiveis(livros: Livro []): string [] {
    const livrosDisponiveis = livros.filter(livro => livro.disponivel === true);

    const titulosLivrosDisponiveis = livrosDisponiveis.map(livro => livro.titulo);
    return titulosLivrosDisponiveis;


}

// Teste
const titulosLivrosDisponiveis  = listarLivrosDisponiveis(biblioteca);
console.log("Livros disponíveis na biblioteca:", titulosLivrosDisponiveis);

