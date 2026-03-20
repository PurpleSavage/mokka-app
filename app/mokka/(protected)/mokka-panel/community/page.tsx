import { communityImagesMock } from "@/modules/image/view/mocks/community-images-mock";


export default function CommunityImagePage() {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-1 ">
      {communityImagesMock.map((item,index) => (
        <div key={item.id} className="break-inside-avoid mb-1">
          <img
            src={item.image.imageUrl}
            alt={item.image.prompt}
            className="w-full"
            style={{ aspectRatio: index % 3 === 0 ? '1/1.5' : index % 2 === 0 ? '1/0.8' : '1/1' }}
          />
        </div>
      ))}
    </div>
  )
}
