'use client'

import { useQuery } from "@/modules/shared/common/view/custom-hooks/useQuery"
import { imageCommunityDI } from "../../di/images-community-container.di"

export default function ImageCommunityList() {
    const {data}=useQuery({
        fn:()=>imageCommunityDI.listSharedImages()
    })
  return (
    <div>ImageCommunityList</div>
  )
}
