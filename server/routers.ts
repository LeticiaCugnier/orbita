import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getUserProjects, getProjectById, createProject, getProjectBriefing, createBriefing, getProjectContracts, createContract, getProjectApprovals, createApproval, getApprovalComments, createComment, getUserBudgets, getBudgetById, createBudget, updateBudgetStatus, finalizeBudget } from "./db";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  projects: router({
    list: protectedProcedure.query(({ ctx }) => getUserProjects(ctx.user.id)),
    getById: protectedProcedure.input(z.object({ id: z.number() })).query(({ input }) => getProjectById(input.id)),
    create: protectedProcedure.input(z.object({
      title: z.string(),
      description: z.string().optional(),
      clientName: z.string(),
      clientEmail: z.string().email().optional(),
      dueDate: z.date().optional(),
    })).mutation(({ ctx, input }) => createProject({
      userId: ctx.user.id,
      title: input.title,
      description: input.description,
      clientName: input.clientName,
      clientEmail: input.clientEmail,
      dueDate: input.dueDate,
    })),
  }),

  briefings: router({
    getByProject: protectedProcedure.input(z.object({ projectId: z.number() })).query(({ input }) => getProjectBriefing(input.projectId)),
    create: protectedProcedure.input(z.object({
      projectId: z.number(),
      objective: z.string().optional(),
      targetAudience: z.string().optional(),
      references: z.string().optional(),
      deliverables: z.string().optional(),
      timeline: z.string().optional(),
      budget: z.string().optional(),
      generatedContent: z.string().optional(),
    })).mutation(({ input }) => createBriefing(input)),
    generateWithAI: protectedProcedure.input(z.object({
      projectId: z.number(),
      objective: z.string(),
      targetAudience: z.string(),
      references: z.string(),
      deliverables: z.string(),
      timeline: z.string(),
      budget: z.string(),
    })).mutation(async ({ input }) => {
      const prompt = `Gere um briefing profissional em Markdown. Objetivo: ${input.objective}, Publico: ${input.targetAudience}, Referencias: ${input.references}, Entregaveis: ${input.deliverables}, Prazo: ${input.timeline}, Orcamento: ${input.budget}`;
      const response = await invokeLLM({
        messages: [
          { role: "system", content: "Voce eh especialista em gestao de projetos criativos." },
          { role: "user", content: prompt }
        ],
      });
      const content = response.choices[0]?.message?.content;
      const generatedContent = typeof content === 'string' ? content : "";
      const result = await createBriefing({ ...input, generatedContent });
      return { success: true, generatedContent, result };
    }),
  }),

  contracts: router({
    getByProject: protectedProcedure.input(z.object({ projectId: z.number() })).query(({ input }) => getProjectContracts(input.projectId)),
    create: protectedProcedure.input(z.object({
      projectId: z.number(),
      title: z.string(),
      templateType: z.string().optional(),
      content: z.string(),
    })).mutation(({ input }) => createContract(input)),
  }),

  approvals: router({
    getByProject: protectedProcedure.input(z.object({ projectId: z.number() })).query(({ input }) => getProjectApprovals(input.projectId)),
    create: protectedProcedure.input(z.object({
      projectId: z.number(),
      title: z.string(),
      description: z.string().optional(),
      fileUrl: z.string().optional(),
    })).mutation(({ input }) => createApproval(input)),
  }),

  comments: router({
    getByApproval: protectedProcedure.input(z.object({ approvalId: z.number() })).query(({ input }) => getApprovalComments(input.approvalId)),
    create: protectedProcedure.input(z.object({
      approvalId: z.number(),
      content: z.string(),
    })).mutation(({ ctx, input }) => createComment({
      approvalId: input.approvalId,
      userId: ctx.user.id,
      content: input.content,
    })),
  }),

  budgets: router({
    list: protectedProcedure.query(({ ctx }) => getUserBudgets(ctx.user.id)),
    getById: protectedProcedure.input(z.object({ id: z.number() })).query(({ input }) => getBudgetById(input.id)),
    create: protectedProcedure.input(z.object({
      clientName: z.string(),
      clientEmail: z.string().email().optional(),
      projectTitle: z.string(),
      description: z.string().optional(),
      amount: z.string(),
      currency: z.string().default("BRL"),
      items: z.string().optional(),
      validUntil: z.date().optional(),
    })).mutation(({ ctx, input }) => createBudget({
      userId: ctx.user.id,
      clientName: input.clientName,
      clientEmail: input.clientEmail,
      projectTitle: input.projectTitle,
      description: input.description,
      amount: input.amount,
      currency: input.currency,
      items: input.items,
      validUntil: input.validUntil,
    })),
    updateStatus: protectedProcedure.input(z.object({
      id: z.number(),
      status: z.enum(["draft", "sent", "approved", "rejected", "finalized"]),
    })).mutation(({ input }) => updateBudgetStatus(input.id, input.status, input.status === "approved" ? new Date() : undefined)),
    finalize: protectedProcedure.input(z.object({
      budgetId: z.number(),
      projectTitle: z.string(),
      clientName: z.string(),
      clientEmail: z.string().email().optional(),
    })).mutation(async ({ ctx, input }) => {
      const newProject = await createProject({
        userId: ctx.user.id,
        title: input.projectTitle,
        clientName: input.clientName,
        clientEmail: input.clientEmail,
      });
      const projectId = (newProject as any).insertId || 1;
      await finalizeBudget(input.budgetId, projectId);
      return { success: true, projectId };
    }),
  }),
});

export type AppRouter = typeof appRouter;
