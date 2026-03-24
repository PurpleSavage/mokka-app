'use client'

import Gallery from "@/modules/image/view/components/Gallery";
import { useImages } from "@/modules/image/view/custom-hooks/useImages";

export default function HistoryImages() {
    const { error, isPending, gallery } = useImages();
  return (
    <Gallery error={error} gallery={gallery} isPending={isPending}/>
  )
}
