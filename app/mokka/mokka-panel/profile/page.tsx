import ConnectedAccounts from "@/modules/profile/view/components/ConnectedAccounts";
import InfoUser from "@/modules/profile/view/components/InfoUser";


export default function Profile() {
  return (
    <div className="space-y-12 px-6">
        <div className="space-y-2">
            <h3 className="text-4xl font-bold text-center text-white">Account Settings</h3>
            <p className="text-gray-400 text-center text-2xl">Edit your profile and connected accounts</p>
        </div>
        <InfoUser/>
        <ConnectedAccounts/>
    </div>
  )
}
