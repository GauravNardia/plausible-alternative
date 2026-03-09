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
  starter_0: "pdt_0NZk2m2ihnDFGSAkvCHMu",
  starter_1: "pdt_0NZtsMpg24yJG2HM8MNZE",
  starter_2: "pdt_0NZtua3CkjxbmEDQXan8N",
  starter_3: "pdt_0NZtumEXc4LoOoHmCRP64",
  starter_4: "pdt_0NZtuyaxzGuP07gaLdnDl",
  starter_5: "pdt_0NZtv7ObByToEWePk7vDD",
  growth_0:  "pdt_0NZk32m4w1T3vZG91zrzJ",
  growth_1:  "pdt_0NZtvtGf5fjBo12VCtraT",
  growth_2:  "pdt_0NZtw65bDPh8HxAgy9orD",
  growth_3:  "pdt_0NZtwFHeOlvHdRWr4J6SG",
  growth_4:  "pdt_0NZtwRXjBGdXK0TK5BPIc",
  growth_5:  "pdt_0NZtwX2jmkgEo5Z67GX1A",
  scale_0:   "pdt_0NZtx9S9TPWFQSdNasbrs",
  scale_1:   "pdt_0NZtxIST9UwTmW7f6JON5",
  scale_2:   "pdt_0NZtxV2hSP77DGDfnBG0e",
  scale_3:   "pdt_0NZtxe85QN8QsOm8Q2i4B",
  scale_4:   "pdt_0NZtxnkakgnUokrbD0kAA",
  scale_5:   "pdt_0NZtxvfezz85mFB3Nq7fH",
}

// PRODUCTION IDS
// export const PLAN_PRODUCT_IDS: Record<string, string> = {
//   starter_0: "pdt_0Na7nPKMZyPD5ZAC9Vlb4",
//   starter_1: "pdt_0Na7nfjanQC1T0er5T1BH",
//   starter_2: "pdt_0Na7np49I3aEVKKH1XPCP",
//   starter_3: "pdt_0Na7o2qV8waxmrgHwOVcz",
//   starter_4: "pdt_0Na7oEc0PCQCraapehSIc",
//   starter_5: "pdt_0Na7oShcfEmRqv5nnd2Xk",
//   growth_0:  "pdt_0Na7ofR1qWcHOqtakrZ6h",
//   growth_1:  "pdt_0Na7oquAdhFJJYqq9qPFn",
//   growth_2:  "pdt_0Na7p2kqCbQkjFaJ0tiLz",
//   growth_3:  "pdt_0Na7pDIGKdZPkoNa09GAR",
//   growth_4:  "pdt_0Na7pQzxZZSNQJgnMPlXs",
//   growth_5:  "pdt_0Na7pb9KQqXOnlZCSInsF",
//   scale_0:   "pdt_0Na7ppzZ4DxlOQTjEjNeR",
//   scale_1:   "pdt_0Na7q7Cn14jLyqLgd1VVR",
//   scale_2:   "pdt_0Na7qJjq7RbY8oz0GUXr3",
//   scale_3:   "pdt_0Na7qTz4K2Nqcq2GvCAbz",
//   scale_4:   "pdt_0Na7qfiDoTmJtwMJ1SEuq",
//   scale_5:   "pdt_0Na7qnkTmFCcFWes2UxNr",
// }


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