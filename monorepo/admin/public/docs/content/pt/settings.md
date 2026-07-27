# Configurações

A página de Configurações fornece opções de configuração de todo o sistema para a plataforma Petfolioo. As configurações estão organizadas em três separadores: Geral, Notificações e Segurança. As alterações feitas aqui afetam o comportamento tanto do portal administrativo como da aplicação móvel.

![Settings](/docs/screenshots/settings.png)

> **Access:** Super Admin only
>
> | Role | Permissions |
> |------|-------------|
> | Super Admin | View, Edit |
> | Admin | No access |
> | Moderator | No access |
> | Viewer | No access |

---

## Visão Geral

Apenas administradores com role super_admin ou admin (com acesso à página de Configurações) podem visualizar e modificar configurações. Todas as alterações requerem gravação explícita e entram em vigor imediatamente após gravação.

---

## Aceder às Configurações

1. Clique em **Configurações** no menu de navegação lateral.
2. A página de Configurações carrega com três separadores no topo.
3. O separador **Geral** está selecionado por defeito.

---

## Separador Geral

O separador Geral contém opções de configuração core da aplicação que definem como a plataforma se apresenta e opera.

### Campos

| Campo | Descrição | Predefinição |
|-------|-------------|---------|
| **Nome da App** | O nome de apresentação da aplicação mostrado em notificações e emails | Petfolioo |
| **Email de Suporte** | O endereço de email de contacto mostrado aos utilizadores para consultas de suporte | -- |
| **Idioma Predefinido** | O idioma predefinido para novos utilizadores e comunicações do sistema | Inglês |
| **Modo de Manutenção** | Alternância para ativar ou desativar o modo de manutenção | Desativado |

### Configurar Definições Gerais

#### Nome da App

1. Localize o campo **Nome da App**.
2. Limpe o valor existente e escreva o nome de aplicação desejado.
3. Este nome aparece em notificações push, cabeçalhos de email e na secção "sobre" da aplicação móvel.

#### Email de Suporte

1. Localize o campo **Email de Suporte**.
2. Introduza o endereço de email onde os utilizadores devem dirigir consultas de suporte.
3. Este email é apresentado no ecrã de ajuda/contacto da aplicação móvel.

> **Dica:** Utilize um email de equipa partilhado (ex.: suporte@petfolioo.com) em vez de um endereço pessoal para que múltiplos membros da equipa possam responder.

#### Idioma Predefinido

1. Clique no dropdown **Idioma Predefinido**.
2. Selecione o idioma que será utilizado como predefinição para:
   - Criação de novas contas de utilizador
   - Notificações geradas pelo sistema
   - Modelos de email
3. Os utilizadores podem substituir isto nas definições individuais da aplicação móvel.

#### Modo de Manutenção

O modo de manutenção é uma funcionalidade crítica que sinaliza aos utilizadores que a plataforma está temporariamente indisponível.

1. Localize a alternância **Modo de Manutenção**.
2. Clique na alternância para ativar o modo de manutenção.
3. Um diálogo de aviso aparece confirmando a ação.

**Quando o Modo de Manutenção está ativado:**

| Efeito | Descrição |
|--------|-------------|
| Aviso no Portal Admin | Um banner proeminente aparece no topo do portal administrativo indicando que o modo de manutenção está ativo |
| Impacto na App Móvel | A aplicação móvel apresenta um ecrã de manutenção aos utilizadores, impedindo utilização normal |
| Comportamento da API | Os endpoints da API devolvem respostas de estado de manutenção |
| Acesso do Admin | Os administradores podem continuar a aceder ao portal administrativo normalmente |

4. Para desativar o modo de manutenção, clique na alternância novamente.
5. Confirme a ação no diálogo.
6. A plataforma regressa à operação normal imediatamente.

> **Aviso:** Ativar o modo de manutenção afeta imediatamente todos os utilizadores da app móvel. Apenas ative durante janelas de manutenção planeadas e comunique o calendário antecipadamente via notificação push.

