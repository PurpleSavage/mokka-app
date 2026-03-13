export default function NotificationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <div className="h-full overflow-hidden px-4">
        {children}
    </div>
    
  );
}