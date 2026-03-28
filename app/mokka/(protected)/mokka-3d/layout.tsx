export default function Mokka3dLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return (
      <div className="h-screen flex bg-black overflow-hidden">
        {children}
      </div>
    )
}