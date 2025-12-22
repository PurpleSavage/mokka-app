import AudioAnimation from "@/modules/landing/components/AudioAnimation";
import Footer from "@/modules/landing/components/Footer";
import Gallery from "@/modules/landing/components/Gallery";
import Hero from "@/modules/landing/components/Hero";
import Navbar from "@/modules/landing/components/Navbar";
import Prices from "@/modules/landing/components/Prices";

export default function Home() {
  return (
    <div className="bg-black min-h-screen font-clashgrotesk"> 
      <Navbar/>
      <Hero/>
      <Gallery/>
      <AudioAnimation/>
      <Prices/>
      <Footer/>
    </div>
  );
}
