# Solucao de problemas

Solucoes para problemas comuns que voce pode encontrar ao usar o Portal de Administracao do Petfolioo.

---

## Problemas de login

### Nao consigo fazer login

**Problema:** Voce insere suas credenciais, mas o login falha ou voce ve uma mensagem de erro.

**Possiveis causas:**
- Endereco de e-mail ou senha incorretos
- Sua conta foi desativada por um Super Admin
- O servico de autenticacao esta temporariamente indisponivel
- Sua conta ainda nao foi criada no Portal de Administracao

**Solucao:**
1. Verifique se voce esta usando o endereco de e-mail associado a sua conta admin (nao seu e-mail pessoal ou de usuario do aplicativo).
2. Certifique-se de que o Caps Lock esta desligado e nao ha espacos extras no final da senha.
3. Tente redefinir sua senha usando o link "Esqueci a senha".
4. Se o problema persistir, entre em contato com um Super Admin para confirmar que sua conta existe e esta ativa.
5. Se o servico parecer estar indisponivel, aguarde alguns minutos e tente novamente.

---

### Esqueci minha senha

**Problema:** Voce nao consegue lembrar sua senha do Portal de Administracao.

**Possiveis causas:**
- Senha foi alterada e nao salva
- Usando credenciais de um sistema diferente

**Solucao:**
1. Na pagina de login, clique em "Esqueci a senha".
2. Insira o endereco de e-mail associado a sua conta admin.
3. Verifique sua caixa de entrada (e pasta de spam) para o e-mail de redefinicao de senha.
4. Clique no link de redefinicao e crie uma nova senha.
5. Se voce nao receber o e-mail em 5 minutos, entre em contato com um Super Admin para redefinir sua conta manualmente.

---

### Minha sessao expirou

**Problema:** Voce estava logado mas foi repentinamente redirecionado para a pagina de login.

**Possiveis causas:**
- Sua sessao excedeu o periodo de tempo limite automatico (tipicamente 30 minutos de inatividade)
- Um Super Admin alterou as configuracoes da sua conta ou funcao
- O servidor foi reiniciado durante uma implantacao

**Solucao:**
1. Faca login novamente com suas credenciais. Seu trabalho nao salvo pode ter sido perdido.
2. Se as sessoes expiram com muita frequencia, certifique-se de que seu navegador nao esta bloqueando cookies para o dominio do Portal de Administracao.
3. Mantenha seu trabalho salvo regularmente para evitar perda de dados por expiracoes de sessao.

---

## Problemas de permissao

### Nao consigo ver uma pagina a qual deveria ter acesso

**Problema:** Um link de navegacao ou pagina que voce espera ter acesso nao esta visivel ou retorna uma tela em branco.

**Possiveis causas:**
- Sua funcao nao inclui permissao para visualizar essa pagina
- Sua funcao foi alterada recentemente e a mudanca ainda nao entrou em vigor
- Um problema de cache do navegador esta servindo uma versao desatualizada da navegacao

**Solucao:**
1. Verifique sua funcao atual olhando seu perfil ou perguntando a um Super Admin. Consulte o guia de Funcoes e Permissoes para ver quais paginas sua funcao pode acessar.
2. Se sua funcao foi alterada recentemente, faca logout e login novamente para atualizar suas permissoes.
3. Limpe o cache do navegador ou tente abrir o portal em uma janela privada/anonima.
4. Se voce acredita que sua funcao deveria conceder acesso a pagina, entre em contato com um Super Admin para revisar suas permissoes.

---

### Botoes estao faltando em uma pagina

**Problema:** Voce pode ver uma pagina, mas certos botoes de acao (Edit, Delete, Approve, etc.) nao sao exibidos.

**Possiveis causas:**
- Sua funcao tem acesso somente leitura naquela pagina (ex.: funcao Viewer)
- O item esta em um estado onde essas acoes nao estao disponiveis (ex.: ja aprovado)
- Um problema de renderizacao da UI

**Solucao:**
1. Verifique a documentacao de Funcoes e Permissoes para confirmar se sua funcao tem acesso de escrita naquele recurso.
2. Verifique se o status atual do item permite a acao esperada (ex.: voce nao pode aprovar uma verificacao ja aprovada).
3. Atualize a pagina. Se os botoes ainda nao aparecerem, tente um navegador diferente.
4. Se sua funcao deveria ter esses botoes, entre em contato com um Super Admin.

