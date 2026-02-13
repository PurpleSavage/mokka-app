import SessionValidatorWrapper from "@/modules/shared/auth/view/components/SessionValidatorWrapper";
import Aside from "@/modules/shared/common/view/components/Aside";

export default function MokkaPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <SessionValidatorWrapper>
      <div className="h-screen flex bg-black overflow-hidden">
        <Aside />
        <main className="flex-1 min-w-0 h-full ">
          {children}
        </main>
      </div>
    </SessionValidatorWrapper>
    
  );
}