# Utilizadores Admin

A página de Utilizadores Admin permite-lhe gerir as contas de administrador que têm acesso ao portal administrativo Petfolioo. Aqui pode criar novos admins, atribuir roles, configurar permissões granulares e controlar o estado das contas.

![Admin Users](/docs/screenshots/admin-users.png)

> **Access:** Super Admin only
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Create, Edit, Delete, Manage Permissions |
> | Admin | No access |
> | Moderator | No access |
> | Viewer | No access |

---

## Visão Geral

O controlo de acesso é crítico para manter a segurança e integridade operacional. O sistema de Utilizadores Admin suporta acesso baseado em roles com granularidade adicional de permissões por página, assegurando que cada membro da equipa tem exatamente o acesso de que necessita.

---

## Tabela de Utilizadores Admin

A vista principal apresenta uma tabela de todas as contas de administrador no sistema.

### Colunas da Tabela

| Coluna | Descrição |
|--------|-------------|
| **Nome** | O nome de apresentação do admin mostrado em todo o portal |
| **Email** | O endereço de email de login para a conta admin |
| **Role** | O role atribuído que determina o nível base de permissão |
| **Estado** | Estado atual da conta: Ativo ou Suspenso |
| **Ações** | Botões de ação Editar e Eliminar |

### Funcionalidades da Tabela

1. A tabela é ordenável clicando nos cabeçalhos de coluna.
2. Uma caixa de pesquisa acima da tabela permite filtrar por nome ou email.
3. Controlos de paginação aparecem no fundo para equipas admin grandes.
4. Contas ativas mostram um badge de estado verde; contas suspensas mostram um badge vermelho.

---

## Roles

Cada conta admin é atribuída a um de quatro roles. Os roles definem o nível base de acesso antes de quaisquer substituições de permissões granulares serem aplicadas.

### Definições de Roles

| Role | Nível de Acesso | Descrição |
|------|-------------|-------------|
| **super_admin** | Total sem restrições | Acesso completo a todas as páginas, funcionalidades e configurações do sistema. Não pode ser eliminado ou ter permissões restritas. |
| **admin** | Todo o conteúdo e utilizadores | Acesso total a gestão de conteúdo, gestão de utilizadores, feedback, notificações e analytics. Não pode aceder a configurações ao nível do sistema. |
| **moderator** | Rever e moderar | Pode rever e moderar conteúdo como feedback, perfis reportados e entradas sinalizadas. Não pode criar ou eliminar recursos. |
| **viewer** | Apenas leitura | Pode visualizar todas as páginas a que tem acesso mas não pode criar, editar ou eliminar registos. Ideal para stakeholders que precisam de visibilidade. |

### Hierarquia de Roles

A hierarquia de roles determina quais roles podem gerir outros roles:

1. **super_admin** pode gerir todos os outros roles (admin, moderator, viewer).
2. **admin** pode gerir contas moderator e viewer.
3. **moderator** não pode gerir quaisquer contas admin.
4. **viewer** não pode gerir quaisquer contas admin.

> **Importante:** Não pode atribuir um role superior ao seu. Apenas um super_admin pode criar outro super_admin.

---

## Criar um Admin

Para adicionar uma nova conta de administrador ao portal:

### Passos

1. Clique no botão **Adicionar Admin** no canto superior direito da página de Utilizadores Admin.
2. Um diálogo de formulário de criação aparece com os seguintes campos:

| Campo | Descrição | Requisitos |
|-------|-------------|--------------|
| **Email** | O email de login para o novo admin | Obrigatório. Deve ser um endereço de email válido e único. |
| **Nome de Apresentação** | O nome mostrado na UI do portal | Obrigatório. 2-50 caracteres. |
| **Palavra-passe** | A palavra-passe inicial de login | Obrigatório. Mínimo 8 caracteres, deve incluir maiúsculas, minúsculas e um número. |
| **Role** | O role de acesso para este admin | Obrigatório. Selecionar do dropdown. |

3. Preencha o campo **Email** com o endereço de email do novo admin.
4. Introduza um **Nome de Apresentação** que identificará este admin no portal.
5. Defina uma **Palavra-passe** inicial que cumpra os requisitos de complexidade.
6. Selecione o **Role** apropriado do dropdown.
7. Clique em **Criar** para adicionar a conta admin.
8. Uma mensagem de sucesso confirma que a conta foi criada.
9. O novo admin aparece na tabela e pode agora iniciar sessão.

> **Dica:** Após criar uma conta, informe o novo admin das suas credenciais através de um canal seguro. Recomende que alterem a palavra-passe no primeiro login.

---

## Editar um Admin

Pode modificar o nome de apresentação, role e estado de um admin existente.

