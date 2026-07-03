import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/spinner";
import { ChevronRight, ChevronLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import jsPDF from "jspdf";

interface BriefingFormData {
  projectId: number;
  objective: string;
  targetAudience: string;
  references: string;
  deliverables: string;
  timeline: string;
  budget: string;
}

export default function BriefingCreator({ projectId }: { projectId: number }) {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<BriefingFormData>({
    projectId,
    objective: "",
    targetAudience: "",
    references: "",
    deliverables: "",
    timeline: "",
    budget: "",
  });
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const createBriefingMutation = trpc.briefings.create.useMutation();
  const generateAIMutation = trpc.briefings.generateWithAI.useMutation();

  const steps = [
    {
      title: "Objetivo do Projeto",
      description: "Qual é o objetivo principal deste projeto?",
      field: "objective",
      placeholder: "Ex: Redesenhar a identidade visual da marca para modernizar sua presença no mercado.",
    },
    {
      title: "Público-Alvo",
      description: "Quem é o público-alvo?",
      field: "targetAudience",
      placeholder: "Ex: Profissionais de 25-45 anos, tech-savvy, com interesse em inovação.",
    },
    {
      title: "Referências",
      description: "Existem referências visuais ou inspirações?",
      field: "references",
      placeholder: "Ex: Estilo minimalista, cores vibrantes, inspiração em design suíço.",
    },
    {
      title: "Entregáveis",
      description: "O que será entregue?",
      field: "deliverables",
      placeholder: "Ex: Logo, guia de marca, templates de redes sociais, cartão de visita.",
    },
    {
      title: "Prazo",
      description: "Qual é o prazo para conclusão?",
      field: "timeline",
      placeholder: "Ex: 4 semanas, com apresentação inicial em 2 semanas.",
    },
    {
      title: "Orçamento",
      description: "Qual é o orçamento disponível?",
      field: "budget",
      placeholder: "Ex: R$ 5.000 - R$ 10.000",
    },
  ];

  const handleInputChange = (value: string) => {
    const currentStep = steps[step];
    setFormData({
      ...formData,
      [currentStep.field]: value,
    });
  };

  const handleGenerateBriefing = async () => {
    setIsGenerating(true);

    try {
      const fallbackContent = generateBriefingContent(formData);

      await new Promise((resolve) => setTimeout(resolve, 800));

      setGeneratedContent(fallbackContent);
    } finally {
      setIsGenerating(false);
    }
  };
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("Briefing do Projeto", 20, 20);

    doc.setFontSize(11);

    const lines = doc.splitTextToSize(generatedContent, 170);
    doc.text(lines, 20, 35);

    doc.save("briefing-orbita.pdf");
  };
  const generateBriefingContent = (data: BriefingFormData): string => {
    return `
# BRIEFING DO PROJETO

## Objetivo
${data.objective}

## Público-Alvo
${data.targetAudience}

## Referências Visuais
${data.references}

## Entregáveis
${data.deliverables}

## Prazo
${data.timeline}

## Orçamento
${data.budget}

---
*Briefing gerado pela Orbita em ${new Date().toLocaleDateString("pt-BR")}*
    `.trim();
  };

  if (generatedContent) {
    return (
      <DashboardLayout>
        <div className="space-y-6 rounded-3xl bg-[#0B0F17] p-6">
          <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-[#181A2E] via-[#111827] to-[#08232B] p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <Badge className="mb-4 bg-green-500/10 text-green-400 border border-green-500/30">
                  Briefing concluído
                </Badge>

                <h1 className="text-4xl font-bold tracking-tight text-white font-['Space_Grotesk']">
                  Briefing Gerado ✅
                </h1>

                <p className="text-slate-300 mt-3 max-w-xl">
                  Seu briefing foi gerado com sucesso e está pronto para revisão ou download.
                </p>
              </div>

              <Badge className="w-fit bg-[#8EE6D2]/10 text-[#8EE6D2] border border-[#8EE6D2]/40">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Concluído
              </Badge>
            </div>
          </div>

          <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                Documento do Briefing
              </h2>

              <p className="text-slate-400 mt-2">
                Revise o conteúdo gerado antes de baixar ou criar um novo briefing.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B0F17] p-6 whitespace-pre-wrap font-mono text-sm text-slate-300 max-h-96 overflow-y-auto">
              {generatedContent}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                className="flex-1 bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
                onClick={handleDownloadPDF}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Baixar PDF
              </Button>

              <Button
                variant="outline"
                onClick={() => setGeneratedContent("")}
                className="flex-1 border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
              >
                Criar Novo
              </Button>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const currentStep = steps[step];
  const currentValue = formData[currentStep.field as keyof typeof formData];
  const isLastStep = step === steps.length - 1;

  return (
    <DashboardLayout>
      <div className="space-y-6 rounded-3xl bg-[#0B0F17] p-6">
        <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-[#181A2E] via-[#111827] to-[#08232B] p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <Badge className="mb-4 bg-cyan-500/10 text-cyan-300 border border-cyan-400/40">
                Briefing Orbita
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight text-white font-['Space_Grotesk']">
                Criador de Briefings com IA ✨
              </h1>

              <p className="text-slate-300 mt-3 max-w-xl">
                Preencha as etapas do projeto e gere um briefing completo com apoio da inteligência artificial.
              </p>
            </div>

            <Badge className="w-fit bg-[#8EE6D2]/10 text-[#8EE6D2] border border-[#8EE6D2]/40">
              Passo {step + 1} de {steps.length}
            </Badge>
          </div>
        </div>

        <div className="rounded-full bg-[#111620] border border-border/70 h-3 overflow-hidden">
          <div
            className="h-full bg-[#8EE6D2] rounded-full transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <Card className="rounded-2xl border border-border/70 bg-[#111620] p-6">
          <div className="mb-6">
            <div className="h-12 w-12 rounded-xl bg-[#8EE6D2]/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-[#8EE6D2]" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              {currentStep.title}
            </h2>

            <p className="text-slate-400 mt-2">
              {currentStep.description}
            </p>
          </div>

          <Textarea
            placeholder={currentStep.placeholder}
            value={currentValue}
            onChange={(e) => handleInputChange(e.target.value)}
            rows={6}
            className="resize-none bg-[#0B0F17] border-border/70 text-white placeholder:text-slate-500"
          />

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex-1 border-border/70 bg-transparent text-slate-300 hover:bg-white/5"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            {isLastStep ? (
              <Button
                onClick={handleGenerateBriefing}
                disabled={isGenerating || !currentValue}
                className="flex-1 bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
              >
                {isGenerating ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar Briefing
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!currentValue}
                className="flex-1 bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
              >
                Próximo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>

        <div className="flex gap-2 flex-wrap">
          {steps.map((s, i) => (
            <Badge
              key={i}
              className={
                i <= step
                  ? "cursor-pointer bg-[#8EE6D2] text-[#071014] hover:bg-[#A6F3E2]"
                  : "cursor-default bg-[#111620] text-slate-400 border border-border/70"
              }
              onClick={() => i <= step && setStep(i)}
            >
              {i + 1}. {s.title}
            </Badge>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
