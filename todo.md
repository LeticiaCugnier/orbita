# Orbita - Project TODO

## Fase 1: Identidade Visual, Landing Page e Login
- [x] Definir paleta de cores inspirada em órbitas e espaço (cores primárias, secundárias, neutras)
- [x] Escolher tipografia clean e moderna (Google Fonts)
- [x] Criar componentes base com Tailwind CSS e shadcn/ui
- [x] Implementar landing page institucional com apresentação da plataforma
- [x] Criar tela de login com autenticação Manus OAuth
- [x] Implementar tema visual consistente (dark/light mode)

## Fase 2: Dashboard Principal
- [x] Criar layout DashboardLayout com sidebar de navegação
- [x] Implementar dashboard com visão geral de projetos
- [x] Adicionar cards de pendências, próximas entregas e status dos jobs
- [x] Criar navegação entre principais funcionalidades (Briefing, Projetos, Contratos, Cliente)

## Fase 3: Criador de Briefings com IA
- [x] Criar schema de banco de dados para briefings
- [x] Implementar fluxo guiado de perguntas (objetivo, público-alvo, referências, prazo, entregáveis)
- [x] Integrar LLM para sugestões e preenchimento automático
- [x] Implementar geração de documento profissional formatado
- [x] Criar tela de visualização e edição do briefing gerado

## Fase 4: Gestão de Projetos com Etapas
- [x] Criar schema de banco de dados para projetos e etapas
- [x] Implementar visualização Kanban com drag-and-drop
- [x] Implementar visualização Timeline (Lista)
- [x] Adicionar funcionalidades de criar, editar e deletar projetos (procedures tRPC criadas)
- [x] Implementar transição entre etapas (Briefing → Pesquisa → Criação → Aprovação → Ajustes → Finalização → Entrega)

## Fase 5: Área de Contratos
- [x] Criar schema de banco de dados para contratos
- [x] Implementar galeria de modelos de contratos
- [x] Criar editor de personalização rápida (UI pronta)
- [x] Implementar histórico de documentos
- [x] Adicionar funcionalidade de assinatura digital simulada (UI com status)

## Fase 6: Área do Cliente
- [x] Criar schema de banco de dados para aprovações e comentários
- [x] Implementar upload seguro de arquivos (imagens, PDFs, mockups) - UI pronta
- [x] Criar visualização de peças para aprovação
- [x] Implementar sistema de comentários e solicitação de ajustes
- [x] Adicionar histórico de arquivos com versionamento

## Fase 7: Testes, Refinamentos e Entrega
- [x] Realizar testes de funcionalidade em todas as features
- [x] Validar responsividade e acessibilidade
- [x] Otimizar performance
- [x] Criar documentação de uso (README e inline comments)
- [x] Preparar projeto para apresentação

## Fase 8: Gestão de Orçamentos
- [x] Criar schema de banco de dados para orçamentos
- [x] Implementar página de Orçamentos com histórico geral
- [x] Adicionar filtros de status (Geral, Aprovados, Em Andamento, Finalizados)
- [x] Implementar fluxo de conversão de orçamento finalizado em projeto
- [x] Criar visualização de orçamentos com detalhes e ações


## Fase 9: IA Jurídica para Contratos
- [x] Integrar LLM para análise e sugestões de contratos
- [x] Criar interface de chat para suporte jurídico
- [x] Implementar sugestões de cláusulas e personalizações
- [x] Adicionar análise de risco de cláusulas
- [x] Criar histórico de análises e sugestões

## Fase 10: Fundo de Vídeo
- [x] Fazer upload do vídeo MOSHED-2026-6-14-12-26-37.webm para S3
- [x] Integrar vídeo como fundo fixo em todas as páginas
- [x] Adicionar overlay escuro para melhorar legibilidade do conteúdo
- [x] Aplicar estilos CSS para posicionamento e cobertura total da tela
- [x] Testar em múltiplas páginas (Inicio, Dashboard, Projetos)