### Passos

1. Localize o admin na tabela de Utilizadores Admin.
2. Clique no botão **Editar** (ícone de lápis) na coluna de Ações.
3. Um diálogo de formulário de edição aparece com os valores atuais pré-preenchidos.

### Campos Editáveis

| Campo | Descrição | Notas |
|-------|-------------|-------|
| **Nome de Apresentação** | Atualizar o nome visível do admin | 2-50 caracteres |
| **Role** | Alterar o nível de acesso do admin | Não pode atribuir um role superior ao seu |
| **Estado** | Definir como Ativo ou Suspenso | Admins suspensos não podem iniciar sessão |

4. Modifique os campos conforme necessário.
5. Clique em **Guardar Alterações** para aplicar as atualizações.
6. Uma mensagem de sucesso confirma que as alterações foram guardadas.

### Alterar Estado

- **Ativo** -- O admin pode iniciar sessão e usar o portal normalmente.
- **Suspenso** -- O admin não pode iniciar sessão. As sessões existentes são terminadas imediatamente.

> **Nota:** Suspender um admin é reversível. Utilize quando precisar de revogar temporariamente o acesso sem eliminar a conta.

### Restrições

- Não pode editar o seu próprio role (para prevenir auto-despromoção acidental).
- Não pode alterar o role de um super_admin a menos que também seja super_admin.
- O email não pode ser alterado após a criação da conta.

---

## Configuração Granular de Permissões Por Página

Para além dos roles, o portal administrativo suporta controlo de permissões detalhado numa base por página. Isto permite personalizar exatamente quais páginas e ações cada admin pode aceder.

### Aceder à Configuração de Permissões

1. Clique no botão **Editar** no admin que pretende configurar.
2. No diálogo de edição, navegue até à secção (ou separador) **Permissões**.
3. Uma matriz de permissões é apresentada mostrando todas as páginas do portal.

### Estrutura da Matriz de Permissões

A matriz de permissões apresenta cada página do portal como uma linha com os seguintes controlos:

| Controlo | Descrição |
|---------|-------------|
| **Alternância de Acesso** | Um interruptor que ativa ou desativa o acesso à página inteira |
| **Multi-seleção de Ações** | Um dropdown que permite selecionar quais ações específicas são permitidas nessa página |

### Páginas Disponíveis na Matriz

| Página | Ações Possíveis |
|------|-----------------|
| Dashboard | Ver |
| Utilizadores | Ver, Criar, Editar, Eliminar, Suspender |
| Animais | Ver, Criar, Editar, Eliminar |
| Registos de Saúde | Ver, Criar, Editar, Eliminar |
| Vacinações | Ver, Criar, Editar, Eliminar |
| Criação | Ver, Criar, Editar, Eliminar |
| Feedback | Ver, Responder, Fechar, Fixar |
| Notificações | Ver, Enviar |
| Analytics | Ver, Exportar |
| Configurações | Ver, Editar |
| Utilizadores Admin | Ver, Criar, Editar, Eliminar |

### Configurar Permissões

1. Para cada linha de página, alterne o interruptor de **Acesso**:
   - **ATIVADO** -- O admin pode aceder a esta página (ações específicas controladas abaixo).
   - **DESATIVADO** -- O admin não pode ver ou navegar para esta página de todo.
2. Para páginas com acesso ativado, clique no dropdown de multi-seleção **Ações**.
3. Selecione as ações específicas que este admin está autorizado a realizar:
   - Marque cada ação que pretende conceder.
   - Desmarque ações que pretende restringir.
4. Repita para cada página conforme necessário.
5. Clique em **Guardar Alterações** para aplicar a configuração de permissões.

### Como as Permissões Interagem com Roles

- As permissões de role servem como a **base**.
- As permissões por página podem **restringir** o acesso abaixo da base do role.
- As permissões por página **não podem conceder** acesso para além do que o role permite.
- Por exemplo: Um utilizador com role admin tem acesso a todas as páginas de conteúdo por defeito. Pode restringir o seu acesso à página de Criação desativando-a, mas não pode conceder-lhe acesso a Configurações (reservado para super_admin).

> **Dica:** Utilize permissões granulares quando tem membros de equipa que necessitam de um subconjunto específico de capacidades admin. Por exemplo, um agente de suporte ao cliente pode ser um role "admin" mas restrito apenas às páginas de Feedback e Utilizadores.

---

## Eliminar um Admin

Remover uma conta admin elimina-a permanentemente do sistema.

### Passos

