import FormGenerateImage from "@/modules/image/view/components/FormGenerateImage";
import ImageDataModal from "@/modules/image/view/components/ImageDataModal";
import ImagesLastWeek from "@/modules/image/view/components/ImagesLastWeek";
import ModalLookDataWrapper, { ModalsId } from "@/modules/shared/common/view/wrappers/ModalLookDataWrapper";

export default function ImagesPage() {
  return (
    <section className="space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
        <div className="space-y-1">
            <p className="text-2xl font-bold text-white">Image generator</p>
            <p className="text-gray-500 font-md">Generates images based on text</p>
        </div>
        <FormGenerateImage/>
        <ImagesLastWeek/>
        <ModalLookDataWrapper modalId={ModalsId.IMAGE_VIEW}>
          <ImageDataModal/>
        </ModalLookDataWrapper>
    </section>
  )
}