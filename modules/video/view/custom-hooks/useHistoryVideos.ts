import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession";
import { setConfigAlertModal } from "@/modules/shared/common/common-slice/modals-slice.store";
import { ApiErrorPlatform } from "@/modules/shared/common/errors/api-errors.error";
import {
  SelectorModalbasedError,
  TypeErrorAlert,
} from "@/modules/shared/common/infrastructure/error-mappers/selector-modal-based-error.mapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sileo } from "sileo";
import { videoContainer } from "../../application/di/video-container.di";
import { RootState } from "@/store/boundStore";
import { setHistoryVideos } from "../../video-slice/video-store.slice";
export const useHistoryVideos = () => {
  const [error, setError] = useState("");
  const [isPending, setisPending] = useState(true);
  const { id } = useIdSession();
  const dispatch = useDispatch();
    const historyVideos = useSelector((state: RootState) => state.video.historyVideos)
  useEffect(() => {
    if (!id) {
      return;
    }
    const getHistoryVideos = async () => {
      try {
        const listVideos = await videoContainer.listVideos(id)
        dispatch(setHistoryVideos(listVideos))
      } catch (error) {
        setError("an error has occurred");
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
      } finally {
        setisPending(false);
      }
    };
    getHistoryVideos()
  }, [dispatch, id])

  return{
    isPending,
    error,
    historyVideos
  }
};
