import Tag from '@/components/Tag'

export default function PostItem () {
  return <div className="border-b-solid border-b-1px border-b-border">
    <h2 className="text-text-accent mt-3 mb-2 font-400">PostItem</h2>

    <div className="flex-y-center gap-2 flex-wrap">
      <Tag />
    </div>

    <div className="flex-y-center justify-between text-sm mt-3 mb-3">
      <div className="text-text-weak">2022-10-10</div>
      <div className="text-text-weak">其他</div>
    </div>
  </div>
}