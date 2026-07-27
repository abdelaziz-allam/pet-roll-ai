# Categorias de Animais

O módulo de Categorias de Animais permite aos administradores definir e gerir o sistema de classificação utilizado para organizar animais na plataforma Petfolioo. As categorias representam espécies ou tipos de animais e são utilizadas em toda a aplicação para filtragem, pesquisa e organização. Cada categoria inclui um nome, rótulo, ícone emoji, descrição e estado ativo.

![Pet Categories](/docs/screenshots/categories.png)

---

## Listagem de Categorias

A página de categorias apresenta todas as categorias de animais definidas num formato de tabela com controlos de gestão.

### Colunas da Tabela

| Coluna | Descrição | Ordenável |
|--------|-------------|:--------:|
| Name Slug | Identificador legível por máquina (ex.: `dog`, `cat`, `bird`) | Sim |
| Rótulo | Nome de apresentação legível por humanos (ex.: "Cão", "Gato", "Ave") | Sim |
| Ícone Emoji | Ícone visual representando a categoria | Não |
| Descrição | Breve descrição do que esta categoria inclui | Não |
| Ativo | Interruptor mostrando se a categoria está ativa | Sim |
| Ações | Botões Editar e Eliminar | Não |

### Indicadores de Estado

| Estado Ativo | Apresentação | Significado |
|-------------|---------|---------|
| Ativo | Interruptor verde (posição ligada) | Categoria disponível para registo de animais e visível nos filtros |
| Inativo | Interruptor cinza (posição desligada) | Categoria oculta dos utilizadores mas animais existentes retêm a sua categoria |

### Funcionalidades da Tabela

1. **Ordenar** clicando nos cabeçalhos de coluna Name Slug, Rótulo ou Ativo.
2. **Alternância rápida** clicando no interruptor Ativo diretamente na linha da tabela.
3. **Ações inline** via botões Editar (ícone de lápis) e Eliminar (ícone de lixo) em cada linha.
4. **Paginação** no fundo para navegar quando existem muitas categorias.

> **Dica:** As categorias inativas são apresentadas com um estilo de linha ligeiramente desbotado para as distinguir visualmente das ativas.

---

## Criar uma Categoria

Novas categorias podem ser criadas para suportar espécies ou tipos de animais adicionais na plataforma.

### Passos para Criar uma Categoria

1. Clique no botão **Adicionar Categoria** no canto superior direito da página de Categorias.
2. Um formulário de criação aparece (como modal ou formulário inline).
3. Preencha os campos obrigatórios:

| Campo | Obrigatório | Descrição | Exemplo |
|-------|:--------:|-------------|---------|
| Name Slug | Sim | Identificador legível por máquina | `golden_fish` |
| Rótulo | Sim | Nome de apresentação mostrado aos utilizadores | "Peixe Dourado" |
| Ícone Emoji | Sim | Ícone visual para a categoria | "fish" |
| Descrição | Não | Breve explicação da categoria | "Espécies de peixes de água doce e salgada" |
| Ativo | Não | Se deve ativar imediatamente (predefinição: ativo) | Ligado |

4. Selecione um ícone emoji do **Seletor de Emoji** (ver abaixo).
5. Reveja as suas entradas.
6. Clique em **Criar Categoria** para guardar.
7. A nova categoria aparece na tabela de listagem.

### Convenção do Name Slug

O name slug deve seguir estas regras:

| Regra | Descrição | Exemplo |
|------|-------------|---------|
| Apenas minúsculas | Caracteres maiúsculos não são permitidos | `dog` não `Dog` |
| Underscores para espaços | Utilize underscores para separar palavras | `guinea_pig` não `guinea pig` |
| Alfanumérico + underscore | Apenas letras, números e underscores | `cat_1` é válido, `cat-1` não é |
| Único | Não deve duplicar um slug de categoria existente | O sistema rejeitará duplicados |
| Sem underscores iniciais/finais | Não pode começar ou terminar com underscore | `_dog_` é inválido |
| Máximo 50 caracteres | Manter slugs concisos | Identificadores curtos e descritivos |

> **Importante:** O name slug não pode ser alterado após a criação. É utilizado como identificador permanente na base de dados e API. Escolha com cuidado.

