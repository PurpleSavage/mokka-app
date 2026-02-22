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
import { influencersDI } from "../../di/influencer-container.dti";
import { setSnapshotsHistory } from "../../influencer-slice/influencer-store.di";
import { RootState } from "@/store/boundStore";

export const useSnapshotsHistory = () => {
  const [error, setError] = useState("")
  const [isPending, setisPending] = useState(true)
  const { id } = useIdSession()
  const dispatch = useDispatch()
    const snapshotsHistory = useSelector((state:RootState)=>state.influencers.snapshotsHistory)

  useEffect(() => {
    if(!id) return
    if(snapshotsHistory.length>0) return
    const getSnapshotsHistory = async() => {
      try {
        setisPending(true)
        const response =await influencersDI.listHistorySnapshots(id)
        dispatch(setSnapshotsHistory(response))
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
    };
    getSnapshotsHistory();
  }, [dispatch,id,snapshotsHistory.length])

  return {
    isPending,
    error,
    snapshotsHistory
  }
};
