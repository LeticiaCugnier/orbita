import { useState } from "react";
import { useLocation } from "wouter";

import DashboardLayout from "@/components/DashboardLayout";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import {
    ArrowLeft,
    Briefcase,
    Calendar,
    CheckCircle2,
    FileText,
    Plus,
    Sparkles,
    Users,
} from "lucide-react";

type Priority = "low" | "medium" | "high" | "urgent";

type NewProjectFormData = {
    title: string;
    clientName: string;
    category: string;
    responsible: string;
    description: string;
    startDate: string;
    dueDate: string;
    priority: Priority;
    budget: string;
    hasBriefing: boolean;
};

const priorities = [
    {
        value: "low",
        label: "Baixa",
        description: "Projeto sem urgência",
    },
    {
        value: "medium",
        label: "Média",
        description: "Prioridade normal",
    },
    {
        value: "high",
        label: "Alta",
        description: "Precisa de atenção",
    },
    {
        value: "urgent",
        label: "Urgente",
        description: "Entrega crítica",
    },
] as const;

export default function NewProject() {
    const [, setLocation] = useLocation();

    const [formData, setFormData] = useState<NewProjectFormData>({
        title: "",
        clientName: "",
        category: "",
        responsible: "",
        description: "",
        startDate: "",
        dueDate: "",
        priority: "medium",
        budget: "",
        hasBriefing: false,
    });

    const handleChange = (
        field: keyof NewProjectFormData,
        value: string | boolean
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCreateProject = () => {
        console.log("Projeto criado:", formData);

        if (formData.hasBriefing) {
            setLocation("/projects");
            return;
        }

        setLocation("/briefing");
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 rounded-3xl bg-[#0B0F17] p-6">
                <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-[#181A2E] via-[#111827] to-[#08232B] p-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <Badge className="mb-4 bg-cyan-500/10 text-cyan-300 border border-cyan-400/40">
                                Projeto Orbita
                            </Badge>

                            <h1 className="text-4xl font-bold tracking-tight text-white font-['Space_Grotesk']">
                                Novo Projeto 🚀
                            </h1>

                            <p className="text-slate-300 mt-3 max-w-xl">
                                Crie um novo projeto e organize todas as informações desde o início.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setLocation("/projects")}
                                className="border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Voltar
                            </Button>

                            <Button
                                onClick={handleCreateProject}
                                className="bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
                            >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Criar Projeto
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    <div className="xl:col-span-8 space-y-6">
                        {/* Informações gerais */}
                        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                            <div className="mb-6">
                                <div className="h-12 w-12 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center mb-4">
                                    <Briefcase className="w-6 h-6 text-[#8EE6D2]" />
                                </div>

                                <h2 className="text-2xl font-bold text-white">
                                    Informações Gerais
                                </h2>

                                <p className="text-slate-400 mt-2">
                                    Defina os dados principais do projeto.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Nome do projeto"
                                    value={formData.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className="bg-[#0B0F17] border-border/70 text-white placeholder:text-slate-500"
                                />

                                <Input
                                    placeholder="Cliente"
                                    value={formData.clientName}
                                    onChange={(e) => handleChange("clientName", e.target.value)}
                                    className="bg-[#0B0F17] border-border/70 text-white placeholder:text-slate-500"
                                />

                                <Input
                                    placeholder="Categoria"
                                    value={formData.category}
                                    onChange={(e) => handleChange("category", e.target.value)}
                                    className="bg-[#0B0F17] border-border/70 text-white placeholder:text-slate-500"
                                />

                                <Input
                                    placeholder="Responsável"
                                    value={formData.responsible}
                                    onChange={(e) => handleChange("responsible", e.target.value)}
                                    className="bg-[#0B0F17] border-border/70 text-white placeholder:text-slate-500"
                                />
                            </div>
                        </Card>

                        {/* Descrição */}
                        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-white">
                                    Descrição
                                </h2>

                                <p className="text-slate-400 mt-2">
                                    Explique o contexto, necessidade e objetivo geral do projeto.
                                </p>
                            </div>

                            <Textarea
                                rows={6}
                                placeholder="Descreva o projeto..."
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                className="resize-none bg-[#0B0F17] border-border/70 text-white placeholder:text-slate-500"
                            />
                        </Card>
                    </div>
                    {/* PAINEL LATERAL */}
                    {/* PAINEL LATERAL */}
                    <div className="xl:col-span-4 space-y-6">
                        {/* Datas */}
                        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-10 w-10 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-[#8EE6D2]" />
                                </div>

                                <h3 className="text-xl font-bold text-white">Datas</h3>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => handleChange("startDate", e.target.value)}
                                    className="bg-[#0B0F17] border-border/70 text-white"
                                />

                                <Input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => handleChange("dueDate", e.target.value)}
                                    className="bg-[#0B0F17] border-border/70 text-white"
                                />
                            </div>
                        </Card>

                        {/* Prioridade */}
                        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                            <div className="mb-5">
                                <h3 className="text-xl font-bold text-white">Prioridade</h3>
                                <p className="text-slate-400 text-sm mt-2">
                                    Escolha o nível de prioridade do projeto.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {priorities.map((priority) => (
                                    <button
                                        key={priority.value}
                                        type="button"
                                        onClick={() => handleChange("priority", priority.value)}
                                        className={`w-full rounded-xl border p-4 text-left transition-all ${formData.priority === priority.value
                                            ? "border-[#8EE6D2] bg-[#8EE6D2]/10"
                                            : "border-border/70 bg-[#0B0F17] hover:border-[#8EE6D2]/40"
                                            }`}
                                    >
                                        <div className="font-semibold text-white">{priority.label}</div>
                                        <div className="text-sm text-slate-400 mt-1">
                                            {priority.description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Briefing */}
                        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-10 w-10 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-[#8EE6D2]" />
                                </div>

                                <h3 className="text-xl font-bold text-white">Briefing</h3>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    type="button"
                                    className={`w-full ${formData.hasBriefing
                                        ? "bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
                                        : "border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
                                        }`}
                                    variant={formData.hasBriefing ? "default" : "outline"}
                                    onClick={() => handleChange("hasBriefing", true)}
                                >
                                    Já possuo briefing
                                </Button>

                                <Button
                                    type="button"
                                    className={`w-full ${!formData.hasBriefing
                                        ? "bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
                                        : "border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
                                        }`}
                                    variant={!formData.hasBriefing ? "default" : "outline"}
                                    onClick={() => handleChange("hasBriefing", false)}
                                >
                                    Criar briefing depois
                                </Button>
                            </div>
                        </Card>

                        {/* Orçamento */}
                        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-10 w-10 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-[#8EE6D2]" />
                                </div>

                                <h3 className="text-xl font-bold text-white">Orçamento</h3>
                            </div>

                            <Input
                                placeholder="R$ 0,00"
                                value={formData.budget}
                                onChange={(e) => handleChange("budget", e.target.value)}
                                className="bg-[#0B0F17] border-border/70 text-white placeholder:text-slate-500"
                            />
                        </Card>

                        {/* Equipe */}
                        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-10 w-10 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-[#8EE6D2]" />
                                </div>

                                <h3 className="text-xl font-bold text-white">Equipe</h3>
                            </div>

                            <div className="space-y-3">
                                {["Design", "Conteúdo", "Atendimento"].map((member) => (
                                    <div
                                        key={member}
                                        className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0B0F17] p-3"
                                    >
                                        <span className="text-sm text-slate-300">{member}</span>

                                        <Badge className="bg-[#8EE6D2]/10 text-[#8EE6D2] border border-[#8EE6D2]/40">
                                            Ativo
                                        </Badge>
                                    </div>
                                ))}

                                <Button
                                    variant="outline"
                                    className="w-full border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Adicionar integrante
                                </Button>
                            </div>
                        </Card>

                        {/* Checklist */}
                        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
                            <div className="mb-5">
                                <h3 className="text-xl font-bold text-white">Checklist Inicial</h3>
                                <p className="text-sm text-slate-400 mt-2">
                                    Pontos importantes antes de iniciar o projeto.
                                </p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    "Cliente aprovado",
                                    "Contrato assinado",
                                    "Briefing concluído",
                                    "Pagamento confirmado",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B0F17] p-3"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-[#8EE6D2]" />

                                        <span className="text-sm text-slate-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}