## Análise da arquitetura

### 01. Estrutura dos diretórios
A organização dos diretórios é clara e eficiente. Desse modo, ela segue boas práticas para projetos React Native, separando as responsabilidades de forma lógica.

- components/ - Abriga o PókemonCard.tsx, que é um componente genérico e reutilizável
- screens/ - Contém as telas principais, como o PokedexScreen.tsx e o PokedexDetailsScreen.tsx
- services/ - Centraliza a lógica de requisições à API externa em api.ts, o qual isola a camada de dados
- types/ - Define os contratos da aplicação em Pokemon.ts e Navigation.ts
- utils/ - Contém funções utilitárias

### 02. Melhorias?
Com base na estrutura atual, eu não vejo a necessidade de grandes mudanças, pois o projeto já está bem organizado. No entanto, caso a PokemonDetailsScreen.tsx cresça em complexidade, poderia ser criado uma subpasta para seus próprios componentes, com osugerido pelo professor.

## 03. Componentização
- O PokemonCard.tsx é um bom exemplo de componente reutilizável, ele não possui lógica de busca de dados, o que torna sua reutilização mais fácil. 
- A tela de PokedexScreen.tsx pode ser dividida em componentes menores, como:
    - Criar um PokemonBadge.tsx para estilizar os tipos de formna mais clara e reutilizar essa lógica em outro local como no PokemonCard.tsx
    - Poderiamos criar um PokemonHeader.tsx par agrupar o nome, id e imagem do Pokémon, tornando a tela mais modular

## 04. Gerenciamento de Estado e Lógica
A lógica de estado está concentrada dentro do próprio componentes de tela, utilizando hooks como useState e useEffect.

- PokedexScreen.tsx: A lógica de busca inicial, paginação  e filtragem dos pokémons está localizada dentro do componente PokedexScreen. Os estados pokemons, isLoading, error, search, são todos locais a esta tela.

- PokemonDetailsScreen.tsx: Para buscar detalhes de um Pokémon específico está dentro de um useEffect no componente PokemonDetailsScreen.

- Sustentabilidade da abordagem: Nesse caso, se o app ta crescendo, essa abordagem fica "inviável" .
    - Prós:
        - Simplicidade:Forma direta e rápida para implementar funcionalidades num projeto pequeno.
        - Localização: Toda logica para tela está concentrada em um único lugar, facilitando a leitura.
    - Contras:
        - Escalabilidade: Acoplamento: a lógica ta muito acoplada a UI, o que dificulta a reutilização e manutenção.
        - Reúso de lógica: Se outra tela tivesse que buscar os pokemons, teríamos que duplicar a lógica de busca.
        - Complexidade: Se nova lóica for adicioanda os componentes tendem a ficar muito grandes e difíceis de manter. 
## 05. Pontos fortes e fracos
### Pontos fortes
- Estrutura clara e organizada, seguindo boas práticas de desenvolvimento.
- Tipagem forte com TypeScript, o que ajuda a evitar erros comuns e melhora a legibilidade do código.
### Pontos fracos
- A lógica de estado e requisições está muito acoplada às telas.
- Gerenciamento de estado está sendo feito localmente, o que pode dificultar a manutenção e escalabilidade do projeto.

## Refatoração

O padrão escolhido para refatoração é o MVVM (Model-View-ViewModel), que é uma abordagem que separa a lógica de apresentação da lógica de negócios, facilitando a manutenção e escalabilidade do código.
## Justificativa do padrão MVVM
Uma das justificativas deve-se ao fato de que o MVVM se integra com o React Native, por exemplo sem a necessidade de chamar os métodos de forma explícita, como acontece no React Native com o uso de hooks. A reusabilidaed e testabilidade também são pontos fortes do MVVM, pois permite que a lógica de negócios seja testada independentemente da interface do usuário. A separação de responsabilidades também é um ponto forte,por exemplo a pokedexScreen.tsx não precisa se preocupar com a lógica de busca de pokémons, pois essa lógica será encapsulada em um ViewModel.

### Estrutura sugerida
PokedexApp/
├─ services/
│  └─ api.ts                   (Model)
├─ screens/
│  └─ Pokedex/
│     ├─ PokedexScreen.tsx      (View)
│     └─ usePokedexViewModel.ts (ViewModel)
├─ components/
├─ types/


## Divisão de responsabilidades
A View seria um componente React quase puramente presentacional. Sua única responsabilidade seria renderizar a interface com base nos dados recebidos do ViewModel e notificar o ViewModel sobre as interações do usuário. Ela não conteria useEffects para buscar ou filtrar dados.

O ViewModel seria um custom hook que encapsularia toda a lógica de estado e apresentação que hoje está dentro da PokedexScreen.tsx.

Ele exposia para a View: Estados e Funções

### Fluxo de dados
Quando a gente digita "pika" no campo de busca na tela, o TextInput  não faz nada complexo, ele só chama a função setSearch('pika'). Essa função ele pegou o nosso hook, o ViewModel.

Dentro do hook, essa chamada atualiza o estado da busca. Isso dispara um useEffect que roda a lógica para filtrar a lista de pokémons. O resultado disso é a atualização de outro estado, a lista filteredPokemons.

Como a View está "escutando" essa lista filteredPokemons do hook, o React percebe que ela mudou e, automaticamente, renderiza a tela de novo, mas agora mostrando só o Pikachu e outros resultados. A View em si nem precisou saber como o filtro foi feito, ela só reagiu à mudança e mostrou o resultado.