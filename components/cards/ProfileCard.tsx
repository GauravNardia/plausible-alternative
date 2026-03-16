"use client"
import { useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { updateEmail } from '@/lib/actions/profile.action'

interface Props {
  email: string;
  userId: string;
}

const ProfileCard = ({ email, userId }: Props) => {
  const [inputEmail, setInputEmail] = useState(email)
  const [savedEmail, setSavedEmail] = useState(email)
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const isUnchanged = inputEmail.trim() === savedEmail

  const handleUpdate = () => {
    setMessage(null)
    startTransition(async () => {
      const result = await updateEmail({ userId, newEmail: inputEmail.trim() })
      if (result.success) {
        setSavedEmail(inputEmail.trim()) // 👈 sync baseline so button disables again
        setMessage({ type: 'success', text: 'Email updated' })
      } else {
        setMessage({ type: 'error', text: result.error ?? 'Something went wrong.' })
      }
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-neutral-100 border border-gray-200 rounded-2xl mt-10">
      <div className="flex flex-col bg-[#ffffff] rounded-2xl px-3 py-5">
        <div className="px-3">
          <p className="text-sm uppercase font-semibold blue-text">Your email</p>
        </div>
        <div className="w-full flex flex-col items-start justify-start mt-3 px-3">
          <label className="text-sm font-medium text-neutral-600">Email Address</label>
          <Input
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            className="w-full max-w-xs px-3.5 py-2 h-9 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-800 focus:outline-none focus:ring-none mt-3 transition"
          />
          {message && (
            <p className={`text-xs mt-1 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex justify-between items-center gap-6 py-5 px-5 font-semibold text-neutral-400">
        <Button
          onClick={handleUpdate}
          disabled={isUnchanged || isPending}
          className="text-sm uppercase cursor-pointer font-semibold px-5 blue primary-border text-white rounded-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPending ? 'Saving....' : 'Update Email'}
        </Button>
      </div>
    </div>
  )
}

export default ProfileCard