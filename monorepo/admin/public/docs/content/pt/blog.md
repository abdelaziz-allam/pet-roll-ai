# Blog CMS

O módulo Blog CMS permite aos administradores criar, editar, publicar e gerir artigos de blog apresentados no site público do Petfolioo. Utilize esta ferramenta para partilhar dicas de cuidados com animais, notícias da plataforma, destaques de criadores e conteúdo educativo com a sua comunidade.

![Blog CMS](/docs/screenshots/blog.png)

---

## Tabela de Artigos do Blog

A vista principal apresenta todos os artigos do blog numa tabela pesquisável e ordenável.

| Coluna | Descrição |
|--------|-------------|
| Título | Título do artigo com link clicável para editar |
| Estado | Badge de estado de publicação |
| Autor | Nome do administrador que criou o artigo |
| Visualizações | Total de visualizações de página desde a publicação |
| Data | Data de criação (ou data de publicação se publicado) |

### Badges de Estado

| Estado | Cor do Badge | Descrição |
|--------|-------------|-------------|
| Rascunho | Cinza | Artigo guardado mas não visível ao público |
| Publicado | Verde | Artigo ativo e visível no site |
| Destaque | Dourado | Artigo publicado e fixado no topo |

### Ações da Tabela

- Clique num título de artigo para o abrir para edição.
- Utilize o menu de ações (três pontos) em cada linha para ações rápidas: Publicar, Despublicar, Fixar, Desafixar, Eliminar.
- Ordene por qualquer coluna clicando no cabeçalho da coluna.
- Utilize a barra de pesquisa para filtrar artigos por título ou palavras-chave do conteúdo.

> **Dica:** Ordene por Visualizações decrescente para identificar o seu conteúdo mais popular. Utilize estas informações para planear artigos futuros sobre tópicos semelhantes.

---

## Criar um Artigo

Para criar um novo artigo de blog:

1. Clique no botão **Criar Artigo** no canto superior direito da tabela de Artigos do Blog.
2. O editor de artigos abre com os seguintes campos.

### Título

- Introduza o título do artigo no campo de título no topo.
- Máximo de 200 caracteres.
- O título aparece como o cabeçalho principal na página publicada.
- Escolha títulos descritivos e cativantes que incluam palavras-chave relevantes.

### Slug

- O slug do URL é gerado automaticamente a partir do título.
- Formato: minúsculas, hífens substituem espaços, caracteres especiais removidos.
- Exemplo: "10 Dicas para Novos Donos de Cachorros" torna-se `10-dicas-para-novos-donos-de-cachorros`.
- Pode editar manualmente o slug se a versão gerada automaticamente for demasiado longa ou pouco clara.
- O slug deve ser único em todos os artigos.

> **Dica:** Mantenha os slugs curtos e ricos em palavras-chave para melhor SEO. Encurte manualmente slugs gerados automaticamente que excedam 5-6 palavras.

### Conteúdo HTML

- A área de conteúdo principal aceita HTML para formatação rica.
- Utilize a barra de ferramentas do editor de texto rico para formatação comum:
  - Negrito, itálico, sublinhado
  - Cabeçalhos (H2, H3, H4)
  - Listas ordenadas e não ordenadas
  - Links
  - Imagens (inline)
  - Citações em bloco
  - Blocos de código
- Mude para **Modo Fonte** para editar HTML em bruto diretamente.
- O conteúdo suporta todas as tags HTML padrão.

#### Boas Práticas de Conteúdo

| Fazer | Não Fazer |
|----|--------|
| Usar H2 para secções principais, H3 para subsecções | Usar H1 (reservado para o título) |
| Incluir imagens para quebrar texto longo | Publicar paredes de texto não formatado |
| Manter parágrafos curtos (3-4 frases) | Escrever parágrafos com mais de 5 frases |
| Usar listas para múltiplos itens relacionados | Incorporar scripts externos ou iframes |
| Adicionar texto alternativo a todas as imagens | Usar estilos inline para cores |

### Resumo

