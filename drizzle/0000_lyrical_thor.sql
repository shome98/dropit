CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"size" integer NOT NULL,
	"type" text NOT NULL,
	"fileUrl" text NOT NULL,
	"thumbnailUrl" text,
	"fileId" text,
	"user_id" text NOT NULL,
	"parent_id" uuid,
	"is_folder" boolean DEFAULT false NOT NULL,
	"is_satrred" boolean DEFAULT false NOT NULL,
	"is_trash" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"upadted_at" timestamp DEFAULT now() NOT NULL
);
