"use client";

import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/boundStore";
import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession";
import {
  generateMusicSchema,
  GenerateMusicDto,
  FullMusicDto,
} from "../../application/dtos/requests/generate-music.dto";
import { musicDi } from "../../di/music-container.di";
import { setLoadingMusic } from "../../music-slice/music-store.slice";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import { setConfigAlertModal } from "@/modules/shared/common/common-slice/modals-slice.store";
import {
  SelectorModalbasedError,
  TypeErrorAlert,
} from "@/modules/shared/common/infrastructure/error-mappers/selector-modal-based-error.mapper";
import { sileo } from "sileo";
import {
  DURATION_OPTIONS,
  DURATION_MAPPING,
} from "../constants/music-settings";

interface UseMusicSettingsProps {
  onPreviewChange?: (payload: { prompt: string; genre: string }) => void;
}

/**
 * Custom hook to manage the logic for the MusicSettings component.
 * Handles form state, previews, and music generation.
 */
export function useMusicSettings({ onPreviewChange }: UseMusicSettingsProps = {}) {
  const isGenerating = useSelector(
    (state: RootState) => state.music.isGenerating,
  );
  const dispatch = useDispatch();
  const { id } = useIdSession();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<GenerateMusicDto>({
    resolver: zodResolver(generateMusicSchema),
    defaultValues: {
      prompt: "",
      bpm: 120,
      genre: "Pop",
      durationMs: 30000,
      forceInstrumental: true,
    },
  });

  const watchedPrompt = useWatch({ control, name: "prompt" });
  const watchedGenre = useWatch({ control, name: "genre" });
  const watchedBpm = useWatch({ control, name: "bpm" });
  const watchedForceInstrumental = useWatch({
    control,
    name: "forceInstrumental",
  });
  const watchedDurationMs = useWatch({ control, name: "durationMs" });

  useEffect(() => {
    onPreviewChange?.({
      prompt: watchedPrompt,
      genre: watchedGenre,
    });
  }, [onPreviewChange, watchedPrompt, watchedGenre]);

  const currentDurationLabel = useMemo(() => {
    return (
      DURATION_OPTIONS.find(
        (opt) => DURATION_MAPPING[opt] === watchedDurationMs,
      ) ?? "30s"
    );
  }, [watchedDurationMs]);

  const currentLyricsLabel = useMemo(() => {
    return watchedForceInstrumental ? "Instrumental" : "Auto";
  }, [watchedForceInstrumental]);

  const onSubmit = async (data: GenerateMusicDto) => {
    if (!id) {
      sileo.error({
        title: "Session required",
        description: "Please sign in to generate music.",
      });
      return;
    }

    try {
      const musicDto: FullMusicDto = {
        ...data,
        user: id,
      };

      const response = await musicDi.generateMusic(musicDto);

      dispatch(
        setLoadingMusic({
          jobId: response.jobId,
          status: response.status,
          message: response.message,
        }),
      );

      sileo.info({
        title: "Generation Started",
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
          title: "Error",
          description: "Ocurrió un error inesperado.",
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
    watchedPrompt,
    watchedGenre,
    watchedBpm,
    watchedForceInstrumental,
    watchedDurationMs,
    currentDurationLabel,
    currentLyricsLabel,
    onSubmit,
  };
}
