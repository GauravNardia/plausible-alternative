"use client"
import { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { deleteAccount } from '@/lib/actions/profile.action'

interface Props {
  userId: string
}

const DeleteAccountCard = ({ userId }: Props) => {
  const [confirmed, setConfirmed] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleDelete = () => {
    setError(null)
    startTransition(async () => {
      const result = await deleteAccount(userId)
      if (!result.success) {
        setError(result.error ?? 'Something went wrong.')
      }
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-red-100 border border-red-200 rounded-2xl mt-6">
      {/* Top Section */}
      <div className="flex flex-col bg-white rounded-2xl px-3 py-5">
        <div className="px-3">
          <p className="text-sm uppercase font-semibold text-red-500">
            Danger Zone
          </p>
        </div>

        <div className="w-full flex flex-col items-start justify-start mt-3 px-3">
          <p className="text-sm text-neutral-600">Delete Account</p>
          <p className="text-xs text-neutral-400 mt-1">
            This will delete everything. The puffin won't be able to recover it.
          </p>
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex justify-between items-center gap-6 py-5 px-5 font-semibold text-neutral-400">
        {!confirmed ? (
          <Button
            onClick={() => setConfirmed(true)}
            className="text-sm uppercase cursor-pointer font-semibold px-5 bg-red-500 border border-red-800 hover:bg-red-400 text-white rounded-xl hover:opacity-90 transition"
          >
            Delete my account
          </Button>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              onClick={handleDelete}
              disabled={isPending}
              className="text-sm uppercase cursor-pointer font-semibold px-5 bg-red-500 border border-red-800 hover:bg-red-400 text-white rounded-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? 'Deleting...' : 'Yes, Delete'}
            </Button>
            <Button
              onClick={() => setConfirmed(false)}
              disabled={isPending}
              className="white text-black text-sm px-3 md:px-6 rounded-xl secondary-border cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeleteAccountCard