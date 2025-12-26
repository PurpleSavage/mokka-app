import ProviderReduxWrapper from "@/modules/shared/common/view/components/ProviderWrapper";

export default function MokkaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
       <ProviderReduxWrapper>
        {children}
       </ProviderReduxWrapper>
    </>
  );
}