import "dotenv/config"
import { db } from "@/database/drizzle"
import { pricingTiers } from "@/database/schema"

async function main() {
  await db.insert(pricingTiers).values([
    { name: "Starter", monthlyEventLimit: 10000,   maxSites: 1,  priceMonthly: 7   },
    { name: "Starter", monthlyEventLimit: 50000,   maxSites: 1,  priceMonthly: 12  },
    { name: "Starter", monthlyEventLimit: 100000,  maxSites: 1,  priceMonthly: 19  },
    { name: "Starter", monthlyEventLimit: 250000,  maxSites: 1,  priceMonthly: 29  },
    { name: "Starter", monthlyEventLimit: 500000,  maxSites: 1,  priceMonthly: 39  },
    { name: "Starter", monthlyEventLimit: 1000000, maxSites: 1,  priceMonthly: 59  },
    { name: "Growth",  monthlyEventLimit: 10000,   maxSites: 3,  priceMonthly: 19  },
    { name: "Growth",  monthlyEventLimit: 50000,   maxSites: 3,  priceMonthly: 29  },
    { name: "Growth",  monthlyEventLimit: 100000,  maxSites: 3,  priceMonthly: 39  },
    { name: "Growth",  monthlyEventLimit: 250000,  maxSites: 3,  priceMonthly: 59  },
    { name: "Growth",  monthlyEventLimit: 500000,  maxSites: 3,  priceMonthly: 79  },
    { name: "Growth",  monthlyEventLimit: 1000000, maxSites: 3,  priceMonthly: 119 },
    { name: "Scale",   monthlyEventLimit: 10000,   maxSites: 10, priceMonthly: 39  },
    { name: "Scale",   monthlyEventLimit: 50000,   maxSites: 10, priceMonthly: 59  },
    { name: "Scale",   monthlyEventLimit: 100000,  maxSites: 10, priceMonthly: 79  },
    { name: "Scale",   monthlyEventLimit: 250000,  maxSites: 10, priceMonthly: 99  },
    { name: "Scale",   monthlyEventLimit: 500000,  maxSites: 10, priceMonthly: 149 },
    { name: "Scale",   monthlyEventLimit: 1000000, maxSites: 10, priceMonthly: 199 },
  ])
  console.log("✅ Seeded 18 pricing tiers")
  process.exit(0)
}

main()