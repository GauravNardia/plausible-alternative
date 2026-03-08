CREATE TABLE "daily_stats" (
	"site_id" uuid NOT NULL,
	"date" date NOT NULL,
	"pageviews" integer DEFAULT 0,
	"unique_visitors" integer DEFAULT 0,
	CONSTRAINT "daily_stats_site_id_date_pk" PRIMARY KEY("site_id","date")
);
--> statement-breakpoint
CREATE TABLE "daily_visitors" (
	"site_id" uuid NOT NULL,
	"date" date NOT NULL,
	"visitor_hash" text NOT NULL,
	CONSTRAINT "daily_visitors_site_id_date_visitor_hash_pk" PRIMARY KEY("site_id","date","visitor_hash")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"site_id" uuid NOT NULL,
	"path" text NOT NULL,
	"referrer" text,
	"country" text,
	"region" text,
	"city" text,
	"device" text,
	"browser" text,
	"os" text,
	"visitor_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "monthly_usage" (
	"user_id" uuid NOT NULL,
	"month" text NOT NULL,
	"events_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "monthly_usage_user_id_month_pk" PRIMARY KEY("user_id","month")
);
--> statement-breakpoint
CREATE TABLE "page_stats" (
	"site_id" uuid NOT NULL,
	"date" date NOT NULL,
	"path" text NOT NULL,
	"pageviews" integer DEFAULT 0,
	CONSTRAINT "page_stats_site_id_date_path_pk" PRIMARY KEY("site_id","date","path")
);
--> statement-breakpoint
CREATE TABLE "pricing_tiers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"monthly_event_limit" integer NOT NULL,
	"max_sites" integer NOT NULL,
	"price_monthly" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"domain" text NOT NULL,
	"public_api_key" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "sites_id_unique" UNIQUE("id"),
	CONSTRAINT "sites_domain_unique" UNIQUE("domain"),
	CONSTRAINT "sites_public_api_key_unique" UNIQUE("public_api_key")
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"pricing_tier_id" uuid NOT NULL,
	"status" text NOT NULL,
	"current_period_start" timestamp,
	"current_period_end" timestamp,
	"dodo_customer_id" text,
	"dodo_subscription_id" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password" text,
	"onboarded" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "waitlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "waitlist_id_unique" UNIQUE("id"),
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "daily_stats" ADD CONSTRAINT "daily_stats_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_visitors" ADD CONSTRAINT "daily_visitors_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monthly_usage" ADD CONSTRAINT "monthly_usage_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_stats" ADD CONSTRAINT "page_stats_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sites" ADD CONSTRAINT "sites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_pricing_tier_id_pricing_tiers_id_fk" FOREIGN KEY ("pricing_tier_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE no action ON UPDATE no action;