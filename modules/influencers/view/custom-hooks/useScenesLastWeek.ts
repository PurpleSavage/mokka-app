import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession";
import { ApiErrorPlatform } from "@/modules/shared/common/errors/api-errors.error";
import { SelectorModalbasedError, TypeErrorAlert } from "@/modules/shared/common/infrastructure/error-mappers/selector-modal-based-error.mapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sileo } from "sileo";
import { influencersDI } from "../../di/influencer-container.dti";
import { setScenesLastWeek } from "../../influencer-slice/influencer-store.di";
import { setConfigAlertModal } from "@/modules/shared/common/common-slice/modals-slice.store";
import { RootState } from "@/store/boundStore";

export const useScenesLastWeek = () => {
  const [error, setError] = useState("");
  const [isPending, setisPending] = useState(true);
  const { id } = useIdSession();
  const dispatch = useDispatch();
  const scenesLastWeek= useSelector((state:RootState)=>state.influencers.scenesLastWeek)
  useEffect(() => {
    if(!id){
        return
    }
    const getScenesLastWeek = async() => {
      try {
        const response = await influencersDI.listScenesLastWeek(id)
        dispatch(setScenesLastWeek(response));
      } catch (error) {
        setError("an error has occurred")
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
    getScenesLastWeek();
  }, [id,dispatch]);
  return {
    error,
    isPending,
    scenesLastWeek
  };
};
