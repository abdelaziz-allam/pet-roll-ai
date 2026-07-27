# Certificações de Saúde

O módulo de Certificações de Saúde permite aos administradores gerir e verificar certificados de saúde de animais submetidos por veterinários ou proprietários de animais. Isto assegura que os animais listados na plataforma têm documentação de saúde válida e atualizada.

![Health Records](/docs/screenshots/health-certifications.png)

---

## Tabela de Certificações

A vista principal apresenta todas as submissões de certificação de saúde numa tabela de dados.

| Coluna | Descrição |
|--------|-------------|
| Nome do Animal | Nome do animal a que a certificação pertence |
| Info do Veterinário | Nome do veterinário e clínica |
| Localização | País e cidade onde a certificação foi emitida |
| Data do Certificado | Data em que a certificação foi emitida pelo veterinário |
| Documentos | Número de documentos de certificação anexados |
| Estado | Badge de estado atual da certificação |

### Ações da Tabela

- Clique em qualquer linha para abrir o **Painel de Detalhes** no lado direito.
- Utilize os botões de ação na última coluna para aprovar/rejeitar rapidamente.
- Ordene por qualquer coluna clicando no cabeçalho da coluna.

---

## Filtros

A barra de filtros acima da tabela fornece quatro opções de filtro:

### Filtro de Estado

Filtre certificações pelo seu estado atual:

| Estado | Cor do Badge | Descrição |
|--------|-------------|-------------|
| Pendente | Laranja | A aguardar revisão do administrador |
| Aprovado | Verde | Certificação verificada e ativa |
| Rejeitado | Vermelho | Certificação não passou na revisão |
| Revogado | Vermelho Escuro | Certificação previamente aprovada invalidada |
| Expirado | Cinza | Período de validade da certificação terminou |

### Filtro de Espécie

Filtre por espécie do animal:

- Cão
- Gato
- Ave
- Coelho
- Outro

### Filtro de País

Selecione um ou mais países para filtrar pela localização onde a certificação foi emitida.

### Filtro de Cidade

Restrinja ainda mais selecionando cidades específicas dentro do país escolhido.

> **Dica:** Os filtros são combináveis. Por exemplo, filtre por Estado: Pendente + Espécie: Cão + País: Alemanha para ver todas as certificações de cães pendentes da Alemanha.

---

## Painel de Detalhes

Clicar numa linha de certificação abre um painel de detalhes no lado direito do ecrã. O painel contém informações abrangentes organizadas em secções.

### Banner de Estado

No topo do painel, um banner colorido apresenta:

- Estado atual com ícone de badge
- Data da última alteração de estado
- Nome do administrador que realizou a última ação na certificação (se aplicável)
- Motivo de rejeição ou revogação (se aplicável, apresentado num alerta de aviso)

### Secção de Informação do Animal

| Campo | Descrição |
|-------|-------------|
| Nome do Animal | Nome registado do animal |
| Espécie | Espécie do animal |
| Raça | Raça do animal |
| Data de Nascimento | Data de nascimento do animal |
| ID de Microchip | Identificador único de microchip (se disponível) |
| Proprietário | Nome do proprietário do animal com link para o seu perfil |

### Secção de Detalhes Veterinários

| Campo | Descrição |
|-------|-------------|
| Nome do Veterinário | Nome completo do veterinário emissor |
| Nome da Clínica | Nome da clínica veterinária |
| Morada da Clínica | Morada completa da clínica |
| Número de Licença | Número de licença profissional do veterinário |
| Telefone | Número de telefone de contacto da clínica |
| Email | Email de contacto da clínica (se fornecido) |

> **Dica:** Verifique o número de licença contra a base de dados de licenciamento veterinário do seu país ao rever certificações de clínicas desconhecidas.

### Barra de Progresso de Validade

Abaixo dos detalhes veterinários, uma barra de progresso visualiza o período de validade da certificação:

1. A barra estende-se da **Data do Certificado** (início) até à **Data de Expiração** (fim).
2. A data atual é indicada por um marcador na barra.
3. Codificação por cores:
   - **Verde:** Mais de 30 dias restantes
   - **Amarelo:** 30 dias ou menos restantes
   - **Vermelho:** Expirado
