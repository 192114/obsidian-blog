'use client'
import { useRouter } from 'next/navigation'
import Tag from '@/components/Tag'

export interface IFilterProps {
  tag: string;
}

export default function Filter({ tag }: IFilterProps) {
  const router = useRouter()
  const onReset = () => {
    router.replace('/')
  }
  return (
    <div className="flex-y-center gap-4">
      <span className="text-text-weak text-sm">筛选条件:</span>
      <Tag text={tag} />
      <button className="button-reset text-primary" onClick={onReset}>
        清空
        <i className="i-lucide-x"></i>
      </button>
    </div>
  )
}
