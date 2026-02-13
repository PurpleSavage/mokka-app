import AsideAudio from "@/modules/audio/view/components/AsideAudio";
import AudioNavigator from "@/modules/audio/view/components/AudioNavigator";


export default function AudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-full grid-cols-[70%_30%] gap-4 overflow-hidden p-4">
      
      {/* Columna Izquierda: Ahora usamos flex-col para que el Navigator no flote */}
      <div className="flex flex-col min-w-0 h-full overflow-hidden">
        <AudioNavigator />
        <div className="flex-1 overflow-y-auto custom-scrollbar mt-2 pr-2">
          {children}
        </div>
      </div>

      {/* Columna Derecha: AsideAudio ya tiene su scroll interno */}
      <AsideAudio />
    </div>
    
  );
}