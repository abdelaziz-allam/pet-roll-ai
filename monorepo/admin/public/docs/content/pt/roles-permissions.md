# Roles & Permissions

O portal de administracao Petfolioo utiliza um sistema de controlo de acesso baseado em funcoes (RBAC) para gerir o que cada administrador pode ver e fazer. A cada utilizador administrador e atribuida uma funcao, e cada funcao define um conjunto de acessos ao nivel de pagina e permissoes ao nivel de acao.

---

## Visao geral das funcoes

A plataforma suporta quatro funcoes administrativas, cada uma com um conjunto progressivamente mais amplo de capacidades:

| Funcao | Descricao | Caso de uso tipico |
|--------|-----------|-------------------|
| **Super Admin** | Acesso total e irrestrito a todas as paginas e acoes | Proprietario da plataforma, CTO, administrador principal |
| **Admin** | Amplo acesso a paginas operacionais; sem acesso a definicoes do sistema ou gestao de utilizadores admin | Gestor da plataforma, responsavel operacional |
| **Moderator** | Acesso focado em tarefas de moderacao de conteudo (verificacao, acasalamento, animais) | Gestor de comunidade, revisor de conteudo |
| **Viewer** | Acesso somente leitura a maioria das paginas; nao pode criar, editar ou eliminar nada | Agente de suporte, stakeholder, auditor |

---

## Estrutura de permissoes

As permissoes sao definidas em dois niveis:

### 1. Acesso a paginas

A cada funcao e concedido ou negado acesso a paginas especificas. Se uma funcao nao tem acesso a uma pagina, esta nao aparece na navegacao lateral e o acesso direto por URL e bloqueado.

### 2. Permissoes de acao

Dentro de uma pagina a que uma funcao tem acesso, acoes especificas podem ser ativadas ou desativadas. Por exemplo, um Moderator pode **visualizar** animais mas nao **elimina-los**.

---

## Matriz de permissoes

A seguinte matriz mostra exatamente o que cada funcao pode fazer em cada pagina.

### Dashboard

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |

### App Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Create | Yes | Yes | No | No |
| Edit | Yes | Yes | No | No |
| Ban | Yes | Yes | Yes | No |
| Delete | Yes | No | No | No |
| Export | Yes | No | No | No |

### Pets

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | Yes | No |
| Delete | Yes | Yes | No | No |

### Verification

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Approve | Yes | Yes | Yes | No |
| Reject | Yes | Yes | Yes | No |

### Mating Marketplace

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Edit | Yes | Yes | No | No |
| Delete | Yes | Yes | No | No |
| Moderate | Yes | Yes | Yes | No |

### Notifications

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | Yes | Yes |
| Send | Yes | Yes | No | No |
| Delete | Yes | No | No | No |

### Analytics

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | Yes | No | Yes |
| Export | Yes | Yes | No | No |

### Admin Users

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Create | Yes | No | No | No |
| Edit | Yes | No | No | No |
| Delete | Yes | No | No | No |
| Manage Permissions | Yes | No | No | No |

### Settings

| Action | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| View | Yes | No | No | No |
| Edit | Yes | No | No | No |

---

## Visibilidade das paginas por funcao

Esta tabela resume quais paginas aparecem na navegacao lateral para cada funcao:

| Pagina | Super Admin | Admin | Moderator | Viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| Dashboard | Yes | Yes | Yes | Yes |
| App Users | Yes | Yes | Yes | Yes |
| Pets | Yes | Yes | Yes | Yes |
| Pet Categories | Yes | Yes | Yes | Yes |
| Verification | Yes | Yes | Yes | Yes |
| Mating | Yes | Yes | Yes | Yes |
| Health Certs | Yes | Yes | Yes | Yes |
| Vax Analytics | Yes | Yes | Yes | Yes |
| Feedback | Yes | Yes | Yes | Yes |
| Blog | Yes | Yes | Yes | Yes |
| Notifications | Yes | Yes | Yes | Yes |
| Analytics | Yes | Yes | No | Yes |
| Admin Users | Yes | No | No | No |
| Settings | Yes | No | No | No |

---

## Como as permissoes afetam a UI

Quando um utilizador nao tem permissao para uma acao especifica, o portal de administracao adapta a interface em conformidade:

| Cenario | Comportamento da UI |
|---------|---------------------|
| Sem acesso a pagina | Pagina removida da barra lateral; URL retorna 403 |
| Apenas visualizacao (sem edit/delete) | Botoes de acao ocultos; linhas da tabela nao sao clicaveis para edicao |
| Sem permissao de criacao | Botao "Create" / "Add" oculto |
| Sem permissao de eliminacao | Opcao Delete removida dos menus de acao |
| Sem permissao de exportacao | Botao Export oculto |
| Sem permissao approve/reject | Botoes de acao de verificacao ocultos; estado apresentado como somente leitura |

> **Nota:** A UI oculta acoes indisponiveis em vez de mostrar botoes desativados. Isto mantem a interface limpa e evita confusao sobre o que e ou nao permitido.