- Escreva um breve resumo do artigo (máximo 500 caracteres).
- O resumo aparece nas páginas de listagem do blog, resultados de pesquisa e pré-visualizações de redes sociais.
- Se deixado em branco, os primeiros 500 caracteres do conteúdo são utilizados automaticamente.
- O contador de caracteres mostra os caracteres restantes enquanto escreve.

> **Dica:** Escreva o resumo como um teaser convincente que faça os leitores querer clicar. Deve funcionar como um pensamento completo autónomo, sem terminar a meio de uma frase.

### Upload de Imagem de Capa

1. Clique na área **Carregar Imagem de Capa** ou arraste e solte um ficheiro de imagem.
2. Formatos suportados: JPEG, PNG, WebP.
3. Dimensões recomendadas: 1200 x 630 pixels (otimizado para partilha em redes sociais).
4. Tamanho máximo do ficheiro: 5 MB.
5. Após o upload, uma pré-visualização da imagem aparece.
6. Clique em **Remover** para eliminar a imagem de capa atual e carregar uma diferente.

#### Diretrizes para Imagem de Capa

- Utilize imagens de alta qualidade e relevantes que representem o conteúdo do artigo.
- Evite sobreposições de texto nas imagens de capa (podem ser cortadas em diferentes dispositivos).
- Assegure-se de que tem direitos para usar a imagem (fotos originais ou stock devidamente licenciado).
- As imagens são automaticamente otimizadas para entrega web após o upload.

### Tags

- Introduza tags como valores separados por vírgulas no campo de tags.
- Exemplo: `cuidados com cachorros, treino, nutrição, novos donos`
- As tags ajudam a categorizar artigos e melhoram a descoberta.
- Tags existentes são sugeridas automaticamente enquanto escreve.
- Não há limite no número de tags, mas 3-7 tags por artigo é recomendado.

> **Dica:** Utilize nomes de tags consistentes entre artigos. Verifique as tags existentes antes de criar novas variações (ex.: use "cuidados com cachorros" consistentemente em vez de alternar com "cuidados-com-cachorros" ou "Cuidados com Cachorros").

### Definições de SEO

A secção de SEO permite-lhe otimizar como o artigo aparece nos motores de pesquisa.

#### Meta Title

- Máximo de 60 caracteres.
- Aparece como o título clicável nos resultados de pesquisa.
- Se deixado em branco, o título do artigo é utilizado.
- O contador de caracteres fica vermelho ao aproximar-se ou exceder 60 caracteres.
- Boa prática: Incluir a palavra-chave principal perto do início.

#### Meta Description

- Máximo de 160 caracteres.
- Aparece como o trecho de descrição abaixo do título nos resultados de pesquisa.
- Se deixado em branco, o resumo é utilizado.
- O contador de caracteres fica vermelho ao aproximar-se ou exceder 160 caracteres.
- Boa prática: Incluir um apelo à ação e a palavra-chave principal.

#### Pré-visualização de SEO

Abaixo dos campos meta, uma pré-visualização mostra como o artigo aparecerá nos resultados de pesquisa do Google:

```
+--------------------------------------------------+
| Meta Title (ou Título do Artigo se em branco)    |
| https://petfolioo.com/blog/o-seu-slug-aqui       |
| Meta Description (ou Resumo se em branco)        |
| aparece aqui como nos resultados de pesquisa...  |
+--------------------------------------------------+
```

> **Dica:** Preencha sempre o meta title e meta description manualmente. Os valores gerados automaticamente a partir do título e resumo podem não estar otimizados para intenção de pesquisa.

### Guardar como Rascunho

1. Após preencher os campos desejados, clique em **Guardar Rascunho**.
2. O artigo é guardado com estado de Rascunho.
3. Pode regressar para o editar a qualquer momento a partir da tabela de Artigos do Blog.
4. Os rascunhos não são visíveis ao público.

---

## Publicar um Artigo

Para publicar um artigo em rascunho e torná-lo visível no site:

1. Abra o artigo a partir da tabela de Artigos do Blog.
2. Reveja todo o conteúdo, imagens e definições de SEO.
3. Clique no botão **Publicar** no canto superior direito.
4. No diálogo de confirmação:
   - Reveja o título e slug do artigo.
   - Confirme a publicação.
