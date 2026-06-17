import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Eye, Check, X, ArrowRight, ShoppingCart } from "lucide-react";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

interface BudgetFormData {
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  description: string;
  amount: string;
  currency: string;
  items: string;
  validUntil: string;
}

const pricingTableData = [
  {
    serviceType: "Identidade Visual",
    hourly: "Ajustes, reuniões e consultorias",
    project: "Mais recomendado",
    value: "Quando envolve estratégia e impacto de marca",
  },
  {
    serviceType: "Criação de Estampas",
    hourly: "Alterações e adaptações",
    project: "Estampa avulsa ou pacote de estampas",
    value: "Licenciamento e royalties",
  },
  {
    serviceType: "Gestão de Redes Sociais",
    hourly: "Demandas pontuais",
    project: "Planos mensais",
    value: "Quando atrelado a resultados e crescimento",
  },
  {
    serviceType: "Desenvolvimento de Coleção",
    hourly: "Consultoria e acompanhamento",
    project: "Mais recomendado",
    value: "Licenciamento ou participação nas vendas",
  },
  {
    serviceType: "Consultoria Criativa",
    hourly: "Mais recomendado",
    project: "Pacotes de mentoria",
    value: "Quando gera valor estratégico elevado",
  },
  {
    serviceType: "Direção de Arte",
    hourly: "Reuniões e acompanhamento",
    project: "Projetos fechados",
    value: "Projetos de grande impacto para a marca",
  },
];

