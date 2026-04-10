"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/store/boundStore";
import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession";
import { audioDi } from "../../di/audio-container.di";
import { setLoadingAudio } from "../../audio-slice/audio-store.slice";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import { setConfigAlertModal } from "@/modules/shared/common/common-slice/modals-slice.store";
import {
  SelectorModalbasedError,
  TypeErrorAlert,
} from "@/modules/shared/common/infrastructure/error-mappers/selector-modal-based-error.mapper";
import { sileo } from "sileo";
import {
  FullAudioDto,
  GenerateAudioDto,
  generateAudioSchema,
} from "../../application/dtos/requests/generate-audio.dto";

interface UseVoiceSettingsProps {
  onPreviewChange?: (prompt: string) => void;
}

/**
 * Custom hook to manage the logic for the VoiceSettings component.
 * Handles form state, real-time preview, and audio generation.
 */
export function useVoiceSettings({ onPreviewChange }: UseVoiceSettingsProps = {}) {
  const isGenerating = useSelector(
    (state: RootState) => state.audio.isGenerating,
  );
  const dispatch = useDispatch();
  const { id } = useIdSession();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<GenerateAudioDto>({
    resolver: zodResolver(generateAudioSchema),
    defaultValues: {
      idModel: "pNInz6obpgDQGcFmaJgB",
      prompt: "",
      nameModelAudio: "Adam",
      speed: 100,
      stability: 50,
      similarity: 75,
      exaggeration: 0,
      useSpeakerBoost: true,
    },
  });

  // Watch fields for logic/preview
  const prompt = useWatch({
    control,
    name: "prompt",
  });

  const currentName = useWatch({
    control,
    name: "nameModelAudio",
  });

  const speakerBoost = useWatch({
    control,
    name: "useSpeakerBoost",
  });

  // Trigger preview change when prompt updates
  useEffect(() => {
    if (onPreviewChange) {
      onPreviewChange(prompt || "");
    }
  }, [prompt, onPreviewChange]);

  const onSubmit = async (data: GenerateAudioDto) => {
    if (!id) {
      console.error("no session initialize");
      return;
    }
    try {
      const audioDto: FullAudioDto = {
        ...data,
        user: id,
        stability: data.stability / 100, // 50 → 0.5
        similarity: data.similarity / 100, // 75 → 0.75
        exaggeration: data.exaggeration / 100,
      };
      
      const response = await audioDi.generateAudio(audioDto);
      
      dispatch(
        setLoadingAudio({
          jobId: response.jobId,
          status: response.status,
          message: response.message,
        }),
      );
      
      sileo.info({
        title: response.status,
        description: response.message,
      });
    } catch (error: unknown) {
      if (ApiErrorPlatform.isUnauthorized(error)) return;
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

  return {
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    isGenerating,
    currentName,
    speakerBoost,
    onSubmit,
  };
}