5. Clique em **Confirmar Publicação**.

### O Que Acontece Após a Publicação

- O estado do artigo muda para **Publicado**.
- O artigo torna-se imediatamente visível na página pública do blog.
- A data de publicação é registada (utilizada para ordenação no blog).
- O URL do artigo torna-se ativo: `https://petfolioo.com/blog/[slug]`.
- Os motores de pesquisa podem agora indexar o artigo.

### Lista de Verificação de Publicação

Antes de publicar, verifique:

- [ ] O título é claro, cativante e sem erros ortográficos
- [ ] O conteúdo está completo e devidamente formatado
- [ ] Todas as imagens carregam corretamente
- [ ] Os links funcionam e abrem nos separadores apropriados
- [ ] A imagem de capa foi carregada e tem boa aparência
- [ ] O resumo está escrito e tem menos de 500 caracteres
- [ ] As tags estão adicionadas e devidamente formatadas
- [ ] O meta title tem menos de 60 caracteres
- [ ] A meta description tem menos de 160 caracteres
- [ ] O slug está limpo e rico em palavras-chave

---

## Despublicar um Artigo

Para remover um artigo publicado do site público:

1. Encontre o artigo na tabela de Artigos do Blog.
2. Clique no menu de ações (três pontos) na linha.
3. Selecione **Despublicar**.
4. Confirme a ação no diálogo.

### O Que Acontece Após Despublicar

- O estado do artigo regressa a **Rascunho**.
- O artigo é imediatamente removido da página pública do blog.
- O URL devolve uma página 404.
- A contagem de visualizações é preservada.
- Pode republicar o artigo a qualquer momento.

> **Dica:** Despublique em vez de eliminar se quiser remover conteúdo temporariamente. Artigos despublicados retêm todos os seus dados e podem ser restaurados instantaneamente.

---

## Fixar/Desafixar como Destaque

Artigos em destaque aparecem de forma proeminente no topo da página do blog, acima das listagens cronológicas.

### Fixar um Artigo

1. Encontre um artigo publicado na tabela de Artigos do Blog.
2. Clique no menu de ações (três pontos).
3. Selecione **Fixar como Destaque**.
4. O badge de estado muda para **Destaque** (dourado).

### Desafixar um Artigo

1. Encontre o artigo em destaque na tabela.
2. Clique no menu de ações (três pontos).
3. Selecione **Desafixar**.
4. O estado reverte para **Publicado** (verde).

### Regras de Artigos em Destaque

- Apenas artigos publicados podem ser fixados.
- Múltiplos artigos podem estar em destaque simultaneamente.
- Os artigos em destaque são apresentados na ordem em que foram fixados (mais recente primeiro).
- Desafixar um artigo não o despublica; permanece publicado.

> **Dica:** Limite os artigos em destaque a 2-3 de cada vez. Demasiados artigos em destaque diluem a ênfase e empurram o conteúdo regular para baixo.

---

## Ver no Site

Para pré-visualizar como um artigo publicado aparece no site público:

1. Abra o artigo a partir da tabela de Artigos do Blog.
2. Clique no link **Ver no Site** na área superior direita (junto ao botão Publicar).
3. Um novo separador do navegador abre mostrando o artigo no site ativo.

### Notas

- O link Ver no Site está apenas disponível para artigos Publicados e em Destaque.
- Artigos em rascunho não podem ser pré-visualizados no site ativo.
- O link abre a versão ativa atual; alterações não guardadas no editor não são refletidas.

> **Dica:** Veja sempre no site após publicar para verificar que a formatação, imagens e layout aparecem corretamente no tema público.

---

## Eliminar um Artigo

Para eliminar permanentemente um artigo de blog:

1. Encontre o artigo na tabela de Artigos do Blog.
2. Clique no menu de ações (três pontos).
3. Selecione **Eliminar**.
4. Um diálogo de confirmação aparece:
   - Mostra o título do artigo.
   - Avisa que a eliminação é permanente.
   - Pede-lhe para escrever o título do artigo para confirmar (para artigos publicados).
5. Clique em **Confirmar Eliminação**.

### O Que Acontece Após a Eliminação

