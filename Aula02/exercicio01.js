// Exercício 01 - Tipos, interfaces e métodos de array
//criando o array de livros
var biblioteca = [
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
];
// função para listar os livros disponíveis
function listarLivrosDisponiveis(livros) {
    var livrosDisponiveis = livros.filter(function (livro) { return livro.disponivel === true; });
    var titulosLivrosDisponiveis = livrosDisponiveis.map(function (livro) { return livro.titulo; });
    return titulosLivrosDisponiveis;
}
// Teste
var titulosLivrosDisponiveis = listarLivrosDisponiveis(biblioteca);
console.log("Livros disponíveis na biblioteca:", titulosLivrosDisponiveis);
