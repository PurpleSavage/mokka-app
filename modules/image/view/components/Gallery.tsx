"use client";
import { useSelector } from "react-redux";
import { useImages } from "../custom-hooks/useImages";
import GallerySkeletons from "../skeletons/GallerySkeletons";
import { RootState } from "@/store/boundStore";
import ImageCard from "./ImageCard";

export default function Gallery() {
  const { error, isPending, gallery } = useImages();
  const isGenerating = useSelector(
    (state: RootState) => state.image.isGenerating,
  );
  if (isPending) {
    return <GallerySkeletons size={8} />;
  }
  if (error) {
    return <p className="text-gray-400 text-lg font-medium">{error}</p>;
  }
  if (gallery.length === 0) {
    return (
      <p className="text-gray-400 text-2xl font-medium">
        You haven&apos;t generated any images yet
      </p>
    );
  }
  return (
    <>
      {isGenerating && isGenerating.status === "processing" ? (
        <GallerySkeletons size={1} />
      ) : null}
      {gallery.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </>
  );
}
