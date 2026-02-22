import InfluencersNavigator from "@/modules/influencers/view/components/InfluencersNavigator";

export default function InfluencersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <div className="h-full flex flex-col overflow-hidden p-4 space-y-2">
        <InfluencersNavigator/>
        <div className="flex-1  overflow-hidden">
            {children}
        </div>
    </div>
    
  );
}