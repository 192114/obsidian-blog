export default function Loading () {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-100">
      <i className="i-lucide-loader animate-spin text-primary text-5xl"></i>
    </div>
  )
}