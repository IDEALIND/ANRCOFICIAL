# ANRC – ANJOS DA NOITE RESGATE E CURSOS
## Centro de Ensino e Formação Profissional – Bombeiro Civil & Socorrista (APH)
> *"Treine para agir."*

Ecossistema digital completo de captação, qualificação vocacional, matrículas com carrinho interativo seguro e **Painel Administrativo Estruturado & Funcional** da **Escola ANRC**, desenvolvido sob medida com estética militar-resgate premium, 100% livre de emojis e fotografias genéricas de banco de imagens, baseado em vetores SVG de alta precisão, vídeos operacionais reais gravados em campo e schematics táticos.

---

## Arquitetura da Solução & Fluxo da Página

1. [**site.html**](file:///c:/ANRC/site.html) — **Site Institucional Ultra-Premium & Portal de Matrículas**
   - **Cabeçalho Corporativo Slim & Responsivo (Desktop & Mobile Drawer):**
     - **Estética de Alta Tecnologia:** Barra fixa (*sticky*) com altura compacta (58px normal / 52px ao rolar / 48px mobile), efeito de vidro fosco (*backdrop-filter blur 20px*), micro-borda sutil e brilho carmesim inferior.
     - **Responsividade Total sem Quebra de Linha:** Ponto de quebra fluido em 1100px que oculta o menu horizontal (`flex-wrap: nowrap`) e ativa o menu hambúrguer animado, garantindo encaixe perfeito em qualquer resolução, notebook ou smartphone.
     - **Logomarca ANRC com Acesso Secreto ADM:** Brasão alado vetorial SVG com micro-interação e gatilho de 3 cliques rápidos para autenticação do Painel Administrativo.
     - **Menu Desktop Otimizado:** Ordem sincronizada com o funil: `Início` • `Vocacional` • `Cursos` • `Diferenciais` • `Mercado` • `Quem Somos` • `Estrutura` • `Depoimentos` • `Contato`.
     - **Scrollspy Automático em Tempo Real:** Conforme o usuário rola pela página, a aba correspondente na barra superior e na gaveta mobile é destacada automaticamente.
     - **Gaveta de Navegação Mobile Ultra-Premium (`#mobileNavDrawer`):** Gaveta lateral deslizante (*slide-out drawer*) com efeito de desfoque, crachá institucional, ícones vetoriais para cada link, botão direto para Matrícula e atalho para o WhatsApp da equipe de instrução. Fechamento suave via botão `✕`, toque no fundo, seleção de qualquer link ou tecla `[ESC]`.
   - **Vídeo de Fundo Institucional em 16:9 no Hero (`#inicio`):**
     - **Headline Dominante & Centralizada:** Título tático em grande escala `"TREINE PARA AGIR."` (com `"AGIR."` em neon vermelho brilhante, até 90px em duas linhas impactantes), centralizado verticalmente no visor e com leitura perfeita sobre o degradê cinematográfico.
     - Integração direta com o vídeo real da instituição (`anrc.mp4`).
     - Proporção cinematográfica 16:9 widescreen com enquadramento tático dinâmico e degradê escuro à esquerda para máxima legibilidade do texto.
     - Início e repetição contínua (loop) a partir de 01:05 (65 segundos).
     - Controle de áudio discreto fixado no canto inferior direito, sem interferir no alinhamento do texto.
     - Botão de ação primária destacado que conduz diretamente ao Quiz logo abaixo, e botão secundário para ver os cursos.
   - **Barrinha Rolante Tática de Especialidades (Ticker Marquee Infinito):**
     - Faixa panorâmica em vidro escuro e iluminação laser carmesim posicionada estrategicamente entre o Hero e o Quiz Vocacional.
     - **Especialidades Operacionais com Ícones Vetoriais SVG & Diamantes Neon:** `ATENDIMENTO PRÉ-HOSPITALAR`, `SIMULAÇÕES`, `TREINAMENTO PRÁTICO`, `PREVENÇÃO`.
     - Animação contínua e infinita via aceleração por hardware 3D (`translate3d`), máscara lateral de esmaecimento suave (*fade mask*), pausa ao passar o cursor (*hover*) e total adaptação responsiva no mobile.
   - **Quiz Vocacional Interativo Premium (`#teste-vocacional`) em Degradê Cinematográfico:**
     - **Posicionado estrategicamente logo abaixo do vídeo hero e acima da Formação/Cursos**, permitindo ao visitante descobrir imediatamente sua vocação antes de conferir a grade.
     - **Degradê Cinematográfico Contínuo:** Fundo imersivo com gradiente radial e linear multicamadas (`#040609` ➔ `#070d1c` ➔ `#0c1730` ➔ `#040609`), eliminando bordas duras ou quebras visuais e conectando o vídeo escuro aos cards de formação com feixes luminosos de neon tático.
     - 12 afirmações situacionais práticas avaliadas em escala 1 a 5.
     - 100% qualitativo (sem porcentagens nem notas expostas).
     - Indicação direta da formação ideal e botão de matrícula instantânea com dados pré-preenchidos.
   - **Cursos & Valores com Brasões Vetoriais e Diferenciais Inclusos (`#cursos`):**
     - **Cards com Acabamento Dark Obsidian Glassmorphism:** Gradientes profundos de 165°, bordas de 22px, linhas de luz neon laser coloridas, selos vetoriais 3D com bezels de precisão e caixas de diferenciais com ícones SVG metálicos individuais.
     - **Bombeiro Civil (240h, NBR 14608):** Investimento oficial de **R$ 1.000,00** à vista ou em até 12x de R$ 83,33 sem juros. Diferenciais inclusos: Kit Fardamento Oficial Grátis (Camiseta + Brevê), Seguro Tático Individual, Treino prático com fogo real em Casa de Fumaça e Banco de Talentos.
     - **Socorrista APH (200h, Diretrizes AHA):** Investimento oficial de **R$ 1.000,00** à vista ou em até 12x de R$ 83,33 sem juros. Diferenciais inclusos: Prática em Ambulância Real, Manequins com retorno QCPR, Protocolo de trauma XABCDE com torniquetes de combate e mercado rodoviário.
     - **Combo Dupla Formação (440h):** Bombeiro Civil + Socorrista APH por **R$ 1.800,00** (economia de R$ 200,00) em chassi dourado acetinado com barra laser âmbar.
   - **Nosso Diferencial • Sempre Buscando o Melhor Para Nossos Alunos (`#diferenciais`):**
     - **Aba Oficial no Cabeçalho:** Link dedicado `"Nosso Diferencial"` no Desktop Navbar e na Gaveta Mobile com scrollspy em tempo real.
     - **Destaque 1: Aula na Praia ao Ar Livre para Situações de Afogamento (`afogados.mp4`):**
       - Moldura vertical tática 9:16 perfeitamente enquadrada no mobile, sem interface de player (`controls` removidos) e em **loop contínuo (repeat)** automático e silencioso.
       - Storytelling cativante: leitura de marés e correntes de retorno (valas), nado de aproximação tático, extração coordenada da arrebentação e aplicação na areia do **Protocolo Internacional Szpilman** (Graus 1 a 6) de reanimação cardiopulmonar e desobstrução de vias aéreas sob condições naturais.
     - **Destaque 2: Aula Prática de Manejo de Ofídios com Serpentes Reais (`ofideos.mp4`):**
       - Moldura vertical tática 9:16 perfeitamente enquadrada no mobile, sem interface de player e em **loop contínuo (repeat)** automático e silencioso.
       - Storytelling cativante: contato prático presencial com serpentes vivas, identificação das 4 famílias de interesse médico (*Bothrops* / Jararaca, *Crotalus* / Cascavel, *Lachesis* / Surucucu e *Micrurus* / Coral Verdadeira), contenção segura com gancho herpetológico, desmistificação de erros que causam necrose (proibição absoluta de torniquetes) e regulação ágil para administração de soro antiofídico.
   - **Gatilhos Mentais de Mercado, Legislação e Empregabilidade (`#mercado-trabalho`):**
     - *Sem contadores de tempo ou escassez fictícia*: foco 100% em oportunidades e dados reais de mercado.
     - **Obrigatoriedade por Lei Federal (Lei 11.901/2009 & NBR 14608):** Exigência legal para shopping centers, indústrias petroquímicas, condomínios corporativos e eventos para concessão do AVCB.
     - **Alta Demanda Contínua em Rodovias & Resgate Móvel:** Concessionárias de rodovias pedagiadas (plantões 12x36 ou 24x72), operadoras de saúde e eventos.
     - **Habilitação Profissional Imediata & Registro CLT:** Certificação e carteira funcional aceitas por departamentos de RH em todo o Brasil.
     - **Retorno Rápido do Investimento:** Com o piso da categoria e adicional de periculosidade de 30%, o valor de R$ 1.000 é recuperado logo no 1º mês de contratação.
   - **Carrinho de Matrícula Modal (`#modalCheckoutCart`):**
     - Ao clicar em *"MATRICULAR NESTE CURSO"*, o carrinho modal desliza na tela com visual de grande empresa.
     - Seletor com alternância dinâmica de curso (Bombeiro R$ 1.000 / Socorrista R$ 1.000 / Combo R$ 1.800).
     - Seleção de Turno (Sábados, Domingos ou Noturno).
     - Coleta dos dados do aluno com máscaras automáticas: Nome Completo, CPF, WhatsApp, E-mail, Data de Nascimento e Tamanho da Camiseta Tática Oficial (P, M, G, GG, XGG).
     - **3 Opções de Pagamento Integradas:**
       - **PIX:** QR Code vetorial ANRC em alta definição, Chave Copia e Cola e confirmação instantânea.
       - **Cartão de Crédito:** Parcelamento em até 12x sem juros (ou 12x de R$ 83,33), com validação de número, validade e CVV.
       - **Cartão de Débito:** Débito à vista seguro com criptografia 3D-Secure.
     - Ao confirmar, gera protocolo oficial `MAT-2026-XXXX`, salva no banco de dados e abre o recibo de homologação com link direto para o WhatsApp da coordenação.

---

## Painel Administrativo Estruturado & Funcional (Gov-Tech / Enterprise)

O Painel Administrativo conta com **4 Módulos Operacionais Integrados por Abas**, com capacidades reais de gestão acadêmica, controle financeiro, controle de estoque de fardamentos e portabilidade de dados:

### 1. Aba 1: Matrículas & Alunos (Grid Operacional)
- **Barra de Ferramentas Avançada**:
  - Campo de busca instantânea com atalho de teclado `[Ctrl + K]`.
  - Filtro por Curso (Todos, Bombeiro Civil, Socorrista APH, Combo Dupla).
  - Filtro por Forma de Pagamento (Todos, PIX, Cartão de Crédito, Débito).
  - **Filtro por Status**: `Confirmada`, `Em Análise`, `Em Aula (Ativo)`, `Formado`, `Cancelado`.
  - **Ordenação Dinâmica**: Mais Recentes, Mais Antigos, Ordem Alfabética (A-Z) e Maior Valor.
  - Contador dinâmico de registros exibidos em tempo real.
- **Tabela Operacional com Ações Reais por Aluno**:
  - Avatar personalizado com as iniciais do aluno.
  - Protocolo oficial codificado e data/hora da transação.
  - Links diretos com formatação de CPF e WhatsApp.
  - Fardamento selecionado (P, M, G, GG, XGG).
  - Status colorido com pulso luminoso (*Confirmada*, *Em Análise*, *Em Aula*, *Formado*, *Cancelado*).
  - **Botão Ficha**: Abre o Dossiê Acadêmico do Aluno.
  - **Botão Editar**: Abre o formulário de edição de dados e status do aluno.
  - **Botão Zap**: Disparo com mensagem personalizada no WhatsApp.
  - **Botão Excluir**: Remoção com confirmação de segurança.

### 2. Aba 2: Dashboard & Métricas
- **5 KPIs Executivos com Tendências**:
  - Total de Matrículas Ativas
  - Receita Bruta Estimada em Caixa (R$)
  - Alunos em Bombeiro Civil (240H)
  - Alunos em Socorrista APH (200H)
  - Alunos no Combo Dupla Qualificação (440H)
- **Distribuição de Receita por Meio de Pagamento**:
  - Barras de progresso com porcentagem e valores absolutos para PIX, Crédito e Débito.
- **Alocação de Alunos por Turno**:
  - Taxa de ocupação de turmas de Sábados, Domingos e Noturno.
- **Controle de Estoque & Demanda de Fardamento**:
  - Contadores quantitativos em tempo real para camisetas tamanhos **P**, **M**, **G**, **GG**, **XGG** e **Total de Fardamentos Requisitados**, eliminando contagens manuais para encomendas junto à confecção.

### 3. Aba 3: Nova Matrícula Manual (Secretaria / Presencial)
- Formulário corporativo completo para cadastrar alunos atendidos presencialmente no balcão ou via telefone:
  - Nome Completo, CPF (máscara automática), WhatsApp (máscara automática), E-mail e Data de Nascimento.
  - Seleção de Curso (com atualização automática do valor de investimento).
  - Seleção de Turno e Tamanho de Camiseta Oficial.
  - Forma de Pagamento e Status Inicial da Matrícula.
  - Botão de homologação instantânea que gera protocolo único `MAT-2026-XXXX`, salva no banco de dados e redireciona para a lista.

### 4. Aba 4: Backups & Ferramentas do Sistema
- **Exportar Planilha (CSV)**: Exporta arquivo `.csv` compatível com Microsoft Excel e Google Sheets em UTF-8 com BOM.
- **Backup Integral (JSON)**: Baixa um arquivo `.json` com todos os dados salvos para custódia externa segura.
- **Restaurar Backup (JSON)**: Seletor de arquivo `.json` para importar e restaurar bases de dados com validação.
- **Injetar Matrícula Teste**: Simula um aluno com dados realistas para testes.
- **Restaurar Alunos Seed**: Restaura os 5 registros de demonstração padrão.
- **Zerar Banco de Dados**: Limpeza total com confirmação dupla.

---

### Modais Complementares do Painel ADM:

1. **Dossiê Acadêmico do Aluno (`#modalAdminStudentDossier`)**:
   - Visualização executiva estilo ficha homologada oficial:
     - Avatar ampliado, protocolo, nome e crachá de status.
     - Grade com CPF, Telefone, E-mail, Data de Nascimento, Curso, Turno, Fardamento e Pagamento.
     - **Disparos Rápidos de WhatsApp**:
       - Mensagem oficial de boas-vindas.
       - Confirmação de fardamento solicitado.
       - Informações sobre início das aulas e documentos.
     - Botão de impressão estilizada.
     - Botão de edição direta.

2. **Edição de Aluno (`#modalAdminEditStudent`)**:
   - Janela de edição para atualizar Nome, CPF, WhatsApp, E-mail, Curso, Turno, Fardamento e **Status da Matrícula** (*Confirmada, Em Análise, Em Aula, Formado, Cancelado*), com persistência instantânea no `localStorage`.

---

## Como Acessar o Painel Administrativo

1. Abra o site em um navegador: [**c:/ANRC/site.html**](file:///c:/ANRC/site.html).
2. Dê **3 cliques rápidos na logomarca da ANRC** (o brasão alado no topo esquerdo da barra de navegação).
3. Na janela de autenticação restrita, digite uma das senhas mestres:
   - `anrc2026` ou `admin@anrc`
4. O painel administrativo será aberto exibindo a navegação por abas com todas as ferramentas operacionais.

---

## Arquivos Principais do Workspace
- [**site.html**](file:///c:/ANRC/site.html) — Aplicação completa integrada (Hero Vídeo 16:9, Quiz Interativo em Degradê, Cursos R$ 1.000, Aba "Nosso Diferencial" com Vídeos de Praia e Ofídios, Gatilhos de Mercado, Carrinho Modal e Painel ADM Estruturado em 4 Abas)
- [**quiz.html**](file:///c:/ANRC/quiz.html) — Terminal standalone do Quiz
- `anrc.mp4` — Vídeo de fundo operacional do Hero
- `afogados.mp4` — Vídeo de treinamento prático de salvamento aquático e afogamento na praia
- `ofideos.mp4` — Vídeo de treinamento prático de manejo de serpentes vivas e ofidismo
- [**README.md**](file:///c:/ANRC/README.md) — Documentação técnica completa da solução

---

## 🔐 Como Acessar o Painel Administrativo

1. Abra o site em um navegador: [**c:/ANRC/site.html**](file:///c:/ANRC/site.html).
2. Dê **3 cliques rápidos na logomarca da ANRC** (o brasão alado no topo esquerdo da barra de navegação).
3. Na janela de autenticação restrita, digite uma das senhas mestres:
   - `anrc2026` ou `admin@anrc`
4. O painel administrativo será aberto exibindo a navegação por abas com todas as ferramentas operacionais.

---

## 🚀 Arquivos Principais do Workspace
- 🌐 [**site.html**](file:///c:/ANRC/site.html) — Aplicação completa integrada (Hero Vídeo 16:9, Quiz Interativo em Degradê, Cursos R$ 1.000, Aba "Nosso Diferencial" com Vídeos de Praia e Ofídios, Gatilhos de Mercado, Carrinho Modal e Painel ADM Estruturado em 4 Abas)
- 🎯 [**quiz.html**](file:///c:/ANRC/quiz.html) — Terminal standalone do Quiz
- 🎥 `anrc.mp4` — Vídeo de fundo operacional do Hero
- 🌊 `afogados.mp4` — Vídeo de treinamento prático de salvamento aquático e afogamento na praia
- 🐍 `ofideos.mp4` — Vídeo de treinamento prático de manejo de serpentes vivas e ofidismo
- 📄 [**README.md**](file:///c:/ANRC/README.md) — Documentação técnica completa da solução
