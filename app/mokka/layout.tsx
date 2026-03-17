import ProviderAxiosWrapper from "@/modules/shared/common/view/wrappers/ProviderAxioWrapper";
import ProviderReduxWrapper from "@/modules/shared/common/view/wrappers/ProviderWrapper";

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