# Utilizadores da App

O módulo de Utilizadores da App fornece gestão completa de todas as contas de utilizadores na plataforma Petfolioo. Os administradores podem visualizar perfis de utilizadores, criar novas contas, editar detalhes, atribuir roles e tomar ações de moderação. Este módulo é acessível a utilizadores com roles `super_admin` ou `admin`.

![App Users](/docs/screenshots/users.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Create, Edit, Ban, Delete, Export |
> | Admin | View, Create, Edit, Ban |
> | Moderator | View, Ban |
> | Viewer | View only |

---

## Tabela de Listagem de Utilizadores

A tabela de listagem de utilizadores apresenta todos os utilizadores registados na plataforma com informações-chave visíveis de relance.

### Colunas da Tabela

| Coluna | Descrição | Ordenável |
|--------|-------------|:--------:|
| Avatar | Foto de perfil do utilizador (miniatura circular) | Não |
| Nome | Nome de apresentação | Sim |
| Email | Endereço de email registado | Sim |
| Role | Role atribuído na plataforma (user, moderator, admin) | Sim |
| Estado | Estado da conta (Ativo, Pendente, Banido) | Sim |
| Criador Verificado | Badge indicando estatuto de criador verificado | Sim |
| Contagem de Animais | Número de animais registados por este utilizador | Sim |
| Data de Registo | Data de criação da conta | Sim |

### Indicadores de Estado

| Estado | Cor do Badge | Significado |
|--------|-------------|---------|
| Ativo | Verde | Conta totalmente funcional |
| Pendente | Laranja | Verificação de email não concluída |
| Banido | Vermelho | Conta suspensa por um administrador |

### Badge de Criador Verificado

| Indicador | Significado |
|-----------|---------|
| Badge com marca azul | Utilizador completou a verificação de criador e está confirmado |
| Sem badge | Utilizador não se candidatou ou não recebeu verificação de criador |
| Ícone de relógio | Candidatura de verificação de criador pendente de revisão |

### Navegação na Tabela

1. **Ordenar** clicando em qualquer cabeçalho de coluna ordenável. Clique novamente para inverter a ordem.
2. **Pesquisar** usando a barra de pesquisa acima da tabela para encontrar utilizadores por nome ou email.
3. **Filtrar** usando os dropdowns de estado e role para restringir resultados.
4. **Paginar** usando os controlos no fundo (10, 20, 50 entradas por página).

> **Dica:** Combine a barra de pesquisa com filtros de estado para encontrar rapidamente utilizadores específicos. Por exemplo, pesquise "joão" com estado "Banido" para encontrar utilizadores banidos chamados João.

---

## Visualizar Detalhes do Utilizador

O painel de detalhes do utilizador fornece uma vista abrangente do perfil e atividade de um utilizador.

### Abrir o Painel de Detalhes

1. Clique em qualquer linha na tabela de listagem de utilizadores.
2. O painel de detalhes desliza a partir do lado direito do ecrã.
3. O painel contém múltiplas secções organizadas verticalmente.

### Secções do Painel de Detalhes

| Secção | Conteúdo |
|---------|---------|
| Cabeçalho do Perfil | Avatar grande, nome de apresentação, email, badge de role, badge de estado |
| Informação da Conta | Data de registo, último login, estado de verificação de email, provedor de autenticação |
| Detalhes Pessoais | Número de telefone, fuso horário, país, cidade |
| Estado de Criador | Estado de verificação, data de candidatura, documentos submetidos |
| Resumo de Animais | Contagem de animais registados com links rápidos para cada um |
| Registo de Atividade | Ações recentes tomadas por este utilizador na plataforma |

### Cabeçalho do Perfil

O topo do painel mostra:

- **Avatar** em tamanho completo (ou silhueta predefinida se nenhum foi carregado)
- **Nome de Apresentação** em texto grande
- **Email** abaixo do nome
- **Badge de Role** codificado por cores por nível de permissão
- **Badge de Estado** mostrando o estado atual da conta

### Campos de Informação da Conta

| Campo | Descrição | Exemplo |
|-------|-------------|---------|
| ID do Utilizador | Identificador único do sistema | "usr_a1b2c3d4" |
| Data de Registo | Quando a conta foi criada | "2023-01-15 09:30 UTC" |
| Último Login | Timestamp do login mais recente | "2024-07-20 14:22 UTC" |
| Email Verificado | Se o email foi confirmado | "Sim" / "Não" |
| Provedor de Autenticação | Método de autenticação utilizado | "Email/Password" ou "Google" |
| Firebase UID | ID de utilizador do Firebase Authentication | "Abc123Def456" |

---

## Criar um Novo Utilizador

Os administradores podem criar contas de utilizador diretamente a partir do portal administrativo. Uma vez que a plataforma utiliza Firebase Authentication, nenhuma palavra-passe é definida durante a criação - os utilizadores receberão um email para definir a sua própria palavra-passe.

### Passos para Criar um Utilizador

1. Clique no botão **Criar Utilizador** no canto superior direito da página de Utilizadores.
2. Um modal ou formulário de criação aparecerá.
3. Preencha os campos obrigatórios:

| Campo | Obrigatório | Descrição |
|-------|:--------:|-------------|
| Nome de Apresentação | Sim | O nome completo do utilizador ou nome de apresentação escolhido |
| Email | Sim | Um endereço de email válido (deve ser único na plataforma) |

4. Clique em **Criar** para submeter o formulário.
5. O sistema irá:
   - Criar um registo no Firebase Authentication
   - Enviar um email de boas-vindas ao utilizador com um link para definir a sua palavra-passe
   - Criar o perfil do utilizador na base de dados da plataforma
   - Atribuir o role predefinido "user"
6. O novo utilizador aparecerá na tabela de listagem com estado "Pendente" até verificar o seu email.

### Regras de Validação

| Campo | Regra |
|-------|------|
| Nome de Apresentação | 2-100 caracteres, não pode estar em branco |
| Email | Deve ser formato de email válido, não deve já existir no sistema |

> **Nota:** Nenhum campo de palavra-passe é necessário. O Firebase Authentication trata da configuração da palavra-passe através do email de boas-vindas enviado ao utilizador. Isto assegura que o utilizador escolhe a sua própria palavra-passe segura.

> **Dica:** Se precisar de criar um utilizador que deva ter permissões elevadas, primeiro crie-o com as definições predefinidas e depois altere o seu role separadamente (ver Alterar Role abaixo).

---

## Editar um Utilizador

Os administradores podem modificar os detalhes do perfil de utilizador quando necessário. Isto é comummente utilizado para corrigir informações ou atualizar detalhes em nome de um utilizador.

### Passos para Editar um Utilizador

1. Abra o painel de detalhes do utilizador clicando na sua linha na tabela de listagem.
2. Clique no botão **Editar** (ícone de lápis) no cabeçalho do painel.
3. O painel muda para modo de edição com campos de formulário editáveis.
4. Modifique qualquer um dos campos disponíveis:

| Campo | Editável | Notas |
|-------|:--------:|-------|
| Nome de Apresentação | Sim | O nome público do utilizador |
| Telefone | Sim | Formato internacional recomendado (ex.: +351912345678) |
| Fuso Horário | Sim | Dropdown de fusos horários IANA (ex.: Europe/Lisbon) |
| País | Sim | Dropdown de todos os países |
| Cidade | Sim | Campo de texto, atualiza sugestões com base no país |
| Email | Não | Não pode ser alterado (utilizado como identificador de login) |
| ID do Utilizador | Não | Gerado pelo sistema, imutável |

5. Clique em **Guardar Alterações** para aplicar as suas edições.
6. Uma notificação de sucesso confirmará a atualização.
7. O painel regressa ao modo de visualização mostrando as informações atualizadas.

### Histórico de Edições

Todas as edições feitas através do portal administrativo são registadas:

| Campo do Registo | Descrição |
|-----------|-------------|
| Timestamp | Quando a alteração foi feita |
| Administrador | Qual administrador fez a alteração |
| Campo alterado | Qual campo foi modificado |
| Valor anterior | O valor anterior |
| Novo valor | O valor atualizado |

> **Importante:** As edições a perfis de utilizadores são visíveis para o utilizador. Eles verão a informação atualizada na sua app. Considere notificar o utilizador se fizer alterações em seu nome.

---

## Alterar Role

As alterações de role determinam que nível de acesso um utilizador tem dentro da plataforma e das suas aplicações.

### Roles Disponíveis

| Role | Descrição | Capacidades |
|------|-------------|--------------|
| user | Utilizador padrão da plataforma | Pode gerir os seus próprios animais, participar em programas de criação, ver listagens |
| moderator | Moderador da comunidade | Todas as capacidades de user mais capacidade de rever e sinalizar conteúdo |
| admin | Administrador da plataforma | Todas as capacidades de moderator mais acesso ao portal administrativo |

### Passos para Alterar o Role de um Utilizador

1. Abra o painel de detalhes do utilizador clicando na sua linha.
2. Localize a secção de **Role** no painel.
3. Clique no botão **Alterar Role** (ou no badge de role atual).
4. Um modal de seleção de role aparece com:
   - Botões de rádio para cada role disponível
   - Texto descritivo explicando as permissões de cada role
   - Uma caixa de confirmação reconhecendo a alteração
5. Selecione o novo role.
6. Leia a descrição do role para confirmar que é apropriado.
7. Marque a **caixa de confirmação** ("Compreendo que isto irá alterar o nível de acesso do utilizador").
8. Clique em **Confirmar Alteração de Role**.
9. O role do utilizador é atualizado imediatamente.

### Restrições de Alteração de Role

| O Seu Role | Pode Atribuir |
|-----------|-----------|
| super_admin | user, moderator, admin |
| admin | user, moderator |
| moderator | Não pode alterar roles |
| viewer | Não pode alterar roles |

> **Importante:** Promover um utilizador a "admin" concede-lhe acesso ao portal administrativo. Faça isto apenas para membros de equipa de confiança que necessitem de acesso administrativo.

> **Nota:** Alterar um utilizador de "admin" para "user" revoga imediatamente o seu acesso ao portal administrativo. Se estiverem atualmente autenticados no portal, a sua sessão terminará na próxima navegação de página.

---

## Banir/Desbanir Utilizador

Banir um utilizador suspende a sua conta, impedindo-o de iniciar sessão na app ou aceder a quaisquer funcionalidades da plataforma.

### Banir um Utilizador

1. Abra o painel de detalhes do utilizador.
2. Desloque-se até à secção de **Ações** no fundo do painel.
3. Clique no botão **Banir Utilizador** (apresentado em vermelho).
4. Um modal de confirmação aparece com:
   - O nome e email do utilizador para confirmação
   - Um campo de texto **Motivo** (obrigatório)
   - Um seletor de **Duração** (permanente, 7 dias, 30 dias, 90 dias)
5. Introduza um motivo claro e profissional para o banimento.
6. Selecione a duração do banimento.
7. Clique em **Confirmar Banimento**.

### Efeitos do Banimento

| Efeito | Descrição |
|--------|-------------|
| Login bloqueado | O utilizador não pode iniciar sessão na aplicação móvel |
| Perfil oculto | O perfil do utilizador não é visível para outros utilizadores |
| Animais removidos das listagens | Todos os animais pertencentes a este utilizador são ocultados das listagens |
| Notificações | O utilizador recebe um email explicando o banimento com o motivo fornecido |
| Sessões ativas | Todas as sessões atuais são terminadas imediatamente |

### Diretrizes para o Motivo de Banimento

| Diretriz | Exemplo |
|-----------|---------|
| Ser específico | "Múltiplas listagens fraudulentas de criação reportadas e confirmadas" |
| Referenciar política | "Violação dos Termos de Serviço secção 4.2 relativa a listagens autênticas" |
| Evitar linguagem vaga | NÃO escrever "mau comportamento" - ser específico sobre o que ocorreu |
| Manter profissionalismo | O motivo é enviado diretamente ao utilizador |

> **Importante:** O motivo de banimento é comunicado ao utilizador via email e notificação na app. Deve ser factual, específico e profissional.

### Desbanir um Utilizador

1. Utilize o filtro de **Estado** para selecionar "Banido" para encontrar utilizadores banidos.
2. Clique na linha do utilizador banido para abrir o seu painel de detalhes.
3. O painel mostra um cartão de **Informação de Banimento** com:
   - Data do banimento
   - Administrador que aplicou o banimento
   - Motivo do banimento
   - Duração / expiração do banimento
4. Clique no botão **Desbanir Utilizador** (apresentado em verde).
5. Um modal de confirmação aparece.
6. Opcionalmente introduza uma nota explicando porque o banimento está a ser levantado.
7. Clique em **Confirmar Desbanimento**.
8. O estado do utilizador regressa a "Ativo" e recupera acesso total à plataforma.
9. O utilizador recebe uma notificação de que a sua conta foi restaurada.

### Histórico de Banimentos

Cada ação de banimento e desbanimento é registada no histórico do utilizador:

| Campo | Descrição |
|-------|-------------|
| Data de Banimento | Quando o banimento foi aplicado |
| Data de Desbanimento | Quando o banimento foi levantado (se aplicável) |
| Administrador | Qual administrador tomou a ação |
| Motivo | O motivo declarado para o banimento |
| Duração | Quanto tempo o banimento estava definido para durar |
| Resolução | Como terminou (desbanimento manual, expiração, apelação) |

---

## Pesquisar e Filtrar Utilizadores

### Barra de Pesquisa

A barra de pesquisa no topo da página de Utilizadores suporta:

| Tipo de Pesquisa | Exemplo | Corresponde a |
|-------------|---------|---------|
| Pesquisa por nome | "Sara" | Todos os utilizadores com "Sara" no nome de apresentação |
| Pesquisa por email | "gmail.com" | Todos os utilizadores com endereços Gmail |
| Correspondência parcial | "pet" | Utilizadores chamados "Pedro", "Petrov", etc. |

### Dropdowns de Filtro

| Filtro | Opções |
|--------|---------|
| Role | Todos, User, Moderator, Admin |
| Estado | Todos, Ativo, Pendente, Banido |
| Criador Verificado | Todos, Verificado, Não Verificado, Pendente |

### Combinar Pesquisa e Filtros

1. Introduza texto na barra de pesquisa E selecione valores de filtro simultaneamente.
2. Os resultados devem corresponder a TODOS os critérios (lógica AND).
3. Limpe filtros individuais clicando no seu botão X, ou limpe todos com o botão **Repor**.

---

## Exportar Dados de Utilizadores

Para exportar dados de utilizadores para relatórios ou análise:

1. Aplique quaisquer filtros desejados.
2. Clique no botão **Exportar** na área superior direita.
3. Selecione o formato: **CSV** ou **Excel**.
4. Escolha o âmbito: **Vista filtrada atual** ou **Todos os utilizadores**.
5. O download inicia automaticamente.

### Campos Exportados

| Campo | Incluído | Notas |
|-------|:--------:|-------|
| Nome de Apresentação | Sim | |
| Email | Sim | |
| Role | Sim | |
| Estado | Sim | |
| País | Sim | |
| Cidade | Sim | |
| Contagem de Animais | Sim | |
| Data de Registo | Sim | |
| Último Login | Sim | |
| Telefone | Não | Excluído por privacidade |

> **Nota:** Números de telefone e informações pessoais detalhadas são excluídos das exportações por defeito para cumprir requisitos de proteção de dados.

---

*Anterior: [Registo de Animais](./pets.md) | Seguinte: [Categorias de Animais](./categories.md)*
