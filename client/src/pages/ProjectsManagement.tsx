import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, GripVertical, Calendar, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";

const statusColors: Record<string, string> = {
  briefing: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  research: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  creation: "bg-accent/10 text-accent border-accent/30",
  approval: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  adjustments: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  finalization: "bg-green-500/10 text-green-500 border-green-500/30",
  delivery: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
};

const statusLabels: Record<string, string> = {
  briefing: "Briefing",
  research: "Pesquisa",
  creation: "Criação",
  approval: "Aprovação",
  adjustments: "Ajustes",
  finalization: "Finalização",
  delivery: "Entrega",
};

export default function ProjectsManagement() {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const { data: projects = [] } = trpc.projects.list.useQuery();

  const statuses = ["briefing", "research", "creation", "approval", "adjustments", "finalization", "delivery"] as const;

  const getProjectsByStatus = (status: string) => {
    return projects.filter((p: any) => p.status === status);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk']">Gestão de Projetos</h1>
          <p className="text-muted-foreground mt-1">Organize seus projetos em etapas</p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Projeto
        </Button>
      </div>

      {/* View Mode Tabs */}
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "kanban" | "list")}>
        <TabsList>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-4">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {statuses.map((status) => (
                <div key={status} className="w-80 flex-shrink-0">
                  <div className="bg-muted/50 rounded-lg p-4 min-h-96">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{statusLabels[status]}</h3>
                      <Badge variant="outline" className="ml-auto">
                        {getProjectsByStatus(status).length}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {getProjectsByStatus(status).map((project: any) => (
                        <Card key={project.id} className="border-border/50 hover:border-accent/50 transition-colors cursor-move">
                          <CardContent className="pt-4">
                            <div className="flex gap-2 mb-2">
                              <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{project.title}</h4>
                                <p className="text-xs text-muted-foreground truncate">{project.clientName}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="w-full bg-background rounded-full h-1.5">
                                <div
                                  className="bg-gradient-to-r from-accent to-secondary h-1.5 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{project.progress}%</span>
                                {project.dueDate && (
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(project.dueDate).toLocaleDateString("pt-BR")}
                                  </span>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {getProjectsByStatus(status).length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <p className="text-sm">Nenhum projeto nesta etapa</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <div className="space-y-3">
            {projects.map((project: any) => (
              <Card key={project.id} className="border-border/50 hover:border-accent/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.clientName}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1 max-w-xs">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{project.progress}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={statusColors[project.status]}>
                        {statusLabels[project.status]}
                      </Badge>
                      {project.dueDate && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(project.dueDate).toLocaleDateString("pt-BR")}
                        </div>
                      )}
                      <Button variant="ghost" size="sm">Ver</Button>
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
