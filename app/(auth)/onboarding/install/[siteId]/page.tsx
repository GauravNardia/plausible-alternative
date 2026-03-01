import { auth } from '@/auth'
import { getApiKey } from '@/lib/actions/site.actions'
import { Check, Copy } from 'lucide-react'
import Image from 'next/image'


const Install = async() => {
    const session = await  auth();
    if(!session) return

    const userId = session.user?.id!
    console.log("userid", userId)


      const publicKey = await getApiKey(userId)
    const key = publicKey.success ? publicKey.data : "Error fetching key"


  const script = `  <script defer src="https://app.puffinanalytics.com/script" data-api-key=${key}></script>`

//   const copyToClipboard = async () => {
//     await navigator.clipboard.writeText(script)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

  return (
  <div className="font-inter sm:w-[800px] mx-auto flex items-center justify-center w-full">

    <div className="w-full bg-neutral-100 rounded-xl px-8 py-8">

      {/* Logo */}
      <div className="flex flex-col items-center text-center mb-6">
        <Image
          src="/assets/images/logo2.png"
          alt="logo"
          width={60}
          height={60}
          className="mb-3"
        />

        <h2 className="text-[12-px] font-semibold text-black">
          Plant Puffin on your website 🌱
        </h2>

        <p className="text-sm text-black mt-1">
          Copy the script below and paste it before body on your site.
        </p>
      </div>
              {/* Script Box */}
        <div className="relative bg-neutral-100 rounded-2xl p-6 text-sm text-black">
          <pre className="overflow-x-auto whitespace-pre-wrap break-all">
            {script}
          </pre>

          <button
            // onClick={copyToClipboard}
            className="absolute top-4 right-4 bg-neutral-800 hover:bg-neutral-700 text-white p-2 rounded-lg transition"
          >
            {/* {copied ? <Check size={16} /> : <Copy size={16} />} */}
          </button>
        </div>

    </div>
  </div>
  )
}

export default Install