---

## Gestao de permissoes

Apenas utilizadores **Super Admin** podem criar, editar ou eliminar contas de administrador e modificar as suas permissoes.

### Atribuir uma funcao

1. Navegue ate **Admin Users** na barra lateral.
2. Clique em **Create Admin User** ou edite um utilizador existente.
3. Selecione a funcao desejada no menu suspenso de Funcao.
4. Ao selecionar **Super Admin**, todas as permissoes sao automaticamente concedidas e nao podem ser personalizadas.
5. Para outras funcoes, personalize o acesso a paginas e acoes utilizando o editor de permissoes.

### Permissoes personalizadas

Embora cada funcao tenha permissoes tipicas, o sistema suporta personalizacao por utilizador:

- Um **Admin** pode receber acesso a Settings se necessario.
- Um **Moderator** pode receber acesso de visualizacao a Analytics.
- Um **Viewer** pode ser restringido a menos paginas do que o predefinido.

As permissoes personalizadas substituem as predefinicoes da funcao. A etiqueta da funcao permanece a mesma, mas o acesso real e o que importa.

### Editor de permissoes

O editor de permissoes apresenta uma interface de lista de verificacao:

1. Cada pagina aparece como uma seccao com um interruptor para acesso a pagina.
2. Quando o acesso a pagina esta ativado, as acoes disponiveis para essa pagina aparecem como caixas de selecao.
3. Marque ou desmarque acoes individuais para ajustar com precisao as capacidades do utilizador.
4. Clique em **Save** para aplicar as alteracoes imediatamente.

> **Importante:** As alteracoes de permissoes entram em vigor no proximo carregamento de pagina do utilizador. Se o utilizador esta atualmente conectado, vera as permissoes atualizadas apos atualizar o navegador.

---

## Referencia rapida de comparacao de funcoes

### Super Admin
- Pode fazer tudo
- Unica funcao que pode gerir utilizadores admin e definicoes do sistema
- Unica funcao que pode eliminar utilizadores da aplicacao e notificacoes
- Unica funcao que pode exportar dados de utilizadores
- Nao pode ser eliminada se for a ultima conta Super Admin

### Admin
- Acesso operacional completo a conteudo e gestao de utilizadores
- Pode aprovar/rejeitar verificacoes
- Pode gerir o marketplace de acasalamento
- Pode enviar notificacoes
- Nao pode aceder as paginas Settings ou Admin Users
- Nao pode eliminar utilizadores da aplicacao (apenas banir)

### Moderator
- Focado na qualidade do conteudo e seguranca da comunidade
- Pode aprovar/rejeitar verificacoes de criadores
- Pode moderar anuncios de acasalamento
- Pode editar animais (corrigir informacoes incorretas)
- Pode banir utilizadores problematicos
- Nao pode aceder a Analytics, Settings ou Admin Users
- Nao pode criar ou eliminar conteudo

### Viewer
- Acesso somente leitura para fins de supervisao
- Pode visualizar dashboards, utilizadores, animais, analytics
- Nao pode modificar quaisquer dados
- Nao pode enviar notificacoes ou aprovar verificacoes
- Util para stakeholders que necessitam de visibilidade sem risco

---

## Consideracoes de seguranca

| Pratica | Descricao |
|---------|-----------|
| Privilegio minimo | Atribuir a funcao minima necessaria para as responsabilidades do utilizador |
| Auditoria regular | Rever a lista de utilizadores admin trimestralmente; desativar contas nao utilizadas |
| Contas separadas | Cada administrador deve ter a sua propria conta (sem logins partilhados) |
| Limite de Super Admin | Manter o numero de Super Admins num maximo de 2-3 |
| Suspender, nao eliminar | Quando um administrador sai, suspender a sua conta em vez de a eliminar (preserva o registo de auditoria) |

---

## Perguntas frequentes

**P: Posso criar uma funcao personalizada?**
R: O sistema tem quatro funcoes fixas (Super Admin, Admin, Moderator, Viewer). No entanto, pode personalizar as permissoes de qualquer utilizador individual independentemente da etiqueta da sua funcao.

**P: O que acontece se eu remover o acesso a uma pagina de um utilizador que esta atualmente a visualiza-la?**
R: O utilizador vera um erro 403 na proxima navegacao ou atualizacao de pagina. A sua sessao nao e interrompida.

**P: Um Super Admin pode despromover-se a si proprio?**
R: Um Super Admin pode alterar a sua propria funcao, mas o sistema impede a remocao completa da ultima conta Super Admin.

**P: As permissoes afetam o Manual do Utilizador?**
R: Nao. Todos os utilizadores admin podem aceder ao Manual do Utilizador independentemente da sua funcao ou permissoes. A documentacao esta sempre disponivel.

**P: Posso ver um registo de auditoria das alteracoes de permissoes?**
R: As alteracoes de permissoes sao registadas com um carimbo temporal e o ID do administrador que efetuou a alteracao. Estes sao armazenados nos campos `updatedBy` e `updatedAt` de cada registo de utilizador admin.
