"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {
  GenerateImageDto,
  generateImageSchema,
} from "../../application/dtos/request/generate-image.dto";
import { DigitalArtSubStyle, TypeStyle } from "../../domain/enums/image-styles";
import { Styles, StylesArray } from "../cosntants/style-options";
import { RootState } from "@/store/boundStore";

import Spin from "@/modules/shared/common/view/components/Spin";
import { setLoadingImage } from "../../image-slice/image.slice";
import { imageDI } from "../../di/image-container.di";
import { sileo } from "sileo";
import { ApiErrorPlatform } from "@/modules/shared/common/errors/api-errors.error";
import {
  SelectorModalbasedError,
  TypeErrorAlert,
} from "@/modules/shared/common/infrastructure/error-mappers/selector-modal-based-error.mapper";
import { setConfigAlertModal } from "@/modules/shared/common/common-slice/modals-slice.store";

export default function FormGenerateImage() {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.auth.session);
  const isGenerating = useSelector(
    (state: RootState) => state.image.isGenerating,
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<GenerateImageDto>({
    resolver: zodResolver(generateImageSchema),
    defaultValues: {
      prompt: "",
      width: 1024,
      height: 1024,
      aspectRatio: "1:1",
      style: TypeStyle.DIGITAL_ART,
      subStyle: DigitalArtSubStyle.CONCEPT_ART,
    },
  });

  const selectedStyleId = useWatch({ control, name: "style" });
  const selectedSubStyle = useWatch({ control, name: "subStyle" });
  const currentAspectRatio = useWatch({ control, name: "aspectRatio" });

  const currentStyleConfig =
    Styles[selectedStyleId as TypeStyle] || Styles[TypeStyle.DIGITAL_ART];

  const onSubmit = async (data: GenerateImageDto) => {
    if (!session) return;
    try {
      const imageGenerated = await imageDI.generateImage(data);

      dispatch(
        setLoadingImage({
          jobId: imageGenerated.jobId,
          status: imageGenerated.status,
          message: imageGenerated.message,
        }),
      );
      sileo.info({
        title: imageGenerated.status,
        description: imageGenerated.message,
      });
    } catch (error) {
      if (error instanceof ApiErrorPlatform) {
        const config = SelectorModalbasedError.selectModal(error);
        if (config.typeAlert === TypeErrorAlert.ALERT_MODAL) {
          dispatch(
            setConfigAlertModal({
              title: config.title,
              message: config.message,
              type: "error",
            }),
          );
        } else {
          sileo.error({
            title: config.title,
            description: config.message,
          });
        }
      } else {
        sileo.error({
          title: "Unexpected Error",
          description: "An unknown error occurred. Please try again later.",
        });
      }
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* 1. Prompt Input */}
      <div className="space-y-1">
        <textarea
          {...register("prompt")}
          placeholder="Describe la imagen que tienes en mente..."
          className={`w-full h-40 text-white rounded-lg p-3 border bg-[#121212]
            outline-none transition-all ${errors.prompt ? "border-red-500" : "border-slate-600/50 focus:border-pink-800"}`}
        />
        {errors.prompt && (
          <p className="text-red-500 text-xs font-medium">
            {errors.prompt.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {/* 2. Selector de Estilos Principales */}
        <div className="flex gap-3  px-2 py-2 rounded-xl overflow-x-auto scrollbar-hide">
          {StylesArray.map((style) => (
            <button
              type="button"
              key={style.id}
              onClick={() => {
                setValue("style", style.id);
                setValue("subStyle", style.subStyles[0].title);
              }}
              className={`px-4 py-1 rounded-lg cursor-pointer border-2 text-sm transition-all whitespace-nowrap font-medium
                ${
                  selectedStyleId === style.id
                    ? `${style.bg} text-white ${style.border}`
                    : "bg-white text-black border-transparent hover:bg-gray-200"
                }`}
            >
              {style.title}
            </button>
          ))}
        </div>

        {/* 3. Selector de Sub-estilos dinámico */}
        <div className="flex flex-wrap gap-2 px-2 min-h-8">
          {currentStyleConfig.subStyles.map((sub) => (
            <button
              type="button"
              key={sub.id}
              onClick={() => setValue("subStyle", sub.title)}
              className={`border cursor-pointer rounded-lg text-xs px-4 py-1 transition-all
                ${
                  selectedSubStyle === sub.title
                    ? `${currentStyleConfig.bg} ${currentStyleConfig.border} text-white`
                    : "border-slate-700 text-gray-400 hover:border-slate-500 hover:text-white"
                }`}
            >
              #{sub.title}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Aspect Ratio y Submit */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          {[
            { id: "square", ratio: "1:1", w: 1024, h: 1024, label: "Square" },
            {
              id: "landscape",
              ratio: "16:9",
              w: 1792,
              h: 1024,
              label: "Landscape",
            },
            {
              id: "portrait",
              ratio: "9:16",
              w: 1024,
              h: 1792,
              label: "Portrait",
            },
          ].map((item) => (
            <label
              key={item.id}
              className={`flex flex-col items-center justify-center border rounded-lg px-4 py-1 cursor-pointer transition-all
                ${currentAspectRatio === item.ratio ? "border-pink-800 text-pink-800 bg-pink-800/5" : "border-slate-700 text-gray-500 hover:border-slate-500"}`}
            >
              <span className="text-sm font-bold">{item.ratio}</span>
              <span className="text-[10px] uppercase font-semibold">
                {item.label}
              </span>
              <input
                type="radio"
                value={item.ratio}
                className="hidden"
                {...register("aspectRatio", {
                  onChange: (e) => {
                    const val = e.target.value;
                    const config = {
                      "1:1": [1024, 1024],
                      "16:9": [1792, 1024],
                      "9:16": [1024, 1792],
                    }[val as "1:1" | "16:9" | "9:16"];
                    setValue("width", config[0]);
                    setValue("height", config[1]);
                  },
                })}
              />
            </label>
          ))}
        </div>

        <button
          disabled={isGenerating?.status === "processing"}
          className="min-w-44 text-black font-bold bg-white cursor-pointer hover:text-white
           hover:bg-pink-800 py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          {isGenerating?.status === "processing" ? (
            <>
              <Spin />
              <span>Generating...</span>
            </>
          ) : (
            "Generate image"
          )}
        </button>
      </div>
    </form>
  );
}
