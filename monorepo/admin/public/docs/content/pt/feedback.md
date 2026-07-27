# Gestão de Feedback

A página de Gestão de Feedback permite aos administradores visualizar, responder e organizar o feedback de utilizadores submetido através da aplicação móvel Petfolioo. Este é o seu centro para compreender as necessidades dos utilizadores, rastrear bugs e gerir sugestões de funcionalidades.

![Feedback](/docs/screenshots/feedback.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | Full access |
> | Admin | Full access |
> | Moderator | View, Respond |
> | Viewer | View only |

---

## Visão Geral

Quando navega para a página de Feedback, verá uma linha de estatísticas no topo a resumir o estado atual de todo o feedback, seguida por áreas de conteúdo com separadores e controlos de filtragem.

---

## Linha de Estatísticas

No topo da página, quatro cartões de métricas apresentam contagens em tempo real:

| Métrica | Descrição |
|--------|-------------|
| **Total** | O número total de entradas de feedback recebidas em todos os estados |
| **Aberto** | Entradas de feedback que ainda não tiveram resposta ou foram fechadas |
| **Respondido** | Entradas de feedback onde um admin publicou pelo menos uma resposta |
| **TODO** | Entradas de feedback fixadas por um admin para ação de seguimento |

> **Dica:** Utilize a contagem de TODO como indicador rápido de itens pendentes que precisam de atenção. Se este número crescer, considere fazer triagem com a sua equipa.

---

## Separadores

A página de Feedback está organizada em dois separadores:

### Todo o Feedback

1. Clique no separador **Todo o Feedback** (selecionado por defeito).
2. Esta vista apresenta todas as entradas de feedback no sistema independentemente do estado.
3. As entradas são ordenadas por data, com as mais recentes primeiro.
4. Utilize os filtros (descritos abaixo) para restringir resultados.

### Lista TODO

1. Clique no separador **Lista TODO**.
2. Esta vista mostra apenas as entradas de feedback que foram fixadas como TODO por um admin.
3. Utilize este separador durante reuniões de triagem da equipa ou revisões diárias.
4. Os itens permanecem aqui até serem desafixados.

---

## Filtros

Abaixo dos separadores, uma barra de filtros fornece vários controlos para restringir as entradas de feedback apresentadas.

### Filtro de Estado

1. Localize o dropdown **Estado** na barra de filtros.
2. Clique para expandir e selecione uma das seguintes opções:
   - **Todos** -- Mostra feedback em qualquer estado
   - **Aberto** -- Mostra apenas feedback não resolvido
   - **Respondido** -- Mostra feedback com pelo menos uma resposta do admin
   - **Fechado** -- Mostra feedback marcado como resolvido
3. A lista atualiza-se imediatamente após a seleção.

### Filtro de Tipo

1. Localize o dropdown **Tipo** na barra de filtros.
2. Selecione a categoria de feedback que pretende ver:
   - **Todos os Tipos** -- Sem filtro de tipo aplicado
   - **Bug** -- Problemas ou defeitos reportados por utilizadores
   - **Sugestão** -- Pedidos de funcionalidades e ideias de melhoria
   - **Geral** -- Comentários ou questões gerais
3. Cada entrada de feedback está etiquetada com o seu badge de tipo para identificação visual rápida.

### Filtro de Intervalo de Datas

1. Clique no seletor de **Intervalo de Datas** na barra de filtros.
2. Selecione uma data de início e data de fim no widget de calendário.
3. Apenas o feedback submetido dentro do intervalo selecionado será apresentado.
4. Para limpar o filtro de data, clique no ícone de limpar no seletor de datas.

### Alternância Apenas TODOs

1. Localize o interruptor **Apenas TODOs** na barra de filtros.
2. Ative-o para mostrar apenas entradas de feedback fixadas como TODO.
3. Isto fornece uma alternativa rápida à mudança para o separador Lista TODO enquanto permanece na vista Todo o Feedback com outros filtros aplicados.

> **Dica:** Combine filtros para consultas poderosas. Por exemplo, defina Tipo para "Bug" e Estado para "Aberto" para ver todos os relatórios de bugs não resolvidos.

---

## Entradas de Feedback

Cada entrada de feedback na lista apresenta a seguinte informação:

| Campo | Descrição |
|-------|-------------|
| **Info do Utilizador** | Nome de apresentação, email e avatar do utilizador que submeteu |
| **Mensagem** | O texto completo do feedback submetido pelo utilizador |
| **Badge de Tipo** | Um badge colorido indicando Bug (vermelho), Sugestão (azul) ou Geral (cinza) |
| **Data** | A data e hora em que o feedback foi submetido |
| **Estado** | Indicador de estado atual (Aberto, Respondido ou Fechado) |
| **Pin TODO** | Um ícone de pin indicando se esta entrada está marcada para seguimento |

### Ver uma Entrada de Feedback

1. Localize a entrada de feedback na lista.
2. Clique na linha da entrada ou no ícone de expansão para abrir a vista de detalhe.
3. A vista de detalhe mostra a mensagem completa, informação do utilizador e quaisquer respostas anteriores do admin.

---

## Responder a Feedback

Os administradores podem responder ao feedback dos utilizadores. As respostas são visíveis para o utilizador dentro da aplicação móvel.

### Passos para Responder

1. Abra a entrada de feedback a que pretende responder.
2. Localize a área de texto **Responder** no fundo da vista de detalhe.
3. Escreva a sua mensagem de resposta na área de texto.
4. Reveja a sua mensagem para clareza e profissionalismo.
5. Clique no botão **Enviar Resposta**.
6. Uma mensagem de confirmação aparecerá indicando que a resposta foi enviada com sucesso.
7. O estado do feedback muda automaticamente para **Respondido**.

> **Importante:** A sua resposta será visível para o utilizador na aplicação móvel Petfolioo. Assegure-se de que a sua resposta é útil, profissional e aborda diretamente a preocupação do utilizador.

### Boas Práticas para Respostas

- Reconheça o feedback do utilizador antes de fornecer uma solução.
- Se o problema for um bug conhecido, informe o utilizador que está a ser trabalhado.
- Para sugestões, agradeça ao utilizador e explique se a funcionalidade está a ser considerada.
- Evite jargão técnico que utilizadores finais possam não compreender.
- Mantenha as respostas concisas mas completas.

---

## Respostas Anteriores do Admin

Ao visualizar uma entrada de feedback que recebeu respostas, todas as respostas anteriores do admin são apresentadas inline em ordem cronológica.

1. Abra a vista de detalhe da entrada de feedback.
2. Desloque-se para baixo para ver o fio de conversa.
3. Cada resposta mostra:
   - O nome do admin que publicou a resposta
   - A data e hora da resposta
   - O texto completo da resposta
4. Novas respostas aparecem no fundo do fio.

> **Dica:** Reveja as respostas anteriores antes de publicar uma nova para evitar respostas duplicadas ou contraditórias.

---

## Fechar Feedback

Quando um item de feedback foi totalmente abordado, pode fechá-lo para indicar que não é necessária mais ação.

### Passos para Fechar

1. Abra a entrada de feedback que pretende fechar.
2. Clique no botão **Fechar** (ou selecione "Fechar" no menu de ações).
3. Um diálogo de confirmação aparecerá pedindo-lhe para confirmar.
4. Clique em **Confirmar** para fechar o feedback.
5. O estado da entrada muda para **Fechado**.
6. As entradas fechadas permanecem no sistema e podem ser visualizadas definindo o filtro de estado para "Fechado."

> **Nota:** Fechar feedback não o elimina. Pode ainda visualizar entradas fechadas e reabri-las se necessário.

---

## Fixar / Desafixar como TODO

A funcionalidade de pin TODO permite aos admins sinalizar entradas de feedback específicas para seguimento. Os itens fixados aparecem no separador Lista TODO e contribuem para a contagem de TODO na linha de estatísticas.

### Fixar Feedback como TODO

1. Localize a entrada de feedback que pretende sinalizar para seguimento.
2. Clique no ícone de **Pin** (alfinete) na linha da entrada, ou abra a vista de detalhe e clique em **Fixar como TODO**.
3. A entrada é imediatamente adicionada à Lista TODO.
4. O contador de TODO na linha de estatísticas incrementa por um.
5. Um ícone de pin aparece na entrada indicando o seu estado TODO.

### Desafixar Feedback

1. Localize a entrada de feedback fixada (utilize o separador Lista TODO ou o filtro Apenas TODOs).
2. Clique no ícone de **Desafixar** na linha da entrada, ou abra a vista de detalhe e clique em **Remover de TODO**.
3. A entrada é removida da Lista TODO.
4. O contador de TODO na linha de estatísticas decrementa por um.

### Quando Utilizar Pins TODO

- Um item de feedback requer investigação antes de responder.
- Necessita de input de outro membro da equipa antes de responder.
- O problema está relacionado com um lançamento futuro e deve ser acompanhado.
- Uma sugestão precisa de ser discutida na próxima reunião de planeamento.

---

## Resumo do Fluxo de Trabalho

O fluxo de trabalho recomendado para tratar feedback é:

1. **Rever** -- Verificar a linha de estatísticas diariamente para novo feedback aberto.
2. **Triar** -- Utilizar filtros para priorizar bugs sobre sugestões.
3. **Fixar** -- Marcar itens complexos como TODO para seguimento posterior.
4. **Responder** -- Responder a itens simples imediatamente.
5. **Colaborar** -- Utilizar o separador Lista TODO em revisões de equipa.
6. **Fechar** -- Marcar itens resolvidos como fechados após confirmar que o problema do utilizador foi abordado.

---

## Atalhos de Teclado

| Atalho | Ação |
|----------|--------|
| `Enter` | Abrir entrada de feedback selecionada |
| `R` | Focar na área de texto de resposta (quando a entrada está aberta) |
| `T` | Alternar pin TODO na entrada selecionada |
| `Esc` | Fechar a vista de detalhe |

---

## Resolução de Problemas

| Problema | Solução |
|-------|----------|
| Resposta não está a enviar | Verifique a sua ligação de rede e tente novamente. Assegure-se de que a mensagem não está vazia. |
| Filtros não estão a atualizar | Atualize a página. Se o problema persistir, limpe a cache do navegador. |
| Contagem de TODO incorreta | A contagem atualiza ao carregar a página. Navegue para outra página e regresse para atualizar. |
| Não consigo ver feedback fechado | Defina o filtro de Estado para "Fechado" ou "Todos" para ver entradas fechadas. |

---

## Páginas Relacionadas

- [Notificações](./notifications.md) -- Enviar anúncios a utilizadores
- [Utilizadores Admin](./admin-users.md) -- Gerir quem pode responder a feedback
- [Configurações](./settings.md) -- Configurar preferências de todo o sistema
