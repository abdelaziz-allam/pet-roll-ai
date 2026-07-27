# Notificações

A página de Notificações permite aos administradores compor e enviar notificações push aos utilizadores da aplicação móvel Petfolioo. Pode direcionar segmentos específicos de audiência, rever o histórico de notificações e seguir boas práticas para comunicação eficaz.

![Notifications](/docs/screenshots/notifications.png)

---

## Visão Geral

As notificações push são um canal direto para os seus utilizadores. Utilize-as para anunciar novas funcionalidades, partilhar atualizações importantes, enviar lembretes ou envolver segmentos específicos de utilizadores. Esta página fornece tanto as ferramentas de composição como um registo histórico de todas as notificações anteriormente enviadas.

---

## Compor Notificação

O compositor de notificações é a ferramenta principal para criar e enviar notificações push aos utilizadores da app.

### Aceder ao Compositor

1. Navegue até à página **Notificações** a partir do menu lateral.
2. O formulário de composição é apresentado no topo da página.

### Campos do Formulário

| Campo | Descrição | Requisitos |
|-------|-------------|--------------|
| **Título** | O cabeçalho da notificação apresentado de forma proeminente no dispositivo do utilizador | Obrigatório. Máximo de 65 caracteres recomendado para visibilidade total. |
| **Corpo da Mensagem** | O conteúdo detalhado da notificação | Obrigatório. Máximo de 240 caracteres recomendado. |
| **Audiência** | O grupo-alvo de utilizadores que receberão esta notificação | Obrigatório. Selecionar de segmentos predefinidos. |

---

## Compor uma Notificação

Siga estes passos para criar e enviar uma notificação:

### Passo 1: Introduzir o Título

1. Clique no campo de entrada **Título**.
2. Escreva um cabeçalho conciso e cativante.
3. Mantenha-o com menos de 65 caracteres para evitar truncamento em dispositivos mais pequenos.

> **Dica:** Utilize linguagem orientada para a ação nos títulos. "Novo: Acompanhe as Vacinações do Seu Animal" é mais cativante do que "Atualização da Funcionalidade de Vacinação."

### Passo 2: Escrever o Corpo da Mensagem

1. Clique na área de texto **Corpo da Mensagem**.
2. Escreva a mensagem detalhada que pretende que os utilizadores vejam.
3. Inclua informação relevante como que ação o utilizador deve tomar.
4. Mantenha a mensagem com menos de 240 caracteres para apresentação ideal.

### Passo 3: Selecionar a Audiência

1. Clique no seletor dropdown **Audiência**.
2. Escolha um dos seguintes segmentos de audiência:

| Audiência | Descrição |
|----------|-------------|
| **Todos os Utilizadores** | Envia a notificação a todos os utilizadores registados da app |
| **Donos de Cães** | Direciona utilizadores que têm pelo menos um cão registado no seu perfil |
| **Donos de Gatos** | Direciona utilizadores que têm pelo menos um gato registado no seu perfil |
| **Criadores Verificados** | Direciona utilizadores que foram verificados como criadores profissionais |

3. A audiência selecionada determina quem receberá a notificação push.

> **Nota:** Um utilizador pode pertencer a múltiplos segmentos. Por exemplo, um criador verificado que possui cães receberá notificações direcionadas a "Donos de Cães", "Criadores Verificados" e "Todos os Utilizadores."

### Passo 4: Rever Antes de Enviar

1. Verifique novamente o título para erros e clareza.
2. Reveja o corpo da mensagem para precisão e tom.
3. Confirme que o segmento de audiência está correto.
4. Verifique que não é uma duplicação de uma notificação enviada recentemente.

---

## Confirmação de Envio

Quando estiver pronto para enviar a notificação, um passo de confirmação assegura que não envia acidentalmente para a audiência errada.

### Processo de Envio

1. Clique no botão **Enviar Notificação**.
2. Um diálogo de confirmação aparece apresentando:
   - O título da notificação
   - O corpo da mensagem
   - O segmento de audiência selecionado
   - O número estimado de destinatários
3. Reveja todos os detalhes no diálogo de confirmação.
4. Clique em **Confirmar Envio** para despachar a notificação.
5. Alternativamente, clique em **Cancelar** para regressar ao compositor e fazer alterações.
6. Após entrega bem-sucedida, uma mensagem de sucesso aparece confirmando que a notificação foi colocada em fila.

> **Importante:** Uma vez confirmada, a notificação não pode ser recolhida. Verifique sempre a audiência e conteúdo antes de confirmar.

---

## Histórico de Notificações

Abaixo do formulário de composição, a secção de Histórico de Notificações apresenta uma lista cronológica de todas as notificações anteriormente enviadas.

### Colunas da Lista de Histórico

| Coluna | Descrição |
|--------|-------------|
| **Tag de Tipo** | Uma tag colorida indicando o segmento de audiência (ex.: "Todos os Utilizadores" em azul, "Donos de Cães" em laranja) |
| **Título** | O título da notificação como foi enviado |
| **Mensagem** | Uma pré-visualização do corpo da mensagem (truncada se longa) |
| **Data** | A data e hora em que a notificação foi enviada |
| **Contagem de Destinatários** | O número de utilizadores que receberam a notificação |

### Visualizar o Histórico

