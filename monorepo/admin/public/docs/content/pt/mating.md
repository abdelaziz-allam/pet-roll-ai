# Mercado de Criação

O módulo Mercado de Criação fornece aos administradores supervisão do sistema de matchmaking de criação de animais da plataforma. Monitorize pedidos de correspondência, acompanhe emparelhamentos bem-sucedidos e veja rankings de desempenho dos criadores.

![Mating Management](/docs/screenshots/mating.png)

---

## Separadores de Navegação

A página do Mercado de Criação está organizada em dois separadores principais:

| Separador | Descrição |
|-----|-------------|
| Correspondências e Pedidos | Ver e gerir todas as correspondências de criação e pedidos pendentes |
| Rankings de Criadores | Quadros de liderança mostrando os criadores com melhor desempenho |

Alterne entre separadores clicando no cabeçalho do separador no topo da página.

---

## Separador de Correspondências e Pedidos

Este separador apresenta todas as correspondências de criação como cartões visuais, fornecendo uma visão geral intuitiva da atividade de criação na plataforma.

### Cartões de Correspondência

Cada correspondência é representada como um cartão mostrando dois animais ligados por um conector visual de coração.

#### Layout do Cartão

```
+------------------------------------------+
|  [Foto Animal A]  <3  [Foto Animal B]   |
|  Nome Animal A         Nome Animal B     |
|  Raça                  Raça              |
|  Proprietário          Proprietário      |
|                                          |
|  Estado: [Badge]     Listado: [Data]     |
|  Espécie: [Tag]      Local: [Cidade]     |
+------------------------------------------+
```

#### Informação do Cartão

| Elemento | Descrição |
|---------|-------------|
| Fotos dos Animais | Fotos de perfil de ambos os animais na correspondência |
| Conector de Coração | Ligação visual entre os dois animais (animado para correspondências ativas) |
| Nomes dos Animais | Nomes de ambos os animais |
| Raças | Informação de raça para cada animal |
| Proprietários | Nomes dos proprietários (clicáveis para ver perfis) |
| Badge de Estado | Estado atual da correspondência |
| Data de Listagem | Quando o pedido de correspondência foi criado |
| Tag de Espécie | Espécie dos animais |
| Localização | Cidade/país da listagem |

### Estados das Correspondências

| Estado | Cor do Badge | Descrição |
|--------|-------------|-------------|
| Pendente | Laranja | Pedido de correspondência enviado, a aguardar resposta |
| Aceite | Verde | Ambas as partes concordaram com a correspondência |
| Recusado | Vermelho | Uma das partes recusou a correspondência |
| Concluído | Azul | Criação confirmada como concluída |
| Cancelado | Cinza | Correspondência cancelada por uma das partes |
| Expirado | Cinza Claro | Pedido expirou sem resposta |

---

## Filtros

A barra de filtros permite restringir as correspondências apresentadas.

### Filtro de Estado

Selecione um ou mais estados para apresentar:

1. Clique no dropdown **Estado**.
2. Marque os estados que pretende ver.
3. A grelha de cartões atualiza-se imediatamente.

### Filtro de Espécie

Filtre correspondências por espécie do animal:

- Todas as Espécies (predefinição)
- Cão
- Gato
- Ave
- Coelho
- Outro

### Filtro de País

Selecione um ou mais países para filtrar pela localização da correspondência.

### Filtro de Cidade

Restrinja ainda mais selecionando cidades específicas.

> **Dica:** Utilize Estado: Aceite + o seu país para ver correspondências bem-sucedidas na sua região que possam necessitar da ação "Enviar Cartão de Casamento".

---

## Painel de Detalhes

Clique em qualquer cartão de correspondência para abrir o painel de detalhes no lado direito do ecrã.

### Secção de Fotos dos Animais

No topo do painel, versões maiores das fotos de ambos os animais são apresentadas lado a lado com o conector de coração entre elas.

- Clique em qualquer foto para ver em tamanho completo.
- Deslize por fotos adicionais se o animal tiver uma galeria.

### Informação da Listagem

| Campo | Descrição |
|-------|-------------|
| ID da Listagem | Identificador único para a listagem de correspondência |
| Criado Por | Qual proprietário de animal iniciou a listagem |
| Data de Criação | Data em que a listagem foi publicada pela primeira vez |
| Data de Correspondência | Data em que a correspondência foi proposta |
| Data de Resposta | Data em que a correspondência foi aceite/recusada (se aplicável) |
| Espécie | Espécie de ambos os animais |
| Raças | Informação detalhada de raça |
| Localização | Detalhes completos de localização |
| Notas | Quaisquer notas do proprietário da listagem |

