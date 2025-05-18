// exercicio 03

interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

type UsuarioSemSenha = Omit<Usuario, "senha">;
type UsuarioAtualizacao = Partial<Usuario>;

//implementação da função exibir perfil

function exibirPerfil(usuario: UsuarioSemSenha): void {
    console.log(' -------------------');
    console.log('ID: ${usuario.id}');
    console.log('Nome: ${usuario.nome}');
    console.log('Email:${usuario.email}');
    console.log(' -------------------');

}

// Implementação da função atualizarUsuario


function atualizarUsuario(id: number, dados: UsuarioAtualizacao): void {

    console.log(' -------------------');
    console.log(' Dados recebidos para atualização:');
    console.log(dados)
    console.log(' -------------------');
    console.log(' Atualização concluída com sucesso!');
}

// Exemplo

const usuarioCompleto: Usuario = {
    id: 1,
    nome: "Caio Dib Laronga ",
    email: "caio@dib.com",
    senha: "123456" 
}

const usuarioParaExibir: UsuarioSemSenha = {
    id: usuarioCompleto.id,
    nome: usuarioCompleto.nome,
    email: usuarioCompleto.email,
};

const usuarioParaAtualizar: UsuarioAtualizacao = {
    email: "caio.dib@gmail.com"
};

atualizarUsuario(usuarioCompleto.id, usuarioParaAtualizar);
exibirPerfil(usuarioParaExibir);
