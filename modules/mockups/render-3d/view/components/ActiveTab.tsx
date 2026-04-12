'use client'

import { useDispatch, useSelector } from "react-redux";
import { ActiveTapOptionsRender3D } from "./Aside3DMenu";
import BackgroundOptions from "./BackgroundOptions";
import EditSection from "./EditSection";
import ListModels from "./ListModels";
import { RootState } from "@/store/boundStore";
import { useQuery } from "@/modules/shared/common/view/custom-hooks/useQuery";
import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto";
import { Model3DEntity } from "../../domain/entities/model-3d.entity";
import { setModels } from "../../render-3d-slice/render-3d.slice";
import { render3DDI } from "../../di/render-3d-container.di";

interface ActiveTabProps {
    activeTab: string;
}
export default function ActiveTab({ activeTab }: ActiveTabProps) {
    const dispatch = useDispatch()
    const models = useSelector((state:RootState) => state.render3D.models)
    

    const {data,isPending,error}=useQuery<ListPaginationDto<Model3DEntity[]>>({
        fn : () => render3DDI.listModels3D(),
        dispatchStoreCache : (data) => dispatch(setModels(data)),
        revalidate : models=== null || models.data.length=== 0,
        selector:()=>models
    })

    if(activeTab ===ActiveTapOptionsRender3D.MODELS){
        return (
            <div className="border flex flex-col gap-2 bg-table-body-bg w-full rounded-lg p-2 border-white/10 h-[80vh] overflow-hidden">
                <p className="text-gray-400">All models</p>
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <ListModels
                        isPending={isPending}
                        models={data}
                        error={error}
                    />
                </div>
            </div>
        )
    }

    if(activeTab ===ActiveTapOptionsRender3D.BACKGROUND){
        return (
            <div className="border flex flex-col gap-2 bg-table-body-bg w-full rounded-lg p-2 border-white/10 max-h-[80vh] overflow-hidden">
                <p className="text-gray-400 text-lg shrink-0">All backgrounds</p>
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <BackgroundOptions/>
                </div>
            </div>
        )
    }

    if(activeTab ===ActiveTapOptionsRender3D.EDIT){
        return (
            <div className="border flex flex-col gap-2 bg-table-body-bg w-full rounded-lg p-2 border-white/10 max-h-[80vh] overflow-hidden">
                <p className="text-gray-400">Edit section</p>
                <div className="grid grid-colos-4">
                    <EditSection/>
                </div>
            </div>
        )
    }

    return null
}
