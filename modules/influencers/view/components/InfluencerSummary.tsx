import { DateFormatter } from "@/modules/shared/common/view/utils/date-formatter.util"
import { InfluencerEntity } from "../../domain/entities/influencer.entity"


interface InfluencerSummaryProps{
    influencer:InfluencerEntity
}
export default function InfluencerSummary({influencer}:InfluencerSummaryProps) {
    
  return (
    <div className="grid gap-2 grid-cols-[30%_70%] w-full ">
        <div className="h-full rounded-lg">
            <img
                src={influencer.influencerUrlImage}
                alt="influencer image"
                className="w-full h-full object-cover rounded-lg"
            />
        </div>
        <div className="space-y-2 bg-table-body-bg p-2 rounded-lg">
            <div className="spaxe-y-1 px-4">
                <div className="flex items-center">
                    <p className="grow text-xl font-medium">{influencer.name}</p>
                    <p className="text-white bg-pink-800 px-3 py-q text-sm rounded-lg">{influencer.gender}</p>
                </div>
                <p className="text-emerald-500 text-lg">{influencer.country}</p>
            </div>
            <div className="grid grid-cols-3 p-4 border-b border-slate-500/28">
                <div className="space-y-2">
                    <div className="space-y-1">
                        <label 
                            htmlFor="ageRange" 
                            className="block text-gray-400 text-sm  font-semibold uppercase"
                        >Age range</label>
                        <p className="text-white text-sm  font-semibold">{influencer.ageRange}</p>
                    </div>
                    <div className="space-y-1">
                        <label 
                            htmlFor="height" 
                            className="block text-gray-400 text-sm  font-semibold uppercase"
                        >Height (cm)</label>
                        <p className="text-white text-sm  font-semibold">{influencer.height}</p>
                    </div>
                    <div className="space-y-1">
                        <label 
                            htmlFor="hairType" 
                            className="block text-gray-400 text-sm  font-semibold uppercase"
                        >Hair type</label>
                        <p className="text-white text-sm  font-semibold">{influencer.hairType}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="space-y-1">
                        <label 
                            htmlFor="faceType" 
                            className="block text-gray-400 text-sm  font-semibold uppercase"
                        >Face type</label>
                        <p className="text-white text-sm  font-semibold">{influencer.faceType}</p>
                    </div>
                    <div className="space-y-1">
                        <label 
                            htmlFor="skinColor" 
                            className="block text-gray-400 text-sm  font-semibold uppercase"
                        >Skin color</label>
                        <p className="text-white text-sm  font-semibold">{influencer.skinColor}</p>
                    </div>
                    <div className="space-y-1">
                        <label 
                            htmlFor="hairColor" 
                            className="block text-gray-400 text-sm  font-semibold uppercase"
                        >Hair color</label>
                        <p className="text-white text-sm  font-semibold">{influencer.hairColor}</p>
                    </div>
                </div>
                <div  className="space-y-2">
                    <div className="space-y-1">
                        <label 
                            htmlFor="bodyShape" 
                            className="block text-gray-400 text-sm  font-semibold uppercase"
                        >Body shape</label>
                        <p className="text-white text-sm  font-semibold">{influencer.bodyShape}</p>
                    </div>
                    <div className="space-y-1">
                        <label 
                            htmlFor="eyeColor" 
                            className="block text-gray-400 text-sm  font-semibold uppercase"
                        >Eye color</label>
                        <p className="text-white text-sm  font-semibold">{influencer.eyeColor}</p>
                    </div>
                </div>
            </div>
            <div className=" flex items-center justify-start p-4 border-b border-slate-500/28">
                <div className="space-y-1">
                    <label 
                        htmlFor="lipsType" 
                        className="block text-gray-400 text-sm  font-semibold"
                    >lips type</label>
                    <p className="text-white text-sm  font-semibold">{influencer.lipsType}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 p-4">
                <div className="space-y-1 grow">
                    <label
                        htmlFor="influencerId"
                        className="block text-gray-400 text-sm font-semibold"
                    >Influencer id</label>
                    <p className="max-w-96 truncate text-ellipsis text-white text-sm font-semibold">{influencer.id}</p>
                </div>
                <div className="space-y-1">
                    <label 
                        htmlFor="date"
                        className="block text-gray-400 text-smfont-semibold "
                    >Creation date</label>
                    <p className="text-emerald-500 text-sm">{DateFormatter.formatLong(influencer.createDate)}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
