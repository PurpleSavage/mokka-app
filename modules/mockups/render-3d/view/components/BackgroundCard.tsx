'use client'
import { useDispatch } from "react-redux";
import { BackgroundMockupEntity } from "../../domain/entities/background-mockup.entity";
import { setConfigbackground } from "../../render-3d-slice/render-3d.slice";

interface BackgroundCardProps {
  background: BackgroundMockupEntity;
}

export default function BackgroundCard({ background }: BackgroundCardProps) {
    const dispatch = useDispatch()
    const selectBackgroundImage=(backgroundConfig:BackgroundMockupEntity)=>{
        dispatch(setConfigbackground({
            image:backgroundConfig.backgroundUrl,
        }))
    }
  return (
    <div
      className="w-full h-16 overflow-hidden rounded-md cursor-pointer"
      onClick={()=>selectBackgroundImage(background)}
    >
      <img
        src={background.backgroundUrl}
        className="w-full h-full object-cover"
        alt={background.name}
      />
    </div>
  );
}