### Seletor de Emoji

O seletor de emoji fornece mais de 100 ícones de animais e natureza para identificação de categorias.

| Funcionalidade | Descrição |
|---------|-------------|
| Pesquisa | Escreva para filtrar emojis disponíveis por palavra-chave |
| Categorias | Emojis organizados por grupo (Animais, Natureza, Objetos) |
| Pré-visualização | Emoji selecionado mostrado em pré-visualização grande antes de confirmar |
| Recentes | Emojis utilizados anteriormente mostrados no topo para acesso rápido |

**Utilizar o Seletor de Emoji:**

1. Clique no **campo de ícone emoji** para abrir o seletor.
2. Navegue pelas categorias ou escreva uma palavra-chave na pesquisa (ex.: "dog", "fish", "bird").
3. Clique no emoji desejado para o selecionar.
4. O emoji selecionado aparece no campo do formulário como pré-visualização.
5. Para alterar a sua seleção, clique no campo novamente para reabrir o seletor.

Categorias de emoji disponíveis incluem:

| Grupo | Emojis de Exemplo |
|-------|---------------|
| Animais Domésticos | Cão, Gato, Hamster, Coelho, Rato |
| Animais de Quinta | Cavalo, Vaca, Porco, Ovelha, Cabra, Galinha |
| Aves | Papagaio, Águia, Coruja, Pato, Flamingo, Pavão |
| Répteis | Lagarto, Cobra, Tartaruga, Crocodilo, Dinossauro |
| Aquáticos | Peixe, Peixe Tropical, Baleia, Golfinho, Polvo, Tubarão |
| Insetos | Borboleta, Abelha, Escaravelho, Formiga, Grilo |
| Vida Selvagem | Leão, Tigre, Urso, Macaco, Elefante, Girafa |
| Pata/Genérico | Marcas de pata, Osso, Coração, Estrela |

---

## Editar Categorias

Categorias existentes podem ser modificadas para atualizar o seu rótulo, ícone, descrição ou estado ativo.

### Passos para Editar uma Categoria

1. Localize a categoria que pretende editar na tabela de listagem.
2. Clique no botão **Editar** (ícone de lápis) na coluna de Ações da linha.
3. Um formulário de edição aparece pré-preenchido com os valores atuais.
4. Modifique qualquer um dos campos editáveis:

| Campo | Editável | Notas |
|-------|:--------:|-------|
| Name Slug | Não | Não pode ser alterado após criação |
| Rótulo | Sim | Atualizar o nome de apresentação |
| Ícone Emoji | Sim | Selecionar um novo emoji do seletor |
| Descrição | Sim | Atualizar ou adicionar uma descrição |
| Ativo | Sim | Alternar estado ativo/inativo |

5. Faça as suas alterações.
6. Clique em **Guardar Alterações** para aplicar.
7. Uma notificação de sucesso confirma a atualização.
8. A tabela de listagem reflete as alterações imediatamente.

### Considerações de Edição

| Consideração | Detalhe |
|---------------|--------|
| Alterações de rótulo | Imediatamente refletidas em toda a app para todos os utilizadores |
| Alterações de emoji | Atualizadas em todas as localizações da UI onde a categoria aparece |
| Alterações de descrição | Visíveis nos ecrãs de seleção de categoria dentro da app |
| Animais existentes | Animais já atribuídos a esta categoria não são afetados por edições |

> **Nota:** Alterar o rótulo de uma categoria não altera o seu slug. O slug permanece como identificador permanente. Utilizadores e animais referenciam categorias por slug internamente.

---

## Ativar e Desativar Categorias

As categorias podem ser alternadas entre estados ativo e inativo sem eliminação.

### Ativar uma Categoria

1. Encontre a categoria inativa na listagem (mostrada com interruptor cinza).
2. Clique no **interruptor** na coluna Ativo para o virar para a posição ligada.
3. Alternativamente, clique em Editar e alterne o campo Ativo no formulário de edição.
4. Confirme a ação se solicitado.
5. A categoria torna-se disponível para registo de animais imediatamente.

### Desativar uma Categoria

