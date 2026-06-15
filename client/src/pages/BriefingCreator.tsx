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
      const result = await generateAIMutation.mutateAsync({
        projectId: formData.projectId,
        objective: formData.objective,
        targetAudience: formData.targetAudience,
        references: formData.references,
        deliverables: formData.deliverables,
        timeline: formData.timeline,
        budget: formData.budget,
      });

      setGeneratedContent(result.generatedContent);
    } catch (error) {
      console.error("Erro ao gerar briefing com IA:", error);
    } finally {
      setIsGenerating(false);
    }
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
        <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-['Space_Grotesk']">Briefing Gerado</h2>
          <Badge className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Concluído
          </Badge>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Documento do Briefing</CardTitle>
            <CardDescription>Seu briefing foi gerado com sucesso e está pronto para download</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-6 rounded-lg whitespace-pre-wrap font-mono text-sm max-h-96 overflow-y-auto">
              {generatedContent}
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => setLocation("/briefing")}>
                <Sparkles className="w-4 h-4 mr-2" />
                Baixar PDF
              </Button>
              <Button variant="outline" onClick={() => setGeneratedContent("")}>
                Criar Novo
              </Button>
            </div>
          </CardContent>
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-['Space_Grotesk']">Criador de Briefings com IA</h2>
        <Badge variant="secondary">Passo {step + 1} de {steps.length}</Badge>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full transition-all"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Step Card */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            {currentStep.title}
          </CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={currentStep.placeholder}
            value={currentValue}
            onChange={(e) => handleInputChange(e.target.value)}
            rows={5}
            className="resize-none"
          />

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            {isLastStep ? (
              <Button
                onClick={handleGenerateBriefing}
                disabled={isGenerating || !currentValue}
                className="flex-1"
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
                className="flex-1"
              >
                Próximo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Steps Indicator */}
      <div className="flex gap-2 flex-wrap">
        {steps.map((s, i) => (
          <Badge
            key={i}
            variant={i <= step ? "default" : "outline"}
            className="cursor-pointer"
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
