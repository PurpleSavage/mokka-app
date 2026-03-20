import ListInfluencers from "@/modules/influencers/view/components/ListInfluencers";
import MenuInfluencers from "@/modules/influencers/view/components/MenuInfluencers";
import ModalForms from "@/modules/influencers/view/components/ModalForms";

export default function InfluencersOvewrViewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <div className="h-full flex flex-col overflow-hidden p-4 space-y-2">
      <div className="space-y-1">
        <p className="text-xl text-white font-medium">Influencers</p>
        <p className="text-slate-300">Manage and create your influencers</p>
      </div>
      <ListInfluencers/>
      <section className="flex-1 flex flex-col">
        <MenuInfluencers/>
        {children}
      </section>
        <ModalForms/>
    </div>
    
  );
}