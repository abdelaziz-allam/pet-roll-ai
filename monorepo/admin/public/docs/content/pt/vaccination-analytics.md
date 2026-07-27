# Analytics de Vacinação

O módulo de Analytics de Vacinação fornece aos administradores informações sobre tendências de vacinação em toda a plataforma. Utilize este dashboard para compreender quais vacinas são mais comummente administradas, identificar padrões regionais e acompanhar a cobertura geral de vacinação.

![Vaccination Analytics](/docs/screenshots/vaccination-analytics.png)

---

## Visão Geral do Dashboard

A página de Analytics de Vacinação está organizada nas seguintes secções:

1. **Estatísticas Resumidas** -- Métricas-chave no topo da página
2. **Quadro de Liderança Top 20 Vacinas** -- Lista classificada das vacinas mais utilizadas
3. **Visualização de Pódio** -- Destaque das 3 principais vacinas
4. **Decomposição Por Vacina** -- Distribuição por espécie para cada vacina
5. **Principais Localizações** -- Distribuição geográfica por vacina

---

## Estatísticas Resumidas

No topo da página de analytics, três cartões de estatísticas apresentam métricas agregadas:

| Cartão de Estatísticas | Descrição | Ícone |
|-----------|-------------|------|
| Total de Vacinações | Número total de registos de vacinação em todos os animais | Seringa |
| Vacinas Únicas | Número de tipos de vacinas distintas administradas | Frasco |
| Animais Vacinados | Número de animais únicos com pelo menos uma vacinação | Pata |

### Ler as Estatísticas

- **Total de Vacinações** conta eventos individuais de vacinação (um animal a receber uma vacina = 1 contagem).
- **Vacinas Únicas** mostra a variedade de vacinas no sistema (ex.: Raiva, DHPP, FVRCP cada uma conta como 1).
- **Animais Vacinados** é deduplicado -- um animal com 5 vacinações ainda conta como 1 animal.

> **Dica:** Compare Total de Vacinações com Animais Vacinados para compreender o número médio de vacinações por animal na plataforma.

---

## Filtros

A barra de filtros aplica-se a todas as secções da página de analytics simultaneamente.

### Filtro de Período de Tempo

Selecione um intervalo de tempo para os dados:

| Opção | Descrição |
|--------|-------------|
| Últimos 7 dias | Semana passada |
| Últimos 30 dias | Mês passado |
| Últimos 90 dias | Trimestre passado |
| Últimos 12 meses | Ano passado |
| Todo o período | Sem restrição temporal |
| Intervalo personalizado | Seletor de datas para início e fim |

### Filtro de Espécie

Filtre dados de vacinação por espécie do animal:

- Todas as Espécies (predefinição)
- Cão
- Gato
- Ave
- Coelho
- Outro

### Filtro de País

Selecione um ou mais países para ver dados de vacinação apenas dessas regiões.

### Filtro de Cidade

Restrinja ainda mais os resultados selecionando cidades específicas dentro do país escolhido.

> **Dica:** Combine filtros para responder a questões específicas. Por exemplo: "Quais são as principais vacinas para cães no Reino Unido nos últimos 12 meses?"

### Aplicar Filtros

1. Defina os valores de filtro desejados usando os dropdowns.
2. Clique em **Aplicar Filtros** ou os filtros aplicam-se automaticamente ao alterar.
3. Todas as secções do dashboard atualizam-se para refletir os dados filtrados.
4. Os filtros ativos são mostrados como tags abaixo da barra de filtros.
5. Clique no **X** em qualquer tag de filtro para a remover, ou clique em **Limpar Tudo** para repor.

---

## Quadro de Liderança Top 20 Vacinas

O quadro de liderança apresenta as 20 vacinas mais frequentemente administradas com base na seleção de filtros atual.

### Colunas da Tabela

