'use client'

import { useLastimages } from "../custom-hooks/useLastImages"
import Gallery from "./Gallery"

export default function ImagesLastWeek() {
    const {imagesLastweek,error,isPending}=useLastimages()
  return (
    <Gallery isPending={isPending} error={error} gallery={imagesLastweek}/>
  )
}
