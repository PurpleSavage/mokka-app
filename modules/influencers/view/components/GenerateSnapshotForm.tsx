"use client";

import { Controller, useForm } from "react-hook-form";
import {
  GenerateSnapshotDto,
  generateSnapShotSchema,
} from "../../application/dtos/requests/generate-snapshot.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { closeModalWrapper } from "@/modules/shared/common/common-slice/modals-slice.store";
import { aspectRatioOptions, enviromentsOptions, outfitOptions } from "../../constants/generate-snapshot-options";
import DropDown from "@/modules/shared/common/view/components/DropDown";

export default function GenerateSnapshotForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GenerateSnapshotDto>({
    resolver: zodResolver(generateSnapShotSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = (data: GenerateSnapshotDto) => {
    console.log("Datos del Influencer:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full max-h-[75vh] text-white"
    >
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        <div className="space-y-1">
          <label htmlFor="" className="text-sm font-medium"></label>
          <textarea
            placeholder="Start typing ..."
            className={`w-full h-40 text-white rounded-lg p-3 border bg-[#121212]
                outline-none transition-all 
                ${errors.prompt ? 'border-red-500' : 'border-slate-600/50 focus:border-pink-800'}`}
            {...register("prompt")}
          />
          {errors.prompt && <p className="text-red-500 text-sm px-2">{errors.prompt.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Aspect ratio</label>
          <Controller control={control} name="aspectRatio" render={({ field }) => (
              <DropDown options={aspectRatioOptions} selected={aspectRatioOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)} placeholder="Select Gender" />
            )} />
            {errors.aspectRatio && <p className="text-[10px] text-red-500">{errors.aspectRatio.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Outfit style</label>
          <Controller control={control} name="outfitStyle" render={({ field }) => (
              <DropDown options={outfitOptions} selected={outfitOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)} placeholder="Select Gender" />
            )} />
            {errors.outfitStyle && <p className="text-[10px] text-red-500">{errors.outfitStyle.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Enviroment</label>
          <Controller control={control} name="enviroment" render={({ field }) => (
              <DropDown options={enviromentsOptions} selected={enviromentsOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)} placeholder="Select Gender" />
            )} />
            {errors.enviroment && <p className="text-[10px] text-red-500">{errors.enviroment.message}</p>}
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
          Generate Influencer
        </button>
      </div>
    </form>
  );
}
