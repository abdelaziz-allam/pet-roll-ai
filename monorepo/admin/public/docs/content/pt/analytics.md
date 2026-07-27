# Analytics

A página de Analytics fornece informações visuais sobre a utilização da plataforma, crescimento de utilizadores, demografia de animais e atividade de saúde. Utilize estes gráficos para compreender tendências, medir o envolvimento e tomar decisões baseadas em dados sobre a plataforma Petfolioo.

![Analytics](/docs/screenshots/analytics.png)

---

## Visão Geral

O dashboard de Analytics apresenta quatro visualizações primárias juntamente com um seletor de intervalo de tempo que controla a janela de dados para todos os gráficos. Cada gráfico atualiza-se dinamicamente quando altera o intervalo de tempo selecionado.

---

## Aceder ao Analytics

1. Clique em **Analytics** no menu de navegação lateral.
2. O dashboard carrega com todos os gráficos apresentados numa única página com scroll.
3. O intervalo de tempo predefinido é **30 dias**.

---

## Seletor de Intervalo de Tempo

No topo da página de Analytics, um seletor de intervalo de tempo permite controlar o período de dados apresentado em todos os gráficos.

### Intervalos Disponíveis

| Opção | Período | Melhor Para |
|--------|--------|----------|
| **7d** | Últimos 7 dias | Monitorizar atividade recente e tendências de curto prazo |
| **30d** | Últimos 30 dias | Relatórios mensais e análise de tendências gerais (predefinição) |
| **90d** | Últimos 90 dias | Revisões trimestrais e identificação de padrões de médio prazo |
| **1 Ano** | Últimos 365 dias | Revisões anuais, padrões sazonais e crescimento a longo prazo |

### Alterar o Intervalo de Tempo

1. Localize o seletor de intervalo de tempo no topo da página.
2. Clique num dos botões de intervalo: **7d**, **30d**, **90d** ou **1 Ano**.
3. O botão selecionado fica destacado para indicar o intervalo ativo.
4. Todos os gráficos na página atualizam-se para apresentar dados do período escolhido.
5. Os eixos e rótulos dos gráficos ajustam-se automaticamente para se adequar à nova janela temporal.

> **Dica:** Comece com 30d para uma visão geral, depois restrinja para 7d para investigar anomalias recentes ou expanda para 1 Ano para relatórios de nível executivo.

---

## Gráfico de Crescimento de Utilizadores

### Tipo de Gráfico

Gráfico de linhas apresentando tendências de registo de utilizadores ao longo do tempo.

### O Que Mostra

O gráfico de Crescimento de Utilizadores visualiza o número de novos registos de utilizadores plotados durante o período de tempo selecionado. Cada ponto de dados representa a contagem cumulativa ou diária de novos utilizadores.

### Ler o Gráfico

| Elemento | Descrição |
|---------|-------------|
| **Eixo X** | Tempo (datas ou semanas dependendo do intervalo selecionado) |
| **Eixo Y** | Número de novos registos de utilizadores |
| **Linha** | Uma linha contínua ligando pontos de dados mostrando a trajetória de crescimento |
| **Pontos de Dados** | Marcadores ao passar o cursor na linha mostrando valores exatos |
| **Tooltip** | Aparece ao passar o cursor mostrando a data e contagem exata de registos |

### Interpretar os Dados

1. **Tendência ascendente** -- Crescimento consistente na aquisição de utilizadores. A plataforma está a atrair novos utilizadores de forma estável.
2. **Linha plana** -- A aquisição de utilizadores estabilizou. Considere esforços de marketing ou lançamentos de funcionalidades para reacender o crescimento.
3. **Picos** -- Aumentos súbitos podem correlacionar-se com campanhas de marketing, cobertura mediática ou destaques na app store.
4. **Quedas** -- Diminuições nos registos diários podem indicar padrões sazonais ou problemas técnicos.

### Comportamento do Intervalo de Tempo

| Intervalo | Granularidade do Eixo X | Notas |
|-------|-------------------|-------|
| 7d | Diário | Cada dia mostrado individualmente |
| 30d | Diário | Cada dia mostrado, bom para identificar padrões semanais |
| 90d | Semanal | Dados agregados por semana para legibilidade |
| 1 Ano | Mensal | Dados agregados por mês para mostrar trajetória anual |

