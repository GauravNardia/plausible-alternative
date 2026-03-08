import {
  pgTable,
  text,
  timestamp,
  integer,
  primaryKey,
  uuid,
  bigserial,
  date,
  boolean
} from "drizzle-orm/pg-core"

/* ================= WAITLIST ================= */

export const waitlist = pgTable("waitlist", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
})

/* ================= USERS ================= */

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password"),
  onboarded: boolean("onboarded").default(false),
  createdAt: timestamp("created_at").defaultNow(),
})

/* ================= SITES ================= */

export const sites = pgTable("sites", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  domain: text("domain").notNull().unique(),
  publicApiKey: text("public_api_key").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
})

/* ================= EVENTS (RAW) ================= */

export const events = pgTable("events", {
  id: bigserial("id", { mode: "number" }).primaryKey(),

  siteId: uuid("site_id")
    .notNull()
    .references(() => sites.id, { onDelete: "cascade" }),

  path: text("path").notNull(),

  referrer: text("referrer"),

  country: text("country"),
  region: text("region"),
  city: text("city"),
  
  device: text("device"),

  browser: text("browser"),

  os: text("os"),

  visitorHash: text("visitor_hash").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
})

/* ================= DAILY STATS ================= */

export const dailyStats = pgTable(
  "daily_stats",
  {
    siteId: uuid("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),

    date: date("date").notNull(),

    pageviews: integer("pageviews").default(0),

    uniqueVisitors: integer("unique_visitors").default(0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.siteId, table.date] }),
  })
)

/* ================= PAGE STATS ================= */

export const pageStats = pgTable(
  "page_stats",
  {
    siteId: uuid("site_id")
      .notNull()
      .references(() => sites.id, { onDelete: "cascade" }),

    date: date("date").notNull(),

    path: text("path").notNull(),

    pageviews: integer("pageviews").default(0),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.siteId, table.date, table.path] }),
  })
)

/* ================= DAILY VISITORS ================= */

export const dailyVisitors = pgTable("daily_visitors",{
    siteId: uuid("site_id").notNull().references(() => sites.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    visitorHash: text("visitor_hash").notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.siteId, table.date, table.visitorHash],
    }),
  })
)

/* ================= PRICING TIER ================= */

export const pricingTiers = pgTable("pricing_tiers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  monthlyEventLimit: integer("monthly_event_limit").notNull(),
  maxSites: integer("max_sites").notNull(), // ADD THIS
  priceMonthly: integer("price_monthly").notNull(),
  createdAt: timestamp("created_at").defaultNow()
})

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id),
  pricingTierId: uuid("pricing_tier_id").notNull().references(() => pricingTiers.id),
  status: text("status").notNull(), // active, trialing, canceled
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  dodoCustomerId: text("dodo_customer_id"),
  dodoSubscriptionId: text("dodo_subscription_id"),
  createdAt: timestamp("created_at").defaultNow()
})


export const monthlyUsage = pgTable(
  "monthly_usage",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),

    month: text("month").notNull(),

    eventsCount: integer("events_count").default(0),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.userId, table.month],
    }),
  })
)