### Cronologia da Correspondência

O painel inclui uma cronologia de eventos:

1. **Listagem Criada** -- Proprietário publicou a listagem de criação do seu animal
2. **Correspondência Proposta** -- O algoritmo de correspondência ou pedido manual iniciou a correspondência
3. **Correspondência Visualizada** -- A outra parte visualizou a proposta de correspondência
4. **Resposta Dada** -- Aceitação/recusa com timestamp
5. **Conclusão Registada** -- Se a criação foi confirmada como concluída
6. **Cartão de Casamento Enviado** -- Se o admin enviou uma notificação comemorativa

Cada evento da cronologia mostra:

- Data e hora
- Ator (sistema, proprietário A, proprietário B ou admin)
- Descrição do evento
- Notas adicionais (se houver)

> **Dica:** A cronologia ajuda-o a compreender o contexto completo de uma correspondência ao investigar disputas ou problemas reportados por utilizadores.

---

## Enviar Cartão de Casamento

A ação "Enviar Cartão de Casamento" permite aos administradores enviar uma notificação comemorativa a ambos os proprietários dos animais quando uma correspondência é aceite ou concluída.

### Como Enviar um Cartão de Casamento

1. Abra o painel de detalhes para uma correspondência **Aceite** ou **Concluída**.
2. Clique no botão **Enviar Cartão de Casamento** no fundo do painel.
3. No diálogo:
   - Pré-visualize a mensagem de notificação (gerada automaticamente com os nomes de ambos os animais).
   - Opcionalmente adicione uma mensagem de felicitações personalizada.
   - Reveja os destinatários (ambos os proprietários dos animais).
4. Clique em **Enviar**.

### O Que o Cartão de Casamento Inclui

- Cabeçalho de felicitações com os nomes de ambos os animais
- Fotos dos animais dispostas com elementos decorativos
- Data e local da correspondência
- Mensagem personalizada do admin (se fornecida)
- Link para a página de detalhes da correspondência

### Quando Enviar

- Após uma correspondência ser aceite e ambas as partes confirmarem que estão a prosseguir.
- Após uma correspondência ser marcada como concluída.
- Apenas uma vez por correspondência (o botão é desativado após envio).

> **Dica:** Os cartões de casamento são uma ferramenta de envolvimento comunitário. Enviá-los para correspondências aceites encoraja a participação na plataforma e cria uma experiência positiva para os criadores.

---

## Separador de Rankings de Criadores

O separador de Rankings de Criadores apresenta os criadores mais ativos e bem-sucedidos na plataforma.

### Pódio Geral Top 10

No topo do separador de Rankings, uma visualização de pódio destaca os 10 melhores criadores em todas as espécies.

#### Layout do Pódio

```
              [1.o]
        [2.o]       [3.o]
   [4.o]  [5.o]  [6.o]  [7.o]
      [8.o]   [9.o]   [10.o]
```

Cada posição do pódio mostra:

- Nome do criador
- Nome do canil
- Foto de perfil
- Contagem total de correspondências
- Percentagem de taxa de sucesso

#### Pontuação do Pódio

Os criadores são classificados por uma pontuação composta baseada em:

| Fator | Peso | Descrição |
|--------|--------|-------------|
| Total de Correspondências | 30% | Número de correspondências iniciadas ou recebidas |
| Taxa de Sucesso | 40% | Percentagem de correspondências que atingiram Aceite/Concluído |
| Listagens Ativas | 15% | Número de listagens de criação atualmente ativas |
| Tempo de Resposta | 15% | Tempo médio para responder a propostas de correspondência |

### Grelha Top 10 Por Espécie

Abaixo do pódio geral, uma grelha apresenta os 10 melhores criadores para cada espécie separadamente.

#### Layout da Grelha

Cada espécie tem o seu próprio cartão:

```
+-------------------+  +-------------------+  +-------------------+
|   Cães Top 10     |  |   Gatos Top 10    |  |   Aves Top 10     |
| 1. Nome Criador   |  | 1. Nome Criador   |  | 1. Nome Criador   |
| 2. Nome Criador   |  | 2. Nome Criador   |  | 2. Nome Criador   |
| ...               |  | ...               |  | ...               |
+-------------------+  +-------------------+  +-------------------+
```

