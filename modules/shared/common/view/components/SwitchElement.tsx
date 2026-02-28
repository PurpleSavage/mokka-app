import { Switch } from '@headlessui/react'

interface SwitchElementProps {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}

export default function SwitchElement({ enabled, setEnabled }: SwitchElementProps) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled} // RHF enviará el valor booleano aquí
      className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 ease-in-out focus:outline-none data-checked:bg-pink-800 transition-colors"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
      />
    </Switch>
  )
}