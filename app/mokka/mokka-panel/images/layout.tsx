import ImageNavigator from "@/modules/image/view/components/ImageNavigator";

export default function ImagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <div className="h-full overflow-hidden px-4">
        <ImageNavigator/>
        {children}
    </div>
    
  );
}