> **Dica:** Compare a vista de 7d com a vista de 30d. Se a tendência dos últimos 7 dias está acima da média de 30 dias, o crescimento está a acelerar.

---

## Gráfico de Distribuição por Espécie

### Tipo de Gráfico

Gráfico circular (ou donut) mostrando a proporção de animais por espécie.

### O Que Mostra

O gráfico de Distribuição por Espécie decompõe todos os animais registados pela sua categoria de espécie, mostrando a proporção relativa de cada uma.

### Ler o Gráfico

| Elemento | Descrição |
|---------|-------------|
| **Fatias** | Cada fatia representa uma espécie (ex.: Cão, Gato, Ave, Coelho) |
| **Cores** | Cada espécie tem uma cor distinta atribuída para identificação |
| **Rótulos** | Nome da espécie e percentagem mostrados em ou perto de cada fatia |
| **Legenda** | Uma legenda mapeia cores para nomes de espécies |
| **Tooltip** | Passe o cursor sobre uma fatia para ver a contagem exata e percentagem |

### Interpretar os Dados

1. **Espécie dominante** -- A maior fatia indica o tipo de animal principal da sua base de utilizadores. Utilize isto para priorizar funcionalidades.
2. **Fatias pequenas** -- Espécies com percentagens muito pequenas podem indicar oportunidade de crescimento em segmentos sub-servidos.
3. **Equilíbrio** -- Uma distribuição aproximadamente uniforme sugere apelo amplo entre tipos de donos de animais.

### Casos de Uso

- **Priorização de funcionalidades** -- Se 70% dos animais são cães, priorize funcionalidades específicas para cães.
- **Planeamento de conteúdo** -- Crie conteúdo educativo proporcional à distribuição por espécie.
- **Segmentação de marketing** -- Compreenda quais segmentos de audiência são maiores para campanhas publicitárias.
- **Segmentação de notificações** -- Os segmentos de audiência em Notificações (Donos de Cães, Donos de Gatos) correlacionam-se diretamente com este gráfico.

> **Dica:** Se notar uma espécie a crescer mais rapidamente que outras ao longo do tempo (compare 30d vs 1 Ano), considere investir em funcionalidades específicas dessa espécie para capitalizar a tendência.

---

## Gráfico de Raças Populares

### Tipo de Gráfico

Gráfico de barras horizontal classificando as raças mais populares.

### O Que Mostra

O gráfico de Raças Populares apresenta as principais raças registadas na plataforma, classificadas por contagem. As barras estendem-se horizontalmente, facilitando a comparação de popularidade entre raças.

### Ler o Gráfico

| Elemento | Descrição |
|---------|-------------|
| **Eixo Y** | Nomes das raças, ordenados da mais popular (topo) à menos popular (fundo) |
| **Eixo X** | Contagem de animais registados daquela raça |
| **Barras** | Barras horizontais cujo comprimento representa o número de animais |
| **Rótulos** | Valor de contagem apresentado no fim de cada barra |
| **Tooltip** | Passe o cursor para contagem exata e percentagem do total |

### Interpretar os Dados

1. **Raças de topo** -- As barras mais longas representam as raças mais comuns na plataforma. Estes utilizadores são a sua audiência principal.
2. **Cauda longa** -- Muitas raças com contagens pequenas indicam interesses diversos dos utilizadores.
3. **Concentração de raças** -- Se poucas raças dominam (ex.: as 3 primeiras representam 50%+), a sua plataforma tem uma base de utilizadores concentrada.

### Informações Típicas

| Padrão | Informação | Ação |
|---------|---------|--------|
| Golden Retriever domina | Grande audiência de cães de família | Priorizar funcionalidades para raças médias/grandes |
| Gato Persa no top 5 | Forte segmento de donos de gatos | Investir em acompanhamento de saúde específico para gatos |
| Raças exóticas a aparecer | Criadores de nicho a juntarem-se | Considerar funcionalidades premium específicas para criadores |
| Distribuição uniforme | Base de utilizadores diversa | Construir funcionalidades gerais em vez de específicas por raça |

