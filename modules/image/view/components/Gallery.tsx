"use client";

import GallerySkeletons from "../skeletons/GallerySkeletons";
import { RootState } from "@/store/boundStore";
import ImageCard from "./ImageCard";
import { ImageEntity } from "../../domain/entities/Image.entity";
import { useSelector } from "react-redux";
import GridGallery from "@/modules/shared/common/view/components/GridGallery";

interface GalleryProps{
  isPending:boolean,
  gallery:ImageEntity[],
  error:string
}
export default function Gallery({isPending,gallery,error}:GalleryProps) {
  const isGenerating = useSelector(
    (state: RootState) => state.image.isGenerating,
  );
  if (isPending) {
    return (
      <GridGallery columns={4}>
        <GallerySkeletons size={8} />;
      </GridGallery>
    )
  }
  if (error) {
    <div className="flex items-center justify-center p-6">
      return <p className="text-gray-400 text-lg font-medium">{error}</p>;
    </div>
  }
  if (gallery.length === 0) {
    return (
      <div className="flex items-center justify-center p-6">
        <p className="text-gray-400 text-lg font-medium">
          You haven&apos;t generated any images yet
        </p>
      </div>
    );
  }
  return (
    <GridGallery columns={4}>
      {isGenerating && isGenerating.status === "processing" ? (
        <GallerySkeletons size={1} />
      ) : null}
      {gallery.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </GridGallery>
  );
}
