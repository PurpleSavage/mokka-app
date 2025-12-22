import Image from "next/image";


export default function Hero() {
  return (
    <main className="relative isolate bg-black 
      before:absolute before:inset-0 before:bg-[url('/img-mokka/grid.svg')] before:bg-repeat before:opacity-20 before:z-[-1]">
        <div
          className="space-y-8 py-8"
          style={{
            backgroundImage: `
              linear-gradient(
                to top,
                rgba(0, 0, 0, 1) 0%,      
                rgba(0, 0, 0, 0.7) 40%,    
                rgba(0, 0, 0, 0.5) 70%,     
                rgba(0, 0, 0, 0) 100%       
              )
            `
          }}
        >
          <div className="space-y-8">
            <h1 className="text-9xl font-medium text-white text-center w-4/5 mx-auto ">MOKKA</h1>
            <p className="text-4xl font-medium text-white text-center w-4/5 mx-auto"
            >Turn ideas into visual content with a single click. Mockups, videos, and more—no hassle.</p>
          </div>

          <div className="w-5/6 mx-auto ">
            <Image 
              src="/img-mokka/panel-hero.webp" 
              alt="MOKKA dashboard interface showing mockup creation tools" 
              width={1920}
              height={1080}
              priority
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
    </main>
  )
}