### Limites do Gráfico

- O gráfico apresenta as **10-15 raças de topo** por defeito.
- As restantes raças são agrupadas sob "Outro" se aplicável.
- O número de raças visíveis pode variar por intervalo de tempo.

> **Dica:** Cruze raças populares com dados de atividade de saúde. Se uma raça popular tem baixa atividade de registos de saúde, esses utilizadores podem precisar de incentivos de envolvimento.

---

## Gráfico de Atividade de Saúde

### Tipo de Gráfico

Gráfico de barras agrupadas mostrando atividades relacionadas com saúde categorizadas por tipo.

### O Que Mostra

O gráfico de Atividade de Saúde apresenta o volume de ações relacionadas com saúde tomadas na plataforma, agrupadas por tipo de atividade. Isto ajuda a compreender quão ativamente os utilizadores estão a interagir com funcionalidades de saúde.

### Ler o Gráfico

| Elemento | Descrição |
|---------|-------------|
| **Eixo X** | Períodos de tempo (dias, semanas ou meses dependendo do intervalo) |
| **Eixo Y** | Contagem de atividades de saúde |
| **Grupos de Barras** | Múltiplas barras por período de tempo, uma para cada tipo de atividade |
| **Cores** | Cada tipo de atividade tem uma cor distinta |
| **Legenda** | Mapeia cores para tipos de atividade (Vacinações, Check-ups, Medicações, etc.) |
| **Tooltip** | Passe o cursor para contagem exata por tipo de atividade por período |

### Tipos de Atividade

| Atividade | Descrição | Cor (típica) |
|----------|-------------|-----------------|
| **Vacinações** | Registos de vacinação criados ou atualizados | Azul |
| **Registos de Saúde** | Registos gerais de saúde registados | Verde |
| **Rastreio de Peso** | Medições de peso registadas | Laranja |
| **Medicações** | Entradas de medicação adicionadas | Roxo |

### Interpretar os Dados

1. **Barras de vacinação altas** -- Os utilizadores estão a rastrear ativamente vacinações. O sistema de lembretes está provavelmente a impulsionar o envolvimento.
2. **Barras de registos de saúde baixas** -- Os utilizadores podem não estar cientes da funcionalidade de registos de saúde. Considere prompts na app.
3. **Padrões sazonais** -- Algumas atividades de saúde têm picos sazonais (ex.: tratamentos de pulgas na primavera).
4. **Barras a crescer ao longo do tempo** -- A adoção de funcionalidades de saúde está a aumentar, indicando bom envolvimento dos utilizadores.
5. **Barras a diminuir** -- Os utilizadores podem estar a perder interesse ou a encontrar fricção no registo de dados de saúde.

### Comparar Tipos de Atividade

O formato agrupado permite comparar visualmente:

- Quais funcionalidades de saúde são mais utilizadas vs. subutilizadas.
- Se um tipo de atividade está a crescer enquanto outros diminuem.
- Como diferentes intervalos de tempo revelam diferentes padrões.

> **Dica:** Se a atividade de vacinação é alta mas outro rastreio de saúde é baixo, considere adicionar prompts entre funcionalidades: "Registou uma vacinação -- gostaria também de registar o peso do Rex?"

---

## Layout do Dashboard

Os quatro gráficos estão dispostos na página de Analytics num layout de grelha:

```
+---------------------------+---------------------------+
|                           |                           |
|    Crescimento de         |    Distribuição por       |
|    Utilizadores           |    Espécie                |
|    (Gráfico de Linhas)    |    (Gráfico Circular)     |
|                           |                           |
+---------------------------+---------------------------+
|                           |                           |
|    Raças Populares        |    Atividade de Saúde     |
|    (Barras Horizontais)   |    (Barras Agrupadas)     |
|                           |                           |
+---------------------------+---------------------------+
```

Cada gráfico ocupa um cartão com:
- Um cabeçalho de título
- A visualização do gráfico
- Tooltips interativos ao passar o cursor
- Dimensionamento responsivo que se adapta à largura do ecrã

---

## Interagir com os Gráficos

### Tooltips ao Passar o Cursor

