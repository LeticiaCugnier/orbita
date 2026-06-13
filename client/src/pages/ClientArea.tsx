import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MessageSquare, Download, CheckCircle2, XCircle, AlertCircle, Upload } from "lucide-react";

const mockApprovals = [
  {
    id: 1,
    title: "Mockups Iniciais",
    project: "Redesign Website",
    status: "pending",
    createdAt: "2026-06-10",
    fileUrl: "#",
    comments: 2,
  },
  {
    id: 2,
    title: "Logo Versão 1",
    project: "Logo Design",
    status: "revision_requested",
    createdAt: "2026-06-08",
    fileUrl: "#",
    comments: 5,
  },
  {
    id: 3,
    title: "Brand Guidelines v2",
    project: "Branding Package",
    status: "approved",
    createdAt: "2026-06-05",
    fileUrl: "#",
    comments: 3,
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  approved: "bg-green-500/10 text-green-500 border-green-500/30",
  rejected: "bg-red-500/10 text-red-500 border-red-500/30",
  revision_requested: "bg-orange-500/10 text-orange-500 border-orange-500/30",
};

const statusLabels: Record<string, string> = {
  pending: "Aguardando Aprovação",
  approved: "Aprovado",
  rejected: "Rejeitado",
  revision_requested: "Revisão Solicitada",
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <AlertCircle className="w-4 h-4" />,
  approved: <CheckCircle2 className="w-4 h-4" />,
  rejected: <XCircle className="w-4 h-4" />,
  revision_requested: <AlertCircle className="w-4 h-4" />,
};

export default function ClientArea() {
  const [selectedApproval, setSelectedApproval] = useState<typeof mockApprovals[0] | null>(null);
  const [comment, setComment] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk']">Área do Cliente</h1>
          <p className="text-muted-foreground mt-1">Aprove peças, envie comentários e gerencie arquivos</p>
        </div>
        <Button size="lg" className="gap-2">
          <Upload className="w-4 h-4" />
          Enviar Arquivo
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Approvals List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold font-['Space_Grotesk']">Peças para Aprovação</h2>

          <div className="space-y-3">
            {mockApprovals.map((approval) => (
              <Card
                key={approval.id}
                className={`border-border/50 hover:border-accent/50 transition-colors cursor-pointer ${
                  selectedApproval?.id === approval.id ? "border-accent" : ""
                }`}
                onClick={() => setSelectedApproval(approval)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{approval.title}</h3>
                      <p className="text-sm text-muted-foreground">{approval.project}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Enviado em {new Date(approval.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge className={statusColors[approval.status]}>
                        {statusIcons[approval.status]}
                        <span className="ml-1">{statusLabels[approval.status]}</span>
                      </Badge>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageSquare className="w-4 h-4" />
                        {approval.comments}
                      </div>

                      <Button variant="ghost" size="sm" title="Download">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Details Panel */}
        <div className="space-y-4">
          {selectedApproval ? (
            <>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">{selectedApproval.title}</CardTitle>
                  <CardDescription>{selectedApproval.project}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Status</p>
                    <Badge className={statusColors[selectedApproval.status]}>
                      {statusIcons[selectedApproval.status]}
                      <span className="ml-1">{statusLabels[selectedApproval.status]}</span>
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Aprovar
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Solicitar Revisão
                    </Button>
                    <Button variant="destructive" className="w-full" size="sm">
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeitar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Comentários ({selectedApproval.comments})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    <div className="bg-muted/50 rounded p-3">
                      <p className="text-sm font-medium">Designer</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Aqui estão os primeiros mockups conforme solicitado. Fique à vontade para sugerir ajustes.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">10 de junho</p>
                    </div>

                    <div className="bg-muted/50 rounded p-3">
                      <p className="text-sm font-medium">Cliente</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Gostei da direção! Podemos ajustar as cores para algo mais vibrante?
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">11 de junho</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Adicione um comentário..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                    <Button size="sm" className="w-full">
                      Enviar Comentário
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-border/50 border-dashed">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">Selecione uma peça para ver detalhes</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
