import { Switch } from "@headlessui/react";

export const MySwitch = ({ enabled, setEnabled }) => {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group relative flex h-5 w-10 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block size-3 translate-x-0 rounded-full  ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-5 ${
          enabled ? "bg-white" : "bg-white/20"
        }`}
      />
    </Switch>
  );
};
