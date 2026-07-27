# Primeiros Passos

Bem-vindo ao Portal Administrativo do Petfolioo. Este guia orienta-o no seu primeiro login, explica o layout da interface e ajuda-o a compreender como os controlos de acesso baseados em roles determinam o que pode ver e fazer na plataforma.

O portal administrativo é uma consola de gestão baseada na web para a plataforma de saúde e criação de animais Petfolioo. A partir daqui, os administradores podem gerir utilizadores, animais, categorias, registos de saúde, programas de criação e configurações da plataforma.

![Login Page](/docs/screenshots/login.png)

---

## Iniciar Sessão

O portal administrativo utiliza autenticação por email e palavra-passe. Apenas contas com um role de administrador atribuído podem aceder ao portal.

### Passos para Iniciar Sessão

1. Abra o seu navegador e aceda ao URL do portal administrativo.
2. Será apresentada a página de **Login** na rota `/login`.
3. Introduza o seu **Endereço de Email** no primeiro campo.
4. Introduza a sua **Palavra-passe** no segundo campo.
5. Clique no botão **Iniciar Sessão**.
6. Se as suas credenciais forem válidas e a sua conta tiver acesso de administrador, será redirecionado para o **Dashboard**.

> **Nota:** Se vir um erro "Não Autorizado" após introduzir credenciais válidas, a sua conta pode não ter um role de administrador atribuído. Contacte um super administrador para atualizar o seu role.

### Redefinir a Palavra-passe

Se esqueceu a sua palavra-passe:

1. Na página de Login, clique no link **Esqueceu a Palavra-passe?** abaixo do campo de palavra-passe.
2. Introduza o endereço de email associado à sua conta de administrador.
3. Clique em **Enviar Link de Redefinição**.
4. Verifique a sua caixa de entrada para uma mensagem de redefinição de palavra-passe do Petfolioo.
5. Clique no link do email para abrir o formulário de redefinição de palavra-passe.
6. Introduza e confirme a sua nova palavra-passe.
7. Volte à página de login e inicie sessão com as novas credenciais.

> **Dica:** Os links de redefinição de palavra-passe expiram após 1 hora. Se o seu link expirou, solicite um novo a partir da página de login.

---

## Compreender o Layout do Dashboard

Após iniciar sessão, o portal administrativo apresenta um layout consistente em todas as páginas.

### Navegação Lateral

A barra lateral esquerda contém o menu de navegação principal. Inclui links para todos os módulos principais:

| Item do Menu | Descrição |
|-----------|-------------|
| Dashboard | Visão geral da plataforma com KPIs e analytics |
| Utilizadores | Gerir utilizadores da app, roles e contas |
| Animais | Navegar e gerir o registo de animais |
| Categorias | Definir e gerir categorias de animais |
| Registos de Saúde | Rever certificações de saúde dos animais |
| Criação | Gerir programas de criação e linhagem |
| Vacinações | Acompanhar registos de vacinação |
| Gestação | Monitorizar entradas de acompanhamento de gestação |
| Verificações | Rever pedidos de verificação pendentes |
| Configurações | Configuração da plataforma |

A barra lateral pode ser recolhida clicando no ícone de alternância no topo para dar mais espaço ao conteúdo.

### Barra Superior

A barra superior contém:

| Elemento | Localização | Finalidade |
|---------|----------|---------|
| Pesquisa | Centro | Pesquisa global em utilizadores, animais e registos |
| Sino de Notificações | Direita | Alertas para ações pendentes e eventos do sistema |
| Avatar do Perfil | Extrema Direita | Menu da conta com definições de perfil e logout |

### Área de Conteúdo

A área de conteúdo principal ocupa o espaço restante à direita da barra lateral e abaixo da barra superior. É aqui que tabelas, formulários, painéis de detalhes e analytics são apresentados.

---

## Acesso Baseado em Roles

O portal administrativo aplica controlo de acesso baseado em roles (RBAC). Cada conta de administrador tem um dos seguintes roles atribuídos, que determina as ações disponíveis.

### Definições de Roles

| Role | Nível de Acesso | Descrição |
|------|-------------|-------------|
| `super_admin` | Total | Acesso completo a todos os módulos, configurações e gestão de utilizadores. Pode atribuir e revogar roles de administrador. |
| `admin` | Elevado | Acesso a todos os módulos operacionais. Pode gerir utilizadores, animais e registos. Não pode modificar configurações da plataforma nem atribuir roles super_admin. |
| `moderator` | Médio | Pode rever e moderar conteúdo, aprovar verificações e gerir listagens de animais. Não pode criar ou eliminar contas de administrador. |
| `viewer` | Apenas Leitura | Pode visualizar todos os dados em todos os módulos mas não pode criar, editar ou eliminar registos. Útil para auditoria e relatórios. |

