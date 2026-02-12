import AudioNavigator from "@/modules/audio/view/components/AudioNavigator";

export default function AudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex bg-black flex-col">
        <AudioNavigator/>
        <>
          {children}
        </>
    </div>
    
  );
}