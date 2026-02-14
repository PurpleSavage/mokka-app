'use client'
import DropDown from "@/modules/shared/common/view/components/DropDown";
import Spin from "@/modules/shared/common/view/components/Spin";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenerateTextDto, generateTextSchema } from "../../application/dtos/requests/generate-text.dto";
import { formatArray, lengthArray, promotingArray, toneArray } from "../../constants/text-generator-options";
import { PromotingText } from "../../domain/enums/options-text";


export default function TextGenerator() {
    const [isOther, setIsOther] = useState(false);
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

    const onSubmit = (data: GenerateTextDto) => {
        console.log("Valid Data:", data);
    };
  return (
        <div className="grid grid-cols-2 gap-4 p-4">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            
                <div className="space-y-2">
                    <label className="text-white font-medium block">Context</label>
                    <textarea 
                        {...register("context")}
                        placeholder="What do you want to achieve?"
                        className="w-full p-4 h-75 text-white bg-transparent border border-slate-600/50 rounded-lg focus:outline-gray-400" 
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
                                if (val === PromotingText.OTHER) {
                                    setIsOther(true);
                                    setValue("promotionType", "", { shouldValidate: false });
                                } else {
                                    setValue("promotionType", val, { shouldValidate: true });
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
                            handleSelect={(val) => setValue("toneType", val, { shouldValidate: true })}
                        />
                    </div>
                </div>

               
                <div className="flex gap-2">
                    <div className="w-1/2 space-y-2">
                        <label className="block font-medium text-gray-500">Length</label>
                        <DropDown 
                            selected={selectedLength}
                            options={lengthArray} 
                            handleSelect={(val) => setValue("textLength", val, { shouldValidate: true })}
                        />
                    </div>
                    <div className="w-1/2 space-y-2">
                        <label className="block font-medium text-gray-500">Format</label>
                        <DropDown 
                            selected={selectedFormat}
                            options={formatArray} 
                            handleSelect={(val) => setValue("textFormat", val, { shouldValidate: true })}
                        />
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting} 
                className="w-full py-2 flex items-center justify-center cursor-pointer hover:bg-pink-800
                 hover:text-white transition-colors
                 rounded-lg text-black font-bold bg-white">
                    {isSubmitting ? <><Spin /> Generating...</> : "Generate text"}
                </button>
            </form>

            <div className="space-y-2">
                <label className="block text-white font-medium">Result</label>
                <div className="border border-slate-600/50 w-full h-150 p-4 rounded-lg
                 text-white bg-slate-900/20">
                    {isSubmitting ? "Generating..." : "Your text will appear here..."}
                </div>
            </div>
        </div>
    )
}
