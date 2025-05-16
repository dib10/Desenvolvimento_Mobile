 type Sucesso = {
    tipo: "sucesso";
    dados: string[];
 }

 type Erro = {
    tipo: "erro";
    mensagem: string;
 }

 type Resultado = Sucesso | Erro;

 // função que exibe o resultado

 function exibirResultado(r: Resultado): void {
    if (r.tipo ==="sucesso") {
        console.log("Sucesso: " + r.dados);
    } else {
        console.log("Erro: " + r.mensagem);
    }
 }


 // usando a função

 //caso de sucesso

 const resultadoSucesso: Resultado = {
    tipo: "sucesso",
    dados: ["item1", "item2", "item3"]
 };

 exibirResultado(resultadoSucesso);

 //caso de erro
    const resultadoErro: Resultado = {
        tipo: "erro",
        mensagem: "Ocorreu um erro ao processar os dados."
    };