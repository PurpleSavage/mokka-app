import InfluencersNavigator from "@/modules/influencers/view/components/InfluencersNavigator";

export default function InfluencersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <div className="h-full overflow-hidden p-4 space-y-2">
        <InfluencersNavigator/>
        {children}
    </div>
    
  );
}