"use client"
import Link from 'next/link'
import { useState, useTransition } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { deleteSite } from '@/lib/actions/site.actions'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Props {
  siteId: string
  name: string
  visitors: number
  pageviews: number
  countries: number
  href: string
}

const SiteCard = ({ siteId, name, visitors, pageviews, countries, href }: Props) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = () => {
    setError(null)
    startTransition(async () => {
      const result = await deleteSite(siteId)
      if (result.success) {
        setConfirmOpen(false)
        router.refresh()
      } else {
        setError(result.error ?? 'Failed to delete site.')
      }
    })
  }

  return (
    <>
      <div className="bg-neutral-100 border border-gray-200 rounded-2xl">
        {/* Top Section */}
        <div className="flex items-start justify-between bg-white rounded-2xl px-3 py-5">
          <Link href={href} className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 text-base">{name}</span>
              <span className="w-2 h-2 rounded-full bg-green-500" />
            </div>
          </Link>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => e.preventDefault()}
                className="p-1 rounded-md hover:bg-neutral-100 transition"
              >
                <MoreHorizontal className="w-5 h-5 text-neutral-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => setConfirmOpen(true)}
                className="text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer gap-2"
              >
                <Image
                src="/assets/icons/delete.svg"
                width={18}
                height={18}
                alt='delete'
                />
                Delete Site
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stats Grid */}
        <Link href={href}>
          <div className="w-full flex justify-between items-center gap-6 py-2 px-5 font-semibold text-neutral-400">
            <div>
              <p className="text-xs uppercase tracking-wide">Visitors</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">{visitors}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide">Pageviews</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">{pageviews}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide">Countries</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">{countries}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm bg-neutral-100 rounded-2xl p-1">
          <div className='bg-[#ffffff] rounded-xl p-5'>
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Delete "{name}"?</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-neutral-500 mt-1">
            This will permanently delete the site and all its analytics data. This cannot be undone.
          </p>
          </div>
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          <div className="flex items-center justify-end gap-3 py-3 px-3">
            <Button
              onClick={() => setConfirmOpen(false)}
              disabled={isPending}
              className="text-xs white secondary-border text-black rounded-xl cursor-pointer uppercase font-semibold transition"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isPending}
              className="text-xs uppercase font-semibold px-4 red red-border cursor-pointer text-white rounded-xl hover:bg-red-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? 'Deleting...' : 'Yes, Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SiteCard