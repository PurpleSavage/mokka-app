import Image from "next/image"

interface ImageExample{
    id:string,
    path:string
}

const images: ImageExample[] = [
  { id: '1', path: '/examples/example-1.webp' },
  { id: '2', path: '/examples/example-2.webp' },
  { id: '3', path: '/examples/example-3.webp' },
  { id: '4', path: '/examples/example-4.webp' },
  { id: '5', path: '/examples/example-5.webp' },
  { id: '6', path: '/examples/example-6.webp' },
  { id: '7', path: '/examples/example-7.webp' },
  { id: '8', path: '/examples/example-8.webp' },
  { id: '9', path: '/examples/example-9.webp' },
  { id: '10', path: '/examples/example-10.webp' },
  { id: '11', path: '/examples/example-11.webp' },
  { id: '12', path: '/examples/example-12.webp' },
]

export default function Gallery() {
  return (
    <section className="mt-20 space-y-8">
        <div className="space-y-4">
            <h2 className="text-4xl text-white font-bold text-center">  See What You Can Create Instantly</h2>
            <p className="text-center text-white text-2xl w-2/3 mx-auto">
                From stunning visuals to dynamic mockups — explore real examples generated in seconds using just a few words.
            </p>
        </div>
        <div className="grid grid-cols-4 w-5/6 bg-[#1c1c1c] rounded-2xl border p-8
         mx-auto gap-4 border-gray-800/50">
            {
                images.map(image=>(
                    <div key={image.id} className="relative overflow-hidden rounded-lg aspect-square">
                        <Image
                            src={image.path}
                            alt={`Example ${image.id}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover rounded-lg"
                        />
                    </div>
                ))
            }
        </div>
    </section>
  )
}
