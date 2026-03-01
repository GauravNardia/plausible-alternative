// app/install/page.tsx

import { auth } from "@/auth"
import InstallBox from "@/components/shared/Install"
import { getApiKey } from "@/lib/actions/site.actions"

const Install = async ({ params }: Params) => {
  const siteId = (await params).siteId;
  const session = await auth()
  if (!session) return null

  const userId = session.user?.id!
  const publicKey = await getApiKey(userId)
  const key = publicKey.success ? publicKey.data : "Error fetching key"

  const script = `<script defer src="https://app.puffinanalytics.com/script" data-api-key="${key}"></script>`

  return <InstallBox script={script} siteId={siteId} />
}

export default Install