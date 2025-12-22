import { IoCheckmark,IoClose  } from "react-icons/io5";
export default function Prices() {
  return (
    <section className=" space-y-8 mt-20">
        <div className="space-y-4">
            <h2 className="text-4xl text-white font-bold text-center">Our plans</h2>
            <p className="text-center text-white text-2xl w-2/3 mx-auto">
                Choose the plan that fits your needs. Whether you&apos;re just getting 
                started or need advanced features, we&apos;ve got you covered
            </p>
        </div>
        <div className="grid grid-cols-3 gap-8 w-5/6 mx-auto items-start">
            <div className="rounded-xl border border-gray-700/50 p-8 space-y-6">
                <div className="space-y-2 ">
                    <p className="text-white text-2xl">Free</p>
                    <p className="text-sm text-gray-400">Explore the basics of Mokka AI</p>
                    <p className="text-white text-lg">$ 0</p>
                </div>
                <div className="px-2">
                    <ul className="space-y-1">
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Access to AI Text Copywriting
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Limited voice generation (up to 5 audios)
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Image generation (5 per month)
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoClose size={18} color="white"/> No video generation
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoClose size={18} color="white"/> No email or social media publishing
                        </li>
                    </ul>
                </div>
                <div className="px-4">
                    <button className="bg-white w-full flex items-center py-2 rounded-lg 
                    justify-center text-black font-medium cursor-pointer hover:bg-pink-800 hover:text-white transition-colors">Try Mokka</button>
                </div>
            </div>
            <div className="rounded-xl border border-gray-700/50 p-8 space-y-6">
                <div className="space-y-2">
                    <p className="text-white text-2xl">Pro</p>
                    <p className="text-sm text-gray-400">Advanced tools for content creators</p>
                    <p className="text-white text-lg">$ 20</p>
                </div>
                <div className="px-2">
                    <ul className="space-y-1">
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> All Free features
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Unlimited text copy generation
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Voice generation with custom voice upload
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> 50 image generations per month
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Basic video creation (text + voice)
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Email campaigns with templates
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoClose size={18} color="white"/> Scheduled social publishing
                        </li>
                    </ul>
                </div> 
                <div className="px-4">
                    <button className="bg-white w-full flex items-center py-2 rounded-lg cursor-pointer
                    justify-center text-black font-medium hover:bg-pink-800 hover:text-white transition-colors">Try Mokka</button>
                </div>
            </div>
            <div className="rounded-xl border border-gray-700/50 p-8 space-y-6">
                <div className="space-y-2">
                    <p className="text-white text-2xl">Max</p>
                    <p className="text-sm text-gray-400">Full access for marketing pros</p>
                    <p className="text-white text-lg">$ 50</p>
                </div>
                <div className="px-2">
                    <ul className="space-y-1">
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> All Pro features
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Unlimited AI content (text, audio, image, video)
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Advanced video editing tools
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Social media auto-publishing & scheduling
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Analytics & credit tracking
                        </li>
                        <li className="text-gray-400 flex items-center gap-2">
                            <IoCheckmark size={18} color="white"/> Priority support
                        </li>
                    </ul>
                </div>
                <div className="px-4 w-full">
                    <button className="bg-white w-full flex items-center py-2 rounded-lg cursor-pointer
                    justify-center text-black font-medium hover:bg-pink-800 hover:text-white transition-colors">Try Mokka</button>
                </div>
            </div>
        </div>
    </section>
    )
}