### Matriz de Permissões

| Ação | super_admin | admin | moderator | viewer |
|--------|:-----------:|:-----:|:---------:|:------:|
| Ver dashboard | Sim | Sim | Sim | Sim |
| Gerir utilizadores | Sim | Sim | Não | Não |
| Criar contas de administrador | Sim | Não | Não | Não |
| Banir/Desbanir utilizadores | Sim | Sim | Sim | Não |
| Gerir animais | Sim | Sim | Sim | Não |
| Aprovar verificações | Sim | Sim | Sim | Não |
| Gerir categorias | Sim | Sim | Não | Não |
| Editar configurações da plataforma | Sim | Não | Não | Não |
| Ver relatórios | Sim | Sim | Sim | Sim |

> **Nota:** Se um item de navegação não está visível na sua barra lateral, o seu role não tem acesso a esse módulo.

---

## Visão Geral da Navegação

Abaixo está uma lista completa dos módulos disponíveis no portal administrativo, organizados por área funcional.

### Módulos Principais

1. **Dashboard** - Visão geral do estado da plataforma, KPIs e gráficos de analytics.
2. **Utilizadores** - Gestão de utilizadores da app incluindo perfis, roles e estado da conta.
3. **Animais** - O registo de animais com vistas detalhadas e ferramentas de moderação.
4. **Categorias** - Sistema de categorização de espécies/tipos de animais.

### Saúde e Registos

5. **Registos de Saúde** - Documentos de certificação de saúde e o seu estado de verificação.
6. **Vacinações** - Calendários de vacinação e registos de conclusão.
7. **Gestação** - Acompanhamento de gestação para animais de criação.

### Operações da Plataforma

8. **Verificações** - Fila de pedidos de verificação de utilizadores e animais pendentes.
9. **Criação** - Gestão de programas de criação e rastreio de linhagem.
10. **Configurações** - Configuração global da plataforma e feature flags.

---

## Dicas para a Primeira Utilização

Quando aceder ao portal administrativo pela primeira vez, siga estas recomendações para se orientar.

### Primeiros Passos Recomendados

1. **Reveja o seu perfil** - Clique no seu avatar no canto superior direito e selecione "Perfil" para verificar se os detalhes da sua conta estão corretos.
2. **Explore o dashboard** - Familiarize-se com os cartões de KPI e analytics para compreender as métricas atuais da plataforma.
3. **Verifique verificações pendentes** - Navegue até ao módulo de Verificações para ver se há itens a aguardar revisão.
4. **Consulte utilizadores ativos** - Visite o módulo de Utilizadores e ordene por "Data de Registo" decrescente para ver os registos mais recentes.
5. **Reveja categorias** - Assegure-se de que as categorias de animais estão configuradas corretamente para a sua região.

### Recomendações de Navegador

O portal administrativo funciona melhor em navegadores modernos:

| Navegador | Versão Mínima |
|---------|----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |

> **Dica:** Ative as notificações do navegador quando solicitado para receber alertas em tempo real sobre verificações pendentes e eventos importantes do sistema.

### Atalhos de Teclado

| Atalho | Ação |
|----------|--------|
| `/` | Focar na barra de pesquisa global |
| `Esc` | Fechar painéis e modais abertos |

---

## Resolução de Problemas de Login

| Problema | Solução |
|---------|----------|
| Erro "Credenciais inválidas" | Verifique novamente o seu email e palavra-passe. Utilize o fluxo de Esqueceu a Palavra-passe se necessário. |
| Mensagem "Conta desativada" | A sua conta foi desativada. Contacte um super administrador. |
| A página carrega mas o formulário de login está em branco | Limpe a cache e cookies do navegador e recarregue. |
| Redirecionado para o login após iniciar sessão | A sua sessão pode ter expirado. Tente iniciar sessão novamente. Se persistir, verifique se os cookies estão ativados. |

---

## Obter Ajuda

Se encontrar problemas não abordados neste guia:

1. Consulte as outras secções deste manual de utilizador para ajuda específica de cada módulo.
2. Contacte o super administrador da sua organização para questões de role e acesso.
3. Para problemas técnicos, contacte a equipa de suporte da plataforma.

---

*Seguinte: [Dashboard](./dashboard.md) - Saiba mais sobre o panorama de analytics e KPIs.*
