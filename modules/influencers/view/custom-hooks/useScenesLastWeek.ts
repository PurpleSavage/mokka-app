import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { influencersDI } from "../../di/influencer-container.dti";
import { setScenesLastWeek } from "../../influencer-slice/influencer-store.slice";

import { RootState } from "@/store/boundStore";

export const useScenesLastWeek = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(true);
  const { id } = useIdSession();
  const dispatch = useDispatch();
  const scenesLastWeek = useSelector(
    (state: RootState) => state.influencers.scenesLastWeek,
  );
  useEffect(() => {
    if (!id) {
      return;
    }
    const getScenesLastWeek = async () => {
      try {
        setIsPending(true);
        const response = await influencersDI.listScenesLastWeek(id);
        dispatch(setScenesLastWeek(response));
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
    getScenesLastWeek();
  }, [id, dispatch]);
  return {
    error,
    isPending,
    scenesLastWeek,
  };
};
