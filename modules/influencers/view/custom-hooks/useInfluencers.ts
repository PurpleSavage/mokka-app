import { useEffect, useState } from "react";
import { influencersDI } from "../../di/influencer-container.dti";
import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession";
import { useDispatch, useSelector } from "react-redux";
import { setInfluencers } from "../../influencer-slice/influencer-store.di";
import { ApiErrorPlatform } from "@/modules/shared/common/errors/api-errors.error";
import {
  SelectorModalbasedError,
  TypeErrorAlert,
} from "@/modules/shared/common/infrastructure/error-mappers/selector-modal-based-error.mapper";
import { setConfigAlertModal } from "@/modules/shared/common/common-slice/modals-slice.store";
import { sileo } from "sileo";
import { RootState } from "@/store/boundStore";

export const useInfluencers = () => {
  const [error, setError] = useState("");
  const [isPending, setisPending] = useState(true)
  const influencersCreated = useSelector((state:RootState)=>state.influencers.influencersCreated)
  const { id } = useIdSession()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!id) {
      return;
    }
    const listInfluencers = async () => {
      try {
        const response = await influencersDI.listInfluencer(id);
        dispatch(setInfluencers(response));
      } catch (error) {
        setError('an error has occurred')
        if (error instanceof ApiErrorPlatform) {
          const config = SelectorModalbasedError.selectModal(error);
          if (config.typeAlert === TypeErrorAlert.ALERT_MODAL) {
            dispatch(
              setConfigAlertModal({
                title: config.title,
                message: config.message,
                type: "error",
              }),
            )
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
    listInfluencers();
  }, [id, dispatch]);
  return {
    error,
    isPending,
    influencersCreated
  };
};
