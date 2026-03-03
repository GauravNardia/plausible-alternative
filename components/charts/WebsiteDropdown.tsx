"use client"

import { useRouter } from "next/navigation"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

type Site = {
  id: string
  name: string
}

export const WebsiteDropdown = ({
  sites,
  currentSiteId,
}: {
  sites: Site[]
  currentSiteId: string
}) => {
  const router = useRouter()

  const currentSite = sites.find((s) => s.id === currentSiteId)

  return (
    <Combobox items={sites}>
      <ComboboxInput placeholder={currentSite?.name || "Select website"} />

      <ComboboxContent>
        {sites.length === 0 && (
          <ComboboxEmpty>No website found.</ComboboxEmpty>
        )}

        <ComboboxList>
          {(site) => (
            <ComboboxItem
              key={site.id}
              value={site.name}
              onSelect={() => {
                router.push(`/dashboard?siteId=${site.id}`)
              }}
            >
              {site.name}   
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}