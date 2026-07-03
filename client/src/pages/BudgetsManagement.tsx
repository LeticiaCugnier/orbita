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
import {
  Palette,
  Megaphone,
  Shirt,
  Lightbulb,
  PenTool,
  Layers
} from "lucide-react";

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
  const [statusFilter, setStatusFilter] = useState("all");
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
        return "bg-muted text-muted-foreground border-border";
      case "sent":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/30";
      case "finalized":
        return "bg-primary/10 text-primary border-primary/30";
      default:
        return "bg-muted text-muted-foreground border-border";
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
    <Card
      key={budget.id}
      className="rounded-2xl border border-border/70 bg-[#111620] p-5 hover:border-[#8EE6D2]/50 transition-all"
    >
      <div className="grid grid-cols-1 2xl:grid-cols-[minmax(320px,1fr)_460px_320px] items-center gap-5">
        <div className="flex items-start gap-4 min-w-0">
          <div className="h-12 w-12 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-5 h-5 text-[#8EE6D2]" />
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-white text-lg truncate">
              {budget.projectTitle}
            </h3>

            <p className="text-sm text-slate-400">
              {budget.clientName}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Criado em {budget.createdAt.toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 min-h-[68px]">
            <p className="text-xs text-slate-500">Valor</p>
            <p className="font-semibold text-white whitespace-nowrap">{budget.amount}</p>
          </div>

          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 min-h-[68px]">
            <p className="text-xs text-slate-500">Válido até</p>
            <p className="font-semibold text-white whitespace-nowrap">
              {budget.validUntil.toLocaleDateString("pt-BR")}
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 min-h-[68px]">
            <p className="text-xs text-slate-500">Status</p>
            <Badge className={`${getStatusColor(budget.status)} border mt-1`}>
              {getStatusLabel(budget.status)}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 min-w-[300px]">
          <Button
            size="sm"
            variant="outline"
            className="border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
            onClick={() => handleVisualize(budget.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver
          </Button>

          {budget.status === "draft" && (
            <Button
              size="sm"
              className="bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
              onClick={() => handleStatusChange(budget.id, "sent")}
            >
              Enviar
            </Button>
          )}

          {budget.status === "sent" && (
            <>
              <Button
                size="sm"
                className="bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
                onClick={() => handleStatusChange(budget.id, "approved")}
              >
                <Check className="w-4 h-4 mr-2" />
                Aprovar
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
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
              className="bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
              onClick={() =>
                handleFinalize(budget.id, budget.projectTitle, budget.clientName)
              }
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Finalizar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6 rounded-3xl bg-[#0B0F17] p-6">
      <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-[#181A2E] via-[#111827] to-[#08232B] p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <Badge className="mb-4 bg-cyan-500/10 text-cyan-300 border border-cyan-400/40">
              Financeiro Orbita
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-white font-['Space_Grotesk']">
              Orçamentos 💰
            </h1>

            <p className="text-slate-300 mt-3 max-w-xl">
              Gerencie, acompanhe e finalize seus orçamentos criativos.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="gap-2 whitespace-nowrap bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
              >
                <Plus className="w-4 h-4" />
                Novo Orçamento
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl bg-[#111620] border-border/70 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Criar Novo Orçamento Personalizado
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <Button
                  onClick={handleCreateBudget}
                  className="w-full bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
                >
                  Criar Orçamento
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total de Orçamentos</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {mockBudgets.length}
              </h2>
              <p className="text-xs text-cyan-400 mt-2">+2 esta semana</p>
            </div>

            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Em Andamento</p>
              <h2 className="text-3xl font-bold text-orange-400 mt-2">
                {filterBudgets("sent").length}
              </h2>
              <p className="text-xs text-orange-400 mt-2">Aguardando resposta</p>
            </div>

            <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Aprovados</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {filterBudgets("approved").length}
              </h2>
              <p className="text-xs text-green-400 mt-2">Este mês</p>
            </div>

            <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Finalizados</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {filterBudgets("finalized").length}
              </h2>
              <p className="text-xs text-blue-400 mt-2">Projetos convertidos</p>
            </div>

            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </Card>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto rounded-2xl bg-[#111620] border border-border/70 p-1">
          <TabsTrigger
            value="all"
            className="rounded-xl data-[state=active]:bg-[#8EE6D2] data-[state=active]:text-[#071014]"
          >
            Meus Orçamentos
          </TabsTrigger>

          <TabsTrigger
            value="pricing"
            className="rounded-xl data-[state=active]:bg-[#8EE6D2] data-[state=active]:text-[#071014]"
          >
            Precificação
          </TabsTrigger>

          <TabsTrigger
            value="services"
            className="rounded-xl data-[state=active]:bg-[#8EE6D2] data-[state=active]:text-[#071014]"
          >
            Serviços
          </TabsTrigger>

          <TabsTrigger
            value="status"
            className="rounded-xl data-[state=active]:bg-[#8EE6D2] data-[state=active]:text-[#071014]"
          >
            Status
          </TabsTrigger>
        </TabsList>

        {/* Aba: Meus Orçamentos */}
        <TabsContent value="all" className="space-y-4">
          <div className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
            {[
              ["all", "Geral"],
              ["approved", "Aprovados"],
              ["sent", "Em Andamento"],
              ["finalized", "Finalizados"],
              ["draft", "Rascunhos"],
            ].map(([value, label]) => (
              <Button
                key={value}
                variant={statusFilter === value ? "default" : "outline"}
                onClick={() => setStatusFilter(value)}
                className={
                  statusFilter === value
                    ? "bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
                    : "border-border/70 bg-[#111620] text-slate-300 hover:bg-[#18202e]"
                }
              >
                {label}
              </Button>
            ))}
          </div>
          {filterBudgets(statusFilter === "all" ? undefined : statusFilter).length > 0 ? (
            <div className="space-y-3">
              {filterBudgets(statusFilter === "all" ? undefined : statusFilter).map(renderBudgetCard)}
            </div>
          ) : (
            <Card className="p-12 text-center border-dashed bg-[#111620] border-border/70">
              <p className="text-slate-400">
                Nenhum orçamento encontrado nesta categoria
              </p>
            </Card>
          )}
        </TabsContent>

        {/* Aba: Tabela de Precificação */}
        <TabsContent value="pricing" className="space-y-6 mt-6">
          <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
            <Badge className="mb-4 bg-[#8EE6D2]/10 text-[#8EE6D2] border border-[#8EE6D2]/40">
              Precificação
            </Badge>

            <h2 className="text-2xl font-bold text-white mb-3">
              Tabela de Precificação
            </h2>

            <p className="text-slate-400 mb-6">
              O valor do projeto pode ser dividido por etapa ou considerado de forma integral.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {[
                "Complexidade da coleção",
                "Quantidade de peças desenvolvidas",
                "Número de adaptações e revisões",
                "Tempo de desenvolvimento",
                "Exclusividade e licenciamento",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300"
                >
                  <span className="text-[#8EE6D2] font-bold mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-white mb-4">
              Qual modelo usar em cada job?
            </h3>

            <div className="overflow-x-auto rounded-xl border border-white/10">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-slate-300">Tipo de Serviço</TableHead>
                    <TableHead className="text-slate-300">Por Hora</TableHead>
                    <TableHead className="text-slate-300">Por Projeto</TableHead>
                    <TableHead className="text-slate-300">Por Valor</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {pricingTableData.map((row, idx) => (
                    <TableRow key={idx} className="border-white/10 hover:bg-white/[0.03]">
                      <TableCell className="font-semibold text-white">
                        {row.serviceType}
                      </TableCell>

                      <TableCell className="text-slate-400">
                        {row.hourly}
                      </TableCell>

                      <TableCell className="text-slate-400">
                        {row.project}
                      </TableCell>

                      <TableCell className="text-slate-400">
                        {row.value}
                      </TableCell>
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
            {/* Identidade Visual */}
            <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6 hover:border-[#8EE6D2]/50 transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center">
                    <Palette className="h-6 w-6 text-[#8EE6D2]" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Identidade Visual
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Branding
                    </p>
                  </div>
                </div>

                <Badge className="bg-[#8EE6D2]/10 text-[#8EE6D2] border border-[#8EE6D2]/40">
                  Estratégia
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    O que vem nele:
                  </p>

                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Logo</li>
                    <li>• Manual de marca</li>
                    <li>• Paleta de cores</li>
                    <li>• Tipografia</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    Entregáveis:
                  </p>

                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• AI</li>
                    <li>• PDF</li>
                    <li>• SVG</li>
                  </ul>
                </div>
              </div>

              <Button className="w-full mt-6 bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]">
                Solicitar Serviço
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
            {/* Criação de Estampas */}
            <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6 hover:border-[#8EE6D2]/50 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Criação de Estampas</h3>
                <Badge className="bg-[#8EE6D2]/10 text-[#8EE6D2] border border-[#8EE6D2]/40">
                  Design
                </Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">O que vem nele:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Designs originais</li>
                    <li>• Variações de cores</li>
                    <li>• Testes de impressão</li>
                    <li>• Adaptações</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Entregáveis:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Arquivos de alta resolução</li>
                    <li>• Separação de cores</li>
                    <li>• Documentação técnica</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-6 bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]">
                Solicitar Serviço
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Gestão de Redes Sociais */}
            <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6 hover:border-[#8EE6D2]/50 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Gestão de Redes Sociais</h3>
                <Badge className="bg-[#8EE6D2]/10 text-[#8EE6D2] border border-[#8EE6D2]/40">
                  Marketing
                </Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">O que vem nele:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Planejamento de conteúdo</li>
                    <li>• Criação de posts</li>
                    <li>• Agendamento</li>
                    <li>• Análise de desempenho</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Entregáveis:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Calendário editorial</li>
                    <li>• Relatórios mensais</li>
                    <li>• Conteúdo em múltiplos formatos</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-6 bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]">
                Solicitar Serviço
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Desenvolvimento de Coleção */}
            <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6 hover:border-[#8EE6D2]/50 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Desenvolvimento de Coleção</h3>
                <Badge className="bg-[#8EE6D2]/10 text-[#8EE6D2] border border-[#8EE6D2]/40">
                  Completo
                </Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">O que vem nele:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Pesquisa de tendências</li>
                    <li>• Conceituação</li>
                    <li>• Desenvolvimento de peças</li>
                    <li>• Testes e ajustes</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Entregáveis:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Lookbook</li>
                    <li>• Especificações técnicas</li>
                    <li>• Arquivos para produção</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-6 bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]">
                Solicitar Serviço
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Consultoria Criativa */}
            <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6 hover:border-[#8EE6D2]/50 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Consultoria Criativa</h3>
                <Badge className="bg-[#8EE6D2]/10 text-[#8EE6D2] border border-[#8EE6D2]/40">
                  Mentoria
                </Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">O que vem nele:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Sessões de mentoria</li>
                    <li>• Análise de portfólio</li>
                    <li>• Feedback estratégico</li>
                    <li>• Planejamento de carreira</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Entregáveis:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Plano de ação</li>
                    <li>• Materiais de suporte</li>
                    <li>• Acompanhamento contínuo</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-6 bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]">
                Solicitar Serviço
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            {/* Direção de Arte */}
            <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6 hover:border-[#8EE6D2]/50 transition-all">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Direção de Arte</h3>
                <Badge className="bg-[#8EE6D2]/10 text-[#8EE6D2] border border-[#8EE6D2]/40">
                  Liderança
                </Badge>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">O que vem nele:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Conceito criativo</li>
                    <li>• Direcionamento visual</li>
                    <li>• Supervisão de equipe</li>
                    <li>• Aprovações</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Entregáveis:</p>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Briefing criativo</li>
                    <li>• Direcionamentos visuais</li>
                    <li>• Relatórios de progresso</li>
                  </ul>
                </div>
              </div>
              <Button className="w-full mt-6 bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]">
                Solicitar Serviço
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
        </TabsContent>

        {/* Aba: Por Status */}
        <TabsContent value="status" className="space-y-4 mt-6">
          <div className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
            {[
              ["all", "Geral"],
              ["approved", "Aprovados"],
              ["sent", "Em Andamento"],
              ["finalized", "Finalizados"],
              ["draft", "Rascunhos"],
            ].map(([value, label]) => (
              <Button
                key={value}
                variant={statusFilter === value ? "default" : "outline"}
                onClick={() => setStatusFilter(value)}
                className={
                  statusFilter === value
                    ? "bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
                    : "border-border/70 bg-[#111620] text-slate-300 hover:bg-[#18202e]"
                }
              >
                {label}
              </Button>
            ))}
          </div>

          {filterBudgets(statusFilter === "all" ? undefined : statusFilter).length > 0 ? (
            <div className="space-y-3">
              {filterBudgets(statusFilter === "all" ? undefined : statusFilter).map(renderBudgetCard)}
            </div>
          ) : (
            <Card className="p-12 text-center border-dashed bg-[#111620] border-border/70">
              <p className="text-slate-400">
                Nenhum orçamento encontrado nesta categoria
              </p>
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