1. Localize o admin na tabela de Utilizadores Admin.
2. Clique no botão **Eliminar** (ícone de lixo) na coluna de Ações.
3. Um diálogo de confirmação aparece com o nome e email do admin.
4. Escreva o endereço de email do admin para confirmar a eliminação (medida de segurança).
5. Clique em **Confirmar Eliminação** para remover permanentemente a conta.
6. Uma mensagem de sucesso confirma a eliminação.
7. O admin é removido da tabela e não pode mais iniciar sessão.

### Restrições de Eliminação

| Restrição | Motivo |
|-------------|--------|
| Não pode eliminar um super_admin | Previne bloqueio acidental do sistema |
| Não pode eliminar a sua própria conta | Previne auto-remoção |
| Não pode eliminar se não tiver role suficiente | Regras de hierarquia de roles aplicam-se |

> **Aviso:** A eliminação é permanente e não pode ser revertida. Se precisar de remover temporariamente o acesso, utilize o estado Suspenso em vez disso.

---

## Explicação da Matriz de Permissões

O sistema de permissões no Petfolioo utiliza uma abordagem em camadas:

### Camada 1: Controlo de Acesso Baseado em Roles (RBAC)

Cada role tem um conjunto predefinido de permissões que servem como ponto de partida:

```
super_admin  -->  Todas as páginas, todas as ações, sem restrições
admin        -->  Todas as páginas de conteúdo/utilizadores, todas as ações (exceto Configurações)
moderator    -->  Páginas de revisão de conteúdo, ações limitadas (ver, responder, fechar)
viewer       -->  Todas as páginas acessíveis, apenas visualização
```

### Camada 2: Substituições Por Página

Permissões granulares adicionam uma segunda camada sobre o RBAC:

```
Permissões de role  (base)
    |
    v
Alternâncias por página  (podem restringir, não podem expandir além do role)
    |
    v
Permissões efetivas finais  (o que o admin realmente vê)
```

### Cenários de Exemplo

**Cenário 1: Agente de Suporte ao Cliente**
- Role: admin
- Substituição: Desativar acesso a Animais, Registos de Saúde, Criação, Analytics, Utilizadores Admin
- Resultado: Pode apenas aceder a Dashboard, Utilizadores, Feedback e Notificações

**Cenário 2: Revisor de Conteúdo**
- Role: moderator
- Substituição: Ativar Feedback (Ver, Responder, Fechar), Utilizadores (apenas Ver)
- Resultado: Pode rever feedback e consultar perfis de utilizadores mas não pode modificar utilizadores

**Cenário 3: Observador de Analytics**
- Role: viewer
- Substituição: Ativar apenas Dashboard e Analytics
- Resultado: Pode ver gráficos e métricas mas nada mais

### Visualizar Permissões Efetivas

1. Abra o diálogo de edição para qualquer admin.
2. A secção de Permissões mostra o estado efetivo atual.
3. As alternâncias e seleções de ações refletem o que está atualmente concedido.
4. Ações desativadas (acinzentadas) indicam aquelas que estão para além do permitido pelo role.

---

## Boas Práticas de Segurança

1. **Princípio do menor privilégio** -- Atribua o role e permissões mínimos necessários para a função de cada admin.
2. **Auditorias regulares** -- Reveja contas admin trimestralmente. Remova contas que já não são necessárias.
3. **Suspender antes de eliminar** -- Ao fazer offboarding, suspenda primeiro para assegurar que não há disrupção, depois elimine após um período de graça.
4. **Limitar super_admins** -- Mantenha o número de contas super_admin ao mínimo (idealmente 1-2).
5. **Palavras-passe fortes** -- Imponha palavras-passe complexas e recomende gestores de palavras-passe.
6. **Monitorizar atividade** -- Verifique quem está a iniciar sessão e quando através dos registos do sistema.

---

## Resolução de Problemas

| Problema | Solução |
|-------|----------|
| Não consigo criar admin | Verifique se tem privilégios de role suficientes. Confirme que o email não está já em uso. |
| Não consigo ver botões de Editar/Eliminar | O seu role não tem permissão para gerir admins no ou acima do nível de role do alvo. |
| Admin não consegue iniciar sessão após criação | Verifique se o estado da conta é Ativo. Confirme que a palavra-passe foi introduzida corretamente. |
| Alterações de permissão não estão a ter efeito | O admin pode precisar de terminar sessão e iniciar novamente para as alterações de permissão serem aplicadas. |
| Não consigo eliminar um super_admin | Isto é por design. Contas super_admin não podem ser eliminadas através da UI. |

---

## Páginas Relacionadas

- [Configurações](./settings.md) -- Configurar definições de segurança do sistema
- [Feedback](./feedback.md) -- Gerir feedback de utilizadores (requer acesso à página de Feedback)
- [Analytics](./analytics.md) -- Ver métricas da plataforma (requer acesso à página de Analytics)
