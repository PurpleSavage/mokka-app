import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession";
import { setConfigAlertModal } from "@/modules/shared/common/common-slice/modals-slice.store";
import { ApiErrorPlatform } from "@/modules/shared/common/errors/api-errors.error";
import {
  SelectorModalbasedError,
  TypeErrorAlert,
} from "@/modules/shared/common/infrastructure/error-mappers/selector-modal-based-error.mapper";
import { RootState } from "@/store/boundStore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sileo } from "sileo";
import { influencersDI } from "../../di/influencer-container.dti";
import { setScenesHistory } from "../../influencer-slice/influencer-store.di";

export const useScenesHistory = () => {
  const [error, setError] = useState("");
  const [isPending, setisPending] = useState(true);
  const { id } = useIdSession();
  const dispatch = useDispatch();
  const scenesHistory = useSelector((state:RootState)=>state.influencers.scenesHistory)
  useEffect(() => {
    if(!id) return
    const getScenesHistory = async() => {
      try {
        setisPending(true)
        const response = await influencersDI.listHistoryScenes(id)
        dispatch(setScenesHistory(response))
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
      }finally{
        setisPending(false)
      }
    }
    getScenesHistory()
  }, [dispatch,id])

  return {
    scenesHistory,
    isPending,
    error
  }
};
