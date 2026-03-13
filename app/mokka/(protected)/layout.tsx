import SessionValidatorWrapper from "@/modules/shared/auth/view/wrapppers/SessionValidatorWrapper";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
      <SessionValidatorWrapper>
        {children}
      </SessionValidatorWrapper>
    )
}