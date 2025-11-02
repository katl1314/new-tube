import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

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

export const usersRelations = relations(users, ({ many }) => ({
  videos: many(videos),
}));

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

// 하나의 카테고리는 여러 비디오를 갖는다.
export const categoryRelations = relations(users, ({ many }) => ({
  videos: many(videos),
}));

// 비디오 스키마 생성
export const videos = pgTable('videos', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  userId: uuid('user_id')
    .references(() => users.id, {
      onDelete: 'cascade', // users의 특정 사용자가 삭제 시 해당 비디오도 연쇄적으로 삭제한다.
    })
    .notNull(), // users스키마의 id를 참조한다.
  categoryId: uuid('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
  description: text('description'),

  // mux
  muxStatus: text('mux_status'), // 비디오 상태
  muxAssetId: text('mux_asset_id').unique(), // asset이 생성되고 나서 받는 값
  muxUploadId: text('mux_upload_id').unique(), // 비디오 프로시저에서 비디오 생성시 자동으로 생성
  muxPlaybackId: text('mux_playback_id').unique(), // asset이 생성되고 나서 받는 값 (웹훅)
  muxTrackId: text('mux_track_id').unique(),
  muxTrackStatus: text('mux_track_status'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// relations 관계 정의 <= 애플리케이션 레벨에서 적용한다.
export const videoRelations = relations(videos, ({ one }) => ({
  user: one(users, {
    fields: [videos.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [videos.categoryId],
    references: [categories.id],
  }),
}));
