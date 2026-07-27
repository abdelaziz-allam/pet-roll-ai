# Dashboard

O Dashboard é o primeiro ecrã que vê após iniciar sessão no Portal Administrativo do Petfolioo. Fornece uma visão geral em tempo real do estado da plataforma através de indicadores-chave de desempenho (KPIs), gráficos interativos e feeds de atividade recente. Utilize o dashboard para monitorizar tendências de crescimento, identificar áreas que necessitam de atenção e acompanhar o envolvimento da plataforma de relance.

![Dashboard](/docs/screenshots/dashboard.png)

> **Access:** All roles
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View |
> | Admin | View |
> | Moderator | View |
> | Viewer | View |

---

## Cartões de KPI

No topo do dashboard, quatro cartões resumidos apresentam as métricas mais importantes da plataforma. Cada cartão mostra o total atual e um indicador de variação percentual comparado com o período anterior.

### Definições dos Cartões

| Cartão | Métrica | Descrição |
|------|--------|-------------|
| Total de Utilizadores | Contagem de utilizadores registados na app | Todos os utilizadores que criaram uma conta na plataforma |
| Total de Animais | Contagem de animais registados | Todos os animais adicionados ao registo independentemente do estado |
| Verificações Pendentes | Itens a aguardar revisão | Pedidos de verificação que ainda não foram aprovados ou rejeitados |
| Listagens Ativas | Listagens atualmente visíveis | Animais marcados como disponíveis para criação ou adoção |

### Percentagem de Crescimento

Cada cartão de KPI inclui um indicador de crescimento:

- Uma **seta verde para cima** com uma percentagem indica crescimento comparado com o período anterior.
- Uma **seta vermelha para baixo** com uma percentagem indica um declínio comparado com o período anterior.
- O período de comparação corresponde ao intervalo de tempo selecionado (ver Seletor de Intervalo de Tempo abaixo).

> **Dica:** Passe o cursor sobre um cartão de KPI para ver os números exatos dos períodos atual e anterior numa tooltip.

### Ler os Cartões

1. O **número grande** é a contagem total atual.
2. O **badge de percentagem** abaixo mostra a variação período-a-período.
3. O **rótulo** no topo identifica qual métrica está a ser apresentada.
4. Clique em qualquer cartão para navegar diretamente para o módulo correspondente (ex.: clicar em "Total de Utilizadores" abre a lista de Utilizadores).

---

## Seletor de Intervalo de Tempo

O seletor de intervalo de tempo controla a janela de dados para todos os analytics e comparações de KPI do dashboard.

### Intervalos Disponíveis

| Opção | Período | Comparação Com |
|--------|--------|--------------------|
| 7d | Últimos 7 dias | 7 dias anteriores |
| 30d | Últimos 30 dias | 30 dias anteriores |
| 90d | Últimos 90 dias | 90 dias anteriores |
| Todo o Período | Desde o lançamento da plataforma | Sem comparação (percentagem de crescimento oculta) |

### Como Alterar o Intervalo de Tempo

1. Localize o **seletor de intervalo de tempo** na área superior direita do dashboard, acima dos cartões de KPI.
2. Clique num dos botões de período: **7d**, **30d**, **90d** ou **Todo o Período**.
3. Todo o dashboard será atualizado para refletir o período selecionado.
4. As percentagens de crescimento dos KPIs serão recalculadas com base na nova janela de comparação.

> **Nota:** A opção "Todo o Período" oculta as percentagens de crescimento uma vez que não existe período anterior para comparação.

---

## Secção de Analytics de Animais

Abaixo dos cartões de KPI, a secção de Analytics de Animais apresenta decomposições visuais dos dados do registo de animais. Três tipos de gráficos fornecem diferentes perspetivas sobre a população de animais.

### Distribuição por Espécie (Gráfico Circular)

O gráfico circular apresenta a decomposição proporcional dos animais por espécie.

| Elemento | Descrição |
|---------|-------------|
| Tipo de gráfico | Gráfico circular/donut |
| Fonte de dados | Todos os animais registados agrupados por espécie |
| Segmentos | Um segmento por espécie (ex.: Cão, Gato, Ave, Coelho, Réptil) |
| Rótulos | Nome da espécie e contagem apresentados ao passar o cursor |
| Legenda | Legenda codificada por cores abaixo ou ao lado do gráfico |

**Interagir com o Gráfico Circular:**

1. Passe o cursor sobre qualquer segmento para ver a contagem exata e percentagem daquela espécie.
2. Clique num segmento para filtrar outros gráficos do dashboard para apenas aquela espécie.
3. Os itens da legenda são clicáveis - clique num nome de espécie para alternar a sua visibilidade no gráfico.

### Distribuição por Género (Gráfico de Barras)

O gráfico de barras vertical mostra a distribuição de animais por género.

| Elemento | Descrição |
|---------|-------------|
| Tipo de gráfico | Gráfico de barras vertical |
| Eixo X | Categorias de género (Macho, Fêmea, Desconhecido) |
| Eixo Y | Contagem de animais |
| Barras | Uma barra por género, codificada por cores |
| Rótulos | Contagem apresentada acima de cada barra |

**Ler o Gráfico de Género:**

1. Cada barra representa uma categoria de género.
2. A altura da barra corresponde ao número total de animais daquele género.
3. A contagem exata é apresentada como rótulo acima de cada barra.
4. Passe o cursor para detalhes adicionais incluindo percentagem do total.

### Distribuição por País (Gráfico de Barras Horizontal)

O gráfico de barras horizontal classifica os países pelo número de animais registados.

