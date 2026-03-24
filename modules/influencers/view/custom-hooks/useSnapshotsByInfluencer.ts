import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { influencerProfileDI } from "../../di/influencer-profile-container.di";
import { setSnapshotsByInfluencer } from "../../influencer-slice/influencer-profile.slice";
import { RootState } from "@/store/boundStore";

export const useSnapshotsByInfluencer = (id:string) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const snapshotsHistoryByInfluencer = useSelector((state:RootState)=>state.influencerProfile.snapshotsHistoryByInfluencer)
  const dispatch = useDispatch();
  useEffect(() => {
   const getSnapshots =async()=>{
        try {
            const response =  await influencerProfileDI.lisSnapshotsByInfluencer(id)
            dispatch(setSnapshotsByInfluencer(response))
        }catch (error) {
                setError(
                error instanceof ApiErrorPlatform
                    ? error.message
                    : "An error occurred",
                );
            } finally {
                setIsPending(false);
            }
   }
   getSnapshots()
  }, [dispatch,id])
  return {
    error,
    isPending,
    snapshotsHistoryByInfluencer
  }
};
