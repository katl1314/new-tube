import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

// 스키마명, 컬럼정보, 인덱스 정의
// text(field명) => 길이가 지정되지 않을때
// varchar({ length : number }) => 최대 길이가 필요한 경우
export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clerkId: text('clerk_id').unique().notNull(),
    name: varchar({ length: 255 }).notNull(),
    // TODO add banner fields
    imageUrl: text('image_url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  t => [uniqueIndex('clerk_id_idx').on(t.clerkId)],
);

// 카테고리 스키마 정의
export const categories = pgTable(
  'categories',
  {
    id: uuid('id').primaryKey().defaultRandom(), // PK
    name: text('name').notNull().unique(), // null이 아니면서 유니크해야함. (동일한 카테고리 X)
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  t => [uniqueIndex('name_idx').on(t.name)],
);
