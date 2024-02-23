'use client'
 
import { useRouter } from 'next/navigation'

export default function Forward() {
  const router = useRouter()

  return (
    <div className="flex text-text-weak items-center cursor-pointer mt-20px mb-50px">
      <i className="i-lucide-forward"></i>
      <span className="border-b-solid border-1px border-border px-8px ml-8px hover:text-primary hover:underline-primary" onClick={() => router.back()}>cd ..</span>
    </div>
  )
}