1. Desloque-se para baixo, abaixo do formulário de composição, para ver a lista de histórico.
2. As notificações são listadas em ordem cronológica inversa (mais recente primeiro).
3. Cada linha mostra a tag de tipo, título, data e contagem de destinatários de relance.
4. Clique em qualquer linha para expandir e ver o corpo completo da mensagem.

### Compreender as Tags de Tipo

As tags de tipo são codificadas por cores para identificação rápida:

| Cor da Tag | Audiência |
|-----------|----------|
| Azul | Todos os Utilizadores |
| Laranja | Donos de Cães |
| Roxo | Donos de Gatos |
| Verde | Criadores Verificados |

---

## Boas Práticas para Notificações Push

Notificações push eficazes impulsionam o envolvimento sem irritar os utilizadores. Siga estas diretrizes:

### Frequência

1. **Limite a frequência** -- Não envie mais de 2-3 notificações por semana a menos que seja urgente.
2. **Agrupe atualizações relacionadas** -- Combine múltiplas pequenas atualizações numa única notificação.
3. **Respeite fusos horários** -- Envie notificações durante horas razoáveis (9h - 20h hora local).
4. **Evite fins de semana** -- A menos que a notificação seja urgente, prefira dias úteis.

### Qualidade do Conteúdo

1. **Seja conciso** -- Vá direto ao ponto rapidamente. Os utilizadores decidem em segundos se vão interagir.
2. **Seja acionável** -- Diga aos utilizadores o que podem fazer: "Verifique as próximas vacinações do seu animal."
3. **Seja relevante** -- Utilize segmentação de audiência para assegurar que o conteúdo corresponde aos interesses dos utilizadores.
4. **Evite clickbait** -- Notificações enganosas erodem a confiança e aumentam as taxas de desativação.
5. **Personalize quando possível** -- Referencie o segmento de audiência: "Atenção Donos de Cães" parece mais pessoal.

### Timing e Contexto

1. **Novas funcionalidades** -- Envie quando a funcionalidade está ativa e acessível.
2. **Lembretes de saúde** -- Envie alguns dias antes de uma consulta ou vacinação do animal.
3. **Conteúdo sazonal** -- Alinhe com as estações (ex.: lembretes de pulgas/carraças na primavera).
4. **Atualizações de emergência** -- Para questões urgentes (manutenção, segurança), envie imediatamente independentemente das regras de timing.

### Escrever Títulos Eficazes

| Bom Exemplo | Porque Funciona |
|--------------|--------------|
| "A Vacinação do Seu Animal Está Próxima" | Relevante, cria urgência, ação clara |
| "Novo: Acompanhamento de Gestação para Criadores" | Destaca novo valor, direciona audiência |
| "Manutenção Esta Noite às 22h" | Claro, específico, urgente |

| Mau Exemplo | Porque Falha |
|-------------|--------------|
| "Veja isto!" | Vago, sem proposta de valor |
| "Atualização" | Demasiado genérico, utilizadores vão ignorar |
| "Importante!!!" | Sobreuso de urgência, parece spam |

### Medir o Sucesso

Após enviar notificações, monitorize:

- **Taxas de abertura** -- Os utilizadores estão a interagir com as suas notificações?
- **Taxas de desativação** -- Um pico indica fadiga de notificações.
- **Atividade na app** -- Uma notificação impulsiona o comportamento pretendido?
- **Feedback** -- Verifique a página de Feedback para reações dos utilizadores.

---

## Detalhes dos Segmentos de Audiência

### Todos os Utilizadores

- Inclui todas as contas registadas no sistema.
- Utilize para anúncios de toda a plataforma, avisos de manutenção ou funcionalidades universais.
- Maior audiência -- utilize com moderação para evitar fadiga de notificações.

### Donos de Cães

- Inclui utilizadores com pelo menos um cão no seu perfil de animais.
- Utilize para dicas de saúde específicas de cães, eventos de raça ou atualizações de funcionalidades.
- Exemplo: "Lembrete: Prevenção anual de dirofilariose para cães."

### Donos de Gatos

- Inclui utilizadores com pelo menos um gato no seu perfil de animais.
- Utilize para conteúdo específico de gatos, dicas de saúde indoor ou funcionalidades felinas.
- Exemplo: "Novo: Acompanhamento de atividade indoor para gatos."

### Criadores Verificados

- Inclui utilizadores que completaram a verificação de criador.
- Utilize para funcionalidades específicas de criação, atualizações de conformidade ou ferramentas profissionais.
- Exemplo: "Melhorias no acompanhamento de gestação já disponíveis."

---

## Resolução de Problemas

| Problema | Solução |
|-------|----------|
| Notificação não está a enviar | Verifique se todos os campos obrigatórios estão preenchidos. Verifique a conectividade de rede. |
| Contagem de destinatários mostra 0 | O segmento de audiência selecionado pode estar vazio. Verifique se existem utilizadores nesse segmento. |
| Utilizadores reportam não ter recebido | Os utilizadores podem ter desativado as notificações push no seu dispositivo. Isto está fora do controlo do admin. |
| Notificação duplicada enviada | Verifique a lista de histórico antes de enviar. Não há desfazer uma vez confirmado. |

---

## Páginas Relacionadas

- [Feedback](./feedback.md) -- Monitorizar reações dos utilizadores a notificações
- [Analytics](./analytics.md) -- Acompanhar tendências de envolvimento dos utilizadores
- [Configurações](./settings.md) -- Configurar definições do sistema relacionadas com notificações