Cada entrada na grelha por espécie mostra:

- Número de classificação
- Nome do criador
- Nome do canil
- Contagem de correspondências para aquela espécie
- Taxa de sucesso para aquela espécie

> **Dica:** Os rankings por espécie ajudam a identificar criadores especialistas que podem ser excelentes candidatos para parcerias com a plataforma ou listagens em destaque.

---

## Tabela de Rankings Ordenável

Abaixo dos rankings visuais, uma tabela de dados completa fornece estatísticas detalhadas dos criadores.

### Colunas da Tabela

| Coluna | Ordenável | Descrição |
|--------|----------|-------------|
| Classificação | Sim | Posição atual baseada na pontuação predefinida |
| Nome do Criador | Sim | Nome completo do criador |
| Canil | Sim | Nome do canil |
| Correspondências | Sim | Número total de correspondências (iniciadas + recebidas) |
| Listagens | Sim | Número de listagens de criação criadas |
| Taxa de Sucesso | Sim | Percentagem de correspondências que atingiram estado Aceite/Concluído |
| Visualizações | Sim | Total de visualizações nas suas listagens de criação |
| Espécie | Não | Espécie principal que criam |
| Localização | Não | País e cidade |

### Ordenar a Tabela

1. Clique em qualquer cabeçalho de coluna ordenável para ordenar ascendente.
2. Clique novamente para ordenar descendente.
3. Um terceiro clique remove a ordenação nessa coluna.
4. Pode ordenar por múltiplas colunas (mantenha Shift pressionado e clique).

### Interações com a Tabela

- Clique numa linha de criador para ver o seu perfil completo e histórico de correspondências.
- Utilize a barra de pesquisa acima da tabela para encontrar um criador específico.
- Exporte os dados da tabela usando o botão **Exportar CSV**.

> **Dica:** Ordene por Taxa de Sucesso descendente para identificar criadores que produzem consistentemente correspondências bem-sucedidas. Estes criadores podem beneficiar de funcionalidades premium ou aceleração de verificação.

---

## Compreender as Métricas de Correspondência

### Cálculo da Taxa de Sucesso

```
Taxa de Sucesso = (Correspondências Aceites + Concluídas) / Total de correspondências x 100
```

- Apenas correspondências onde o criador era o proprietário da listagem contam para a sua taxa de sucesso.
- Correspondências recusadas e expiradas reduzem a taxa de sucesso.
- Correspondências canceladas são excluídas do cálculo.

### Métrica de Visualizações

A contagem de Visualizações representa:

- Total de visualizações únicas em todas as listagens de criação ativas de um criador.
- Não conta as visualizações do próprio criador.
- Reinicia por listagem (não cumulativo entre listagens eliminadas).

### Pontuação de Atividade

A classificação geral considera a recência:

- Correspondências dos últimos 90 dias têm peso 2x.
- Correspondências de 90-180 dias têm peso 1x.
- Correspondências com mais de 180 dias têm peso 0.5x.

> **Dica:** Um criador com muitas visualizações mas baixa taxa de sucesso pode ter listagens atrativas mas ser demasiado seletivo ou lento a responder. Considere contactá-lo para compreender a sua experiência.

---

## Perguntas Frequentes

**P: Posso criar manualmente uma correspondência entre dois animais?**
R: Não. As correspondências são criadas pelos proprietários dos animais através da app. Os administradores apenas podem monitorizar e tomar ações em correspondências existentes.

**P: O que acontece aos dados de correspondência quando um animal é eliminado?**
R: O registo de correspondência é retido para fins históricos mas marcado com um indicador "Animal Removido". A correspondência não pode progredir mais.

**P: Posso remover um criador dos rankings?**
R: Os rankings são calculados automaticamente. Para remover um criador, a sua conta deve ser suspensa ou a sua verificação revogada, o que os exclui dos rankings.

**P: Com que frequência são atualizados os rankings?**
R: Os rankings recalculam-se a cada 24 horas. O timestamp da última atualização é mostrado no topo do separador de Rankings.

**P: Posso enviar um Cartão de Casamento para uma correspondência recusada?**
R: Não. O botão Enviar Cartão de Casamento está apenas disponível para correspondências com estado Aceite ou Concluído.

**P: E se ambos os animais numa correspondência forem do mesmo proprietário?**
R: O sistema previne correspondências do mesmo proprietário. Se vir uma, indica um problema de integridade de dados que deve ser reportado à equipa de desenvolvimento.
