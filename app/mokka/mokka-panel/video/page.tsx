import GenerateVideoForm from "@/modules/video/view/components/GenerateVideoForm";
import LastVideos from "@/modules/video/view/components/LastVideos";


export default function VideoPage() {
  return (
    <div className="overflow-y-auto custom-scrollbar h-full space-y-4">
      <GenerateVideoForm/>
      <section className="">
        <h2 className="text-lg text-white font-medium">Last videos</h2>
      </section>
      <section className="flex items-center w-full overflow-y-auto gap-4">
        <LastVideos/>
      </section>
    </div>
  )
}
