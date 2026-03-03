import { MoreVertical } from 'lucide-react'
import Image from 'next/image'

interface Props {
    name: string;
    visitors: string;
    pageviews: string;
    countries: string;
}

const SiteCard = ({ name, visitors, pageviews, countries }: Props) => {
  return (
          <div className="bg-neutral-100 border border-gray-200 rounded-2xl">
            {/* Top Section */}
            <div className="flex items-start justify-between bg-white rounded-2xl px-3 py-5">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-base">
                      {name}
                    </span>

                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>
              </div>

              <Image
                src="/assets/icons/menu-dot.svg"
                alt="Site Thumbnail"
                width={24}
                height={24}
                className="rounded-lg text-neutral-400"
              />
            </div>

            {/* Stats Grid */}
            <div className="w-full flex justify-between items-center gap-6 py-2 px-5 font-semibold text-neutral-400">
              <div>
                <p className="text-xs uppercase tracking-wide">
                  Visitors
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {visitors}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide">
                  Pageviews
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {pageviews}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide">
                  Countries
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {countries}
                </p>
              </div>
            </div>
          </div>  )
}

export default SiteCard