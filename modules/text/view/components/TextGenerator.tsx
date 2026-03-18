'use client'
import DropDown from "@/modules/shared/common/view/components/DropDown";
import Spin from "@/modules/shared/common/view/components/Spin";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FullGenerateTextDto, GenerateTextDto, generateTextSchema } from "../../application/dtos/requests/generate-text.dto";
import { formatArray, lengthArray, promotingArray, toneArray } from "../../constants/text-generator-options";
import { PromotingText } from "../../domain/enums/options-text";
import { textDI } from "../../di/text-container.di";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import { SelectorModalbasedError, TypeErrorAlert } from "@/modules/shared/common/infrastructure/error-mappers/selector-modal-based-error.mapper";
import { setConfigAlertModal } from "@/modules/shared/common/common-slice/modals-slice.store";
import { sileo } from "sileo";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingText } from "../../text-slice/text-store.slice";
import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession";
import { RootState } from "@/store/boundStore";
import { StatusQueue } from "@/modules/shared/common/domain/enums/status-queue";




export default function TextGenerator() {
    const [isOther, setIsOther] = useState(false);
    const {id}=useIdSession()
    const dispatch = useDispatch()
    const isGenerating = useSelector((state:RootState)=>state.text.isGenerating)
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isSubmitting }
    } = useForm<GenerateTextDto>({
        resolver: zodResolver(generateTextSchema),
        defaultValues: {
            context: "",
            title: "",
            promotionType:promotingArray[0].name,
            toneType:toneArray[0].name,
            textLength:lengthArray[0].name,
            textFormat:formatArray[0].name,
        }
    })
    const selectedPromotion = useWatch({ control, name: "promotionType" })
    const selectedTone = useWatch({ control, name: "toneType" })
    const selectedLength = useWatch({ control, name: "textLength" })
    const selectedFormat = useWatch({ control, name: "textFormat" })

    const onSubmit = async(data: GenerateTextDto) => {
        if(!id) return 
       try {
        const payload:FullGenerateTextDto = {
            ...data,
            user:id
        }
        const response = await textDI.generateText(payload)
        dispatch(setLoadingText(response))
        sileo.info({
            title:response.status,
            description:response.message
        })
       } catch (error) {
        if (error instanceof ApiErrorPlatform) {
            const config = SelectorModalbasedError.selectModal(error)
            if (config.typeAlert === TypeErrorAlert.ALERT_MODAL) {
                dispatch(setConfigAlertModal({ 
                    title: config.title, 
                    message: config.message, 
                    type: 'error' 
                }))
            } else {
                sileo.error({ title: config.title, description: config.message })
            }
        }
       }
    };
  return (
        <div className="grid grid-cols-2 gap-4 p-4">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            
                <div className="space-y-2">
                    <label className="text-white font-medium block">Context</label>
                    <textarea 
                        {...register("context")}
                        placeholder="What do you want to achieve?"
                        className={`w-full h-40 text-white rounded-lg p-3 border bg-[#121212]
            outline-none transition-all ${errors.context ? 'border-red-500' : 'border-slate-600/50 focus:border-pink-800'}`} 
                    />
                    {errors.context && <p className="text-red-500 text-sm">{errors.context.message}</p>}
                </div>

              
                <div className="space-y-2">
                    <label className="block font-medium text-gray-500">What are you promoting?</label>
                    {!isOther ? (
                        <DropDown 
                            selected={selectedPromotion}
                            options={promotingArray} 
                            handleSelect={(val) => {
                                if (val.name === PromotingText.OTHER) {
                                    setIsOther(true);
                                    setValue("promotionType", "", { shouldValidate: false });
                                } else {
                                    setValue("promotionType", val.name, { shouldValidate: true });
                                }
                            }}
                        />
                    ) : (
                        <div className="flex items-center gap-2">
                            <input 
                                {...register("promotionType")}
                                autoFocus
                                className="h-10 px-2 w-full bg-transparent border border-slate-600/50 rounded-lg text-white"
                                placeholder="Write your own..."
                            />
                            <button 
                                type="button"
                                onClick={() => { 
                                    setIsOther(false); 
                                    setValue("promotionType", promotingArray[0].name); 
                                }}
                                className="bg-pink-800 cursor-pointer transition-colors hover:bg-pink-700
                                 px-4 h-10 rounded-lg text-black font-medium"
                            >
                                Back
                            </button>
                        </div>
                    )}
                    {errors.promotionType && <p className="text-red-500 text-sm px-2">{errors.promotionType.message}</p>}
                </div>

                
                <div className="flex gap-2">
                    <div className="w-1/2 space-y-2">
                        <label className="block font-medium text-gray-500">Title</label>
                        <input 
                            {...register("title")}
                            className="h-10 px-2 w-full bg-transparent border border-slate-600/50 rounded-lg text-white" 
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div className="w-1/2 space-y-2">
                        <label className="block font-medium text-gray-500">Tone</label>
                        <DropDown 
                            selected={selectedTone}
                            options={toneArray} 
                            handleSelect={(val) => setValue("toneType", val.name, { shouldValidate: true })}
                        />
                    </div>
                </div>

               
                <div className="flex gap-2">
                    <div className="w-1/2 space-y-2">
                        <label className="block font-medium text-gray-500">Length</label>
                        <DropDown 
                            selected={selectedLength}
                            options={lengthArray} 
                            handleSelect={(val) => setValue("textLength", val.name, { shouldValidate: true })}
                        />
                    </div>
                    <div className="w-1/2 space-y-2">
                        <label className="block font-medium text-gray-500">Format</label>
                        <DropDown 
                            selected={selectedFormat}
                            options={formatArray} 
                            handleSelect={(val) => setValue("textFormat", val.name, { shouldValidate: true })}
                        />
                    </div>
                </div>

                <button type="submit" disabled={isGenerating?.status===StatusQueue.PROCESSING} 
                className="w-full py-2 flex items-center justify-center cursor-pointer hover:bg-pink-800
                 hover:text-white transition-colors
                 rounded-lg text-black font-bold bg-white">
                    {isSubmitting? <><Spin /> Generating...</> : "Generate text"}
                </button>
            </form>

            <div className="space-y-2">
                <label className="block text-white font-medium">Result</label>
                <div className="border border-slate-600/50 w-full h-150 p-4 rounded-lg
                 text-white bg-slate-900/20">
                    {isGenerating?.status===StatusQueue.PROCESSING ? "Generating..." : "Your text will appear here..."}   
                </div>
            </div>
        </div>
    )
}
