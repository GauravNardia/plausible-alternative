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
    <div className="bg-neutral-100 rounded-3xl p-6">
      <h2 className="text-lg font-semibold mb-4">Top Sources</h2>

      <div className="flex flex-col gap-3">
        {sources.map((source, index) => (
          <div
            key={index}
            className="flex justify-between text-sm text-neutral-700"
          >
            <span>{formatSource(source.name)}</span>
            <span className="font-medium">{source.visitors}</span>
          </div>
        ))}
      </div>
    </div>
  )
}