---

### Recebo um erro 403

**Problema:** O portal exibe um erro "403 Forbidden" quando voce tenta acessar uma pagina ou realizar uma acao.

**Possiveis causas:**
- Voce esta tentando uma acao que sua funcao explicitamente nao permite
- Seu token de sessao se tornou invalido
- Sua funcao foi rebaixada enquanto voce estava logado

**Solucao:**
1. Anote qual pagina ou acao acionou o erro.
2. Faca logout e login novamente para atualizar sua sessao e permissoes.
3. Se o erro persistir, sua funcao nao tem acesso a esse recurso. Entre em contato com um Super Admin se precisar de permissoes elevadas.

---

## Problemas de dados

### Alteracoes que fiz nao estao aparecendo

**Problema:** Voce editou um registro (animal, usuario, postagem de blog, etc.) mas as alteracoes nao sao refletidas no portal.

**Possiveis causas:**
- A operacao de salvamento falhou silenciosamente devido a um problema de rede
- Seu navegador esta exibindo uma versao em cache da pagina
- Outro admin sobrescreveu suas alteracoes simultaneamente

**Solucao:**
1. Atualize a pagina usando Ctrl+Shift+R (ou Cmd+Shift+R no Mac) para ignorar o cache.
2. Verifique se o registro mostra suas alteracoes. Se nao, reaplique a edicao e observe mensagens de erro ao salvar.
3. Certifique-se de que voce tem uma conexao de internet estavel.
4. Se estiver trabalhando em registros compartilhados, coordene com outros admins para evitar edicoes conflitantes.

---

### Export nao esta funcionando

**Problema:** Clicar no botao Export nao faz nada, ou o arquivo baixado esta vazio ou corrompido.

**Possiveis causas:**
- Seu navegador esta bloqueando o download (bloqueador de pop-ups ou restricoes de download)
- O conjunto de dados e muito grande e o export expirou
- Sua funcao nao tem permissoes de exportacao

**Solucao:**
1. Verifique se seu navegador bloqueou um download ou pop-up. Procure uma notificacao na barra de endereco.
2. Desative bloqueadores de pop-ups para o dominio do Portal de Administracao.
3. Se o conjunto de dados for muito grande, tente aplicar filtros para reduzir o numero de registros antes de exportar.
4. Tente um formato de exportacao diferente (ex.: CSV em vez de PDF) pois pode ser processado mais rapidamente.
5. Se o problema persistir, entre em contato com um Super Admin para verificar se sua funcao inclui permissoes de exportacao.

---

### Pesquisa nao retorna resultados

**Problema:** Voce pesquisa um registro que sabe que existe, mas obtem um conjunto de resultados vazio.

**Possiveis causas:**
- Um erro de digitacao ou espaco extra na consulta de pesquisa
- O campo de pesquisa esta filtrando por uma coluna especifica (ex.: pesquisando por nome quando voce inseriu um ID)
- O registro foi excluido ou esta em um status diferente do esperado

**Solucao:**
1. Remova quaisquer espacos extras da sua consulta de pesquisa.
2. Tente pesquisar com menos caracteres ou uma correspondencia parcial.
3. Verifique por qual campo a pesquisa esta filtrando e certifique-se de que sua consulta corresponde a esse tipo de campo.
4. Remova quaisquer filtros ativos que possam estar excluindo o registro.
5. Se estiver pesquisando um animal por ID do microchip, certifique-se de inserir o ID numerico completo sem tracos.

---

## Problemas de notificacao

### Notificacao push nao foi entregue

**Problema:** Voce enviou uma notificacao push, mas os usuarios-alvo relatam que nao a receberam.

**Possiveis causas:**
- O usuario desativou notificacoes push no dispositivo
- O token do dispositivo do usuario expirou (aplicativo foi desinstalado e reinstalado)
- A notificacao foi enviada para o segmento de usuarios errado
- Ha um atraso no servico de entrega de notificacoes push

**Solucao:**
1. Verifique o log de entrega de notificacoes na pagina de Notificacoes para ver o status de envio.
2. Verifique se voce selecionou o publico-alvo correto (usuario especifico, segmento ou todos os usuarios).
3. Observe que notificacoes push podem levar alguns minutos para serem entregues dependendo das condicoes do dispositivo e da rede.
4. Se um usuario especifico consistentemente nao recebe notificacoes, o token do dispositivo pode ser invalido. Ele deve abrir o aplicativo e reativar notificacoes nas configuracoes do dispositivo.
5. Para notificacoes em massa, permita ate 15 minutos para a entrega ser concluida para todos os usuarios.

