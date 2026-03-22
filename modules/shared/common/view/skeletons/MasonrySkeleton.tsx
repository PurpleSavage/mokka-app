const items = [
    '1/1.5', '1/1', '1/0.8',
    '1/0.8', '1/1.5', '1/1',
    '1/1', '1/0.8', '1/1.5',
    '1/1.5', '1/1', '1/0.8',
  ]
export default function MasonrySkeleton() {

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-1 animate-pulse">
      {items.map((ratio, index) => (
        <div key={index} className="break-inside-avoid mb-1">
          <div
            className="w-full bg-slate-700/50 rounded-sm"
            style={{ aspectRatio: ratio }}
          />
        </div>
      ))}
    </div>
  )
}