1. Encontre a categoria ativa na listagem (mostrada com interruptor verde).
2. Clique no **interruptor** para o virar para a posição desligada.
3. Um diálogo de confirmação aparece explicando o impacto.
4. Clique em **Confirmar Desativação**.
5. A categoria é ocultada de novos registos de animais.

### Impacto da Desativação

| Área de Impacto | Efeito |
|-------------|--------|
| Novos registos | A categoria já não aparece nos dropdowns de seleção de espécie |
| Animais existentes | Animais já atribuídos a esta categoria retêm a sua atribuição |
| Filtros | A categoria já não aparece nos dropdowns de filtro para utilizadores públicos |
| Portal admin | A categoria continua visível no admin com estilo inativo |
| Respostas API | Categoria excluída das listas de categorias ativas |
| Reativação | Pode ser reativada a qualquer momento, restaurando funcionalidade total |

> **Dica:** A desativação é preferida sobre a eliminação quando pretende ocultar temporariamente uma categoria ou quando animais existentes ainda a utilizam. Preserva a integridade dos dados enquanto limita nova utilização.

---

## Botão de Valores Predefinidos

A funcionalidade de Valores Predefinidos preenche a tabela de categorias com um conjunto predefinido de categorias de animais comuns. Isto é útil para a configuração inicial da plataforma ou restauração de categorias padrão.

### Utilizar Valores Predefinidos

1. Clique no botão **Valores Predefinidos** localizado acima ou abaixo da tabela de categorias.
2. Um modal de confirmação aparece listando as categorias que serão criadas.
3. Reveja a lista de categorias predefinidas.
4. Clique em **Confirmar** para prosseguir.
5. As categorias predefinidas são criadas e aparecem na listagem.

### Conjunto de Categorias Predefinidas

Os valores predefinidos criam as seguintes categorias padrão (se ainda não existirem):

| Name Slug | Rótulo | Emoji | Descrição |
|-----------|-------|:-----:|-------------|
| `dog` | Cão | Cara de cão | Cães domésticos de todas as raças |
| `cat` | Gato | Cara de gato | Gatos domésticos de todas as raças |
| `bird` | Ave | Ave | Aves de estimação incluindo papagaios, canários e tentilhões |
| `rabbit` | Coelho | Cara de coelho | Coelhos domésticos |
| `hamster` | Hamster | Cara de hamster | Hamsters, gerbos e pequenos roedores similares |
| `fish` | Peixe | Peixe | Peixes de aquário de água doce e salgada |
| `turtle` | Tartaruga | Tartaruga | Tartarugas de água e terra |
| `snake` | Cobra | Cobra | Cobras de estimação não venenosas |
| `lizard` | Lagarto | Lagarto | Geckos, iguanas e outros lagartos de estimação |
| `horse` | Cavalo | Cara de cavalo | Cavalos e póneis |
| `guinea_pig` | Porquinho-da-índia | Porquinho-da-índia | Porquinhos-da-índia e caviídeos |
| `ferret` | Furão | Furão | Furões domésticos |

### Comportamento dos Valores Predefinidos

| Cenário | Comportamento |
|----------|----------|
| Tabela vazia | Todos os valores predefinidos criados |
| Alguns valores predefinidos existem | Apenas os predefinidos em falta são criados (sem duplicados) |
| Todos os valores predefinidos existem | Nenhuma alteração feita, mensagem de confirmação apresentada |
| Categorias personalizadas existem | Categorias personalizadas não são afetadas |

> **Nota:** O botão de Valores Predefinidos não elimina nem modifica categorias existentes. Apenas adiciona entradas predefinidas em falta. As suas categorias personalizadas estão seguras.

---

## Eliminar uma Categoria

As categorias podem ser permanentemente eliminadas quando já não são necessárias. Esta ação requer consideração cuidadosa devido ao seu impacto nos dados existentes.

### Passos para Eliminar uma Categoria

1. Localize a categoria na tabela de listagem.
2. Clique no botão **Eliminar** (ícone de lixo) na coluna de Ações da linha.
3. Um modal de aviso aparece com:
   - O nome da categoria e contagem atual de animais a usar esta categoria
   - Um aviso sobre o impacto nos animais existentes
   - Um campo de confirmação por texto (escrever o slug da categoria para confirmar)