---

## Separador de Notificações

O separador de Notificações controla comportamentos de notificação automatizados -- os alertas gerados pelo sistema enviados aos utilizadores com base nos dados dos seus animais.

### Campos

| Campo | Descrição | Tipo | Predefinição |
|-------|-------------|------|---------|
| **Lembretes de Vacinação** | Enviar lembretes automáticos quando a vacinação de um animal se aproxima da data prevista | Alternância | Ativado |
| **Alertas de Gestação** | Enviar alertas para datas de marcos de gestação e parto esperado | Alternância | Ativado |
| **Atualizações de Criação** | Enviar atualizações sobre eventos de calendário de criação e confirmações | Alternância | Ativado |
| **Dias de Lembrete Antes do Vencimento** | Número de dias antes de uma data de vencimento para enviar a notificação de lembrete | Entrada numérica | 7 |

### Configurar Definições de Notificação

#### Lembretes de Vacinação

1. Localize a alternância **Lembretes de Vacinação**.
2. Quando **ativada** (predefinição):
   - Os utilizadores recebem notificações push antes das datas de vacinação dos seus animais.
   - A notificação é enviada com base na definição "Dias de Lembrete Antes do Vencimento".
   - Exemplo: Se definido para 7 dias, os utilizadores recebem um lembrete uma semana antes da vacinação ser devida.
3. Quando **desativada**:
   - Nenhum lembrete automático de vacinação é enviado.
   - Os utilizadores devem verificar manualmente o calendário de vacinação dos seus animais.

#### Alertas de Gestação

1. Localize a alternância **Alertas de Gestação**.
2. Quando **ativada** (predefinição):
   - Os utilizadores a acompanhar uma gestação recebem notificações de marcos.
   - Os alertas incluem lembretes de data de parto esperado e transições de fase.
   - Os criadores recebem notificações adicionais de acompanhamento profissional.
3. Quando **desativada**:
   - Nenhum alerta automático relacionado com gestação é enviado.

#### Atualizações de Criação

1. Localize a alternância **Atualizações de Criação**.
2. Quando **ativada** (predefinição):
   - Os utilizadores recebem notificações sobre eventos de criação agendados.
   - Notificações de confirmação são enviadas quando registos de criação são registados.
   - Os criadores recebem sugestões de correspondência e lembretes de calendário.
3. Quando **desativada**:
   - Nenhuma notificação automática relacionada com criação é enviada.

#### Dias de Lembrete Antes do Vencimento

1. Localize a entrada numérica **Dias de Lembrete Antes do Vencimento**.
2. Introduza o número de dias antes de uma data de vencimento em que os lembretes devem ser enviados.
3. Este valor aplica-se a todos os lembretes baseados em datas (vacinações, consultas).
4. Intervalo válido: 1 a 30 dias.

> **Dica:** Um valor de 7 dias funciona bem para a maioria dos utilizadores. Para criadores a gerir múltiplos animais, considere definir para 14 dias para dar mais tempo de preparação.

### Tabela de Interação de Notificações

| Definição | Afeta | Impacto no Utilizador |
|---------|---------|-------------|
| Lembretes de Vacinação ATIV + 7 dias | Utilizadores com animais com vacinações próximas | "A vacinação anti-rábica do Rex é devida em 7 dias" |
| Alertas de Gestação ATIV | Utilizadores com registos de gestação ativos | "A gestação da Luna entrou na semana 6" |
| Atualizações de Criação ATIV | Utilizadores com criações agendadas | "Consulta de criação com o Max confirmada para sexta-feira" |
| Todas as alternâncias DESATIV | Todos os utilizadores | Sem notificações automatizadas; apenas notificações manuais do admin |

---

## Separador de Segurança

O separador de Segurança contém definições que controlam limitação de taxa da API, tempos de vida de tokens de autenticação e restrições de upload de ficheiros.

### Campos

