import { useSnapshotsHistory } from "../custom-hooks/useSnapshotsHistory";
import MultimediaCardSkeleton from "../skeletons/MultimediaCardSkeleton";


export default function ListThumbnailsSnapshots() {
    const { isPending, error, snapshotsHistory } = useSnapshotsHistory()
    if (isPending) {
        return <MultimediaCardSkeleton size={8} styles="h-16"/>
      }
    if (error) {
        return (
          <div className="flex justify-center items-center" >
            <p className="text-red-400">{error}</p>
          </div>
        )
    }
    if (snapshotsHistory.length === 0) {
        return (
        <div className="flexjustify-center items-center ">
            <p className="text-slate-400">No snapshots were generated </p>
        </div>
        );
    }
  return (
    <>
        {snapshotsHistory.map((snapshot) => (
            <div key={snapshot.id} className="w-full h-16">
                <img 
                    src={snapshot.snapshotUrl} 
                    alt="Generated multimedia" 
                    className="w-full h-full object-cover"
                />
            </div>
        ))}
    </>
  )
}
