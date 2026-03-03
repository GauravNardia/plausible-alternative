import Image from "next/image"

interface Page {
  path: string
  visitors: number
}

export default function TopPagesTable({ pages }: { pages: Page[] }) {
  return (
    <div className="bg-neutral-100 p-3 border-l h-[260px]">
<div className="flex items-center justify-between pb-3 border-b border-gray-200">       <h2 className="text-sm font-semibold">Top Pages</h2>
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
       <h2 className="text-xs font-semibold text-neutral-500">Pages</h2>
        <h2 className="text-xs font-semibold text-neutral-500">Visitors</h2>
     </div>

      <div className="flex flex-col gap-3">
        {pages.map((page, index) => (
          <div
            key={index}
            className="flex justify-between text-[12px] text-neutral-700"
          >
            <span>{page.path}</span>
            <span className="font-medium">{page.visitors}</span>
          </div>
        ))}
      </div>
    </div>
  )
}