1. Mova o cursor sobre qualquer ponto de dados, barra ou fatia do gráfico.
2. Uma tooltip aparece mostrando:
   - O valor exato
   - O rótulo (data, nome da raça, espécie, etc.)
   - Percentagem quando aplicável

### Comportamento Responsivo

1. Em ecrãs maiores, os gráficos são apresentados numa grelha 2x2.
2. Em ecrãs mais pequenos, os gráficos empilham-se verticalmente para legibilidade.
3. Os elementos dos gráficos redimensionam-se proporcionalmente.

### Atualização de Dados

1. Os dados de analytics são atualizados quando a página carrega.
2. Alterar o intervalo de tempo aciona uma nova obtenção de dados.
3. Não há auto-atualização -- recarregue a página manualmente para os dados mais recentes.

---

## Fluxos de Trabalho Comuns de Analytics

### Relatórios Mensais

1. Selecione o intervalo de tempo **30d**.
2. Note a tendência de Crescimento de Utilizadores (ascendente, plana ou descendente).
3. Verifique a Distribuição por Espécie para quaisquer mudanças.
4. Reveja as Raças Populares para tendências emergentes.
5. Examine a Atividade de Saúde para níveis de envolvimento.
6. Faça captura de ecrã ou exporte dados para relatórios.

### Investigar uma Queda

1. Comece com **30d** para identificar quando a queda ocorreu.
2. Mude para **7d** para examinar o período mais recente em detalhe.
3. Verifique se a queda correlaciona-se com:
   - Um problema do sistema (verificar histórico de Configurações > Modo de Manutenção)
   - Uma notificação enviada (verificar histórico de Notificações)
   - Um padrão sazonal (comparar com vista de 1 Ano)

### Revisão Trimestral

1. Selecione o intervalo de tempo **90d**.
2. Compare a trajetória de crescimento com trimestres anteriores.
3. Identifique quais atividades de saúde mais cresceram.
4. Note quaisquer novas raças a aparecer no gráfico de Raças Populares.
5. Utilize a Distribuição por Espécie para validar o alinhamento da estratégia de marketing.

### Planeamento Anual

1. Selecione o intervalo de tempo **1 Ano**.
2. Identifique padrões sazonais no Crescimento de Utilizadores (ex.: picos de férias).
3. Rastreie alterações ano-a-ano na popularidade de raças.
4. Meça a adoção de funcionalidades de saúde ao longo do ano completo.
5. Utilize as informações para fundamentar o roadmap de produto.

---

## Compreender a Frescura dos Dados

| Aspeto | Detalhe |
|--------|--------|
| Fonte de dados | Base de dados da plataforma (agregada) |
| Frequência de atualização | Em tempo real ao carregar a página |
| Precisão histórica | Completa até ao lançamento da plataforma |
| Fuso horário | Hora do servidor (UTC) |
| Dados em falta | Lacunas mostradas como valores zero, não interpolados |

---

## Resolução de Problemas

| Problema | Solução |
|-------|----------|
| Gráficos não estão a carregar | Verifique a sua ligação de rede. Atualize a página. |
| Dados parecem desatualizados | Analytics carregam na visita da página. Navegue para outra página e regresse, ou atualize. |
| Valores zero para todas as métricas | Verifique se o intervalo de tempo selecionado tem dados. Tente expandir para 1 Ano. |
| Tooltips dos gráficos não aparecem | Tente um navegador diferente. Assegure-se de que JavaScript está ativado. |
| Intervalo de tempo não está a mudar | Clique diretamente no botão de intervalo. Se não responder, atualize a página. |
| Não consigo aceder ao Analytics | Verifique se o seu role e permissões incluem acesso à página de Analytics. |

---

## Páginas Relacionadas

- [Configurações](./settings.md) -- Configurar definições da plataforma que afetam o comportamento dos utilizadores
- [Notificações](./notifications.md) -- Enviar notificações que podem impactar métricas de envolvimento
- [Feedback](./feedback.md) -- Correlacionar feedback de utilizadores com tendências de analytics
- [Utilizadores Admin](./admin-users.md) -- Conceder acesso ao analytics a membros da equipa