4. A percentagem de validade consumida é apresentada como texto.

### Grelha de Documentos

A secção de documentos apresenta os ficheiros de certificação carregados num layout de grelha.

1. Cada documento aparece como um cartão miniatura com o nome do ficheiro abaixo.
2. Clique em qualquer miniatura para abrir a sobreposição de **Pré-visualização de Imagem**.
3. Na sobreposição de pré-visualização:
   - Utilize os controlos de zoom para inspecionar detalhes.
   - Navegue entre documentos com as setas esquerda/direita.
   - Descarregue o ficheiro original usando o botão de download.
   - Prima **Escape** para fechar a pré-visualização.
4. Formatos suportados: JPEG, PNG, PDF.

> **Dica:** Procure carimbos veterinários oficiais, assinaturas e números de licença nos documentos de certificação. Documentos genéricos ou de modelo sem estes elementos devem ser sinalizados para rejeição.

---

## Aprovar uma Certificação

Para aprovar uma certificação de saúde:

1. Abra o painel de detalhes da certificação clicando na linha.
2. Reveja os detalhes veterinários para completude e plausibilidade.
3. Inspecione todos os documentos carregados na grelha de documentos.
4. Clique no botão **Aprovar** no fundo do painel.
5. No diálogo de confirmação:
   - Reveja o resumo do que está a aprovar.
   - A data de expiração é calculada automaticamente com base no tipo de certificação.
   - Clique em **Confirmar**.

### Lista de Verificação de Aprovação

Antes de aprovar, verifique:

- [ ] Nome do veterinário e número de licença estão presentes
- [ ] Detalhes da clínica estão completos e verificáveis
- [ ] Documentos são legíveis e contêm carimbos/assinaturas oficiais
- [ ] Data de certificação é recente (nos últimos 12 meses)
- [ ] Informação do animal no documento corresponde ao registo na plataforma
- [ ] Sem sinais de adulteração ou falsificação de documentos

### O Que Acontece Após a Aprovação

- O estado da certificação muda para **Aprovado**.
- Um período de validade é definido com base no tipo de certificação.
- O perfil do animal apresenta um badge de certificação de saúde.
- O proprietário recebe uma notificação confirmando a aprovação.
- A barra de progresso de validade torna-se ativa no painel de detalhes.

---

## Rejeitar uma Certificação

Para rejeitar uma certificação de saúde:

1. Abra o painel de detalhes da certificação.
2. Identifique o(s) problema(s) com a submissão.
3. Clique no botão **Rejeitar** no fundo do painel.
4. No diálogo de rejeição:
   - Introduza um **Motivo de Rejeição** na área de texto. Este campo é obrigatório.
   - Seja específico sobre o que precisa de ser corrigido.
5. Clique em **Confirmar Rejeição**.

### Motivos Comuns de Rejeição

| Motivo | Mensagem de Exemplo |
|--------|----------------|
| Documentos ilegíveis | "O documento carregado está demasiado desfocado para ler. Por favor carregue uma digitalização ou foto mais clara." |
| Falta de detalhes do veterinário | "O certificado não inclui o número de licença do veterinário. Por favor resubmeta com credenciais completas do veterinário." |
| Certificação expirada | "Esta certificação foi emitida há mais de 12 meses. Por favor obtenha e carregue um certificado atual." |
| Informação do animal não corresponde | "O nome do animal no certificado não corresponde ao nome registado do animal. Por favor verifique e resubmeta." |
| Documentos incompletos | "Apenas a página 1 de 3 foi carregada. Por favor carregue todas as páginas da certificação." |

### O Que Acontece Após a Rejeição

- O estado da certificação muda para **Rejeitado**.
- O motivo da rejeição é apresentado ao proprietário do animal.
- O proprietário recebe uma notificação com o motivo.
- O proprietário pode submeter uma nova certificação para substituir a rejeitada.

> **Dica:** Forneça sempre feedback acionável. Diga ao proprietário exatamente o que corrigir para que possa resolver o problema numa única resubmissão.

