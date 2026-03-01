ALTER TABLE "sites" ALTER COLUMN "public_api_key" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sites" ALTER COLUMN "public_api_key" DROP NOT NULL;