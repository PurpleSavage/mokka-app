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

export default function CreateInfluencerForm() {
  const dispatch = useDispatch();
  
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
  };

  return (
   
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col h-full max-h-[75vh] text-white"
    >
      
   
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
        
     
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="name">Influencer Name</label>
            <input 
              {...register("name")}
              type="text" id="name" placeholder="Ej. Mokka Jane"
              className={`w-full h-10 px-3 bg-transparent border rounded-lg outline-none transition-all ${errors.name ? 'border-red-500' : 'border-slate-600/50 focus:border-white'}`}/>
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="height" className="text-sm font-medium">Height (cm)</label>
            <input 
              {...register("height", { valueAsNumber: true })}
              type="number" id="height" 
              className={`w-full h-10 px-3 bg-transparent border rounded-lg outline-none transition-all ${errors.height ? 'border-red-500' : 'border-slate-600/50 focus:border-white'}`}
            />
            {errors.height && <p className="text-xs text-red-500">{errors.height.message}</p>}
          </div>
        </div>

    
        <div className="space-y-1">
          <label className="text-sm font-medium">Country</label>
          <input 
            {...register("country")}
            type="text" placeholder="Ej. Brazil"
            className={`w-full h-10 px-3 bg-transparent border rounded-lg outline-none transition-all ${errors.country ? 'border-red-500' : 'border-slate-600/50 focus:border-white'}`}
          />
          {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
        </div>

     
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          
         
          <div className="space-y-1">
            <label className="text-sm font-medium">Gender</label>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <DropDown 
                  options={genderOptions} 
                  selected={genderOptions.find(o => o.id === field.value)?.name}
                  handleSelect={(opt) => field.onChange(opt.id)}
                  placeholder="Select Gender"
                />
              )}
            />
            {errors.gender && <p className="text-xs text-red-500">{errors.gender.message}</p>}
          </div>

          
          <div className="space-y-1">
            <label className="text-sm font-medium">Age Range</label>
            <Controller
              control={control}
              name="ageRange"
              render={({ field }) => (
                <DropDown 
                  options={ageRangeOptions} 
                  selected={ageRangeOptions.find(o => o.id === field.value)?.name}
                  handleSelect={(opt) => field.onChange(opt.id)}
                />
              )}
            />
          </div>

       
          <div className="space-y-1">
            <label className="text-sm font-medium">Skin Color</label>
            <Controller control={control} name="skinColor" render={({ field }) => (
                <DropDown options={skinColorOptions} selected={skinColorOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
          </div>

         
          <div className="space-y-1">
            <label className="text-sm font-medium">Body Shape</label>
            <Controller control={control} name="bodyShape" render={({ field }) => (
                <DropDown options={bodyShapeOptions} selected={bodyShapeOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
          </div>

   
          <div className="space-y-1">
            <label className="text-sm font-medium">Hair Color</label>
            <Controller control={control} name="hairColor" render={({ field }) => (
                <DropDown options={hairColorOptions} selected={hairColorOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
          </div>

    
          <div className="space-y-1">
            <label className="text-sm font-medium">Hair Type</label>
            <Controller control={control} name="hairType" render={({ field }) => (
                <DropDown options={hairTypeOptions} selected={hairTypeOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
          </div>

      
          <div className="space-y-1">
            <label className="text-sm font-medium">Eye Color</label>
            <Controller control={control} name="eyeColor" render={({ field }) => (
                <DropDown options={eyeColorOptions} selected={eyeColorOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
          </div>

    
          <div className="space-y-1">
            <label className="text-sm font-medium">Face Type</label>
            <Controller control={control} name="faceType" render={({ field }) => (
                <DropDown options={faceTypeOptions} selected={faceTypeOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
          </div>

     
          <div className="space-y-1">
            <label className="text-sm font-medium">Lips Type</label>
            <Controller control={control} name="lipsType" render={({ field }) => (
                <DropDown options={lipsTypeOptions} selected={lipsTypeOptions.find(o => o.id === field.value)?.name} handleSelect={(opt) => field.onChange(opt.id)}/>
            )} />
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
          className="w-full h-11 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors"
        >
          Generate Influencer
        </button>
      </div>
      
    </form>
  )
}