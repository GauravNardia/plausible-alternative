import { Suspense } from "react"

export default function NotFound() {
  return (
    <Suspense fallback={null}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-neutral-500 mt-2">Page not found</p>
      </div>
    </Suspense>
  )
}