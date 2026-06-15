import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, Check, X, ArrowRight } from "lucide-react";
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
        return "bg-gray-500";
      case "sent":
        return "bg-blue-500";
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "finalized":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
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
              <DialogTitle>Criar Novo Orçamento</DialogTitle>
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
        <TabsList className="grid w-full grid-cols-5 bg-muted">
          <TabsTrigger value="all">Geral</TabsTrigger>
          <TabsTrigger value="approved">Aprovados</TabsTrigger>
          <TabsTrigger value="sent">Em Andamento</TabsTrigger>
          <TabsTrigger value="finalized">Finalizados</TabsTrigger>
          <TabsTrigger value="draft">Rascunhos</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
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
