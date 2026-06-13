import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getProjectBriefing, createBriefing } from "../db";
import { invokeLLM } from "../_core/llm";

import { TRPCError } from "@trpc/server";

export const briefingsRouter = router({
  getByProject: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .query(({ input }) => getProjectBriefing(input.projectId)),

  create: protectedProcedure
    .input(z.object({
      projectId: z.number(),
      objective: z.string().optional(),
      targetAudience: z.string().optional(),
      references: z.string().optional(),
      deliverables: z.string().optional(),
      timeline: z.string().optional(),
      budget: z.string().optional(),
      generatedContent: z.string().optional(),
    }))
    .mutation(({ input }) => createBriefing(input)),

  generateWithAI: protectedProcedure
    .input(z.object({
      projectId: z.number(),
      objective: z.string(),
      targetAudience: z.string(),
      references: z.string(),
      deliverables: z.string(),
      timeline: z.string(),
      budget: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        // Construir prompt para o LLM
        const prompt = `Você é um especialista em gestão de projetos criativos. Com base nas informações abaixo, gere um briefing profissional e estruturado em Markdown.

Objetivo do Projeto: ${input.objective}
Público-Alvo: ${input.targetAudience}
Referências Visuais: ${input.references}
Entregáveis: ${input.deliverables}
Prazo: ${input.timeline}
Orçamento: ${input.budget}

Gere um briefing profissional com as seguintes seções:
1. Resumo Executivo
2. Objetivo do Projeto
3. Público-Alvo
4. Referências e Inspirações
5. Entregáveis Esperados
6. Cronograma
7. Orçamento
8. Próximos Passos

Mantenha o tom profissional e estruturado.`;

        // Chamar LLM para gerar conteúdo
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "Você é um especialista em gestão de projetos criativos e branding. Gere briefings profissionais e bem estruturados.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        });

        const content = response.choices[0]?.message?.content;
        const generatedContent = typeof content === 'string' ? content : "";

        // Salvar briefing com conteúdo gerado
        const result = await createBriefing({
          projectId: input.projectId,
          objective: input.objective,
          targetAudience: input.targetAudience,
          references: input.references,
          deliverables: input.deliverables,
          timeline: input.timeline,
          budget: input.budget,
          generatedContent,
        });

        return {
          success: true,
          generatedContent,
          result,
        };
      } catch (error) {
        console.error("Erro ao gerar briefing com IA:", error);
        throw new Error("Falha ao gerar briefing com IA");
      }
    }),
});
