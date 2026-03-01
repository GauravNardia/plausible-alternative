CREATE TABLE "daily_visitors" (
	"site_id" uuid NOT NULL,
	"date" date NOT NULL,
	"visitor_hash" text NOT NULL,
	CONSTRAINT "daily_visitors_site_id_date_visitor_hash_pk" PRIMARY KEY("site_id","date","visitor_hash")
);
--> statement-breakpoint
ALTER TABLE "daily_visitors" ADD CONSTRAINT "daily_visitors_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;