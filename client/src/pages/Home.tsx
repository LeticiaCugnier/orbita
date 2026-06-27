import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
  LogOut,
  ArrowUpRight,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function Home() {
  const { logout } = useAuth();
  const [, setLocation] = useLocation();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    logout();
  };

  const handleNewProject = () => {
    setLocation("/projects");
  };

  const projects = [
    {
      id: 1,
      name: "Redesign Website",
      client: "Tech Corp",
      status: "Em Criação",
      progress: 65,
      dueDate: "15 Jun",
    },
    {
      id: 2,
      name: "Logo Design",
      client: "Startup XYZ",
      status: "Aprovação",
      progress: 80,
      dueDate: "20 Jun",
    },
    {
      id: 3,
      name: "Branding Package",
      client: "Fashion Brand",
      status: "Briefing",
      progress: 30,
      dueDate: "25 Jun",
    },
  ];

  const pendencies = [
    {
      id: 1,
      title: "Aprovação de mockups",
      project: "Redesign Website",
      dueIn: "2 dias",
    },
    {
      id: 2,
      title: "Revisão de contrato",
      project: "Logo Design",
      dueIn: "1 dia",
    },
    {
      id: 3,
      title: "Feedback do cliente",
      project: "Branding Package",
      dueIn: "3 dias",
    },
  ];

  const upcomingDeliverables = [
    {
      id: 1,
      name: "Design Files",
      project: "Redesign Website",
      date: "15 Jun",
    },
    {
      id: 2,
      name: "Final Mockups",
      project: "Logo Design",
      date: "18 Jun",
    },
    {
      id: 3,
      name: "Brand Guidelines",
      project: "Branding Package",
      date: "22 Jun",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 p-8">

        {/* HERO */}

        <div className="rounded-3xl overflow-hidden relative border border-white/10 bg-gradient-to-br from-[#131722] via-[#171c29] to-[#11151d] p-10">

          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px]" />
          <div className="absolute left-0 bottom-0 w-[350px] h-[350px] bg-violet-500/10 blur-[120px]" />

          <div className="relative flex justify-between items-center">

            <div>

              <Badge className="mb-5 bg-cyan-500/15 text-cyan-300 border-cyan-400/30">
                <Sparkles className="w-3 h-3 mr-2" />
                Dashboard Orbita
              </Badge>

              <h1 className="text-5xl font-bold">
                Bem-vinda de volta ✨
              </h1>

              <p className="mt-3 text-zinc-400 max-w-xl">
                Gerencie seus clientes, projetos,
                contratos e aprovações em um único lugar.
              </p>

            </div>

            <div className="flex gap-3">

              <Button
                size="lg"
                onClick={handleNewProject}
                className="rounded-xl h-12"
              >
                <Plus className="mr-2 w-4 h-4" />
                Novo Projeto
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-xl h-12"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 w-4 h-4" />
                Sair
              </Button>

            </div>

          </div>
        </div>

        {/* KPIs */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <Card className="rounded-3xl border-white/10 bg-[#171b24]/90 backdrop-blur">
            <CardContent className="p-6">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-zinc-400 text-sm">
                    Projetos Ativos
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    3
                  </h2>

                  <span className="text-cyan-400 text-sm mt-2 block">
                    +1 esta semana
                  </span>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center">

                  <FolderKanban className="w-7 h-7 text-cyan-400" />

                </div>

              </div>

            </CardContent>
          </Card>


          <Card className="rounded-3xl border-white/10 bg-[#171b24]/90 backdrop-blur">
            <CardContent className="p-6">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-zinc-400 text-sm">
                    Pendências
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-orange-400">
                    3
                  </h2>

                  <span className="text-orange-400 text-sm mt-2 block">
                    Exigem atenção
                  </span>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center">

                  <AlertCircle className="w-7 h-7 text-orange-400" />

                </div>

              </div>

            </CardContent>
          </Card>


          <Card className="rounded-3xl border-white/10 bg-[#171b24]/90 backdrop-blur">
            <CardContent className="p-6">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-zinc-400 text-sm">
                    Entregas
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    3
                  </h2>

                  <span className="text-green-400 text-sm mt-2 block">
                    Próximos 10 dias
                  </span>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">

                  <Calendar className="w-7 h-7 text-green-400" />

                </div>

              </div>

            </CardContent>
          </Card>


          <Card className="rounded-3xl border-white/10 bg-[#171b24]/90 backdrop-blur">
            <CardContent className="p-6">

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-zinc-400 text-sm">
                    Taxa de Conclusão
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    75%
                  </h2>

                  <span className="text-violet-400 text-sm mt-2 flex items-center gap-1">

                    <ArrowUpRight className="w-4 h-4" />

                    Excelente ritmo

                  </span>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center">

                  <TrendingUp className="w-7 h-7 text-violet-400" />

                </div>

              </div>

            </CardContent>
          </Card>

        </div>

        {/* PROJETOS */}

        <div className="col-span-12 xl:col-span-8">

          <Card className="rounded-3xl border-white/10 bg-[#171b24]/90 backdrop-blur">

            <CardContent className="p-7">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Projetos em andamento
                  </h2>

                  <p className="text-zinc-400">
                    Acompanhe o progresso dos seus trabalhos.
                  </p>

                </div>

                <Button
                  variant="outline"
                  onClick={() => setLocation("/projects")}
                >
                  Ver todos
                </Button>

              </div>

              <div className="space-y-4">

                {projects.map((project) => (

                  <div
                    key={project.id}
                    className="rounded-2xl border border-white/10 bg-[#11151d] p-5 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer"
                  >

                    <div className="flex justify-between">

                      <div>

                        <h3 className="font-semibold text-lg">
                          {project.name}
                        </h3>

                        <p className="text-zinc-400">
                          {project.client}
                        </p>

                      </div>

                      <Badge>
                        {project.status}
                      </Badge>

                    </div>

                    <div className="mt-6">

                      <div className="flex justify-between text-sm mb-2">

                        <span className="text-zinc-400">
                          Progresso
                        </span>

                        <span>
                          {project.progress}%
                        </span>

                      </div>

                      <div className="w-full h-2 rounded-full bg-zinc-800">

                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-300"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />

                      </div>

                      <div className="mt-4 flex justify-between text-sm text-zinc-400">

                        <span>
                          Entrega
                        </span>

                        <span className="flex items-center gap-2">

                          <Calendar className="w-4 h-4" />

                          {project.dueDate}

                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </CardContent>

          </Card>

        </div>



        {/* PENDÊNCIAS */}

        <div className="col-span-12 xl:col-span-4">

          <Card className="rounded-3xl border-white/10 bg-[#171b24]/90 backdrop-blur h-full">

            <CardContent className="p-7">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  Pendências
                </h2>

                <AlertCircle className="text-orange-400" />

              </div>

              <div className="space-y-4">

                {pendencies.map((item) => (

                  <div
                    key={item.id}
                    className="rounded-2xl bg-[#11151d] border border-orange-500/20 p-4 hover:border-orange-400 transition"
                  >

                    <h3 className="font-semibold">

                      {item.title}

                    </h3>

                    <p className="text-sm text-zinc-400 mt-1">

                      {item.project}

                    </p>

                    <div className="mt-4 flex items-center justify-between">

                      <Badge
                        variant="outline"
                        className="border-orange-500 text-orange-300"
                      >

                        {item.dueIn}

                      </Badge>

                      <Clock className="w-4 h-4 text-orange-400" />

                    </div>

                  </div>

                ))}

              </div>

            </CardContent>

          </Card>

        </div>
        {/* ÁREA INFERIOR */}

        <div className="grid grid-cols-12 gap-6">

          {/* Próximas Entregas */}

          <div className="col-span-12 lg:col-span-5">

            <Card className="rounded-3xl border-white/10 bg-[#171b24]/90 backdrop-blur h-full">

              <CardContent className="p-7">

                <div className="flex items-center gap-3 mb-6">

                  <Clock className="text-cyan-400" />

                  <h2 className="text-2xl font-bold">
                    Próximas Entregas
                  </h2>

                </div>

                <div className="space-y-4">

                  {upcomingDeliverables.map(item => (

                    <div
                      key={item.id}
                      className="flex justify-between items-center rounded-2xl bg-[#11151d] border border-white/10 p-4"
                    >

                      <div>

                        <h3 className="font-semibold">
                          {item.name}
                        </h3>

                        <p className="text-zinc-400 text-sm">
                          {item.project}
                        </p>

                      </div>

                      <Badge className="bg-cyan-500/20 text-cyan-300">
                        {item.date}
                      </Badge>

                    </div>

                  ))}

                </div>

              </CardContent>

            </Card>

          </div>


          {/* AÇÕES RÁPIDAS */}

          <div className="col-span-12 lg:col-span-4">

            <Card className="rounded-3xl border-white/10 bg-[#171b24]/90 backdrop-blur h-full">

              <CardContent className="p-7">

                <h2 className="text-2xl font-bold mb-6">
                  Ações Rápidas
                </h2>

                <div className="grid grid-cols-2 gap-4">

                  <Button
                    variant="outline"
                    className="h-28 rounded-2xl flex-col gap-3 hover:bg-cyan-500/10"
                  >
                    <FileText className="w-7 h-7" />
                    Novo Briefing
                  </Button>

                  <Button
                    variant="outline"
                    className="h-28 rounded-2xl flex-col gap-3 hover:bg-violet-500/10"
                  >
                    <Users className="w-7 h-7" />
                    Cliente
                  </Button>

                  <Button
                    variant="outline"
                    className="h-28 rounded-2xl flex-col gap-3 hover:bg-green-500/10"
                  >
                    <CheckCircle2 className="w-7 h-7" />
                    Aprovações
                  </Button>

                  <Button
                    variant="outline"
                    className="h-28 rounded-2xl flex-col gap-3 hover:bg-orange-500/10"
                  >
                    <TrendingUp className="w-7 h-7" />
                    Relatórios
                  </Button>

                </div>

              </CardContent>

            </Card>

          </div>


          {/* RESUMO */}

          <div className="col-span-12 lg:col-span-3">

            <Card className="rounded-3xl border-white/10 bg-gradient-to-br from-cyan-500/10 via-[#171b24] to-violet-500/10 backdrop-blur h-full">

              <CardContent className="p-7">

                <div className="flex items-center gap-2 mb-5">

                  <Sparkles className="text-cyan-400" />

                  <h2 className="text-xl font-bold">
                    Resumo
                  </h2>

                </div>

                <div className="space-y-6">

                  <div>

                    <p className="text-zinc-400 text-sm">
                      Clientes ativos
                    </p>

                    <h3 className="text-3xl font-bold">
                      128
                    </h3>

                  </div>

                  <div>

                    <p className="text-zinc-400 text-sm">
                      Projetos concluídos
                    </p>

                    <h3 className="text-3xl font-bold text-cyan-400">
                      42
                    </h3>

                  </div>

                  <div>

                    <p className="text-zinc-400 text-sm">
                      Receita do mês
                    </p>

                    <h3 className="text-3xl font-bold text-green-400">
                      R$ 18.450
                    </h3>

                  </div>

                </div>

              </CardContent>

            </Card>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}