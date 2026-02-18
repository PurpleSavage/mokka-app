import ListInfluencers from "@/modules/influencers/view/components/ListInfluencers";


export default function InfluencersPage() {
  return (
    <>
        <div className="space-y-1">
            <p className="text-2xl text-white font-medium">Influencers</p>
            <p className="text-slate-300">Manage and create your influencers</p>
        </div>
        <ListInfluencers/>
    </>
  )
}
