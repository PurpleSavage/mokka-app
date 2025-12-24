export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {children}
      <div className="grow h-screen overflow-hidden relative">
        <img src="/img-mokka/mokka-bg-auth.webp" className="h-full w-full" alt="background auth mokka " />
        <div className="absolute flex items-center justify-center bottom-0 left-0 right-0 top-0 flex-col">
            <p className="font-bold text-9xl text-black">MOKKA</p>
            <p className="font-bold text-9xl text-black">MOKKA</p>
            <p className="font-bold text-9xl text-black">MOKKA</p>
        </div>
      </div>
    </div>
  );
}