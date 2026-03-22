import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { influencersDI } from "../../di/influencer-container.dti";
import { RootState } from "@/store/boundStore";
import { setSnapshotsLastWeek } from "../../influencer-slice/influencer-store.slice";

export const useSnapshotsLAstWeek = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(true);
  const { id } = useIdSession();
  const dispatch = useDispatch();
  const snapshotsLastWeek= useSelector((state:RootState)=>state.influencers.snapshotsLastWeek)
  useEffect(() => {
    if (!id) {
      return;
    }
    const getSnapShotsLastWeek = async() => {
      try {
        setIsPending(true)
        const response = await influencersDI.listSnapshotsLastWeek(id)
        dispatch(setSnapshotsLastWeek(response))
      } catch (error) {
        setError(
          error instanceof ApiErrorPlatform
            ? error.message
            : "An error occurred",
        );
      } finally {
        setIsPending(false);
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
