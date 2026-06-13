import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getUserProjects, getProjectById, createProject, getProjectBriefing, createBriefing, getProjectContracts, createContract, getProjectApprovals, createApproval, getApprovalComments, createComment } from "./db";

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
});

export type AppRouter = typeof appRouter;
