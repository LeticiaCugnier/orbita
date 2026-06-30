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
    <div className="space-y-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight font-['Space_Grotesk']">
            Área do Cliente
          </h1>

          <p className="text-muted-foreground mt-1">
            Aprove peças, envie comentários e acompanhe todas as aprovações.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">

          <Button
            variant="outline"
            className="gap-2 border-border/60"
          >
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>

          <div className="relative">

            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2
          h-4 w-4 text-muted-foreground"
            />

            <Input
              placeholder="Buscar projeto..."

              value={search}

              onChange={(e) => setSearch(e.target.value)}

              className="pl-10 w-full md:w-72"
            />

          </div>

          <Button
            className="gap-2 bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="w-4 h-4" />
            Novo Envio
          </Button>

        </div>

      </div>

      {/* ================= MÉTRICAS ================= */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {dashboardCards.map((card) => (

          <Card
            key={card.title}
            className="border-border/40 bg-card/60 backdrop-blur"
          >

            <CardContent className="p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-muted-foreground">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>

                  <p
                    className={`text-sm mt-2 font-medium ${card.color}`}
                  >
                    {card.variation} este mês
                  </p>

                </div>

                <div
                  className="w-12 h-12 rounded-xl
              bg-violet-500/10
              flex items-center justify-center"
                >

                  <CheckCircle2 className="w-6 h-6 text-violet-400" />

                </div>

              </div>

            </CardContent>

          </Card>

        ))}

      </div>

      {/* ================= CONTEÚDO ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* ================= TABELA ================= */}

        <div className="xl:col-span-8">

          <Card className="border-border/40 bg-card/60 backdrop-blur">

            <CardHeader className="pb-3">

              <div className="flex items-center justify-between">

                <div>

                  <CardTitle>
                    Aprovações
                  </CardTitle>

                  <CardDescription>
                    Gerencie todas as peças enviadas ao cliente.
                  </CardDescription>

                </div>

              </div>

            </CardHeader>

            <CardContent>

              {/* Tabs */}

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
              >

                <TabsList className="mb-5">

                  <TabsTrigger value="all">
                    Todas
                  </TabsTrigger>

                  <TabsTrigger value="pending">
                    Pendentes
                  </TabsTrigger>

                  <TabsTrigger value="approved">
                    Aprovadas
                  </TabsTrigger>

                  <TabsTrigger value="revision">
                    Revisão
                  </TabsTrigger>

                </TabsList>

              </Tabs>

              {/* Tabela */}

              <Table>

                <TableHeader>

                  <TableRow>

                    <TableHead>Projeto</TableHead>

                    <TableHead>Cliente</TableHead>

                    <TableHead>Designer</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead>Comentários</TableHead>

                    <TableHead>Versão</TableHead>

                    <TableHead className="text-right">
                      Ações
                    </TableHead>

                  </TableRow>

                </TableHeader>

                <TableBody>
                  {filteredApprovals.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-14"
                      >
                        <div className="space-y-2">
                          <Search className="mx-auto h-10 w-10 text-muted-foreground" />

                          <p className="font-semibold">
                            Nenhum resultado encontrado
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Tente alterar sua pesquisa.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApprovals.map((approval) => (
                      <TableRow
                        key={approval.id}
                        onClick={() => setSelectedApproval(approval)}
                        className="cursor-pointer hover:bg-muted/40 transition-colors"
                      >
                        <TableCell>
                          <div>
                            <p className="font-semibold">
                              {approval.title}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              {approval.project}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell>{approval.client}</TableCell>

                        <TableCell>{approval.designer}</TableCell>

                        <TableCell>
                          <Badge className={statusColors[approval.status]}>
                            {statusIcons[approval.status]}
                            <span className="ml-2">
                              {statusLabels[approval.status]}
                            </span>
                          </Badge>
                        </TableCell>

                        <TableCell>{approval.comments}</TableCell>

                        <TableCell>{approval.version}</TableCell>

                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>

              </Table>

            </CardContent>

          </Card>

        </div>

        {/* Painel direito será criado na Parte 4 */}

        <div className="xl:col-span-4">

          {selectedApproval && (

            <div className="sticky top-6 space-y-5">

              {/* ================= DETALHES ================= */}

              <Card className="border-border/40 bg-card/60 backdrop-blur">

                <CardHeader>

                  <CardTitle className="text-xl">
                    {selectedApproval.title}
                  </CardTitle>

                  <CardDescription>
                    {selectedApproval.project}
                  </CardDescription>

                </CardHeader>

                <CardContent className="space-y-6">

                  {/* Status */}

                  <div>

                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Status
                    </p>

                    <Badge
                      className={`gap-2 ${statusColors[selectedApproval.status]}`}
                    >
                      {statusIcons[selectedApproval.status]}
                      {statusLabels[selectedApproval.status]}
                    </Badge>

                  </div>

                  {/* Informações */}

                  <div className="space-y-4">

                    <div className="flex justify-between">

                      <span className="text-muted-foreground">
                        Cliente
                      </span>

                      <span className="font-medium">
                        {selectedApproval.client}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-muted-foreground">
                        Designer
                      </span>

                      <span className="font-medium">
                        {selectedApproval.designer}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-muted-foreground">
                        Versão
                      </span>

                      <span className="font-medium">
                        {selectedApproval.version}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-muted-foreground">
                        Data
                      </span>

                      <span className="font-medium">
                        {selectedApproval.createdAt}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-muted-foreground">
                        Comentários
                      </span>

                      <span className="font-medium">
                        {selectedApproval.comments}
                      </span>

                    </div>

                  </div>

                  {/* Download */}

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Baixar Arquivo
                  </Button>

                </CardContent>

              </Card>
              {/* Preview */}

              <Card className="border-border/40 bg-card/60">

                <CardHeader>

                  <CardTitle>
                    Preview
                  </CardTitle>

                </CardHeader>

                <CardContent>

                  <div
                    className="
          aspect-video
          rounded-lg
          border
          border-dashed
          border-border
          flex
          items-center
          justify-center
          bg-muted/30
          "
                  >

                    <div className="text-center">

                      <Eye className="mx-auto h-8 w-8 text-muted-foreground mb-3" />

                      <p className="text-sm text-muted-foreground">

                        Visualização da peça

                      </p>

                    </div>

                  </div>

                </CardContent>

              </Card>

              {/* ================= COMENTÁRIOS ================= */}

              <Card className="border-border/40 bg-card/60 backdrop-blur">

                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Comentários
                  </CardTitle>

                  <CardDescription>
                    Converse com o designer sobre esta peça.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">

                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2">

                    {/* Designer */}

                    <div className="flex gap-3">

                      <div className="h-10 w-10 rounded-full bg-violet-500 flex items-center justify-center text-white font-semibold">
                        D
                      </div>

                      <div className="flex-1 rounded-xl bg-muted p-4">

                        <div className="flex items-center justify-between">

                          <span className="font-semibold">
                            Designer
                          </span>

                          <span className="text-xs text-muted-foreground">
                            10 Jun • 09:15
                          </span>

                        </div>

                        <p className="text-sm text-muted-foreground mt-2">
                          Finalizei a primeira versão conforme o briefing.
                          Caso deseje alterar cores ou tipografia basta comentar abaixo.
                        </p>

                      </div>

                    </div>

                    {/* Cliente */}

                    <div className="flex gap-3 justify-end">

                      <div className="flex-1 max-w-[90%] rounded-xl bg-violet-600 p-4 text-white">

                        <div className="flex items-center justify-between">

                          <span className="font-semibold">
                            Você
                          </span>

                          <span className="text-xs text-violet-200">
                            10 Jun • 10:42
                          </span>

                        </div>

                        <p className="text-sm mt-2">
                          Gostei bastante da direção. Podemos testar uma versão com tons mais claros?
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="border-t pt-4 space-y-3">

                    <Textarea
                      rows={4}
                      placeholder="Escreva um comentário..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="resize-none"
                    />

                    <Button className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Enviar Comentário
                    </Button>

                  </div>

                </CardContent>

              </Card>

              {/* ================= AÇÕES ================= */}

              <Card className="border-border/40 bg-card/60 backdrop-blur">

                <CardHeader>

                  <CardTitle>
                    Aprovação
                  </CardTitle>

                  <CardDescription>
                    Escolha uma ação para esta peça.
                  </CardDescription>

                </CardHeader>

                <CardContent className="space-y-3">

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />

                    Aprovar

                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10"
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

                </CardContent>

              </Card>



              {/* ================= HISTÓRICO ================= */}

              <Card className="border-border/40 bg-card/60 backdrop-blur">

                <CardHeader>

                  <CardTitle>
                    Histórico
                  </CardTitle>

                </CardHeader>

                <CardContent className="space-y-4">

                  <div className="border-l-2 border-violet-500 pl-4">

                    <p className="font-medium">
                      Arquivo enviado
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {selectedApproval.createdAt}
                    </p>

                  </div>

                  <div className="border-l-2 border-blue-500 pl-4">

                    <p className="font-medium">
                      Cliente visualizou
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Há 2 horas
                    </p>

                  </div>

                  <div className="border-l-2 border-orange-500 pl-4">

                    <p className="font-medium">
                      Aguardando decisão
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Em andamento
                    </p>

                  </div>

                </CardContent>

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