| Campo | Descrição | Tipo | Predefinição |
|-------|-------------|------|---------|
| **Limite de Taxa Por Minuto** | Máximo de pedidos API permitidos por utilizador por minuto | Número | 60 |
| **Expiração do Token de Acesso (Horas)** | Quanto tempo um token de acesso permanece válido | Número | 24 |
| **Expiração do Token de Atualização (Dias)** | Quanto tempo um token de atualização permanece válido | Número | 30 |
| **Tamanho Máximo de Foto (MB)** | Tamanho máximo de ficheiro permitido para fotos de animais | Número | 5 |
| **Tamanho Máximo de Avatar (MB)** | Tamanho máximo de ficheiro permitido para avatares de utilizador | Número | 2 |
| **Tipos de Ficheiro Permitidos** | Lista separada por vírgulas de tipos MIME aceites para uploads | Texto | image/jpeg,image/png,image/webp |

### Configurar Definições de Segurança

#### Limite de Taxa Por Minuto

1. Localize o campo **Limite de Taxa Por Minuto**.
2. Introduza o número máximo de pedidos API que um único utilizador pode fazer por minuto.
3. Pedidos que excedam este limite recebem uma resposta 429 (Too Many Requests).
4. Intervalo recomendado: 30-120 dependendo dos padrões de utilização esperados.

> **Importante:** Definir isto demasiado baixo pode fazer a aplicação móvel funcionar incorretamente para utilizadores ativos. Definir demasiado alto pode deixar o sistema vulnerável a abuso. O valor predefinido de 60 é adequado para a maioria das implementações.

#### Expiração do Token de Acesso (Horas)

1. Localize o campo **Expiração do Token de Acesso**.
2. Introduza o número de horas que um token de acesso permanece válido após emissão.
3. Quando um token expira, a app utiliza o token de atualização para obter um novo.
4. Valores mais curtos são mais seguros; valores mais longos reduzem fricção de login.

| Valor | Segurança | Experiência do Utilizador |
|-------|----------|-----------------|
| 1 hora | Alta | Re-autenticação frequente |
| 24 horas | Média | Bom equilíbrio (recomendado) |
| 72 horas | Mais baixa | Interrupção mínima |

#### Expiração do Token de Atualização (Dias)

1. Localize o campo **Expiração do Token de Atualização**.
2. Introduza o número de dias que um token de atualização permanece válido.
3. Quando o token de atualização expira, o utilizador deve iniciar sessão novamente com as suas credenciais.
4. Intervalo recomendado: 7-90 dias.

> **Dica:** Para uma app de consumidor como o Petfolioo, 30 dias é um bom equilíbrio. Utilizadores que abrem a app pelo menos mensalmente nunca precisarão de re-login. Para implementações de maior segurança, considere 7 dias.

#### Tamanho Máximo de Foto (MB)

1. Localize o campo **Tamanho Máximo de Foto**.
2. Introduza o tamanho máximo do ficheiro em megabytes para uploads de fotos de animais.
3. Fotos que excedam este tamanho são rejeitadas com uma mensagem de erro.
4. Considere custos de armazenamento e tempos de upload para utilizadores com ligações lentas.

| Valor | Adequado Para |
|-------|-------------|
| 2 MB | Baixo armazenamento, uploads rápidos, menor qualidade |
| 5 MB | Equilibrado (recomendado) |
| 10 MB | Fotos de alta qualidade, mais uso de armazenamento |

#### Tamanho Máximo de Avatar (MB)

1. Localize o campo **Tamanho Máximo de Avatar**.
2. Introduza o tamanho máximo do ficheiro em megabytes para uploads de avatar de perfil de utilizador.
3. Os avatares são tipicamente mais pequenos que fotos de animais uma vez que são apresentados em resolução reduzida.
4. Recomendado: 1-3 MB.

#### Tipos de Ficheiro Permitidos

