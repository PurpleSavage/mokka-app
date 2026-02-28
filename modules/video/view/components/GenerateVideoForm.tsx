"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  GenerateVideoDto,
  generateVideoSchema,
} from "../../application/dtos/requests/generate-video.dto";
import { Controller, useForm } from "react-hook-form";
import DropDown from "@/modules/shared/common/view/components/DropDown";
import { videoAspectRatioOptions } from "@/modules/influencers/constants/generate-scene-options";
import SwitchElement from "@/modules/shared/common/view/components/SwitchElement";

export default function GenerateVideoForm() {
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
  });
  const onSubmit = (data: GenerateVideoDto) => {
    console.log(data)
  };
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
