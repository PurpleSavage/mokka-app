import NavbarRender3D from "@/modules/mockups/render-3d/view/components/NavbarRender3D";

export default function Mokka3dLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
      <div className="h-screen flex flex-col bg-black overflow-hidden">
        <NavbarRender3D/>
        {children}
      </div>
    )
}