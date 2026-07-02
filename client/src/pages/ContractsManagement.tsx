import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Download, Eye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import LegalAIAssistant from "@/components/LegalAIAssistant";
import { useLocation } from "wouter";

const contractTemplates = [
  {
    id: 1,
    name: "Contrato de Serviços Criativos",
    description: "Modelo padrão para serviços de design e criação",
    category: "Serviços",
  },
  {
    id: 2,
    name: "Contrato de Consultoria",
    description: "Para projetos de consultoria e assessoria",
    category: "Consultoria",
  },
  {
    id: 3,
    name: "Acordo de Confidencialidade",
    description: "NDA para proteger informações sensíveis",
    category: "Proteção",
  },
  {
    id: 4,
    name: "Contrato de Parceria",
    description: "Para colaborações e parcerias estratégicas",
    category: "Parceria",
  },
];

const mockContracts = [
  {
    id: 1,
    title: "Contrato - Redesign Website",
    project: "Redesign Website",
    template: "Contrato de Serviços Criativos",
    status: "signed",
    createdAt: "2026-06-10",
    signedAt: "2026-06-12",
  },
  {
    id: 2,
    title: "Contrato - Logo Design",
    project: "Logo Design",
    template: "Contrato de Serviços Criativos",
    status: "sent",
    createdAt: "2026-06-08",
    signedAt: null,
  },
  {
    id: 3,
    title: "NDA - Branding Package",
    project: "Branding Package",
    template: "Acordo de Confidencialidade",
    status: "draft",
    createdAt: "2026-06-05",
    signedAt: null,
  },
];

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground border-border",
  sent: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  signed: "bg-green-500/10 text-green-500 border-green-500/30",
  archived: "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<string, string> = {
  draft: "Rascunho",
  sent: "Enviado",
  signed: "Assinado",
  archived: "Arquivado",
};

export default function ContractsManagement() {
  const [activeTab, setActiveTab] = useState("templates");
  const [, setLocation] = useLocation();

  return (
    <DashboardLayout>
      <div className="space-y-6 rounded-3xl bg-[#0B0F17] p-6">
        <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-[#181A2E] via-[#111827] to-[#08232B] p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <Badge className="mb-4 bg-cyan-500/10 text-cyan-300 border border-cyan-400/40">
                Jurídico Orbita
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight text-white font-['Space_Grotesk']">
                Gestão de Contratos 📄
              </h1>

              <p className="text-slate-300 mt-3 max-w-xl">
                Crie, personalize e gerencie seus contratos em um único lugar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <LegalAIAssistant contractContent="Contrato de exemplo..." />

              <Button
                size="lg"
                className="gap-2 whitespace-nowrap bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
                onClick={() => setLocation("/contracts")}
              >
                <Plus className="w-4 h-4" />
                Novo Contrato
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
            <p className="text-sm text-slate-400">Modelos</p>
            <h2 className="text-3xl font-bold text-white mt-2">
              {contractTemplates.length}
            </h2>
            <p className="text-xs text-cyan-400 mt-2">Disponíveis</p>
          </Card>

          <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
            <p className="text-sm text-slate-400">Contratos</p>
            <h2 className="text-3xl font-bold text-white mt-2">
              {mockContracts.length}
            </h2>
            <p className="text-xs text-blue-400 mt-2">Criados</p>
          </Card>

          <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
            <p className="text-sm text-slate-400">Assinados</p>
            <h2 className="text-3xl font-bold text-white mt-2">
              {mockContracts.filter((c) => c.status === "signed").length}
            </h2>
            <p className="text-xs text-green-400 mt-2">Concluídos</p>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto rounded-2xl bg-[#111620] border border-border/70 p-1">
            <TabsTrigger
              value="templates"
              className="rounded-xl data-[state=active]:bg-[#8EE6D2] data-[state=active]:text-[#071014]"
            >
              Modelos
            </TabsTrigger>

            <TabsTrigger
              value="contracts"
              className="rounded-xl data-[state=active]:bg-[#8EE6D2] data-[state=active]:text-[#071014]"
            >
              Meus Contratos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {contractTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="rounded-2xl border border-border/70 bg-[#111620] p-6 hover:border-[#8EE6D2]/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#8EE6D2]" />
                    </div>

                    <Badge className="bg-[#8EE6D2]/10 text-[#8EE6D2] border border-[#8EE6D2]/40">
                      {template.category}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {template.name}
                  </h3>

                  <p className="text-sm text-slate-400 mt-2 min-h-[40px]">
                    {template.description}
                  </p>

                  <div className="flex gap-2 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>

                    <Button
                      size="sm"
                      className="flex-1 bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Usar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-3">
            {mockContracts.map((contract) => (
              <Card
                key={contract.id}
                className="rounded-2xl border border-border/70 bg-[#111620] p-5 hover:border-[#8EE6D2]/50 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="h-12 w-12 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-[#8EE6D2]" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-lg truncate">
                        {contract.title}
                      </h3>

                      <p className="text-sm text-slate-400">
                        {contract.project}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {contract.template}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:w-[420px]">
                    <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
                      <p className="text-xs text-slate-500">Criado em</p>
                      <p className="font-semibold text-white">
                        {new Date(contract.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
                      <p className="text-xs text-slate-500">Assinado em</p>
                      <p className="font-semibold text-white">
                        {contract.signedAt
                          ? new Date(contract.signedAt).toLocaleDateString("pt-BR")
                          : "-"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3">
                      <p className="text-xs text-slate-500">Status</p>
                      <Badge className={`${statusColors[contract.status]} border mt-1`}>
                        {statusLabels[contract.status]}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
