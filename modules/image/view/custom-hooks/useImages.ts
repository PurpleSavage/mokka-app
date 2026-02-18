import { setConfigAlertModal } from "@/modules/shared/common/common-slice/modals-slice.store";
import { ApiErrorPlatform } from "@/modules/shared/common/errors/api-errors.error";
import { SelectorModalbasedError, TypeErrorAlert } from "@/modules/shared/common/infrastructure/error-mappers/selector-modal-based-error.mapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sileo } from "sileo";
import { imageDI } from "../../di/image-container.di";
import { useIdSession } from "@/modules/shared/auth/view/custom-hooks/useIdSession";
import { setGallery } from "../../image-slice/image.slice";
import { RootState } from "@/store/boundStore";

export const useImages = () => {
    const [error,setError]=useState('')
    const [isPending,setIsPending]=useState(true)
    const dispatch = useDispatch();
    const {id}=useIdSession()
    const gallery = useSelector((state:RootState)=>state.image.imagesGallery)
    useEffect(() => {
        const getImages = async() => {
            if(!id){
                console.error('an error has occurred')
                setError('an error has occurred')
                return
            }
        try {
            setIsPending(true)
            const response = await imageDI.listImages(id)
            dispatch(setGallery(response))
        } catch (error) {
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
            setIsPending(false)
        }
        };
        getImages();
    }, [dispatch,id])

  return {
    gallery,
    isPending,
    error
  }
};
