import GenerateVideoForm from "@/modules/video/view/components/GenerateVideoForm";


export default function VideoPage() {
  return (
    <div className="overflow-y-auto custom-scrollbar h-full space-y-4">
      <GenerateVideoForm/>
      <section className="">
        <h2 className="text-lg text-white font-medium">Last videos</h2>
      </section>
    </div>
  )
}
