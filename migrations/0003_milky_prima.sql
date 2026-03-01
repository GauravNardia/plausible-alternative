ALTER TABLE "sites" ADD COLUMN "public_api_key" text NOT NULL;--> statement-breakpoint
ALTER TABLE "sites" ADD CONSTRAINT "sites_public_api_key_unique" UNIQUE("public_api_key");