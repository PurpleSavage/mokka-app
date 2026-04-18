import CommunityNavigator from "@/modules/aggregated/community/view/component/CommunityNavigator";

export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col bg-black overflow-hidden">
      <CommunityNavigator/>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {children}
      </div>
    </div> 
  );
}