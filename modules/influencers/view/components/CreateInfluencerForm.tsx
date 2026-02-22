'use client'

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DropDown from "@/modules/shared/common/view/components/DropDown";
import { 
  ageRangeOptions, bodyShapeOptions, eyeColorOptions, faceTypeOptions, 
  genderOptions, hairColorOptions, hairTypeOptions, lipsTypeOptions, skinColorOptions 
} from "../../constants/generate-influencer-options";

import { useDispatch } from "react-redux";
import { closeModalWrapper } from "@/modules/shared/common/common-slice/modals-slice.store";
import { GenerateInfluencerDto, generateInfluencerSchema } from "../../application/dtos/requests/generate-influencer.dto";
import { useGetCountries } from "@/modules/shared/common/view/custom-hooks/useCountries";
import { countriesToOptionsDropDown } from "@/modules/shared/common/view/utils/countries-to-options-dropdown";

export default function CreateInfluencerForm() {
  const dispatch = useDispatch();
  const {isPending,listCountries}=useGetCountries()
  const countryOptions = countriesToOptionsDropDown(listCountries);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GenerateInfluencerDto>({
    resolver: zodResolver(generateInfluencerSchema),
    defaultValues: {
      height: 160,
    }
  });

  const onSubmit = (data: GenerateInfluencerDto) => {
    console.log("Datos del Influencer:", data);
    dispatch(closeModalWrapper());
  }
  

  return (
   
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col h-full max-h-[75vh] text-white"
    >
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        
        {/* Name & Height */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Influencer Name</label>
            <input {...register("name")} className={`w-full h-10 px-3 bg-transparent border rounded-lg outline-none ${errors.name ? 'border-red-500' : 'border-slate-600/50'}`} />
            {errors.name && <p className="text-[10px] text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Height (cm)</label>
            <input {...register("height", { valueAsNumber: true })} type="number" className={`w-full h-10 px-3 bg-transparent border rounded-lg outline-none ${errors.height ? 'border-red-500' : 'border-slate-600/50'}`} />
            {errors.height && <p className="text-[10px] text-red-500">{errors.height.message}</p>}
          </div>
        </div>

        {/* Country */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Country</label>
          <Controller control={control} name="country" render={({ field }) => (
            <DropDown options={countryOptions} isLoading={isPending} selected={countryOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)} placeholder="Select a country" />
          )} />
          {errors.country && <p className="text-[10px] text-red-500">{errors.country.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {/* Gender */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Gender</label>
            <Controller control={control} name="gender" render={({ field }) => (
              <DropDown options={genderOptions} selected={genderOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)} placeholder="Select Gender" />
            )} />
            {errors.gender && <p className="text-[10px] text-red-500">{errors.gender.message}</p>}
          </div>

          {/* Age Range */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Age Range</label>
            <Controller control={control} name="ageRange" render={({ field }) => (
              <DropDown options={ageRangeOptions} selected={ageRangeOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)} />
            )} />
            {errors.ageRange && <p className="text-[10px] text-red-500">{errors.ageRange.message}</p>}
          </div>

          {/* Skin Color */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Skin Color</label>
            <Controller control={control} name="skinColor" render={({ field }) => (
              <DropDown options={skinColorOptions} selected={skinColorOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
            {errors.skinColor && <p className="text-[10px] text-red-500">{errors.skinColor.message}</p>}
          </div>

          {/* Body Shape */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Body Shape</label>
            <Controller control={control} name="bodyShape" render={({ field }) => (
              <DropDown options={bodyShapeOptions} selected={bodyShapeOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
            {errors.bodyShape && <p className="text-[10px] text-red-500">{errors.bodyShape.message}</p>}
          </div>

          {/* Hair Color */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Hair Color</label>
            <Controller control={control} name="hairColor" render={({ field }) => (
              <DropDown options={hairColorOptions} selected={hairColorOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
            {errors.hairColor && <p className="text-[10px] text-red-500">{errors.hairColor.message}</p>}
          </div>

          {/* Hair Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Hair Type</label>
            <Controller control={control} name="hairType" render={({ field }) => (
              <DropDown options={hairTypeOptions} selected={hairTypeOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
            {errors.hairType && <p className="text-[10px] text-red-500">{errors.hairType.message}</p>}
          </div>

          {/* Eye Color */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Eye Color</label>
            <Controller control={control} name="eyeColor" render={({ field }) => (
              <DropDown options={eyeColorOptions} selected={eyeColorOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
            {errors.eyeColor && <p className="text-[10px] text-red-500">{errors.eyeColor.message}</p>}
          </div>

          {/* Face Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Face Type</label>
            <Controller control={control} name="faceType" render={({ field }) => (
              <DropDown options={faceTypeOptions} selected={faceTypeOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
            {errors.faceType && <p className="text-[10px] text-red-500">{errors.faceType.message}</p>}
          </div>

          {/* Lips Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Lips Type</label>
            <Controller control={control} name="lipsType" render={({ field }) => (
              <DropDown options={lipsTypeOptions} selected={lipsTypeOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
            {errors.lipsType && <p className="text-[10px] text-red-500">{errors.lipsType.message}</p>}
          </div>
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
  )
}