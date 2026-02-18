import Gallery from "@/modules/image/view/components/Gallery";



export default function GalleryPage() {
 
  return (
    <section className="space-y-4 mt-5">
        <div className="space-y-1">
            <p className="text-2xl font-bold text-white">Your gallery</p>
            <p className="text-gray-500 font-md">These are the images created by you</p>
        </div>
        <div className="grid grid-cols-4 gap-y-8 gap-x-4 auto-rows-[450px]">
          <Gallery/>
        </div> 
    </section>
  )
}
