import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  Plus, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  FileText,
  Users,
  Zap,
  LogOut
} from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { logout } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    logout();
  };

  // Dados mock para demonstração
  const projects = [
    { id: 1, name: "Redesign Website", client: "Tech Corp", status: "Em Criação", progress: 65, dueDate: "15 Jun" },
    { id: 2, name: "Logo Design", client: "Startup XYZ", status: "Aprovação", progress: 80, dueDate: "20 Jun" },
    { id: 3, name: "Branding Package", client: "Fashion Brand", status: "Briefing", progress: 30, dueDate: "25 Jun" },
  ];

  const pendencies = [
    { id: 1, title: "Aprovação de mockups", project: "Redesign Website", dueIn: "2 dias" },
    { id: 2, title: "Revisão de contrato", project: "Logo Design", dueIn: "1 dia" },
    { id: 3, title: "Feedback do cliente", project: "Branding Package", dueIn: "3 dias" },
  ];

  const upcomingDeliverables = [
    { id: 1, name: "Design Files", project: "Redesign Website", date: "15 Jun" },
    { id: 2, name: "Final Mockups", project: "Logo Design", date: "18 Jun" },
    { id: 3, name: "Brand Guidelines", project: "Branding Package", date: "22 Jun" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-['Space_Grotesk']">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Bem-vindo de volta! Aqui está sua visão geral de projetos.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button size="lg" className="gap-2 flex-1 md:flex-none">
              <Plus className="w-4 h-4" />
              Novo Projeto
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Projetos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">+1 esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pendências</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">3</div>
              <p className="text-xs text-muted-foreground mt-1">Ação necessária</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Próximas Entregas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">Nos próximos 10 dias</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conclusão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground mt-1">Média de progresso</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projetos em Andamento */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-['Space_Grotesk']">Projetos em Andamento</h2>
              <Button variant="ghost" size="sm">Ver Todos</Button>
            </div>

            <div className="space-y-3">
              {projects.map((project) => (
                <Card key={project.id} className="border-border/50 hover:border-accent/50 transition-colors cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                      </div>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                        <span>Entrega</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.dueDate}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pendências */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-['Space_Grotesk']">Pendências</h2>
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>

            <div className="space-y-2">
              {pendencies.map((item) => (
                <Card key={item.id} className="border-border/50 border-l-2 border-l-orange-500">
                  <CardContent className="pt-4">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.project}</p>
                    <p className="text-xs text-orange-500 mt-2 font-medium">Vence em {item.dueIn}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Próximas Entregas e Ações Rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Próximas Entregas */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Próximas Entregas
              </CardTitle>
              <CardDescription>Prazos dos próximos 10 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeliverables.map((item) => (
                  <div key={item.id} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.project}</p>
                    </div>
                    <Badge variant="secondary">{item.date}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Ações Rápidas
              </CardTitle>
              <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-xs">Novo Briefing</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-xs">Convidar Cliente</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs">Aprovações</span>
                </Button>
                <Button variant="outline" className="h-auto py-3 flex flex-col items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-xs">Relatórios</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
