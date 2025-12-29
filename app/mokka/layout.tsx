import ProviderAxiosWrapper from "@/modules/shared/common/view/components/ProviderAxioWrapper";
import ProviderReduxWrapper from "@/modules/shared/common/view/components/ProviderWrapper";

export default function MokkaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProviderAxiosWrapper>
        <ProviderReduxWrapper>
          {children}
        </ProviderReduxWrapper>
      </ProviderAxiosWrapper>
    </>
  );
}