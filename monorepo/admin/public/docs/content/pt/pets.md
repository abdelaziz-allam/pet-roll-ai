# Registo de Animais

O Registo de Animais é o módulo central para visualizar e gerir todos os animais registados na plataforma Petfolioo. A partir deste módulo, os administradores podem navegar pelo catálogo completo de animais, ver perfis detalhados, rever estados de certificações de saúde e tomar ações de moderação como banir animais que violem as políticas da plataforma.

![Pet Registry](/docs/screenshots/pets.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit, Delete |
> | Admin | View, Edit, Delete |
> | Moderator | View, Edit |
> | Viewer | View only |

---

## Tabela de Listagem de Animais

A tabela de listagem de animais apresenta todos os animais registados num formato paginado, ordenável e filtrável.

### Colunas da Tabela

| Coluna | Descrição | Ordenável |
|--------|-------------|:--------:|
| Nome | O nome registado do animal | Sim |
| Espécie | Categoria de espécie (ex.: Cão, Gato, Ave) | Sim |
| Raça | Raça específica dentro da espécie | Sim |
| Estado | Estado atual (Ativo, Banido, Pendente) | Sim |
| Género | Macho, Fêmea ou Desconhecido | Sim |
| Localização | País e cidade da morada registada do animal | Sim |

### Indicadores de Estado

| Estado | Cor do Badge | Significado |
|--------|-------------|---------|
| Ativo | Verde | O perfil do animal está ativo e visível para outros utilizadores |
| Banido | Vermelho | O perfil do animal foi ocultado devido a uma violação de política |
| Pendente | Laranja | O perfil do animal está a aguardar revisão ou verificação do proprietário |

### Interações com a Tabela

1. **Clique num cabeçalho de coluna** para ordenar a tabela por essa coluna. Uma seta indica a direção da ordenação.
2. **Clique numa linha** para abrir o painel de detalhes do animal no lado direito do ecrã.
3. **Controlos de paginação** no fundo permitem navegar entre páginas e alterar o tamanho da página (10, 20, 50 entradas por página).

> **Dica:** Mantenha `Shift` pressionado e clique num segundo cabeçalho de coluna para aplicar uma ordenação secundária.

---

## Filtros

A barra de filtros acima da tabela de listagem de animais oferece várias formas de restringir os resultados apresentados.

### Filtros Disponíveis

| Filtro | Tipo | Descrição |
|--------|------|-------------|
| Espécie | Dropdown de seleção | Filtrar por espécie do animal (Cão, Gato, Ave, Coelho, Réptil, etc.) |
| Estado | Dropdown de seleção | Filtrar por estado do animal (Ativo, Banido, Pendente) |
| Género | Dropdown de seleção | Filtrar por género (Macho, Fêmea, Desconhecido) |
| País | Dropdown de seleção | Filtrar pelo país registado do animal |
| Cidade | Dropdown de seleção | Filtrar por cidade (opções atualizam-se com base na seleção de país) |
| Pesquisa | Campo de texto | Pesquisa livre por nome do animal, raça e número de microchip |

### Aplicar Filtros

1. Localize a **barra de filtros** acima da tabela.
2. Clique em qualquer **filtro dropdown** para ver as opções disponíveis.
3. Selecione um ou mais valores dos dropdowns.
4. Escreva no campo de **Pesquisa** para efetuar uma pesquisa de texto livre.
5. Os resultados atualizam-se automaticamente à medida que os filtros são aplicados.
6. Os filtros ativos são mostrados como tags abaixo da barra de filtros.
7. Clique no **X** em qualquer tag de filtro para a remover.
8. Clique em **Limpar Tudo** para repor todos os filtros de uma vez.

### Combinações de Filtros

Os filtros são combinados com lógica AND. Por exemplo:

| Filtros Selecionados | Resultado |
|-----------------|--------|
| Espécie: Cão | Todos os cães independentemente do estado, género ou localização |
| Espécie: Cão + Género: Fêmea | Todas as cadelas |
| Espécie: Cão + País: EAU + Estado: Ativo | Todos os cães ativos localizados nos EAU |
| Pesquisa: "Rex" | Todos os animais cujo nome, raça ou microchip contém "Rex" |

> **Nota:** O dropdown de cidade depende da seleção de país. Selecione um país primeiro para ver as cidades disponíveis.

---

## Painel de Detalhes do Animal

Clicar em qualquer linha de animal abre um painel de detalhes que desliza a partir do lado direito do ecrã. Este painel contém o perfil completo do animal organizado em secções.

### Grelha de Fotos

No topo do painel de detalhes, uma grelha de fotos apresenta as imagens carregadas do animal.

| Elemento | Descrição |
|---------|-------------|
| Foto principal | Apresentada em tamanho maior, marcada com um ícone de estrela |
| Fotos adicionais | Mostradas num layout de grelha (até 6 miniaturas) |
| Ação ao clicar | Clicar em qualquer foto abre-a numa lightbox em ecrã completo |
| Sem fotos | Uma silhueta de placeholder é mostrada |

### Secção de Informações do Animal

Abaixo das fotos, os detalhes principais do animal são apresentados num layout estruturado.

| Campo | Descrição | Exemplo |
|-------|-------------|---------|
| Nome | Nome registado do animal | "Bella" |
| Espécie | Categoria de espécie | "Cão" |
| Raça | Raça específica | "Golden Retriever" |
| Cor | Cor do pelo/corpo | "Dourado" |
| Peso | Peso com unidade | "28.5 kg" |
| Data de Nascimento | Aniversário do animal | "2021-03-15" |
| Idade | Calculada a partir da data de nascimento | "2 anos, 4 meses" |
| Género | Macho ou Fêmea | "Fêmea" |
| Número de Microchip | ID único do microchip se implantado | "900118000123456" |
| Castrado/Esterilizado | Estado de castração ou esterilização | "Sim" / "Não" / "Desconhecido" |
| Data de Registo | Quando o animal foi adicionado à plataforma | "2023-07-20" |

### Estado da Certificação de Saúde

A secção de certificação de saúde mostra se o animal tem documentação de saúde válida em ficheiro.

| Elemento | Descrição |
|---------|-------------|
| Badge de certificação | Marca verde (válido), Aviso amarelo (a expirar em breve), X vermelho (expirado/em falta) |
| Tipo de certificado | Nome do certificado de saúde |
| Data de emissão | Quando o certificado foi emitido |
| Data de expiração | Quando o certificado expira |
| Barra de progresso de validade | Indicador visual do período de validade restante |

**Ler a Barra de Progresso de Validade:**

1. Uma **barra verde completa** indica que o certificado foi recentemente emitido e tem a maior parte da sua validade restante.
2. Uma **barra amarela parcial** (abaixo de 30% restante) indica que o certificado está a aproximar-se da expiração.
3. Uma **barra vermelha vazia** indica que o certificado expirou.
4. A percentagem restante é apresentada como texto junto à barra.

> **Dica:** Certificados que expiram dentro de 30 dias são automaticamente sinalizados no módulo de Verificações Pendentes para que o proprietário do animal seja notificado.

### Informações do Proprietário

A secção do proprietário apresenta detalhes sobre o proprietário registado do animal.

| Campo | Descrição |
|-------|-------------|
| Nome do proprietário | Nome de apresentação do proprietário do animal |
| Email | Endereço de email do proprietário |
| Telefone | Número de telefone se fornecido |
| Criador verificado | Se o proprietário possui estatuto de criador verificado |
| Total de animais | Quantos animais este proprietário registou |
| Membro desde | Data de registo do proprietário |

Clicar no nome do proprietário navega para o perfil completo no módulo de Utilizadores.

### Secção de Localização

A secção de localização mostra onde o animal está registado.

| Campo | Descrição |
|-------|-------------|
| País | Nome do país com ícone de bandeira |
| Cidade | Nome da cidade |
| Morada | Morada se fornecida (pode estar parcialmente oculta por privacidade) |

---

## Ação Banir/Desbanir Animal

Administradores e moderadores podem banir um animal cujo perfil viole as políticas da plataforma. Banir oculta o animal da visualização pública e notifica o proprietário.

### Banir um Animal

1. Abra o painel de detalhes do animal clicando na sua linha na tabela de listagem.
2. Desloque-se até ao fundo do painel ou localize a secção de **Ações**.
3. Clique no botão **Banir Animal** (mostrado em vermelho).
4. Um modal de confirmação aparecerá.
5. No campo de texto **Motivo**, introduza uma explicação clara do porquê este animal está a ser banido.
6. Selecione uma **categoria de violação** do dropdown (ex.: Listagem fraudulenta, Conteúdo inapropriado, Perfil duplicado, Violação de política).
7. Clique em **Confirmar Banimento**.
8. O estado do animal mudará para "Banido" e o proprietário receberá uma notificação com o motivo fornecido.

### Requisitos do Motivo de Banimento

| Requisito | Descrição |
|-------------|-------------|
| Comprimento mínimo | Pelo menos 20 caracteres |
| Linguagem | Deve ser profissional e clara |
| Especificidade | Deve referenciar a violação específica |
| Visibilidade | O motivo é mostrado diretamente ao proprietário do animal |

> **Importante:** O motivo de banimento que fornecer será apresentado ao proprietário do animal na notificação da app e email. Certifique-se de que é profissional, específico e não contém jargão interno.

### Desbanir um Animal

1. Utilize o filtro de **Estado** para selecionar "Banido" para encontrar animais banidos.
2. Clique na linha do animal banido para abrir o painel de detalhes.
3. Localize o botão **Desbanir Animal** (mostrado em verde) na secção de Ações.
4. Um modal de confirmação aparecerá mostrando o motivo e data do banimento original.
5. Opcionalmente adicione uma nota explicando porque o banimento está a ser levantado.
6. Clique em **Confirmar Desbanimento**.
7. O estado do animal voltará a "Ativo" e o proprietário será notificado.

### Histórico de Banimentos

O painel de detalhes de cada animal inclui uma secção de **Histórico de Banimentos** se o animal alguma vez foi banido:

| Coluna | Descrição |
|--------|-------------|
| Data | Quando o banimento foi aplicado |
| Administrador | Qual administrador realizou a ação |
| Motivo | O motivo de banimento fornecido |
| Duração | Quanto tempo durou o banimento |
| Resolução | Como foi resolvido (desbanido, apelado, etc.) |

---

## Operações em Massa

Para tarefas de moderação em grande escala, a tabela de listagem de animais suporta seleção em massa.

### Utilizar Seleção em Massa

1. Marque a **caixa de seleção** no lado esquerdo de cada linha que pretende selecionar.
2. Ou clique na **caixa de seleção do cabeçalho** para selecionar todas as linhas visíveis na página atual.
3. Uma **barra de ações em massa** aparece no topo da tabela mostrando a contagem de itens selecionados.
4. As ações em massa disponíveis incluem:
   - **Exportar** - Descarregar os animais selecionados como ficheiro CSV
   - **Alterar Estado** - Aplicar uma alteração de estado a todos os animais selecionados

> **Nota:** O banimento em massa não está disponível nesta interface. Os banimentos devem ser aplicados individualmente para garantir que cada um inclui um motivo específico.

---

## Exportar Dados de Animais

Para exportar dados do registo de animais:

1. Aplique quaisquer filtros desejados para restringir o conjunto de dados.
2. Clique no botão **Exportar** no canto superior direito da tabela.
3. Selecione o formato de exportação (CSV ou Excel).
4. Escolha se pretende exportar **resultados filtrados** ou **todos os registos**.
5. O ficheiro será descarregado para a localização de download predefinida do seu navegador.

### Campos Exportados

| Campo | Incluído |
|-------|:--------:|
| Nome do animal | Sim |
| Espécie | Sim |
| Raça | Sim |
| Género | Sim |
| Estado | Sim |
| País | Sim |
| Cidade | Sim |
| Email do proprietário | Sim |
| Data de registo | Sim |
| Número de microchip | Sim |
| Estado do certificado de saúde | Sim |

> **Nota:** Fotos e registos de saúde detalhados não são incluídos nas exportações. Apenas dados resumidos são exportados.

---

*Anterior: [Dashboard](./dashboard.md) | Seguinte: [Utilizadores da App](./users.md)*
