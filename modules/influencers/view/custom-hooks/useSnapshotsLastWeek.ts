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
import { RootState } from "@/store/boundStore";
import { setSnapshotsLastWeek } from "../../influencer-slice/influencer-store.di";

export const useSnapshotsLAstWeek = () => {
  const [error, setError] = useState("");
  const [isPending, setisPending] = useState(true);
  const { id } = useIdSession();
  const dispatch = useDispatch();
  const snapshotsLastWeek= useSelector((state:RootState)=>state.influencers.snapshotsLastWeek)
  useEffect(() => {
    if (!id) {
      return;
    }
    const getSnapShotsLastWeek = async() => {
      try {
        const response = await influencersDI.listSnapshotsLastWeek(id)
        dispatch(setSnapshotsLastWeek(response))
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
      }finally {
        setisPending(false);
      }
    };
    getSnapShotsLastWeek();
  }, [id, dispatch]);
  return {
    error,
    isPending,
    snapshotsLastWeek
  };
};
