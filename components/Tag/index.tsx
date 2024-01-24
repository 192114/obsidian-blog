export default function Tag({ text }: { text: string }) {
  return (
    <span className="text-text-weak bg-card-background px-2 py-1 rounded-4px text-xs hover:text-secondary cursor-pointer hover:underline">
      # {text}
    </span>
  )
}
