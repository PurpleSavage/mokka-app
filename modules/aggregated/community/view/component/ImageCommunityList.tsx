'use client'
import { useQuery } from "@/modules/shared/common/view/custom-hooks/useQuery"
import { imageCommunityDI } from "../../di/images-community-container.di"
import { useDispatch, useSelector } from "react-redux"
import { setImagesCommunity } from "../../slices/image-community.slice"
import { RootState } from "@/store/boundStore"
import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto"
import { SharedImageEntity } from "@/modules/image/domain/entities/shared-image.entity"
import MasonryContainer from "@/modules/shared/common/view/components/MasonryContainer"
import MasonryItem, { MasonryOptions } from "@/modules/shared/common/view/components/MasonryItem"
import MasonrySkeleton from "@/modules/shared/common/view/skeletons/MasonrySkeleton"


export default function ImageCommunityList() {
  const dispatch = useDispatch()
  const imagesCommunity = useSelector((state:RootState)=>state.imageCommunity.imagesCommunity)
  const {data,isPending,error}=useQuery<ListPaginationDto<SharedImageEntity[]>>({
    fn:()=>imageCommunityDI.listSharedImages(),
    dispatchStoreCache : (data) => dispatch(setImagesCommunity(data)),
    revalidate:imagesCommunity === null || imagesCommunity.data.length === 0,
    selector:()=>imagesCommunity
  })

  if(isPending){
    return (
      <MasonrySkeleton/>
    )
  }
  if(error){
    return <p className="flex items-center justify-center p-4 text-red-500">{error}</p>
  }
  if(data?.data.length=== 0){
    return <p className="flex items-center justify-center p-4 text-gray-400">There are no images shared by the community yet.</p>
  }
  return (
    <MasonryContainer>
      {
        data?.data.map((item,index)=>(
          <MasonryItem
            masonryComponent={MasonryOptions.IMAGE}
            key={item.id}
            index={index}
            imageComponent={{
              url:item.image.imageUrl,
              alt:item.image.prompt,
              aspectRatio:item.image.aspectRatio
            }}
          />
        ))
      }
    </MasonryContainer>
  )
}