## Fase 11: Sidebar de Navegação e Botões Funcionais
- [x] Remover botão "Ir para Dashboard" da página de Início
- [x] Adicionar DashboardLayout à página de Início com sidebar
- [x] Adicionar DashboardLayout à página de Orçamentos
- [x] Adicionar DashboardLayout à página de Área do Cliente
- [x] Adicionar handlers aos botões "Novo Projeto" no Dashboard
- [x] Adicionar handlers aos botões "Novo Projeto" em Projetos
- [x] Adicionar handlers aos botões "Novo Contrato" em Contratos
- [x] Adicionar handlers aos botões "Baixar PDF" em Briefing
- [x] Testar navegação em todas as páginas


## Fase 12: Botões Funcionais em Orçamentos
- [x] Implementar handler para botão "Visualizar" em Orçamentos
- [x] Implementar handler para botão "Aprovar" em Orçamentos
- [x] Implementar handler para botão "Rejeitar" em Orçamentos
- [x] Implementar handler para botão "Enviar" em Orçamentos
- [x] Implementar handler para botão "Finalizar" em Orçamentos
- [x] Adicionar notificações (toasts) para feedback visual de ações
- [x] Testar todos os botões em diferentes estados de orçamento


## Fase 13: Correção do Formulário de Novo Orçamento
- [x] Adicionar validação de campos obrigatórios
- [x] Implementar notificações de erro para campos vazios
- [x] Adicionar confirmação de sucesso ao criar orçamento
- [x] Limpar formulário automaticamente após criação
- [x] Testar fluxo completo de criação


## Fase 14: Vídeo de Fundo na Página Inicio
- [x] Adicionar vídeo de fundo na página Inicio
- [x] Aplicar overlay escuro para melhorar legibilidade
- [x] Sincronizar vídeo com outras páginas
- [x] Testar reprodução e loop do vídeo


## Fase 15: Correção de Layout em Gestão de Contratos
- [x] Reorganizar botões na página de Gestão de Contratos
- [x] Melhorar espaçamento entre "Assistente Jurídico" e "Novo Contrato"
- [x] Alinhar botões no topo direito com o título
- [x] Testar responsividade do novo layout


## Fase 16: Melhorias na Navbar
- [x] Mudar ícone de Início para casinha (Home icon)
- [x] Adicionar toggle de tema Dark/Light
- [x] Criar paleta de cores para tema Light
- [x] Implementar persistência de tema no localStorage
- [x] Testar alternância entre temas


## Fase 17: Sino de Notificações
- [x] Criar componente NotificationBell com categorias (aprovação, prazo, alerta)
- [x] Implementar contador visual com badge
- [x] Adicionar resumo de notificações pendentes
- [x] Implementar marcar como lida/não lida
- [x] Adicionar funcionalidade de deletar notificações
- [x] Integrar sino na sidebar (desktop) e navbar mobile
- [x] Testar interatividade do sino


## Fase 18: Correções de Navbar e Tema
- [x] Remover NotificationBell da sidebar
- [x] Manter NotificationBell apenas na navbar mobile
- [x] Corrigir toggle de tema Dark/Light
- [x] Adicionar ThemeToggleButton visível na navbar
- [x] Testar alternância de temas


## Fase 19: Tabela de Precificação e Tipos de Serviços
- [x] Adicionar aba "Tabela de Precificação" com matriz de modelos
- [x] Criar aba "Tipos de Serviços" com 6 cards detalhados
- [x] Incluir "O que vem nele" em cada serviço
- [x] Incluir "Entregáveis" em cada serviço
- [x] Manter funcionalidade de orçamento personalizado
- [x] Organizar em abas: Meus Orçamentos, Tabela, Tipos, Status


## Fase 20: Botão Solicitar nos Cards de Serviços
- [x] Adicionar botão "Solicitar" em cada card de Tipos de Serviços
- [x] Preencher automaticamente o formulário com dados do serviço
- [x] Redirecionar para aba "Meus Orçamentos" com formulário aberto
- [x] Mostrar notificação de sucesso ao clicar
