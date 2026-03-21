
export default function InfluencerSummarySkeleton() {
  return (
    <div className="grid gap-2 grid-cols-[30%_70%] w-full animate-pulse">
      {/* Imagen */}
      <div className="h-full rounded-lg bg-slate-700/50 min-h-64" />

      {/* Info */}
      <div className="space-y-2 bg-table-body-bg p-2 rounded-lg">
        
        {/* Nombre y género */}
        <div className="px-4">
          <div className="flex items-center gap-2">
            <div className="h-6 bg-slate-700/50 rounded w-32 grow" />
            <div className="h-6 bg-slate-700/50 rounded-lg w-16" />
          </div>
          <div className="h-5 bg-slate-700/50 rounded w-24 mt-1" />
        </div>

        {/* Grid de atributos */}
        <div className="grid grid-cols-3 p-4 border-b border-slate-500/28 gap-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 bg-slate-700/50 rounded w-16" />
              <div className="h-4 bg-slate-700/50 rounded w-12" />
            </div>
          ))}
        </div>

        {/* Lips type */}
        <div className="flex items-center p-4 border-b border-slate-500/28">
          <div className="space-y-1">
            <div className="h-3 bg-slate-700/50 rounded w-14" />
            <div className="h-4 bg-slate-700/50 rounded w-10" />
          </div>
        </div>

        {/* Id y fecha */}
        <div className="flex items-center gap-2 p-4">
          <div className="space-y-1 grow">
            <div className="h-3 bg-slate-700/50 rounded w-16" />
            <div className="h-4 bg-slate-700/50 rounded w-48" />
          </div>
          <div className="space-y-1">
            <div className="h-3 bg-slate-700/50 rounded w-16" />
            <div className="h-4 bg-slate-700/50 rounded w-24" />
          </div>
        </div>

      </div>
    </div>
  )
}
