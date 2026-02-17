import FormGenerateImage from "@/modules/image/view/components/FormGenerateImage";


export default function ImagesPage() {
  return (
    <section className="space-y-2">
        <div className="space-y-1">
            <p className="text-2xl font-bold text-white">Image generator</p>
            <p className="text-gray-500 font-md">Generates images based on text</p>
        </div>
        <FormGenerateImage/>
        <div className="overflow-y-auto custom-scrollbar overflow-x-hidden">
            asas
        </div>
    </section>
  )
}
