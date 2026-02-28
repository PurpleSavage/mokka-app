import VideoNavigator from "@/modules/video/view/components/VideoNavigator";

export default function InfluencersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <div className="h-full flex flex-col overflow-hidden p-4">
        <VideoNavigator/>
       <div className="flex-1 overflow-y-auto custom-scrollbar mt-2 w-full">
          {children}
        </div>
    </div>
  )
}