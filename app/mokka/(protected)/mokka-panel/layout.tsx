import Aside from "@/modules/shared/common/view/components/Aside";
import ModalWrapper from "@/modules/shared/common/view/wrappers/ModalWrapper";

export default function MokkaPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex bg-black overflow-hidden">
      <ModalWrapper/>
      <Aside />
      <main className="flex-1 min-w-0 h-full ">
        {children}
      </main>
    </div> 
  );
}