| Elemento | Descrição |
|---------|-------------|
| Tipo de gráfico | Gráfico de barras horizontal |
| Eixo Y | Nomes dos países (ordenados por contagem, decrescente) |
| Eixo X | Contagem de animais |
| Barras | Uma barra horizontal por país |
| Apresentação | Top 10 países mostrados por defeito |

**Ler o Gráfico de Países:**

1. Os países estão ordenados do mais animais (topo) ao menos (fundo).
2. Por defeito, apenas os 10 países com mais animais são apresentados.
3. Passe o cursor sobre uma barra para ver a contagem exata e percentagem do total.
4. O comprimento da barra é proporcional à contagem relativamente a outros países.

---

## Filtros de Geo e Espécie

Acima dos gráficos de analytics, controlos de filtro permitem restringir os dados apresentados.

### Filtros Disponíveis

| Filtro | Tipo | Opções |
|--------|------|---------|
| Espécie | Dropdown de seleção | Todas as espécies disponíveis na plataforma (ex.: Cão, Gato, Ave, etc.) |
| País | Dropdown de seleção | Todos os países com animais registados |

### Aplicar Filtros

1. Clique no dropdown **Espécie** para selecionar uma espécie específica de animal.
2. Clique no dropdown **País** para selecionar um país específico.
3. Os gráficos e tabelas abaixo serão atualizados imediatamente para refletir o filtro.
4. Os filtros podem ser combinados - selecione tanto uma espécie como um país para restringir ainda mais os resultados.
5. Para repor, selecione "Todos" em cada dropdown ou clique no botão **Repor Filtros**.

> **Dica:** Utilize o filtro de espécie na vista do gráfico circular para explorar distribuições de raças dentro de uma única espécie.

### Comportamento dos Filtros

| Cenário | Efeito |
|----------|--------|
| Nenhum filtro selecionado | Todos os dados apresentados globalmente |
| Apenas espécie selecionada | Gráficos mostram dados para aquela espécie em todos os países |
| Apenas país selecionado | Gráficos mostram dados para todas as espécies naquele país |
| Ambos selecionados | Gráficos mostram dados para a espécie selecionada no país selecionado |

---

## Tabela de Registos de Utilizadores Recentes

Abaixo dos gráficos de analytics, uma tabela apresenta os registos de utilizadores mais recentes na plataforma.

### Colunas da Tabela

| Coluna | Descrição |
|--------|-------------|
| Avatar | Miniatura da foto de perfil do utilizador |
| Nome | Nome de apresentação do utilizador |
| Email | Endereço de email registado do utilizador |
| Data de Registo | Data e hora em que a conta foi criada |
| Estado | Estado da conta (Ativo, Pendente, Banido) |
| Animais | Número de animais registados por este utilizador |

### Funcionalidades da Tabela

1. **Ordenação** - Clique em qualquer cabeçalho de coluna para ordenar por essa coluna. Clique novamente para inverter a ordem.
2. **Paginação** - A tabela mostra 10 entradas por página por defeito. Use os controlos de paginação no fundo para navegar.
3. **Ações Rápidas** - Passe o cursor sobre uma linha para revelar um botão "Ver" que abre o painel de detalhes do utilizador.

### Compreender os Indicadores de Estado

| Estado | Cor do Badge | Significado |
|--------|-------------|---------|
| Ativo | Verde | Conta em bom estado e totalmente funcional |
| Pendente | Laranja | Conta criada mas email ainda não verificado |
| Banido | Vermelho | Conta suspensa por um administrador |

> **Nota:** A tabela de registos recentes mostra sempre os utilizadores mais recentes primeiro, independentemente da definição do seletor de intervalo de tempo. Apresenta registos dos últimos 30 dias.

---

## Boas Práticas do Dashboard

### Lista de Verificação Diária

1. Verifique o cartão de KPI **Verificações Pendentes** - um número elevado pode indicar um atraso acumulado.
2. Reveja as **percentagens de crescimento** nos quatro cartões para quedas inesperadas.
3. Analise a tabela de **Registos de Utilizadores Recentes** para contas suspeitas.
4. Note quaisquer alterações significativas no gráfico de **Distribuição por País**.

### Interpretar Tendências

| Tendência | Significado Possível | Ação Recomendada |
|-------|-------------------|-------------------|
| Pico súbito em registos | Sucesso de campanha de marketing ou atividade de bots | Verificar utilizadores recentes para padrões suspeitos |
| Queda em listagens ativas | Mudança sazonal ou problema de política | Rever ações de banimento recentes e expirações de listagens |
| Verificações pendentes elevadas | Moderação com pessoal insuficiente | Atribuir moderadores adicionais |
| Mudança no equilíbrio de espécies | Tendência regional ou configuração incorreta de categorias | Rever configurações de categorias |

---

## Desempenho do Dashboard

O dashboard carrega dados de forma assíncrona. Cada secção carrega independentemente:

1. **Cartões de KPI** carregam primeiro (consulta mais rápida).
2. **Gráficos** carregam a seguir com um breve indicador de carregamento.
3. **Tabela de registos recentes** carrega por último.

Se alguma secção apresentar um erro de carregamento:

1. Verifique a sua ligação à internet.
2. Tente atualizar a página.
3. Se o erro persistir, o serviço de backend pode estar com problemas.

> **Dica:** O dashboard atualiza-se automaticamente a cada 5 minutos. Pode atualizar manualmente clicando no ícone de atualização no cabeçalho ou pressionando `F5`.

---

*Anterior: [Primeiros Passos](./getting-started.md) | Seguinte: [Registo de Animais](./pets.md)*
