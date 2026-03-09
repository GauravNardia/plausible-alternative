export default function StatsHeader({ stats }: any) {
  return (
    <div className="grid grid-cols-4 gap-6 bg-white rounded-3xl border border-neutral-200 p-6 shadow-sm">
      {Object.entries(stats).map(([key, value]: any) => (
        <div key={key}>
          <p className="text-xs text-neutral-500 uppercase tracking-wide">
            {key}
          </p>
          <p className="text-2xl font-semibold text-neutral-900 mt-2">
            {value}
          </p>
        </div>
      ))}
    </div>
  )
}