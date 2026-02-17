'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { FullAudioDto, GenerateAudioDto, generateAudioSchema } from "../../application/dtos/requests/generate-audio.dto"
import { Controller, useForm, useWatch } from "react-hook-form"
import { audioModels } from "../constants/audio-samples"
import DropDown from "@/modules/shared/common/view/components/DropDown"
import Spin from "@/modules/shared/common/view/components/Spin"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/boundStore"
import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession"
import { audioDi } from "../../di/audio-container.di"
import { setLoadingAudio } from "../../audio-slice/audio-store.slice"
import { ApiErrorPlatform } from "@/modules/shared/common/errors/api-errors.error"
import { setConfigAlertModal } from "@/modules/shared/common/common-slice/modals-slice.store"
import { SelectorModalbasedError, TypeErrorAlert } from "@/modules/shared/common/infrastructure/error-mappers/selector-modal-based-error.mapper"
import { sileo } from "sileo"




type AudioSliderFields = "speed" | "stability" | "similarity" | "exaggeration"
export default function VoiceSettings() {

  const isGenerating = useSelector((state:RootState)=>state.audio.isGenerating)
  const dispatch = useDispatch()
  const {id}=useIdSession()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<GenerateAudioDto>({
    resolver: zodResolver(generateAudioSchema),
    defaultValues: {
      idModel: '9BWtsMINqrJLrRacOk9x',
      prompt: '',
      nameModelAudio: 'Aria',
      speed: 100,
      stability: 50,
      similarity: 75,
      exaggeration: 0,
      useSpeakerBoost: true
    }
  })
  
  const currentName = useWatch({
    control,
    name: "nameModelAudio"
  });

  const speakerBoost = useWatch({
    control,
    name: "useSpeakerBoost"
  })
  const dropdownOptions = audioModels.map(m => ({ 
    id: m.idSample, 
    name: m.name 
  }))
  const onSubmit = async (data: GenerateAudioDto) => {
    if(!id){
      console.error('no session initialize')
      return
    }
    try {
      const audioDto:FullAudioDto = {
        ...data,
        user:id
      }
      const response = await audioDi.generateAudio(audioDto)
      dispatch(setLoadingAudio({
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
    <form className="space-y-2 h-full" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        placeholder="Start typing ..."
        className={`w-full h-40 text-white rounded-lg p-3 border bg-[#121212]
            outline-none transition-all 
            ${errors.prompt ? 'border-red-500' : 'border-slate-600/50 focus:border-pink-800'}`}
        {...register("prompt")}
      />
      {errors.prompt && <p className="text-red-500 text-sm px-2">{errors.prompt.message}</p>}

      <div className="relative w-full">
      <label className="text-white text-xs mb-1 block">Voice Model</label>
        <DropDown
          options={dropdownOptions}
          selected={currentName}
          placeholder="Select a voice"
          handleSelect={(option) => {
            setValue("idModel", option.id);
            setValue("nameModelAudio", option.name);
          }}
        />
        {errors.idModel && (
          <p className="text-red-500 text-xs mt-1">{errors.idModel.message}</p>
        )}
      </div>
      <div className="space-y-4 pt-2">
        {(["speed", "stability", "similarity", "exaggeration"] as AudioSliderFields[]).map((field) => (
          <div key={field} className="space-y-1">
            <label htmlFor={field} className="block text-white text-sm capitalize">
              {field === "exaggeration" ? "Style Exaggeration" : field}
            </label>
            <input
              type="range"
              id={field}
              min={field === "speed" ? "70" : "0"}
              max={field === "speed" ? "120" : "100"}
              className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer"
              // 2. Tipado correcto para evitar el 'any'
              {...register(field, { valueAsNumber: true })} 
            />
          </div>
        ))}

        {/* SWITCH SPEAKER BOOST */}
        <div className="space-y-2">
          <label className="text-white block text-sm">Speaker Boost</label>
          <div className="py-1 flex gap-2 items-center">
            <p className={`font-medium text-xs ${!speakerBoost ? "text-pink-800" : "text-gray-400"}`}>Off</p>
            <Controller
              name="useSpeakerBoost"
              control={control}
              render={({ field }) => (
                <button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
                    field.value ? "bg-pink-800" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${
                      field.value ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              )}
            />
            <p className={`font-medium text-xs ${speakerBoost ? "text-pink-800" : "text-gray-400"}`}>On</p>
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="w-full cursor-pointer mt-4 text-black font-medium bg-white hover:text-pink-800 rounded-lg py-2 flex items-center justify-center disabled:opacity-50"
        disabled={isGenerating?.status === "processing"}
      >
        {isGenerating?.status === "processing" ? (
          <div className="flex gap-2 items-center">
            <Spin /> Generating...
          </div>
        ) : (
          "Generate audio"
        )}
      </button>
    </form>
  )
}
