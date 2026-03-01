import {
  pgTable,
  text,
  timestamp,
  integer,
  primaryKey,
  uuid,
  bigserial,
  date,
} from "drizzle-orm/pg-core"

/* ================= USERS ================= */

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
})

/* ================= SITES ================= */

export const sites = pgTable("sites", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  domain: text("domain").notNull().unique(),

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