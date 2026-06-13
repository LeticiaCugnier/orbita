import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, projects, InsertProject, briefings, InsertBriefing, contracts, InsertContract, approvals, InsertApproval, comments, InsertComment, budgets, InsertBudget, Budget } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Projetos queries
 */
export async function getUserProjects(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projects).where(eq(projects.userId, userId)).orderBy(projects.createdAt);
}

export async function getProjectById(projectId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(projects).where(eq(projects.id, projectId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProject(data: InsertProject) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(projects).values(data);
  return result;
}

/**
 * Briefings queries
 */
export async function getProjectBriefing(projectId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(briefings).where(eq(briefings.projectId, projectId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBriefing(data: InsertBriefing) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(briefings).values(data);
}

/**
 * Contracts queries
 */
export async function getProjectContracts(projectId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contracts).where(eq(contracts.projectId, projectId)).orderBy(contracts.createdAt);
}

export async function createContract(data: InsertContract) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(contracts).values(data);
}

/**
 * Approvals queries
 */
export async function getProjectApprovals(projectId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(approvals).where(eq(approvals.projectId, projectId)).orderBy(approvals.createdAt);
}

export async function createApproval(data: InsertApproval) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(approvals).values(data);
}

/**
 * Comments queries
 */
export async function getApprovalComments(approvalId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(comments).where(eq(comments.approvalId, approvalId)).orderBy(comments.createdAt);
}

export async function createComment(data: InsertComment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(comments).values(data);
}

/**
 * Budgets queries
 */
export async function getUserBudgets(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(budgets).where(eq(budgets.userId, userId)).orderBy(budgets.createdAt);
}

export async function getBudgetById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(budgets).where(eq(budgets.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createBudget(data: InsertBudget) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(budgets).values(data);
}

export async function updateBudgetStatus(id: number, status: string, approvedAt?: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: any = { status, updatedAt: new Date() };
  if (approvedAt) updateData.approvedAt = approvedAt;
  return db.update(budgets).set(updateData).where(eq(budgets.id, id));
}

export async function finalizeBudget(id: number, projectId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(budgets).set({
    status: "finalized",
    finalizedProjectId: projectId,
    updatedAt: new Date()
  }).where(eq(budgets.id, id));
}
