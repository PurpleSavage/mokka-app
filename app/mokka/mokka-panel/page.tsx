import Image from "next/image";

interface Info {
  id: string;
  title: string;
  content: string;
  style: string;
  imgPath: string; 
}

const info: Info[] = [
  {
    id: '1',
    style: 'border-pink-600',
    title: 'Text AI',
    imgPath: '/home-images/text-img.webp',
    content: 'Harness the power of Large Language Models to revolutionize your copywriting process. Beyond simple grammar fixes, this tool can generate high-converting ad copy, viral slogans, and engaging creative content from scratch. You can specify the tone and intent—whether it is a persuasive sales pitch or an inspiring brand story—ensuring your message always resonates with your target audience.'
  },
  {
    id: '2',
    title: 'Audio AI',
    style: 'border-green-600',
    imgPath: '/home-images/audio-img.webp',
    content: 'Convert static text into dynamic, high-fidelity auditory experiences with ease. By utilizing a sophisticated library of professional voice samples, you can generate narrations that sound natural and human-like. This is the ultimate tool for creating voiceovers for tutorials, podcasts, or digital ads, allowing you to fine-tune the delivery based on the emotional nuances of your script.'
  },
  {
    id: '3',
    title: 'Image Generator',
    style: 'border-orange-600',
    imgPath: '/home-images/image-gen-img.webp',
    content: 'Unlock limitless visual creativity through state-of-the-art diffusion models. This tool allows you to generate breathtaking imagery by simply describing your vision or by uploading existing photos to be transformed into entirely new styles. From photorealistic product shots to abstract digital art, the generator provides the flexibility needed to produce professional-grade visuals for any project.'
  },
  {
    id: '4',
    title: 'Social Media',
    style: 'border-yellow-600',
    imgPath: '/home-images/social-media-img.webp',
    content: 'Take full control of your digital footprint by integrating your social accounts into a centralized command center. Monitor real-time performance analytics and engagement metrics to understand your audience better. Most importantly, you can streamline your workflow by publishing your AI-generated assets directly to various social platforms, eliminating the need for manual uploads and multiple tabs.'
  },
  {
    id: '5',
    title: 'Send Emails',
    style: 'border-emerald-600',
    imgPath: '/home-images/emails-img.webp',
    content: 'Optimize your outreach strategy with our integrated professional mailing system. Whether you are contacting high-level corporate partners or reaching out to a specific niche of users, this tool ensures your communication is streamlined and tracked. It is designed to handle personalized messaging at scale, making it easier than ever to manage your professional relationships directly from within the Mokka ecosystem.'
  },
  {
    id: '6',
    title: 'Video AI',
    style: 'border-teal-600',
    imgPath: '/home-images/video-ai-img.webp',
    content: 'Produce high-impact, cinematic short-form videos in seconds. Using advanced temporal consistency algorithms, you can generate 8-second clips derived from text prompts or static images. These videos are specifically optimized for the "attention economy," making them perfect for Instagram Reels, TikTok ads, and bite-sized marketing content that demands immediate viewer engagement.'
  },
  {
    id: '7',
    title: 'AI Influencers',
    style: 'border-purple-600',
    imgPath: '/home-images/influencers-img.webp',
    content: 'Step into the future of branding by creating and managing your own virtual personas. This innovative tool allows you to develop consistent AI influencers, generating images and videos based on a predefined avatar identity. By maintaining a stable visual character across all content, you can build a unique digital brand that operates 24/7, creating a bridge between your products and a loyal online following.'
  },
  {
    id: '8',
    title: 'Billing & Credit Analytics',
    style: 'border-rose-600',
    imgPath: '/home-images/billing-img.webp',
    content: 'Keep a precise pulse on your account resources through our transparent billing dashboard. You can monitor real-time credit consumption for every AI task performed, manage your active subscription tiers, and download detailed invoices. This section is designed to provide full financial clarity, ensuring you can scale your creative production while staying strictly within your budget.'
  },
  {
    id: '9',
    title: 'User Profile & Settings',
    style: 'border-stone-600',
    imgPath: '/home-images/profile-img.webp',
    content: 'Tailor your workspace and account security to fit your specific workflow. This section allows you to manage personal data, update security protocols like two-factor authentication, and customize interface preferences. It serves as your personal control room, ensuring that your account information is up to date and that your collaborative environment is perfectly optimized for your needs.'
  },
  {
    id: '10',
    title: 'Mockups Generator',
    style: 'border-fuchsia-600',
    imgPath: '/home-images/mockups-img.webp',
    content: 'Access a professional-grade design studio dedicated to high-fidelity product visualization. You can adjust orientations, swap out backgrounds, and select realistic models to showcase your designs in a professional context. Please note that this feature-rich interface is optimized exclusively for desktop environments, providing the precision and screen real estate necessary for complex visual editing and fine-tuning.'
  }
];
export default function MokkaPanelPage() {
  return (
    <>
      <section className="flex items-center w-full mt-10 gap-8">
          <h1 className="w-1/2 text-6xl text-white text-medium">
            Create experiences with artificial intelligence.
          </h1>
          <span className="self-stretch border-l border-dashed border-slate-200"></span>
          <p className="w-1/2 text-end  text-3xl">
            Create experiences with the Mokka platform. Here you will find various tools for multimedia content. 
            Check out the section below to learn more about what each tool does.
          </p>
      </section>
      <section className="space-y-2 mt-16 px-6">
        <h2 className=" text-3xl text-white text-medium underline decoration-pink-800
         underline-offset-8"
        >All sections of Mokka</h2>
        <div className="space-y-16 mt-10">
          {
            info.map((infoSection, index) => (
              <div 
                key={infoSection.id} 
                className={`flex items-center gap-9 rounded-xl p-6 border ${infoSection.style} bg-slate-900/20 backdrop-blur-sm
                ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Contenedor de Imagen y Título */}
                <div className="w-1/2 space-y-4">
                  <p className={`text-4xl text-white font-medium ${index % 2 === 0 ? "text-end" : "text-start"}`}>
                    {infoSection.title}
                  </p>
                  
                  {/* Contenedor de imagen adaptable */}
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-700">
                    <Image
                      src={infoSection.imgPath}
                      alt={infoSection.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                <span className="self-stretch border-l border-dashed border-slate-500/50"></span>

                <div className="w-1/2">
                    <p className={`text-xl leading-relaxed text-gray-200 ${index % 2 === 0 ? "text-start" : "text-start"}`}>
                        {infoSection.content}
                    </p>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </>
  )
}