function BudgetsManagementContent() {
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<BudgetFormData>({
    clientName: "",
    clientEmail: "",
    projectTitle: "",
    description: "",
    amount: "",
    currency: "BRL",
    items: "",
    validUntil: "",
  });

  const budgetsQuery = trpc.budgets.list.useQuery();
  const createBudgetMutation = trpc.budgets.create.useMutation();
  const updateStatusMutation = trpc.budgets.updateStatus.useMutation();
  const finalizeMutation = trpc.budgets.finalize.useMutation();

  const mockBudgets = [
    {
      id: 1,
      clientName: "Tech Corp",
      projectTitle: "Redesign Website",
      amount: "R$ 5.000,00",
      status: "approved",
      createdAt: new Date("2026-06-01"),
      validUntil: new Date("2026-07-01"),
    },
    {
      id: 2,
      clientName: "Creative Studio",
      projectTitle: "Logo Design",
      amount: "R$ 2.500,00",
      status: "sent",
      createdAt: new Date("2026-06-05"),
      validUntil: new Date("2026-06-20"),
    },
    {
      id: 3,
      clientName: "Fashion Brand",
      projectTitle: "Branding Package",
      amount: "R$ 8.000,00",
      status: "draft",
      createdAt: new Date("2026-06-10"),
      validUntil: new Date("2026-07-10"),
    },
    {
      id: 4,
      clientName: "Digital Agency",
      projectTitle: "Mobile App Design",
      amount: "R$ 12.000,00",
      status: "finalized",
      createdAt: new Date("2026-05-15"),
      validUntil: new Date("2026-06-15"),
    },
    {
      id: 5,
      clientName: "Startup XYZ",
      projectTitle: "Brand Identity",
      amount: "R$ 3.500,00",
      status: "rejected",
      createdAt: new Date("2026-06-08"),
      validUntil: new Date("2026-06-25"),
    },
  ];

  const handleCreateBudget = async () => {
    if (!formData.clientName.trim()) {
      toast.error("Por favor, preencha o nome do cliente");
      return;
    }
    if (!formData.projectTitle.trim()) {
      toast.error("Por favor, preencha o título do projeto");
      return;
    }
    if (!formData.amount.trim()) {
      toast.error("Por favor, preencha o valor do orçamento");
      return;
    }
    if (!formData.validUntil) {
      toast.error("Por favor, selecione a data de validade");
      return;
    }

    try {
      await createBudgetMutation.mutateAsync({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        projectTitle: formData.projectTitle,
        description: formData.description,
        amount: formData.amount,
        currency: formData.currency,
        items: formData.items,
        validUntil: formData.validUntil ? new Date(formData.validUntil) : undefined,
      });
      toast.success(`Orçamento "${formData.projectTitle}" criado com sucesso!`);
      setIsDialogOpen(false);
      setFormData({
        clientName: "",
        clientEmail: "",
        projectTitle: "",
        description: "",
        amount: "",
        currency: "BRL",
        items: "",
        validUntil: "",
      });
    } catch (error) {
      console.error("Erro ao criar orçamento:", error);
      toast.error("Erro ao criar o orçamento. Tente novamente.");
    }
  };

  const handleStatusChange = async (budgetId: number, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: budgetId,
        status: newStatus as any,
      });
      const statusMessages: Record<string, string> = {
        sent: "Orçamento enviado com sucesso!",
        approved: "Orçamento aprovado com sucesso!",
        rejected: "Orçamento rejeitado.",
      };
      toast.success(statusMessages[newStatus] || "Status atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar o status do orçamento.");
    }
  };

  const handleFinalize = async (budgetId: number, projectTitle: string, clientName: string) => {
    try {
      await finalizeMutation.mutateAsync({
        budgetId,
        projectTitle,
        clientName,
        clientEmail: "",
      });
      toast.success(`Orçamento "${projectTitle}" finalizado com sucesso!`);
    } catch (error) {
      console.error("Erro ao finalizar orçamento:", error);
      toast.error("Erro ao finalizar o orçamento.");
    }
  };

  const handleVisualize = (budgetId: number) => {
    const budget = mockBudgets.find((b) => b.id === budgetId);
    if (budget) {
      toast.info(`Visualizando: ${budget.projectTitle} - ${budget.clientName}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-muted";
      case "sent":
        return "bg-secondary";
      case "approved":
        return "bg-primary";
      case "rejected":
        return "bg-destructive";
      case "finalized":
        return "bg-accent";
      default:
        return "bg-muted";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft":
        return "Rascunho";
      case "sent":
        return "Enviado";
      case "approved":
        return "Aprovado";
      case "rejected":
        return "Rejeitado";
      case "finalized":
        return "Finalizado";
      default:
        return status;
    }
  };

  const filterBudgets = (status?: string) => {
    if (!status || status === "all") return mockBudgets;
    return mockBudgets.filter((b) => b.status === status);
  };

  const renderBudgetCard = (budget: any) => (
    <Card key={budget.id} className="p-4 border-border hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg">{budget.projectTitle}</h3>
          <p className="text-sm text-muted-foreground">{budget.clientName}</p>
        </div>
        <Badge className={`${getStatusColor(budget.status)} text-white`}>
          {getStatusLabel(budget.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground">Valor</p>
          <p className="font-semibold text-foreground">{budget.amount}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Válido até</p>
          <p className="text-sm text-foreground">{budget.validUntil.toLocaleDateString("pt-BR")}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1" onClick={() => handleVisualize(budget.id)}>
          <Eye className="w-4 h-4 mr-2" />
          Visualizar
        </Button>

        {budget.status === "draft" && (
          <Button
            size="sm"
            variant="default"
            className="flex-1"
            onClick={() => handleStatusChange(budget.id, "sent")}
          >
            Enviar
          </Button>
        )}

        {budget.status === "sent" && (
          <>
            <Button
              size="sm"
              variant="default"
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => handleStatusChange(budget.id, "approved")}
            >
              <Check className="w-4 h-4 mr-2" />
              Aprovar
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => handleStatusChange(budget.id, "rejected")}
            >
              <X className="w-4 h-4 mr-2" />
              Rejeitar
            </Button>
          </>
        )}

        {budget.status === "approved" && (
          <Button
            size="sm"
            variant="default"
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            onClick={() => handleFinalize(budget.id, budget.projectTitle, budget.clientName)}
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Finalizar
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orçamentos</h1>
          <p className="text-muted-foreground mt-1">Gerencie e acompanhe todos os seus orçamentos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Orçamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Orçamento Personalizado</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Nome do Cliente"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                />
                <Input
                  placeholder="Email do Cliente"
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                />
              </div>
              <Input
                placeholder="Título do Projeto"
                value={formData.projectTitle}
                onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
              />
              <Input
                placeholder="Descrição"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Valor"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
                <Input
                  placeholder="Moeda"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                />
              </div>
              <Input
                placeholder="Itens do Orçamento"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
              />
              <Input
                placeholder="Válido até"
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
              />
              <Button onClick={handleCreateBudget} className="w-full bg-blue-600 hover:bg-blue-700">
                Criar Orçamento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="all">Meus Orçamentos</TabsTrigger>
          <TabsTrigger value="pricing">Tabela de Precificação</TabsTrigger>
          <TabsTrigger value="services">Tipos de Serviços</TabsTrigger>
          <TabsTrigger value="status">Por Status</TabsTrigger>
        </TabsList>

        {/* Aba: Meus Orçamentos */}
        <TabsContent value="all" className="space-y-4 mt-6">
          <Tabs value={activeTab === "all" ? "all" : ""} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-muted mb-4">
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>Geral</TabsTrigger>
              <TabsTrigger value="approved" onClick={() => setActiveTab("approved")}>Aprovados</TabsTrigger>
              <TabsTrigger value="sent" onClick={() => setActiveTab("sent")}>Em Andamento</TabsTrigger>
              <TabsTrigger value="finalized" onClick={() => setActiveTab("finalized")}>Finalizados</TabsTrigger>
              <TabsTrigger value="draft" onClick={() => setActiveTab("draft")}>Rascunhos</TabsTrigger>
            </TabsList>
          </Tabs>
          {filterBudgets(activeTab === "all" ? undefined : activeTab).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterBudgets(activeTab === "all" ? undefined : activeTab).map(renderBudgetCard)}
            </div>
          ) : (
            <Card className="p-12 text-center border-dashed">
              <p className="text-muted-foreground">Nenhum orçamento encontrado nesta categoria</p>
            </Card>
          )}
        </TabsContent>

        {/* Aba: Tabela de Precificação */}
        <TabsContent value="pricing" className="space-y-6 mt-6">
          <Card className="p-6 border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">Tabela de Precificação</h2>
            <p className="text-muted-foreground mb-6">
              O valor do projeto pode ser dividido por etapa ou considerado de forma integral, levando em conta:
            </p>
            <ul className="space-y-2 mb-8 text-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Complexidade da coleção</strong> — Nível de detalhe e sofisticação do projeto</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Quantidade de peças desenvolvidas</strong> — Número de itens a criar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Número de adaptações e revisões</strong> — Ajustes solicitados pelo cliente</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Tempo de desenvolvimento</strong> — Horas/dias necessários</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong>Exclusividade e licenciamento</strong> — Direitos de uso e propriedade intelectual</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-foreground mb-4">Qual Modelo Usar em Cada Job?</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Tipo de Serviço</TableHead>
                    <TableHead className="font-bold">Por Hora</TableHead>
                    <TableHead className="font-bold">Por Projeto</TableHead>
                    <TableHead className="font-bold">Por Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingTableData.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-semibold text-foreground">{row.serviceType}</TableCell>
                      <TableCell className="text-muted-foreground">{row.hourly}</TableCell>
                      <TableCell className="text-muted-foreground">{row.project}</TableCell>
                      <TableCell className="text-muted-foreground">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Aba: Tipos de Serviços */}
        <TabsContent value="services" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identidade Visual */}
            <Card className="p-6 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Identidade Visual</h3>
                <Badge className="bg-blue-600">Estratégia</Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">O que vem nele:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Logo e variações</li>
                    <li>• Paleta de cores</li>
                    <li>• Tipografia</li>
                    <li>• Manual de marca</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Entregáveis:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Arquivos vetoriais (AI, EPS)</li>
                    <li>• Guia de aplicação</li>
                    <li>• Mockups</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={() => {
                setFormData({
                  ...formData,
                  projectTitle: "Identidade Visual",
                  description: "Desenvolvimento de identidade visual completa: logo, paleta de cores, tipografia e manual de marca.",
                  items: "Logo e variações, Paleta de cores, Tipografia, Manual de marca",
                });
                setIsDialogOpen(true);
                setActiveTab("all");
                toast.success("Formulário preenchido com Identidade Visual");
              }}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Solicitar
              </Button>
            </Card>

            {/* Criação de Estampas */}
            <Card className="p-6 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Criação de Estampas</h3>
                <Badge className="bg-purple-600">Design</Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">O que vem nele:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Designs originais</li>
                    <li>• Variações de cores</li>
                    <li>• Testes de impressão</li>
                    <li>• Adaptações</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Entregáveis:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Arquivos de alta resolução</li>
                    <li>• Separação de cores</li>
                    <li>• Documentação técnica</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={() => {
                setFormData({
                  ...formData,
                  projectTitle: "Criação de Estampas",
                  description: "Desenvolvimento de designs originais de estampas com variações de cores e testes de impressão.",
                  items: "Designs originais, Variações de cores, Testes de impressão, Adaptações",
                });
                setIsDialogOpen(true);
                setActiveTab("all");
                toast.success("Formulário preenchido com Criação de Estampas");
              }}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Solicitar
              </Button>
            </Card>

            {/* Gestão de Redes Sociais */}
            <Card className="p-6 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Gestão de Redes Sociais</h3>
                <Badge className="bg-green-600">Marketing</Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">O que vem nele:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Planejamento de conteúdo</li>
                    <li>• Criação de posts</li>
                    <li>• Agendamento</li>
                    <li>• Análise de desempenho</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Entregáveis:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Calendário editorial</li>
                    <li>• Relatórios mensais</li>
                    <li>• Conteúdo em múltiplos formatos</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={() => {
                setFormData({
                  ...formData,
                  projectTitle: "Gestão de Redes Sociais",
                  description: "Planejamento, criação e agendamento de conteúdo para redes sociais com análise de desempenho.",
                  items: "Planejamento de conteúdo, Criação de posts, Agendamento, Análise de desempenho",
                });
                setIsDialogOpen(true);
                setActiveTab("all");
                toast.success("Formulário preenchido com Gestão de Redes Sociais");
              }}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Solicitar
              </Button>
            </Card>

            {/* Desenvolvimento de Coleção */}
            <Card className="p-6 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Desenvolvimento de Coleção</h3>
                <Badge className="bg-orange-600">Completo</Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">O que vem nele:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Pesquisa de tendências</li>
                    <li>• Conceituação</li>
                    <li>• Desenvolvimento de peças</li>
                    <li>• Testes e ajustes</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Entregáveis:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Lookbook</li>
                    <li>• Especificações técnicas</li>
                    <li>• Arquivos para produção</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={() => {
                setFormData({
                  ...formData,
                  projectTitle: "Desenvolvimento de Coleção",
                  description: "Desenvolvimento completo de coleção com pesquisa, conceitualição, desenvolvimento e testes.",
                  items: "Pesquisa de tendências, Conceitualição, Desenvolvimento de peças, Testes e ajustes",
                });
                setIsDialogOpen(true);
                setActiveTab("all");
                toast.success("Formulário preenchido com Desenvolvimento de Coleção");
              }}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Solicitar
              </Button>
            </Card>

            {/* Consultoria Criativa */}
            <Card className="p-6 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Consultoria Criativa</h3>
                <Badge className="bg-indigo-600">Mentoria</Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">O que vem nele:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Sessões de mentoria</li>
                    <li>• Análise de portfólio</li>
                    <li>• Feedback estratégico</li>
                    <li>• Planejamento de carreira</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Entregáveis:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Plano de ação</li>
                    <li>• Materiais de suporte</li>
                    <li>• Acompanhamento contínuo</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={() => {
                setFormData({
                  ...formData,
                  projectTitle: "Consultoria Criativa",
                  description: "Sessões de mentoria criativa com análise de portfólio e feedback estratégico.",
                  items: "Sessões de mentoria, Análise de portfólio, Feedback estratégico, Planejamento de carreira",
                });
                setIsDialogOpen(true);
                setActiveTab("all");
                toast.success("Formulário preenchido com Consultoria Criativa");
              }}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Solicitar
              </Button>
            </Card>

            {/* Direção de Arte */}
            <Card className="p-6 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Direção de Arte</h3>
                <Badge className="bg-red-600">Liderança</Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">O que vem nele:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Conceito criativo</li>
                    <li>• Direcionamento visual</li>
                    <li>• Supervisão de equipe</li>
                    <li>• Aprovações</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Entregáveis:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Briefing criativo</li>
                    <li>• Direcionamentos visuais</li>
                    <li>• Relatórios de progresso</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700" onClick={() => {
                setFormData({
                  ...formData,
                  projectTitle: "Direção de Arte",
                  description: "Direção criativa completa com conceito, direcionamento visual e supervisão de equipe.",
                  items: "Conceito criativo, Direcionamento visual, Supervisão de equipe, Aprovações",
                });
                setIsDialogOpen(true);
                setActiveTab("all");
                toast.success("Formulário preenchido com Direção de Arte");
              }}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Solicitar
              </Button>
            </Card>
          </div>
        </TabsContent>

        {/* Aba: Por Status */}
        <TabsContent value="status" className="space-y-4 mt-6">
          <Tabs value={activeTab === "status" ? "all" : ""} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-muted mb-4">
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>Geral</TabsTrigger>
              <TabsTrigger value="approved" onClick={() => setActiveTab("approved")}>Aprovados</TabsTrigger>
              <TabsTrigger value="sent" onClick={() => setActiveTab("sent")}>Em Andamento</TabsTrigger>
              <TabsTrigger value="finalized" onClick={() => setActiveTab("finalized")}>Finalizados</TabsTrigger>
              <TabsTrigger value="draft" onClick={() => setActiveTab("draft")}>Rascunhos</TabsTrigger>
            </TabsList>
          </Tabs>
          {filterBudgets(activeTab === "status" ? "all" : activeTab).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterBudgets(activeTab === "status" ? "all" : activeTab).map(renderBudgetCard)}
            </div>
          ) : (
            <Card className="p-12 text-center border-dashed">
              <p className="text-muted-foreground">Nenhum orçamento encontrado nesta categoria</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function BudgetsManagement() {
  return (
    <DashboardLayout>
      <BudgetsManagementContent />
    </DashboardLayout>
  );
}