4. Leia o aviso cuidadosamente.
5. Escreva o **name slug** da categoria no campo de confirmação.
6. Clique em **Eliminar Categoria** para a remover permanentemente.

### Impacto da Eliminação

| Área de Impacto | Efeito |
|-------------|--------|
| Registo da categoria | Permanentemente removido da base de dados |
| Animais existentes | Animais anteriormente nesta categoria tornam-se **sem categoria** |
| Perfis de animais | Campo de espécie mostra "Sem Categoria" ou vazio |
| Filtros | Categoria removida de todos os dropdowns de filtro |
| Analytics | Dados históricos podem mostrar "Categoria Desconhecida" para registos passados |
| Reversibilidade | Não pode ser revertido (deve recriar manualmente se necessário) |

### Animais Ficam Sem Categoria

Quando uma categoria é eliminada:

1. Todos os animais atribuídos a essa categoria perdem a sua atribuição de categoria.
2. Estes animais aparecem com um rótulo "Sem Categoria" no Registo de Animais.
3. Os proprietários dos animais **não** são automaticamente notificados.
4. Os administradores podem reatribuir animais sem categoria a uma categoria diferente através de edição em massa.
5. A contagem de animais da categoria eliminada é mostrada no modal de confirmação de eliminação.

> **Importante:** Eliminar uma categoria com animais ativos atribuídos deixará esses animais sem categoria. Considere desativar a categoria em vez disso, ou reatribuir os animais antes da eliminação.

### Restrições de Eliminação

| Restrição | Descrição |
|-------------|-------------|
| Categorias predefinidas | As categorias predefinidas podem ser eliminadas (podem ser recriadas com Valores Predefinidos) |
| Animais ativos | Categorias com animais podem ser eliminadas (animais ficam sem categoria) |
| Confirmação obrigatória | O slug deve ser escrito para confirmar a eliminação |
| Requisito de role | Apenas roles `super_admin` e `admin` podem eliminar categorias |

---

## Boas Práticas

### Diretrizes de Gestão de Categorias

1. **Use rótulos claros e simples** - Os rótulos de categoria devem ser imediatamente compreensíveis para todos os utilizadores independentemente da proficiência linguística.
2. **Escolha emojis representativos** - Selecione emojis que representem claramente o tipo de animal para ajudar no reconhecimento visual rápido.
3. **Escreva descrições úteis** - As descrições ajudam os utilizadores a escolher a categoria correta ao registar o seu animal.
4. **Desative antes de eliminar** - Se não tem certeza se uma categoria é necessária, desative-a primeiro. Elimine apenas quando tiver certeza.
5. **Mantenha slugs descritivos** - Uma vez que os slugs não podem ser alterados, escolha-os cuidadosamente durante a criação.
6. **Monitorize animais sem categoria** - Verifique regularmente animais sem categorias e atribua-os apropriadamente.

### Exemplos de Nomes de Categorias

| Bom | Mau | Porquê |
|------|-----|-----|
| `guinea_pig` | `gp` | Descritivo e legível |
| `tropical_fish` | `tropicalFish` | Segue convenção de underscore |
| `parrot` | `Parrot_1` | Minúsculas, sem números necessários |
| `persian_cat` | `cat_breed_persian` | Conciso, nível de raça quando necessário |

---

## Perguntas Frequentes

**P: Posso fundir duas categorias?**
R: Não existe uma função de fusão incorporada. Para consolidar categorias, reatribua animais de uma categoria para outra e depois elimine a categoria vazia.

**P: O que acontece aos filtros quando desativo uma categoria?**
R: A categoria é removida dos dropdowns de filtro orientados ao utilizador mas permanece acessível nos filtros do portal administrativo para fins de gestão.

**P: Posso reordenar categorias?**
R: As categorias são apresentadas alfabeticamente por rótulo nas interfaces orientadas ao utilizador. A tabela admin pode ser ordenada por qualquer cabeçalho de coluna.

**P: Existe um limite para quantas categorias posso criar?**
R: Não há limite técnico rígido, mas para usabilidade, mantenha o número total gerível (menos de 30 é recomendado) para que os utilizadores possam facilmente encontrar a categoria correta.

---

*Anterior: [Utilizadores da App](./users.md)*
