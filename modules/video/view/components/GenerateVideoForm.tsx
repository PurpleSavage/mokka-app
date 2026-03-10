"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FullGenerateVideoDto,
  GenerateVideoDto,
  generateVideoSchema,
} from "../../application/dtos/requests/generate-video.dto";
import { Controller, useForm } from "react-hook-form";
import DropDown from "@/modules/shared/common/view/components/DropDown";
import { videoAspectRatioOptions } from "@/modules/influencers/constants/generate-scene-options";
import SwitchElement from "@/modules/shared/common/view/components/SwitchElement";
import { sileo } from "sileo";
import { useDispatch } from "react-redux";
import { ApiErrorPlatform } from "@/modules/shared/common/errors/api-errors.error";
import { SelectorModalbasedError, TypeErrorAlert } from "@/modules/shared/common/infrastructure/error-mappers/selector-modal-based-error.mapper";
import { setConfigAlertModal } from "@/modules/shared/common/common-slice/modals-slice.store";
import { videoDI } from "../../application/di/video-container.di";
import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession";
import { setLoadingVideo } from "../../video-slice/video-store.slice";

export default function GenerateVideoForm() {
  const dispatch = useDispatch()
  const {id}=useIdSession()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GenerateVideoDto>({
    resolver: zodResolver(generateVideoSchema),
    defaultValues: {
      prompt: "",
      audio: false,
    },
  })
  

  const onSubmit = async (data: GenerateVideoDto) => {
    if(!id) return
    try {
      const dto:FullGenerateVideoDto = {
        ...data,
        user:id
      }
      const response = await videoDI.generateVideo(dto)
      dispatch(setLoadingVideo({
        jobId:response.jobId,
        status:response.status,
        message:response.message
      }))  
      sileo.info({
        title:response.status,
        description:response.message
      })
    } catch (error:unknown) {
      if(error instanceof ApiErrorPlatform){
        const config = SelectorModalbasedError.selectModal(error)
        if(config.typeAlert === TypeErrorAlert.ALERT_MODAL ){
          dispatch(setConfigAlertModal({
            title:config.title,
            message:config.message,
            type:'error'
          }))
        }else{
          sileo.error({
            title:config.title,
            description:config.message
          })
        }
      }else{
        sileo.error({
          title:"Unexpected Error",
          description:"An unknown error occurred. Please try again later."
        })
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="space-y-1">
          <label htmlFor="videoprompt" className="text-sm font-medium block">
            Video prompt
          </label>
          <textarea
            placeholder="Start typing ..."
            id="videoprompt"
            className={`w-full h-40 text-white rounded-lg p-3 border bg-[#121212]
                    outline-none transition-all 
                    ${errors.prompt ? "border-red-500" : "border-slate-600/50 focus:border-pink-800"}`}
            {...register("prompt")}
          />
          {errors.prompt && (
            <p className="text-red-500 text-sm px-2">{errors.prompt.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium block">Aspect ratio</label>
          <Controller
            control={control}
            name="aspectRatio"
            render={({ field }) => (
              <DropDown
                options={videoAspectRatioOptions}
                selected={
                  videoAspectRatioOptions.find((o) => o.id === field.value)
                    ?.name
                }
                handleSelect={(opt) => field.onChange(opt.id)}
                placeholder="Select Gender"
              />
            )}
          />
          {errors.aspectRatio && (
            <p className="text-[10px] text-red-500">
              {errors.aspectRatio.message}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="audio"
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${!field.value ? "text-white" : "text-slate-400"}`}
                >
                  Audio off
                </span>

                <SwitchElement
                  enabled={field.value}
                  setEnabled={field.onChange}
                />

                <span
                  className={`text-sm ${field.value ? "text-white" : "text-slate-400"}`}
                >
                  Audio on
                </span>
              </div>
            )}
          />
        </div>
        <div className="flex items-center justify-end">
            <button
                type="submit"
                className="px-8 h-11 cursor-pointer bg-white text-black font-bold rounded-lg
                            hover:bg-pink-800 hover:text-white transition-colors"
            >
                Generate video
            </button>
        </div>
    </form>
  );
}
