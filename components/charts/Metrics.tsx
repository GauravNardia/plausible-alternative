export function Metric({
  title,
  value
}: {
  title: string
  value: string | number
}) {
  return (
    <div>
      <div className="text-xs uppercase text-gray-500 tracking-wide">
        {title}
      </div>
      <div className="text-xl font-semibold text-gray-800 mt-1">
        {value}
      </div>
    </div>
  )
}
