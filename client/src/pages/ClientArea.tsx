import { useState, type ReactNode } from "react";

import DashboardLayout from "@/components/DashboardLayout";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Search,
  Filter,
  Plus,
  Upload,
  Download,
  Eye,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";



/* -------------------------------------------------------------------------- */
/*                                   Dados                                    */
/* -------------------------------------------------------------------------- */
type ApprovalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "revision_requested";

const mockApprovals = [
  {
    id: 1,
    title: "Homepage Desktop",
    project: "Redesign Website",
    client: "Instituto Orion",
    status: "pending",
    createdAt: "10/06/2026",
    comments: 2,
    designer: "Lucas Martins",
    version: "v1.0",
    fileUrl: "#",
  },
  {
    id: 2,
    title: "Logo Principal",
    project: "Branding",
    client: "TechNova",
    status: "revision_requested",
    createdAt: "08/06/2026",
    comments: 5,
    designer: "Amanda Silva",
    version: "v2",
    fileUrl: "#",
  },
  {
    id: 3,
    title: "Manual da Marca",
    project: "Branding",
    client: "Solar Engenharia",
    status: "approved",
    createdAt: "05/06/2026",
    comments: 3,
    designer: "Pedro Costa",
    version: "Final",
    fileUrl: "#",
  },
  {
    id: 4,
    title: "Post Instagram",
    project: "Social Media",
    client: "Orion Labs",
    status: "pending",
    createdAt: "03/06/2026",
    comments: 1,
    designer: "Fernanda",
    version: "v3",
    fileUrl: "#",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Configuração Status                           */
/* -------------------------------------------------------------------------- */

const statusColors: Record<string, string> = {
  pending:
    "bg-blue-500/15 text-blue-400 border border-blue-500/30",

  approved:
    "bg-green-500/15 text-green-400 border border-green-500/30",

  rejected:
    "bg-red-500/15 text-red-400 border border-red-500/30",

  revision_requested:
    "bg-orange-500/15 text-orange-400 border border-orange-500/30",
};

const statusLabels: Record<string, string> = {
  pending: "Aguardando",
  approved: "Aprovado",
  rejected: "Rejeitado",
  revision_requested: "Revisão",
};

const statusIcons: Record<string, ReactNode> = {
  pending: <AlertCircle className="w-4 h-4" />,
  approved: <CheckCircle2 className="w-4 h-4" />,
  rejected: <XCircle className="w-4 h-4" />,
  revision_requested: <AlertCircle className="w-4 h-4" />,
};

/* -------------------------------------------------------------------------- */
/*                               Cards superiores                             */
/* -------------------------------------------------------------------------- */

const dashboardCards = [
  {
    title: "Total de Aprovações",
    value: 28,
    variation: "+12%",
    color: "text-violet-400",
  },
  {
    title: "Pendentes",
    value: 6,
    variation: "+3%",
    color: "text-blue-400",
  },
  {
    title: "Aprovadas",
    value: 18,
    variation: "+22%",
    color: "text-green-400",
  },
  {
    title: "Revisões",
    value: 4,
    variation: "-2%",
    color: "text-orange-400",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Componente Principal                          */
/* -------------------------------------------------------------------------- */

function ClientAreaContent() {
  const [selectedApproval, setSelectedApproval] = useState(mockApprovals[0]);

  const [comment, setComment] = useState("");

  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("all");

  const filteredApprovals = mockApprovals.filter((item) => {

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.project.toLowerCase().includes(search.toLowerCase()) ||
      item.client.toLowerCase().includes(search.toLowerCase());

    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "approved"
          ? item.status === "approved"
          : activeTab === "pending"
            ? item.status === "pending"
            : item.status === "revision_requested";

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 rounded-3xl bg-[#0B0F17] p-6">
      {/* HERO */}
      <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-[#181A2E] via-[#111827] to-[#08232B] p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <Badge className="mb-4 bg-cyan-500/10 text-cyan-300 border border-cyan-400/40">
              Área do Cliente Orbita
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-white font-['Space_Grotesk']">
              Área do Cliente ✨
            </h1>

            <p className="text-slate-300 mt-3 max-w-xl">
              Aprove peças, envie comentários e acompanhe todas as aprovações em um único lugar.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <Button
              variant="outline"
              className="gap-2 border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
            >
              <Filter className="w-4 h-4" />
              Filtrar
            </Button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />

              <Input
                placeholder="Buscar projeto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-full md:w-72 bg-[#111620] border-border/70 text-white placeholder:text-slate-500"
              />
            </div>

            <Button className="gap-2 bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]">
              <Plus className="w-4 h-4" />
              Novo Envio
            </Button>
          </div>
        </div>
      </div>

      {/* MÉTRICAS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => (
          <Card
            key={card.title}
            className="rounded-2xl border border-border/70 bg-[#111620] p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{card.title}</p>

                <h2 className="text-3xl font-bold text-white mt-2">
                  {card.value}
                </h2>

                <p className={`text-xs mt-2 font-medium ${card.color}`}>
                  {card.variation} este mês
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#8EE6D2]" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* CONTEÚDO */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LISTA */}
        <div className="xl:col-span-8">
          <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">
                Aprovações
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Gerencie todas as peças enviadas ao cliente.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto rounded-2xl bg-[#0B0F17] border border-border/70 p-1 mb-6">
                <TabsTrigger
                  value="all"
                  className="rounded-xl data-[state=active]:bg-[#8EE6D2] data-[state=active]:text-[#071014]"
                >
                  Todas
                </TabsTrigger>

                <TabsTrigger
                  value="pending"
                  className="rounded-xl data-[state=active]:bg-[#8EE6D2] data-[state=active]:text-[#071014]"
                >
                  Pendentes
                </TabsTrigger>

                <TabsTrigger
                  value="approved"
                  className="rounded-xl data-[state=active]:bg-[#8EE6D2] data-[state=active]:text-[#071014]"
                >
                  Aprovadas
                </TabsTrigger>

                <TabsTrigger
                  value="revision"
                  className="rounded-xl data-[state=active]:bg-[#8EE6D2] data-[state=active]:text-[#071014]"
                >
                  Revisão
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-3">
              {filteredApprovals.length === 0 ? (
                <Card className="p-12 text-center border-dashed bg-[#0B0F17] border-border/70">
                  <Search className="mx-auto h-10 w-10 text-slate-500 mb-3" />
                  <p className="font-semibold text-white">
                    Nenhum resultado encontrado
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Tente alterar sua pesquisa.
                  </p>
                </Card>
              ) : (
                filteredApprovals.map((approval) => (
                  <Card
                    key={approval.id}
                    onClick={() => setSelectedApproval(approval)}
                    className="rounded-2xl border border-border/70 bg-[#0B0F17] p-5 hover:border-[#8EE6D2]/50 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="h-12 w-12 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center shrink-0">
                          <Upload className="w-5 h-5 text-[#8EE6D2]" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-white text-lg truncate">
                            {approval.title}
                          </h3>

                          <p className="text-sm text-slate-400">
                            {approval.project}
                          </p>

                          <p className="text-xs text-slate-500 mt-1">
                            Cliente: {approval.client}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:w-[420px]">
                        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
                          <p className="text-xs text-slate-500">Designer</p>
                          <p className="font-semibold text-white">
                            {approval.designer}
                          </p>
                        </div>

                        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
                          <p className="text-xs text-slate-500">Versão</p>
                          <p className="font-semibold text-white">
                            {approval.version}
                          </p>
                        </div>

                        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
                          <p className="text-xs text-slate-500">Status</p>
                          <Badge className={`gap-2 mt-1 ${statusColors[approval.status]}`}>
                            {statusIcons[approval.status]}
                            {statusLabels[approval.status]}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* PAINEL DIREITO */}
        <div className="xl:col-span-4">
          {selectedApproval && (
            <div className="sticky top-6 space-y-5">
              <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white">
                    {selectedApproval.title}
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    {selectedApproval.project}
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                      Status
                    </p>

                    <Badge className={`gap-2 ${statusColors[selectedApproval.status]}`}>
                      {statusIcons[selectedApproval.status]}
                      {statusLabels[selectedApproval.status]}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {[
                      ["Cliente", selectedApproval.client],
                      ["Designer", selectedApproval.designer],
                      ["Versão", selectedApproval.version],
                      ["Data", selectedApproval.createdAt],
                      ["Comentários", selectedApproval.comments],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3"
                      >
                        <span className="text-sm text-slate-500">
                          {label}
                        </span>

                        <span className="text-sm font-semibold text-white">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2 border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
                  >
                    <Download className="w-4 h-4" />
                    Baixar Arquivo
                  </Button>
                </div>
              </Card>

              <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Preview
                </h2>

                <div className="aspect-video rounded-2xl border border-dashed border-border/70 flex items-center justify-center bg-[#0B0F17]">
                  <div className="text-center">
                    <Eye className="mx-auto h-8 w-8 text-slate-500 mb-3" />

                    <p className="text-sm text-slate-400">
                      Visualização da peça
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                <div className="mb-5">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                    <MessageSquare className="w-5 h-5 text-[#8EE6D2]" />
                    Comentários
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    Converse com o designer sobre esta peça.
                  </p>
                </div>

                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#8EE6D2]/10 text-[#8EE6D2] flex items-center justify-center font-semibold">
                      D
                    </div>

                    <div className="flex-1 rounded-xl bg-[#0B0F17] border border-white/10 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">
                          Designer
                        </span>

                        <span className="text-xs text-slate-500">
                          10 Jun • 09:15
                        </span>
                      </div>

                      <p className="text-sm text-slate-400 mt-2">
                        Finalizei a primeira versão conforme o briefing.
                        Caso deseje alterar cores ou tipografia basta comentar abaixo.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 max-w-[90%] rounded-xl bg-[#8EE6D2] p-4 text-[#071014]">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">
                          Você
                        </span>

                        <span className="text-xs text-[#071014]/70">
                          10 Jun • 10:42
                        </span>
                      </div>

                      <p className="text-sm mt-2">
                        Gostei bastante da direção. Podemos testar uma versão com tons mais claros?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mt-5 space-y-3">
                  <Textarea
                    rows={4}
                    placeholder="Escreva um comentário..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="resize-none bg-[#0B0F17] border-border/70 text-white placeholder:text-slate-500"
                  />

                  <Button className="w-full bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Enviar Comentário
                  </Button>
                </div>
              </Card>
              <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-white">
                    Aprovação
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    Escolha uma ação para esta peça.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Aprovar
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-orange-500/40 text-orange-400 bg-transparent hover:bg-orange-500/10"
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Solicitar Revisão
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Rejeitar
                  </Button>
                </div>
              </Card>

              <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                <h2 className="text-xl font-bold text-white mb-5">
                  Histórico
                </h2>

                <div className="space-y-4">
                  <div className="border-l-2 border-[#8EE6D2] pl-4">
                    <p className="font-medium text-white">
                      Arquivo enviado
                    </p>

                    <p className="text-sm text-slate-400">
                      {selectedApproval.createdAt}
                    </p>
                  </div>

                  <div className="border-l-2 border-blue-500 pl-4">
                    <p className="font-medium text-white">
                      Cliente visualizou
                    </p>

                    <p className="text-sm text-slate-400">
                      Há 2 horas
                    </p>
                  </div>

                  <div className="border-l-2 border-orange-500 pl-4">
                    <p className="font-medium text-white">
                      Aguardando decisão
                    </p>

                    <p className="text-sm text-slate-400">
                      Em andamento
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClientArea() {
  return (
    <DashboardLayout>
      <ClientAreaContent />
    </DashboardLayout>
  );
}