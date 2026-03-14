
import { auth } from "@/auth"
import InstallBox from "@/components/shared/Install"
import { getApiKey, getSiteDomainById } from "@/lib/actions/site.actions"

const Install = async ({ params }: Params) => {
  const siteId = (await params).siteId;
  const session = await auth()
  if (!session) return null

  const domain = await getSiteDomainById(siteId)
   if(!domain) return null

  const publicKey = await getApiKey(siteId)
  const key = publicKey.success ? publicKey.data : "Error fetching key"

  const script = `<script defer src="https://puffinanalytics.com/script" data-api-key="${key}"></script>`

  return(
    <section className="w-full">
      <div className="h-[120px] dot-bg border-b" />
        <InstallBox script={script} siteId={siteId} domain={domain} />
      <div className="dot-bg border-b" />    
    </section>
  )
}

export default Install