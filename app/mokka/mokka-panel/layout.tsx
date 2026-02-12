import SessionValidatorWrapper from "@/modules/shared/auth/view/components/SessionValidatorWrapper";
import Aside from "@/modules/shared/common/view/components/Aside";

export default function MokkaPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <SessionValidatorWrapper>
      <div className="min-h-screen flex bg-black">
        <Aside/>
        <div className="grow space-y-4 p-4">
          {children}
        </div>
      </div>
    </SessionValidatorWrapper>
    
  );
}