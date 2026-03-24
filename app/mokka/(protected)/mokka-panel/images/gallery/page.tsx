import HistoryImages from "@/modules/image/view/components/HistoryImages";


export default function GalleryPage() {
 
  return (
    <section className="space-y-4 mt-5">
        <div className="space-y-1">
            <p className="text-2xl font-bold text-white">Your gallery</p>
            <p className="text-gray-500 font-md">These are the images created by you</p>
        </div>
        <HistoryImages/>
    </section>
  )
}
