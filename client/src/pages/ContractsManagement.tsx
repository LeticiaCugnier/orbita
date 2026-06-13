import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Download, Eye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import LegalAIAssistant from "@/components/LegalAIAssistant";

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
  draft: "bg-gray-500/10 text-gray-500 border-gray-500/30",
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-['Space_Grotesk']">Gestão de Contratos</h1>
            <p className="text-muted-foreground mt-1">Crie, personalize e gerencie seus contratos</p>
          </div>
        </div>
        <div className="flex gap-2">
          <LegalAIAssistant contractContent="Contrato de exemplo..." />
          <Button size="lg" className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Contrato
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="templates">Modelos</TabsTrigger>
            <TabsTrigger value="contracts">Meus Contratos</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contractTemplates.map((template) => (
                <Card key={template.id} className="border-border/50 hover:border-accent/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-accent" />
                        {template.name}
                      </CardTitle>
                      <CardDescription className="mt-1">{template.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>
                    <Button className="flex-1" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Usar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <div className="space-y-3">
            {mockContracts.map((contract) => (
              <Card key={contract.id} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{contract.title}</h3>
                      <p className="text-sm text-muted-foreground">{contract.project}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <FileText className="w-3 h-3" />
                        {contract.template}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge className={statusColors[contract.status]}>
                          {statusLabels[contract.status]}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(contract.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" title="Visualizar">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Download">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </DashboardLayout>
  );
}
