import SessionValidatorWrapper from "@/modules/shared/auth/view/components/SessionValidatorWrapper";

export default function MokkaPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionValidatorWrapper>
        {children}
      </SessionValidatorWrapper>
    </>
  );
}