1. Localize o campo **Tipos de Ficheiro Permitidos**.
2. Introduza uma lista separada por vírgulas de tipos MIME que o sistema aceita para uploads.
3. Cada tipo MIME deve estar no formato `tipo/subtipo`.
4. Não adicione espaços entre entradas a menos que queira intencionalmente inclui-los na string do tipo MIME.

**Tipos MIME comuns para uploads de imagem:**

| Tipo MIME | Formato | Notas |
|-----------|--------|-------|
| `image/jpeg` | JPEG | Formato de foto mais comum, boa compressão |
| `image/png` | PNG | Sem perdas, suporta transparência |
| `image/webp` | WebP | Formato moderno, excelente compressão |
| `image/heic` | HEIC | Formato da Apple, utilizado por câmaras iPhone |
| `image/gif` | GIF | Imagens animadas, tamanhos de ficheiro maiores |

**Configurações de exemplo:**

```
Padrão:      image/jpeg,image/png,image/webp
Extendida:   image/jpeg,image/png,image/webp,image/heic,image/gif
Mínima:      image/jpeg,image/png
```

> **Aviso:** Adicionar tipos MIME não suportados pode permitir uploads que o sistema não consegue processar. Adicione apenas tipos que o seu pipeline de processamento de imagem suporta.

---

## Guardar Configurações

Todas as alterações de configurações requerem uma ação de gravação explícita.

### Passos para Guardar

1. Faça as alterações desejadas em qualquer um dos três separadores.
2. Clique no botão **Guardar Configurações** no fundo da página.
3. Um indicador de carregamento aparece enquanto as alterações estão a ser aplicadas.
4. Uma notificação de sucesso confirma que as configurações foram guardadas.
5. As alterações entram em vigor imediatamente em toda a plataforma.

### Notas Importantes Sobre Gravação

- As alterações **não** são auto-gravadas. Se navegar para outra página sem guardar, as alterações são perdidas.
- Pode modificar configurações em múltiplos separadores antes de guardar -- todas as alterações são guardadas em conjunto.
- Se ocorrer um erro de validação, o campo específico é destacado com uma mensagem de erro.
- Apenas campos que foram alterados são enviados para o servidor (atualização parcial otimista).

> **Dica:** Após guardar alterações relacionadas com segurança (limites de taxa, expiração de tokens), monitorize o sistema por um breve período para assegurar que não ocorre comportamento inesperado.

---

## Auditoria de Alterações de Configurações

Todas as modificações de configurações são registadas para segurança e responsabilidade:

| Informação Registada | Descrição |
|--------------------|-------------|
| Nome do admin | Quem fez a alteração |
| Timestamp | Quando a alteração foi feita |
| Campo alterado | Qual configuração foi modificada |
| Valor anterior | O valor antes da alteração |
| Novo valor | O valor após a alteração |

---

## Resolução de Problemas

| Problema | Solução |
|-------|----------|
| Não consigo aceder à página de Configurações | Verifique se o seu role é super_admin ou admin com permissão de Configurações concedida. |
| Botão de guardar desativado | Nenhuma alteração foi feita. Modifique pelo menos um campo para ativar a gravação. |
| Erro de validação ao guardar | Verifique o campo destacado para a mensagem de erro específica e corrija o valor. |
| Modo de manutenção não está a afetar a app | Permita 1-2 minutos para a alteração propagar-se a todas as instâncias da app móvel. |
| Limite de taxa demasiado restritivo | Aumente o valor e guarde. Os utilizadores afetados serão desbloqueados dentro de um minuto. |
| Erros de upload de ficheiros após alteração de tipo | Assegure-se de que os tipos MIME estão corretamente formatados sem vírgulas ou espaços finais. |

---

## Páginas Relacionadas

- [Utilizadores Admin](./admin-users.md) -- Gerir quem pode aceder e modificar configurações
- [Notificações](./notifications.md) -- Enviar notificações manuais a utilizadores
- [Analytics](./analytics.md) -- Monitorizar saúde e utilização da plataforma
