interface propsBotao {
    titulo: string;
    ativo?: boolean; // o ? significa que o atributo é opcional
}

//função para renderizar o botão

function renderizarBotao({titulo, ativo = true}: propsBotao): string {
    if(ativo) {
        return `[${titulo}]`; //se o botão estiver ativo, retorna o título entre colchetes
    }
    return `(${titulo})`; //se o botão estiver inativo, retorna o título entre parênteses
}

//testando

// exemplo 1 - passando apenas titulo
const botao1 = renderizarBotao({titulo: 'Clique aqui'});
console.log(botao1); // [Clique aqui]

// exemplo 2 - passando titulo e ativo como true

const botao2 = renderizarBotao({titulo: 'Clique aqui', ativo: true});
console.log(botao2); // [Clique aqui]

// exemplo 3 - passando titulo e ativo como false

const botao3 =  renderizarBotao({titulo: 'Clique aqui', ativo: false});
console.log(botao3); // (Clique aqui)


