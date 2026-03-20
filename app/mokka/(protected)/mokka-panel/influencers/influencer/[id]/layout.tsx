import FetcherInfluencer from "@/modules/influencers/view/components/FetcherProfileInfluencer";
import Link from "next/link";

export default async function InfluencerDetailLayout({
  children,
   params,
}: Readonly<{
  children: React.ReactNode; 
  params: Promise<{ id: string }>
}>) {
    const { id } = await params
    return (
        <div className="space-y-4 p-4 flex flex-col overflow-y-auto custom-scrollbar overflow-x-hidden">
            <FetcherInfluencer id={id}/>
            <div className="w-full">
                <nav className="flex items-center gap-2">
                    <Link
                        className="text-white" 
                        href={`/mokka/mokka-panel/influencers/influencer/${id}/scenes`}
                    >Scenes</Link>
                    <Link
                     className="text-white" 
                        href={`/influencers/influencer/${id}/snapshots`}
                    >Snapshots</Link>
                </nav>
                {children}
            </div>
        </div> 
    );
}