---

## Revogar uma Certificação

A revogação é utilizada quando uma certificação previamente aprovada é considerada inválida, fraudulenta ou já não aplicável.

1. Navegue até à certificação (filtre por Estado: Aprovado se necessário).
2. Abra o painel de detalhes.
3. Clique no botão **Revogar** (apenas visível para certificações Aprovadas).
4. No diálogo de revogação:
   - Introduza o **Motivo da Revogação**. Este campo é obrigatório.
   - Reconheça que esta ação é imediata e não pode ser revertida.
5. Clique em **Confirmar Revogação**.

### Quando Revogar

- Documentação fraudulenta descoberta após aprovação
- Licença veterinária considerada inválida ou revogada
- Proprietário do animal reporta que a certificação foi submetida por erro
- Autoridade reguladora sinaliza a certificação

### O Que Acontece Após a Revogação

- O badge de certificação de saúde é imediatamente removido do perfil do animal.
- O estado da certificação muda para **Revogado**.
- O motivo da revogação é armazenado e visível no painel de detalhes.
- O proprietário é notificado via email e notificação na app.
- O proprietário deve submeter uma nova certificação se desejar restaurar o badge.

> **Dica:** A revogação é uma ação séria que afeta os sinais de confiança do animal na plataforma. Assegure-se de que tem evidências suficientes antes de prosseguir.

---

## Compreender Validade e Expiração

As certificações de saúde têm um período de validade definido que determina quanto tempo a certificação permanece ativa após aprovação.

### Como Funciona a Validade

1. Quando uma certificação é aprovada, o sistema calcula uma data de expiração.
2. O período de validade depende do tipo de certificação:
   - Certificado de saúde geral: 12 meses
   - Certificado de vacinação: Varia conforme o calendário vacinal
   - Certificado de aptidão para criação: 6 meses
3. A **Barra de Progresso de Validade** no painel de detalhes mostra o tempo restante visualmente.

### Notificações de Expiração

O sistema envia notificações automáticas à medida que a expiração se aproxima:

| Dias Antes da Expiração | Notificação |
|-------------------|--------------|
| 30 dias | Primeiro lembrete ao proprietário para renovar |
| 14 dias | Segundo lembrete com urgência |
| 7 dias | Aviso final |
| 0 dias | Notificação de certificação expirada |

### Após a Expiração

- O estado da certificação muda automaticamente para **Expirado**.
- O badge de saúde é removido do perfil do animal.
- A certificação expirada permanece no histórico para referência.
- O proprietário pode submeter uma nova certificação a qualquer momento.

> **Dica:** Monitorize a tabela de certificações filtrada por "Aprovado" e ordenada por data de expiração para identificar proativamente certificações a aproximar-se da expiração na sua região.

---

## Ações em Massa

Para processamento eficiente de múltiplas certificações:

1. Utilize as caixas de seleção no lado esquerdo da tabela para selecionar múltiplas linhas.
2. A barra de ação em massa aparece no topo da tabela.
3. Ações em massa disponíveis:
   - **Aprovar Tudo** -- Aprova todas as certificações pendentes selecionadas com expiração predefinida.
   - **Exportar** -- Descarrega as certificações selecionadas como relatório CSV.

> **Dica:** A aprovação em massa só deve ser utilizada quando verificou individualmente os documentos de cada certificação selecionada. Nunca aprove em massa sem rever os documentos.

---

## Perguntas Frequentes

**P: Posso editar a data de expiração de uma certificação aprovada?**
R: Não. Para alterar a expiração, deve revogar a certificação atual e pedir ao proprietário para resubmeter.

**P: E se um documento de certificação estiver num idioma que não consigo ler?**
R: Escale para um administrador que leia esse idioma, ou solicite ao proprietário que forneça uma tradução certificada.

**P: Um animal pode ter múltiplas certificações ativas?**
R: Sim. Um animal pode ter tanto um certificado de saúde geral como certificados de vacinação específicos ativos simultaneamente.

**P: Quem recebe as notificações de rejeição/revogação?**
R: O proprietário registado do animal recebe todas as notificações via email e mensagem na app.
