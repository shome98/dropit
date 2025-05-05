import { boolean, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),

    //returned from imagekit
    fileUrl: text("fileUrl").notNull(),
    thumbnailUrl: text("thumbnailUrl"),
    fileId:text("fileId"),//later notnull
    
    //about ownership like uploader and folder hierarchy
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"),
    
    //file or folder
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_satrred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),
    
    //timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("upadted_at").defaultNow().notNull(),
});

export const fileRelations = relations(files, ({ one, many }) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id],
    }),
    Children: many(files),
}));

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;