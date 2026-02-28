"use client";

const mockData = [
  { id: 1, date: "2026-02-15", plan: "Pro", credits: 500, card: "**** 4821" },
  { id: 2, date: "2026-01-15", plan: "Max", credits: 2000, card: "**** 4821" },
  { id: 3, date: "2025-12-15", plan: "Starter", credits: 100, card: "**** 9034" },
  { id: 4, date: "2025-11-15", plan: "Pro", credits: 500, card: "**** 9034" },
  { id: 5, date: "2025-10-15", plan: "Max", credits: 2000, card: "**** 4821" },
  { id: 6, date: "2025-09-15", plan: "Starter", credits: 100, card: "**** 1157" },
];

const planBadge: Record<string, string> = {
  Starter: "text-slate-300 bg-slate-800 border-slate-600",
  Pro:     "text-pink-300  bg-pink-950  border-pink-800",
  Max:     "text-violet-300 bg-violet-950 border-violet-800",
};

export default function BillingHistory() {
  return (
    <section className="space-y-3">
      <p className="text-slate-400 text-sm">
        This is the history of your payments
      </p>

      <div className="rounded-xl border border-slate-700/60 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-900 border-b border-slate-700/60">
              {["Date", "Plan", "Credits", "Card"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold
                    uppercase tracking-widest text-slate-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-slate-800/50 transition-colors
                  hover:bg-white/20
                  ${i === mockData.length - 1 ? "border-none" : ""}`}
              >
                <td className="px-5 py-3.5 text-slate-300 tabular-nums">
                  {new Date(row.date).toLocaleDateString("en-GB", {
                    day: "2-digit", month: "short", year: "numeric",
                  })}
                </td>
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2.5 py-0.5 rounded-md
                    border text-xs font-medium ${planBadge[row.plan]}`}>
                    {row.plan}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-300 tabular-nums">
                  +{row.credits.toLocaleString()}
                </td>
                <td className="px-5 py-3.5 text-slate-400 font-mono tracking-wider">
                  {row.card}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}