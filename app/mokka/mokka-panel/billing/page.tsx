import BillingCards from "@/modules/billing/view/components/BillingCards";


export default function Billing() {
  return (
    <div className="space-y-12 px-6">
        <div className="space-y-2">
            <h3 className="text-4xl font-bold text-center text-white">Purchase a subscription</h3>
            <p className="text-gray-400 text-center text-2xl">Choose the plan that works for you</p>
        </div>
        <div className="grid grid-cols-3  gap-8  mx-auto items-start">
            <BillingCards/>
        </div>
    </div>
  )
}