| Coluna | Descrição |
|--------|-------------|
| Classificação | Posição de 1 a 20 |
| Nome da Vacina | Nome da vacina |
| Contagem | Número de vezes administrada |
| Percentagem | Quota do total de vacinações |
| Tendência | Sparkline mostrando a tendência de utilização durante o período selecionado |

### Ler o Quadro de Liderança

1. As vacinas são ordenadas por contagem em ordem decrescente.
2. A coluna **Percentagem** mostra que porção de todas as vacinações esta vacina representa.
3. O **Sparkline** de Tendência dá uma visualização rápida de se a utilização está a aumentar, estável ou a diminuir.
4. Passe o cursor sobre o sparkline para ver valores de pontos de dados.

### Interagir com o Quadro de Liderança

- Clique em qualquer linha de vacina para rolar para a sua secção de decomposição detalhada.
- Utilize os cabeçalhos de coluna para reordenar (embora a ordem de classificação predefinida seja a mais útil).
- A tabela é paginada se os filtros produzirem mais de 20 resultados em configurações raras.

> **Dica:** Uma vacina com tendência ascendente pode indicar uma resposta a surto regional ou uma nova recomendação de associações veterinárias.

---

## Visualização de Pódio

O pódio destaca as 3 principais vacinas numa apresentação visual estilo prémio.

### Layout

```
        [1.o]
   [2.o]     [3.o]
```

- **1.o Lugar (centro, mais alto):** Cartão dourado com a vacina mais administrada.
- **2.o Lugar (esquerda):** Cartão prateado com a segunda vacina mais administrada.
- **3.o Lugar (direita):** Cartão bronze com a terceira vacina mais administrada.

### Conteúdo dos Cartões

Cada cartão do pódio apresenta:

- Ícone de medalha de classificação (ouro, prata, bronze)
- Nome da vacina
- Contagem total de administrações
- Percentagem de todas as vacinações
- Espécie principal (espécie mais comum que recebe esta vacina)

### Ler o Pódio

O pódio fornece um resumo rápido dos padrões de vacinação da plataforma. Resultados comuns incluem:

- **Cães:** Raiva, DHPP (Esgana/Parvovirose), Bordetella frequentemente dominam.
- **Gatos:** FVRCP, Raiva, FeLV são as vacinas típicas de topo.
- **Plataformas mistas:** A Raiva frequentemente lidera em todas as espécies.

> **Dica:** Se o pódio mostrar resultados inesperados após aplicar filtros, verifique se o filtro de período de tempo ou localização está a produzir um tamanho de amostra pequeno que pode distorcer os rankings.

---

## Decomposição por Espécie Por Vacina

Abaixo do quadro de liderança, cada vacina no top 20 tem uma secção expansível mostrando a distribuição por espécie.

### Ver a Decomposição

1. Clique na seta de expansão junto a qualquer vacina no quadro de liderança.
2. Um gráfico de barras empilhadas horizontal aparece mostrando a distribuição por espécie.
3. Cada segmento é codificado por cores por espécie:
   - Cães: Azul
   - Gatos: Laranja
   - Aves: Verde
   - Coelhos: Roxo
   - Outro: Cinza

### Tabela de Decomposição

Junto ao gráfico de barras, uma pequena tabela mostra:

| Espécie | Contagem | Percentagem |
|---------|-------|------------|
| Cão | 1.234 | 62% |
| Gato | 456 | 23% |
| Ave | 200 | 10% |
| Coelho | 80 | 4% |
| Outro | 20 | 1% |

### Casos de Uso

- Identificar vacinas que são específicas de espécie vs. multi-espécie.
- Detetar padrões invulgares (ex.: uma vacina específica de cães a aparecer em registos de gatos pode indicar erros de introdução de dados).
- Compreender a composição de espécies da sua plataforma através dos dados de vacinação.

> **Dica:** Vacinas específicas de espécie a aparecer sob a espécie errada frequentemente indicam problemas de qualidade de dados que devem ser investigados.

---

## Principais Localizações Por Vacina

