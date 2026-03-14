"use server"
export const getCountryCount = async (siteId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL!}/api/sites/geo/country?siteId=${siteId}`,
    { cache: "no-store" }
  )

  return res.json()
}
