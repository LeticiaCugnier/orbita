import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Plus,
  Folder,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  LayoutGrid,
  List,
  Filter,
  Calendar,
  Users,
  MoreHorizontal,
} from "lucide-react";

import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

const statusColors: Record<string, string> = {
  briefing: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  research: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  creation: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  approval: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  adjustments: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  finalization: "bg-green-500/10 text-green-400 border-green-500/30",
  delivery: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

const statusLabels: Record<string, string> = {
  briefing: "Briefing",
  research: "Pesquisa",
  creation: "Em andamento",
  approval: "Revisão",
  adjustments: "Ajustes",
  finalization: "Concluído",
  delivery: "Entrega",
};

export default function ProjectsManagement() {
  const [, setLocation] = useLocation();

  const { data: projects = [] } = trpc.projects.list.useQuery();

  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  const statuses = [
    "briefing",
    "research",
    "creation",
    "approval",
    "adjustments",
    "finalization",
    "delivery",
  ] as const;

  const getProjectsByStatus = (status: string) =>
    projects.filter((p: any) => p.status === status);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-['Space_Grotesk']">
              Projetos
            </h1>
            <p className="text-zinc-400 mt-2">
              Gerencie todos os projetos da sua empresa em um único lugar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/10">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>

            <Button
              variant={viewMode === "kanban" ? "default" : "outline"}
              onClick={() => setViewMode("kanban")}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Kanban
            </Button>

            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4 mr-2" />
              Lista
            </Button>

            <Button
              className="bg-gradient-to-r from-violet-600 to-blue-600"
              onClick={() => setLocation("/projects/new")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </div>
        </div>

        {/* CARDS SUPERIORES */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <Card className="bg-gradient-to-br from-cyan-500/10 to-slate-900 border-cyan-500/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs uppercase tracking-wider text-cyan-300">
                    Total de Projetos
                  </p>
                  <h2 className="text-4xl font-bold mt-2">{projects.length}</h2>
                  <p className="text-green-400 text-xs mt-2">+12% este mês</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Folder className="w-7 h-7 text-cyan-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-slate-900 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs uppercase tracking-wider text-blue-300">
                    Em andamento
                  </p>
                  <h2 className="text-4xl font-bold mt-2">
                    {getProjectsByStatus("creation").length}
                  </h2>
                  <p className="text-cyan-400 text-xs mt-2">+8% este mês</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Clock3 className="w-7 h-7 text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-slate-900 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs uppercase tracking-wider text-green-300">
                    Concluídos
                  </p>
                  <h2 className="text-4xl font-bold mt-2">
                    {getProjectsByStatus("delivery").length}
                  </h2>
                  <p className="text-green-400 text-xs mt-2">+15% este mês</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-slate-900 border-red-500/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs uppercase tracking-wider text-red-300">
                    Atrasados
                  </p>
                  <h2 className="text-4xl font-bold">4</h2>
                  <p className="text-red-400 text-xs mt-2">-3% este mês</p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-red-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={viewMode}
          onValueChange={(v) => setViewMode(v as "kanban" | "list")}
        >
          {/* VISUALIZAÇÃO KANBAN */}
          <TabsContent value="kanban">
            <div className="overflow-x-auto pb-6">
              <div className="flex gap-5 min-w-max">
                {statuses.map((status) => {
                  const filteredProjects = getProjectsByStatus(status);
                  return (
                    <div key={status} className="w-[360px] flex-shrink-0">
                      <div className="rounded-3xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl p-5">
                        {/* Cabeçalho da coluna */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${status === "briefing"
                                  ? "bg-cyan-400"
                                  : status === "research"
                                    ? "bg-violet-400"
                                    : status === "creation"
                                      ? "bg-blue-400"
                                      : status === "approval"
                                        ? "bg-orange-400"
                                        : status === "adjustments"
                                          ? "bg-yellow-400"
                                          : status === "finalization"
                                            ? "bg-green-400"
                                            : "bg-emerald-400"
                                }`}
                            />
                            <div>
                              <h3 className="font-semibold text-white">
                                {statusLabels[status]}
                              </h3>
                              <p className="text-xs text-zinc-500">
                                {filteredProjects.length} projetos
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary">
                            {filteredProjects.length}
                          </Badge>
                        </div>

                        {/* Lista de projetos */}
                        <div className="space-y-4">
                          {filteredProjects.map((project: any) => (
                            <Card
                              key={project.id}
                              className="bg-slate-900/80 border-white/10 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                            >
                              <CardContent className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h4 className="font-semibold text-white">
                                      {project.title}
                                    </h4>
                                    <p className="text-xs text-zinc-400 mt-1">
                                      {project.clientName}
                                    </p>
                                  </div>
                                  <Badge className={statusColors[project.status]}>
                                    {statusLabels[project.status]}
                                  </Badge>
                                </div>

                                {/* Barra de progresso */}
                                <div className="mb-5">
                                  <div className="flex justify-between text-xs mb-2">
                                    <span className="text-zinc-400">Progresso</span>
                                    <span className="text-cyan-300 font-medium">
                                      {project.progress}%
                                    </span>
                                  </div>
                                  <div className="w-full h-2 rounded-full bg-slate-800">
                                    <div
                                      className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                                      style={{ width: `${project.progress}%` }}
                                    />
                                  </div>
                                </div>

                                {/* Informações inferiores */}
                                <div className="flex items-center justify-between">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                                      <Calendar className="w-3 h-3" />
                                      {project.dueDate
                                        ? new Date(project.dueDate).toLocaleDateString("pt-BR")
                                        : "Sem prazo"}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                                      <Users className="w-3 h-3" />
                                      Equipe Design
                                    </div>
                                  </div>
                                  <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-slate-900" />
                                    <div className="w-8 h-8 rounded-full bg-violet-500 border-2 border-slate-900" />
                                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-slate-900" />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}

                          {filteredProjects.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
                              <p className="text-zinc-500 text-sm">
                                Nenhum projeto nesta etapa
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* VISUALIZAÇÃO LISTA */}
          <TabsContent value="list">
            <div className="space-y-4">
              {projects.map((project: any) => (
                <Card
                  key={project.id}
                  className="bg-[#0f172a] border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">
                            {project.title}
                          </h3>
                          <Badge className={statusColors[project.status]}>
                            {statusLabels[project.status]}
                          </Badge>
                        </div>
                        <p className="text-zinc-400 mt-2">
                          {project.clientName}
                        </p>
                        <div className="mt-5">
                          <div className="flex justify-between text-xs mb-2">
                            <span>Progresso</span>
                            <span className="text-cyan-400">
                              {project.progress}%
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="ml-10 flex items-center gap-8">
                        <div>
                          <p className="text-xs text-zinc-500">Entrega</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm">
                              {project.dueDate
                                ? new Date(project.dueDate).toLocaleDateString("pt-BR")
                                : "--"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-zinc-500">Equipe</p>
                          <div className="flex -space-x-2 mt-1">
                            <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-slate-900" />
                            <div className="w-8 h-8 rounded-full bg-violet-500 border-2 border-slate-900" />
                            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-slate-900" />
                          </div>
                        </div>

                        <Button variant="outline" size="sm">
                          Abrir
                        </Button>
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