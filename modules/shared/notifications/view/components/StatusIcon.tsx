import { StatusQueue } from "@/modules/shared/common/domain/enums/status-queue"


export default function StatusIcon({ status }: { status: StatusQueue }) {
  if (status === 'completed') return (
    <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#4ade80" strokeWidth="1.5">
        <polyline points="3,8 6.5,11.5 13,4.5"/>
      </svg>
    </div>
  )
  if (status === 'failed') return (
    <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#f87171" strokeWidth="1.5">
        <line x1="8" y1="4" x2="8" y2="9"/><circle cx="8" cy="12" r="0.8" fill="#f87171"/>
      </svg>
    </div>
  )
  return (
    <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#facc15" strokeWidth="1.5">
        <circle cx="8" cy="8" r="5.5"/><line x1="8" y1="5" x2="8" y2="9"/>
        <circle cx="8" cy="11.5" r="0.8" fill="#facc15"/>
      </svg>
    </div>
  )
}

