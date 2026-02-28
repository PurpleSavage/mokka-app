'use client'
import { closeModalWrapper } from "@/modules/shared/common/common-slice/modals-slice.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { GenerateSceneDto, generateSceneSchema } from "../../application/dtos/requests/generate-scene.dto";
import DropDown from "@/modules/shared/common/view/components/DropDown";
import { videoAspectRatioOptions } from "../../constants/generate-scene-options";
import SwitchElement from "@/modules/shared/common/view/components/SwitchElement";
import ListThumbnailsSnapshots from "./ListThumbnailsSnapshots";

export default function GenerateSceneForm() {
  const dispatch = useDispatch()
  const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<GenerateSceneDto>({
      resolver: zodResolver(generateSceneSchema),
      defaultValues: {
        prompt: "",
        imageBaseUrls: [],
        volume: false,
      },
    })
  const onSubmit = (data: GenerateSceneDto) => {
    console.log(data)
  }
  return (
    <form className="flex flex-col h-full  max-h-[75vh] text-white" onChange={handleSubmit(onSubmit)}>
      <div className="flex-1 grid grid-cols-[1fr_140px] gap-4 min-h-0">
        <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
          <div className="space-y-1">
            <label htmlFor="sceneprompt" className="text-sm font-medium block">Scene prompt</label>
            <textarea
                id="sceneprompt"
              placeholder="Start typing ..."
              className={`w-full h-40 text-white rounded-lg p-3 border bg-[#121212]
                  outline-none transition-all 
                  ${errors.prompt ? 'border-red-500' : 'border-slate-600/50 focus:border-pink-800'}`}
              {...register("prompt")}
            />
            {errors.prompt && <p className="text-red-500 text-sm px-2">{errors.prompt.message}</p>}
          </div> 

          <div className="space-y-1">
            <label className="text-sm font-medium block">Aspect ratio</label>
            <Controller control={control} name="aspectRatio" render={({ field }) => (
                <DropDown 
                options={videoAspectRatioOptions} 
                selected={videoAspectRatioOptions.find(o => o.id === field.value)?.name} 
                handleSelect={(opt) => field.onChange(opt.id)} 
                placeholder="Select Gender" />
              )} />
              {errors.aspectRatio && <p className="text-[10px] text-red-500">{errors.aspectRatio.message}</p>}
          </div>

          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="volume"
              render={({ field }) => ( 
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${!field.value ? 'text-white' : 'text-slate-400'}`}>
                    Audio off
                  </span>
                  
                  <SwitchElement 
                    enabled={field.value} 
                    setEnabled={field.onChange} 
                  />
                  
                  <span className={`text-sm ${field.value ? 'text-white' : 'text-slate-400'}`}>
                    Audio on
                  </span>
                </div>
              )} 
            />
          </div>
        </div>
        <div className="overflow-y-auto custom-scrollbar flex flex-col gap-2 min-h-0">
            <ListThumbnailsSnapshots/>
        </div>
      </div>
      <div className="flex gap-4 pt-4 border-t border-slate-700 mt-2 bg-[#121212]">
        <button
          type="button"
          onClick={() => dispatch(closeModalWrapper())}
          className="w-full h-11 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full h-11 cursor-pointer bg-white text-black font-bold rounded-lg
                       hover:bg-slate-200 transition-colors"
        >
          Generate snapshot
        </button>
      </div>
    </form>
  );
}
