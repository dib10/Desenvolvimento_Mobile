import { unique, groupBy, sumBy } from "./utils/arrayUtils.js";

 // Refatorando o código para utilizar Typescript - Exercício 1

 //  Caio Dib Laronga - GU3042294
 // Desenvolvimento mobile 

// para printar no console
console.log("--- SCRIPT INDEX.TS INICIADO ---"); // <--- ADICIONE ESTA LINHA AQUI

 console.log("\nExercício 1 - Exemplo 1");

 // Testando a função unique - Exemplo 1
 const personagensAot: string [] =  ["Eren", "Mikasa", "Erwin", "Eren", "Mikasa", "Levi"];
//Personagens antes da função unique
console.log("Personagens antes da função:", personagensAot);

const personagensUnicos = unique(personagensAot);
// Aqui é esperado que a função unique retorne um array com os personagens que aparecem apenas uma vez
console.log("Personagens únicos:", personagensUnicos);

 // Testando a função unique - Exemplo 2
 console.log("\nExercício 1 - Exemplo 2");
 const numeros: number[] = [1,1,2,3,3,4,5,6,7,7,15,15,21]
// Números antes da função unique
console.log("Números antes da função:", numeros);
const numerosUnicos = unique(numeros);
// Aqui é esperado que a função unique retorne um array com os números que aparecem apenas uma vez
console.log("Números únicos:", numerosUnicos);

// Testando a função groupBy - Exemplo 1
console.log("\nExercício 2 - Exemplo 1");

interface PersonagemStatus {
nome:  string;
tipo: "Titã" | "Humano";
status: "Vivo" | "Morto";
}

const ListaDepersonagens: PersonagemStatus[] = [
    { nome: "Eren", tipo: "Titã", status: "Morto" },
    { nome: "Mikasa", tipo: "Humano", status: "Vivo" },
    { nome: "Erwin", tipo: "Humano", status: "Morto" },
    { nome: "Levi", tipo: "Humano", status: "Vivo" },
    { nome: "Armin", tipo: "Titã", status: "Vivo" },
    { nome: "Reiner", tipo: "Titã", status: "Vivo" },
    { nome: "Zeke", tipo: "Titã", status: "Morto" },
    { nome: "Sasha", tipo: "Humano", status: "Morto" }
];
// Personagens antes da função groupBy
console.log("Personagens antes da função:", ListaDepersonagens);
// agrupando por tipo
const personagensAgrupadosPorTipo = groupBy(ListaDepersonagens, "tipo");
// Aqui é esperado que a função groupBy retorne um objeto com os personagens agrupados por tipo
console.log("Personagens agrupados por tipo:", personagensAgrupadosPorTipo);

// Testando a função groupBy - Exemplo 2
console.log("\nExercício 2 - Exemplo 2");
// Irei agrupar os personagens por status
const personagensAgrupadosPorStatus = groupBy(ListaDepersonagens, "status");
// Aqui é esperado que a função groupBy retorne um objeto com os personagens agrupados por status
console.log("Personagens agrupados por status:", personagensAgrupadosPorStatus);

// Testando a função sumBy - Exemplo 1
console.log("\nExercício 3 - Exemplo 1");

interface RelatorioMissao {
    missao: string;
    baixasAliadas: number;
    titasEliminados: number;
}

const relatoriosDasMissoes: RelatorioMissao[] = [
    {missao: "Retomar Trost", baixasAliadas: 209, titasEliminados: 23},
    {missao: "Expedição Além das Muralhas", baixasAliadas: 50, titasEliminados: 12},
    {missao: "Batalha de Shiganshina", baixasAliadas: 178, titasEliminados: 30},
    {missao: "Procurar titã femea", baixasAliadas: 13, titasEliminados: 4},
]

const totalBaixasAliados = sumBy(relatoriosDasMissoes, "baixasAliadas");
// Aqui é esperado que a função sumBy retorne o total de baixas aliadas
console.log("Total de baixas aliadas:", totalBaixasAliados);


//exercício 3 - Exemplo 2
console.log("\nExercício 3 - Exemplo 2");

//total de titãs eliminados
const totalTitansEliminados = sumBy(relatoriosDasMissoes, "titasEliminados");
// Aqui é esperado que a função sumBy retorne o total de titãs eliminados
console.log("Total de titãs eliminados:", totalTitansEliminados);