---

### Nao consigo enviar notificacoes

**Problema:** O botao "Send Notification" esta desabilitado ou voce recebe um erro ao tentar enviar.

**Possiveis causas:**
- Sua funcao nao tem permissoes de envio de notificacao (Viewers e alguns Moderators)
- Campos obrigatorios (titulo, corpo, publico-alvo) nao estao preenchidos
- O servico de notificacao esta temporariamente indisponivel

**Solucao:**
1. Certifique-se de que todos os campos obrigatorios estao preenchidos: titulo, corpo da mensagem e pelo menos uma selecao de publico-alvo.
2. Verifique se sua funcao tem permissao para enviar notificacoes (funcao Admin ou Super Admin necessaria).
3. Se todos os campos estao preenchidos e voce tem a funcao correta, tente atualizar a pagina e tentar novamente.
4. Se o erro menciona um problema de servico, aguarde alguns minutos e tente novamente. Se o problema persistir por mais de 30 minutos, reporte a equipe tecnica.

---

## Problemas de navegador

### A pagina nao carrega

**Problema:** O Portal de Administracao mostra uma pagina em branco, um spinner de carregamento que nunca completa, ou um erro de conexao.

**Possiveis causas:**
- Problema de conectividade com a internet
- O servico do Portal de Administracao esta inativo ou reiniciando
- Extensoes do navegador interferindo no carregamento da pagina
- DNS ou firewall bloqueando o dominio do portal

**Solucao:**
1. Verifique sua conexao com a internet visitando outro site.
2. Tente atualizar a pagina com Ctrl+Shift+R (ou Cmd+Shift+R no Mac).
3. Tente abrir o portal em uma janela privada/anonima para descartar conflitos de extensoes.
4. Limpe o cache e cookies do navegador para o dominio do portal.
5. Se estiver usando uma rede corporativa, verifique se um firewall ou proxy esta bloqueando o acesso.
6. Se o portal esta indisponivel para todos, uma implantacao pode estar em andamento. Aguarde 5-10 minutos e tente novamente.

---

### Imagens/capturas de tela estao quebradas

**Problema:** Imagens no portal (fotos de animais, imagens do blog, capturas de tela na documentacao) aparecem como icones quebrados ou nao carregam.

**Possiveis causas:**
- O servico de armazenamento de imagens esta temporariamente indisponivel
- A imagem foi excluida do armazenamento mas a referencia permanece
- Uma politica de seguranca de conteudo esta bloqueando o carregamento de imagens
- Conexao de rede lenta causando timeout no carregamento de imagens

**Solucao:**
1. Atualize a pagina para tentar carregar as imagens novamente.
2. Verifique se o problema afeta todas as imagens ou apenas algumas especificas. Se apenas imagens especificas estao quebradas, elas podem ter sido excluidas do armazenamento.
3. Clique com o botao direito em uma imagem quebrada e selecione "Abrir imagem em nova aba". Se carregar separadamente, uma extensao do navegador pode estar bloqueando imagens inline.
4. Desative bloqueadores de anuncios ou extensoes de seguranca temporariamente para testar.
5. Se o problema afeta todas as imagens no portal, reporte a equipe tecnica pois o servico de armazenamento pode precisar de atencao.

---

### O portal esta lento

**Problema:** Paginas demoram muito para carregar, acoes parecem lentas ou o portal se torna nao responsivo.

**Possiveis causas:**
- Conexao de internet lenta
- O navegador tem muitas abas abertas consumindo memoria
- Grandes conjuntos de dados sendo carregados sem paginacao
- O servidor esta sob carga pesada

**Solucao:**
1. Teste sua velocidade de internet para descartar um problema de conectividade.
2. Feche abas desnecessarias do navegador para liberar memoria.
3. Se uma pagina especifica esta lenta (ex.: Registro de animais com milhares de registros), aplique filtros para reduzir o tamanho do conjunto de dados.
4. Limpe o cache do navegador, que pode ter crescido ao longo do tempo.
5. Tente um navegador diferente para ver se o problema e especifico do navegador.
6. Se a lentidao e consistente entre varios admins, pode ser um problema do lado do servidor. Reporte a equipe tecnica com as paginas especificas afetadas e tempos de resposta aproximados.
