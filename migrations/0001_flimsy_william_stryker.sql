ALTER TABLE "pricing_tiers" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "pricing_tiers" CASCADE;--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_pricing_tier_id_pricing_tiers_id_fk";
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "plan_name" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "monthly_event_limit" integer;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "max_sites" integer;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "price_monthly" integer;--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN "pricing_tier_id";