Cada vacina também mostra uma decomposição geográfica de onde é mais frequentemente administrada.

### Ver Dados de Localização

1. Clique na seta de expansão junto a qualquer vacina no quadro de liderança.
2. Mude para o separador **Localizações** dentro da secção expandida.
3. Uma lista classificada das 10 principais localizações aparece.

### Tabela de Localização

| Classificação | País | Cidade | Contagem | Percentagem |
|------|---------|------|-------|------------|
| 1 | Alemanha | Berlim | 543 | 18% |
| 2 | Reino Unido | Londres | 421 | 14% |
| 3 | França | Paris | 389 | 13% |
| ... | ... | ... | ... | ... |

### Vista de Mapa

Se disponível, um mini mapa de calor mostra a concentração de vacinações geograficamente:

- Regiões mais escuras indicam contagens de vacinação mais elevadas.
- Passe o cursor sobre uma região para ver a contagem exata.
- Clique numa região para a aplicar como filtro de localização.

### Casos de Uso

- Identificar preferências ou requisitos regionais de vacinação.
- Detetar clusters que podem corresponder a recomendações veterinárias locais.
- Planear campanhas de divulgação ou parcerias regionais.

> **Dica:** Algumas vacinas são legalmente obrigatórias em países específicos (ex.: raiva na Alemanha). Concentrações elevadas em certas regiões são esperadas para vacinas obrigatórias.

---

## Exportar Dados

Para exportar dados de analytics de vacinação:

1. Clique no botão **Exportar** no canto superior direito da página.
2. Escolha o formato de exportação:
   - **CSV** -- Dados em bruto para análise em folha de cálculo
   - **PDF** -- Relatório formatado com gráficos
3. A exportação respeita todos os filtros atualmente ativos.
4. O ficheiro é descarregado para a localização de download predefinida do seu navegador.

### Conteúdo da Exportação

A exportação CSV inclui:

- Nome da vacina
- Contagem total
- Contagens de decomposição por espécie
- Principais países e cidades
- Pontos de dados de tendência
- Parâmetros de filtro utilizados

> **Dica:** Utilize exportações CSV para criar visualizações personalizadas em ferramentas como Excel ou Google Sheets, ou para partilhar dados com parceiros de consultoria veterinária.

---

## Atualização do Dashboard

Os dados de analytics são computados a partir dos registos de vacinação e armazenados em cache para desempenho.

- Os dados atualizam-se automaticamente a cada 24 horas.
- O timestamp da última atualização é mostrado no fundo da página.
- Clique no ícone de **Atualizar** junto ao timestamp para acionar uma atualização manual.
- A atualização manual pode demorar 10-30 segundos dependendo do volume de dados.

> **Dica:** Se notar discrepâncias entre o dashboard de analytics e registos individuais de animais, tente uma atualização manual. Vacinações adicionadas recentemente podem não aparecer até à próxima atualização de cache.

---

## Perguntas Frequentes

**P: Porque é que o total no quadro de liderança não corresponde ao total das Estatísticas Resumidas?**
R: O quadro de liderança mostra as 20 principais vacinas. Se existirem mais de 20 vacinas únicas, as restantes não são listadas mas ainda contam para o total.

**P: Posso ver dados para um criador ou proprietário específico?**
R: Não. A página de analytics mostra dados agregados da plataforma. Registos de vacinação individuais estão disponíveis no perfil de cada animal.

**P: Porque é que algumas vacinas mostram dados de tendência zero?**
R: Vacinas novas que foram registadas apenas uma vez podem não ter pontos de dados suficientes para gerar uma linha de tendência significativa.

**P: Até quando vão os dados históricos?**
R: O filtro "Todo o período" inclui todos os registos de vacinação desde o lançamento da plataforma. Não há limite de retenção de dados para analytics.

**P: Posso comparar dois períodos de tempo?**
R: Não diretamente no dashboard. Exporte dados para dois períodos diferentes e compare-os numa folha de cálculo.
