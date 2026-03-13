export const TIERS = [
  { label: "10K",  views: "10K",  starter: 7,   growth: 19,  scale: 39  },
  { label: "50K",  views: "50K",  starter: 12,  growth: 29,  scale: 59  },
  { label: "100K", views: "100K", starter: 19,  growth: 39,  scale: 79  },
  { label: "250K", views: "250K", starter: 29,  growth: 59,  scale: 99  },
  { label: "500K", views: "500K", starter: 39,  growth: 79,  scale: 149 },
  { label: "1M",   views: "1M",   starter: 59,  growth: 119, scale: 199 },
]

//  DEVELOPMENT IDS
export const PLAN_PRODUCT_IDS: Record<string, string> = {
  starter_0: process.env.NEXT_PUBLIC_STARTER_0!,
  starter_1: process.env.NEXT_PUBLIC_STARTER_1!,
  starter_2: process.env.NEXT_PUBLIC_STARTER_2!,
  starter_3: process.env.NEXT_PUBLIC_STARTER_3!,
  starter_4: process.env.NEXT_PUBLIC_STARTER_4!,
  starter_5: process.env.NEXT_PUBLIC_STARTER_5!,

  growth_0:  process.env.NEXT_PUBLIC_GROWTH_0!,
  growth_1:  process.env.NEXT_PUBLIC_GROWTH_1!,
  growth_2:  process.env.NEXT_PUBLIC_GROWTH_2!,
  growth_3:  process.env.NEXT_PUBLIC_GROWTH_3!,
  growth_4:  process.env.NEXT_PUBLIC_GROWTH_4!,
  growth_5:  process.env.NEXT_PUBLIC_GROWTH_5!,

  scale_0:   process.env.NEXT_PUBLIC_SCALE_0!,
  scale_1:   process.env.NEXT_PUBLIC_SCALE_1!,
  scale_2:   process.env.NEXT_PUBLIC_SCALE_2!,
  scale_3:   process.env.NEXT_PUBLIC_SCALE_3!,
  scale_4:   process.env.NEXT_PUBLIC_SCALE_4!,
  scale_5:   process.env.NEXT_PUBLIC_SCALE_5!,
}

// ADD THIS BELOW — reverse lookup used by webhook
export const PRODUCT_ID_TO_TIER: Record<string, {
  name: string
  monthlyEventLimit: number
  maxSites: number
  priceMonthly: number
}> = {
  [PLAN_PRODUCT_IDS.starter_0]: { name: "Starter", monthlyEventLimit: 10000,   maxSites: 1,  priceMonthly: 7   },
  [PLAN_PRODUCT_IDS.starter_1]: { name: "Starter", monthlyEventLimit: 50000,   maxSites: 1,  priceMonthly: 12  },
  [PLAN_PRODUCT_IDS.starter_2]: { name: "Starter", monthlyEventLimit: 100000,  maxSites: 1,  priceMonthly: 19  },
  [PLAN_PRODUCT_IDS.starter_3]: { name: "Starter", monthlyEventLimit: 250000,  maxSites: 1,  priceMonthly: 29  },
  [PLAN_PRODUCT_IDS.starter_4]: { name: "Starter", monthlyEventLimit: 500000,  maxSites: 1,  priceMonthly: 39  },
  [PLAN_PRODUCT_IDS.starter_5]: { name: "Starter", monthlyEventLimit: 1000000, maxSites: 1,  priceMonthly: 59  },
  [PLAN_PRODUCT_IDS.growth_0]:  { name: "Growth",  monthlyEventLimit: 10000,   maxSites: 3,  priceMonthly: 19  },
  [PLAN_PRODUCT_IDS.growth_1]:  { name: "Growth",  monthlyEventLimit: 50000,   maxSites: 3,  priceMonthly: 29  },
  [PLAN_PRODUCT_IDS.growth_2]:  { name: "Growth",  monthlyEventLimit: 100000,  maxSites: 3,  priceMonthly: 39  },
  [PLAN_PRODUCT_IDS.growth_3]:  { name: "Growth",  monthlyEventLimit: 250000,  maxSites: 3,  priceMonthly: 59  },
  [PLAN_PRODUCT_IDS.growth_4]:  { name: "Growth",  monthlyEventLimit: 500000,  maxSites: 3,  priceMonthly: 79  },
  [PLAN_PRODUCT_IDS.growth_5]:  { name: "Growth",  monthlyEventLimit: 1000000, maxSites: 3,  priceMonthly: 119 },
  [PLAN_PRODUCT_IDS.scale_0]:   { name: "Scale",   monthlyEventLimit: 10000,   maxSites: 10, priceMonthly: 39  },
  [PLAN_PRODUCT_IDS.scale_1]:   { name: "Scale",   monthlyEventLimit: 50000,   maxSites: 10, priceMonthly: 59  },
  [PLAN_PRODUCT_IDS.scale_2]:   { name: "Scale",   monthlyEventLimit: 100000,  maxSites: 10, priceMonthly: 79  },
  [PLAN_PRODUCT_IDS.scale_3]:   { name: "Scale",   monthlyEventLimit: 250000,  maxSites: 10, priceMonthly: 99  },
  [PLAN_PRODUCT_IDS.scale_4]:   { name: "Scale",   monthlyEventLimit: 500000,  maxSites: 10, priceMonthly: 149 },
  [PLAN_PRODUCT_IDS.scale_5]:   { name: "Scale",   monthlyEventLimit: 1000000, maxSites: 10, priceMonthly: 199 },
}