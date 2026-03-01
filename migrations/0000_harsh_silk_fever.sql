CREATE TABLE "daily_stats" (
	"site_id" uuid NOT NULL,
	"date" date NOT NULL,
	"pageviews" integer DEFAULT 0,
	"unique_visitors" integer DEFAULT 0,
	CONSTRAINT "daily_stats_site_id_date_pk" PRIMARY KEY("site_id","date")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"site_id" uuid NOT NULL,
	"path" text NOT NULL,
	"referrer" text,
	"country" text,
	"device" text,
	"browser" text,
	"os" text,
	"visitor_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now()
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
CREATE TABLE "sites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domain" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "sites_id_unique" UNIQUE("id"),
	CONSTRAINT "sites_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "daily_stats" ADD CONSTRAINT "daily_stats_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_stats" ADD CONSTRAINT "page_stats_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;