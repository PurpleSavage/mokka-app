import AudioNavigator from "@/modules/audio/view/components/AudioNavigator";
import AudioHeader from "@/modules/audio/view/components/AudioHeader";

export default function AudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-full overflow-hidden p-4">
      <div className="flex flex-col min-w-0 h-full overflow-hidden">
        <AudioHeader />
        <AudioNavigator />
        <div className="flex-1 overflow-y-auto custom-scrollbar mt-2">
          {children}
        </div>
      </div>
    </div>
    
  );
}