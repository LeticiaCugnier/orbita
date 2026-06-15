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
