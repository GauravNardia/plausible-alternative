import Image from "next/image"

interface Source {
  name: string
  visitors: number
}

function formatSource(name?: string) {
  if (!name || name === "Direct") return "Direct"

  const lower = name.toLowerCase()

  if (lower.includes("google")) return "Google"
  if (lower.includes("t.co")) return "Twitter"
  if (lower.includes("twitter")) return "Twitter"
  if (lower.includes("linkedin")) return "LinkedIn"
  if (lower.includes("reddit")) return "Reddit"
  if (lower.includes("peerlist")) return "Peerlist"

  return name.replace("www.", "")
}

export default function SourcesTable({ sources }: { sources: Source[] }) {
  return (
    <div className="bg-neutral-100 p-4 h-[260px] flex flex-col">
<div className="flex items-center justify-between pb-3 border-b border-gray-200">       <h2 className="text-sm font-semibold">Top Sources</h2>
       <div className="text-md font-semibold mb-4">
              <Image
                src="/assets/icons/full.svg"
                alt="Expand"
                width={20}
                height={20}
              />
         
       </div>
     </div>
      <div className="flex justify-between items-center py-2">
       <h2 className="text-xs font-semibold text-neutral-500">Sources</h2>
        <h2 className="text-xs font-semibold text-neutral-500">Visitors</h2>
     </div>

      <div className="flex flex-col gap-3">
        {sources.map((source, index) => (
          <div
            key={index}
            className="flex justify-between text-[12px] text-neutral-700"
          >
            <span>{formatSource(source.name)}</span>
            <span className="font-medium">{source.visitors}</span>
          </div>
        ))}
      </div>
    </div>
  )
}