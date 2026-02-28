export default function BillingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar mt-2 ">
        {children}
    </div>
    
  );
}