- O artigo é permanentemente removido do sistema.
- O URL devolve uma página 404.
- O artigo não pode ser recuperado após eliminação.
- As estatísticas de visualização são perdidas.
- O slug fica disponível para reutilização.

### Quando Eliminar vs. Despublicar

| Cenário | Ação |
|----------|--------|
| Remoção temporária de conteúdo | Despublicar |
| Conteúdo desatualizado que pode ser atualizado mais tarde | Despublicar |
| Artigos de teste ou duplicados acidentais | Eliminar |
| Conteúdo que nunca deveria ter sido criado | Eliminar |
| Conteúdo legalmente problemático | Eliminar |

> **Dica:** A eliminação é irreversível. Em caso de dúvida, despublique. Pode sempre eliminar um artigo despublicado mais tarde, mas não pode recuperar um artigo eliminado.

---

## Upload de Imagem para Fotos de Capa

O componente de upload de imagem de capa suporta o seguinte fluxo de trabalho:

### Métodos de Upload

1. **Clicar para Carregar:** Clique na área de upload para abrir o explorador de ficheiros.
2. **Arrastar e Soltar:** Arraste um ficheiro de imagem do seu ambiente de trabalho diretamente para a área de upload.

### Processo de Upload

1. Selecione ou solte o seu ficheiro de imagem.
2. A barra de progresso do upload aparece.
3. Uma vez completo, a pré-visualização da imagem é apresentada na área de upload.
4. O URL da imagem é automaticamente guardado com o artigo.

### Requisitos de Imagem

| Requisito | Valor |
|-------------|-------|
| Formatos | JPEG, PNG, WebP |
| Dimensões mínimas | 600 x 315 pixels |
| Dimensões recomendadas | 1200 x 630 pixels |
| Tamanho máximo do ficheiro | 5 MB |
| Proporção | 1.91:1 recomendado (otimizado para redes sociais) |

### Gerir Imagens Carregadas

- **Substituir:** Clique no botão **Remover** abaixo da pré-visualização e depois carregue uma nova imagem.
- **Pré-visualizar:** Clique na pré-visualização da imagem para a ver em tamanho completo.
- **Texto alternativo:** Introduza texto alternativo descritivo no campo abaixo da imagem (importante para acessibilidade e SEO).

### Otimização de Imagem

As imagens carregadas são automaticamente:

- Comprimidas para entrega web (preservando a qualidade).
- Servidas via CDN para carregamento rápido.
- Convertidas para formato WebP para navegadores que o suportam.
- Redimensionadas para múltiplas dimensões para apresentação responsiva.

> **Dica:** Prepare as suas imagens de capa a 1200 x 630 pixels antes de carregar. Este é o tamanho ideal tanto para a apresentação no blog como para partilha em redes sociais (Open Graph).

---

## Perguntas Frequentes

**P: Vários administradores podem editar o mesmo artigo?**
R: Sim, mas não há colaboração em tempo real. A última pessoa a guardar sobrescreve as alterações anteriores. Coordene com a sua equipa para evitar conflitos.

**P: Existe um histórico de revisões?**
R: Não. Cada gravação sobrescreve a versão anterior. Copie conteúdo importante para outro local antes de fazer alterações significativas.

**P: Posso agendar um artigo para publicar numa data futura?**
R: Não atualmente. Os artigos são rascunhos ou publicados imediatamente. Guarde como rascunho e publique manualmente na hora desejada.

**P: O que acontece ao SEO se eu alterar o slug de um artigo publicado?**
R: O URL antigo devolverá 404. Os motores de pesquisa eventualmente desindexarão o URL antigo e indexarão o novo. Evite alterar slugs em artigos estabelecidos.

**P: Posso incorporar vídeos nos artigos do blog?**
R: Sim, utilize o modo fonte HTML para incorporar iframes de vídeo do YouTube ou Vimeo dentro da área de conteúdo.

**P: Existe um limite de palavras ou caracteres para o conteúdo do artigo?**
R: Não há limite rígido no comprimento do conteúdo. No entanto, artigos entre 800-2000 palavras tendem a ter melhor desempenho para SEO e envolvimento dos leitores.
