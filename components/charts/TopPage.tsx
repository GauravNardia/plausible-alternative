interface Page {
  path: string
  visitors: number
}

export default function TopPagesTable({ pages }: { pages: Page[] }) {
  return (
    <div className="bg-neutral-100 rounded-3xl p-6">
      <h2 className="text-lg font-semibold mb-4">Top Pages</h2>

      <div className="flex flex-col gap-3">
        {pages.map((page, index) => (
          <div
            key={index}
            className="flex justify-between text-sm text-neutral-700"
          >
            <span>{page.path}</span>
            <span className="font-medium">{page.visitors}</span>
          </div>
        ))}
      </div>
    </div>
  )
}