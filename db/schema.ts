import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    userId: text('user_id').notNull(),
    url: text('url').notNull(),
    slug: text('slug').notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type InsertLink = typeof links.$inferInsert;
export type SelectLink = typeof links.$inferSelect;
