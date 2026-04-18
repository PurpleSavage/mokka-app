export const MasonryOptions = {
    IMAGE: 'image-component',
    VIDEO: 'video-component'
}
export type MasonryOptionsType = typeof MasonryOptions[keyof typeof MasonryOptions]

interface MasonryItemProps {
    masonryComponent: MasonryOptionsType
    style: string
    index: number
    id: string
    videoComponent?: {
        url: string
        aspectRatio?: string
    }
    imageComponent?: {
        url: string
        alt: string
        aspectRatio?: string
    }
}

const ratios = ['1/1.8', '1/0.7', '1/1.2', '1/2', '1/0.9', '1/1.5']

export default function MasonryItem({
    videoComponent,
    imageComponent,
    masonryComponent,
    style,
    index,
    id
}: MasonryItemProps) {

    if (masonryComponent === MasonryOptions.IMAGE && imageComponent) {
        const aspectRatio = imageComponent.aspectRatio
            ? imageComponent.aspectRatio.replace(':', '/')
            : ratios[index % ratios.length]

        return (
            <div key={id} className="break-inside-avoid mb-1">
                <img
                    src={imageComponent.url}
                    alt={imageComponent.alt}
                    className={`w-full object-cover ${style}`}
                    style={{ aspectRatio }}
                />
            </div>
        )
    }

    if (masonryComponent === MasonryOptions.VIDEO && videoComponent) {
        const aspectRatio = videoComponent.aspectRatio
            ? videoComponent.aspectRatio.replace(':', '/')
            : ratios[index % ratios.length]

        return (
            <div key={id} className="break-inside-avoid mb-1">
                <video
                    src={videoComponent.url}
                    className={`w-full object-cover ${style}`}
                    style={{ aspectRatio }}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            </div>
        )
    }

    return null
}