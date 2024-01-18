import Tag from '@/components/Tag'

export default function PostItem() {
  return (
    <div className="flex-y-center justify-between gap-30px mb-20px">
      <div className="flex-y-center gap-10px">
        <span className="text-text-weak text-xs">19/10</span>
        <span className="text-text font-400">mac的撞击指南</span>
      </div>

      <div className="flex-y-center gap-8px">
        <Tag />
        <Tag />
      </div>
    </div>
  )
}
