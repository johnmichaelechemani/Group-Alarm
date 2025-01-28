import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import { Select } from "./Select";
import { generateId, hours, types, minutes, time } from "../composables";

export const MyModal = ({ alarm, title, addAlarm }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedHours, setSelectedHours] = useState({ id: 1, item: "01" });
  const [selectedMinutes, setSelectedMinutes] = useState({ id: 1, item: "00" });
  const [type, setType] = useState({ id: 1, item: "AM" });

  const [groupTitle, setTitle] = useState("");
  const [groupLabel, setGroupLabel] = useState("");
  const [alarmLabel, setAlarmLabel] = useState("");

  function open() {
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  function save() {
    const newAlarm = {
      id: generateId(alarm),
      title: groupTitle,
      description: groupLabel,
      enabled: false,
      alarmsGroup: [
        {
          id: generateId(alarm),
          time: `${selectedHours.item}:${selectedMinutes.item}`,
          description: alarmLabel,
          label: type.item,
          enabled: false,
        },
      ],
    };
    addAlarm(newAlarm);

    setIsOpen(false);
  }

  return (
    <>
      <Button
        onClick={open}
        className="rounded-full border border-gray-500/20 bg-black/20 p-1 text-sm font-medium text-gray-300 focus:outline-none hover:bg-gray-500/20 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <Icon icon="material-symbols-light:add" width="20" height="20" />
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-gray-500/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-lg/7 font-semibold text-gray-300"
              >
                {title}
              </DialogTitle>
              <div className="w-full">
                <Field>
                  <Label className="text-sm/6 font-medium text-gray-300">
                    Title
                  </Label>
                  <Input
                    value={groupTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    className={clsx(
                      "my-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-300",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                </Field>

                <Field>
                  <Label className="text-sm/6 font-medium text-gray-300">
                    Group Label
                  </Label>

                  <Input
                    value={groupLabel}
                    onChange={(e) => setGroupLabel(e.target.value)}
                    className={clsx(
                      "my-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-300",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                </Field>
                <Field>
                  <Label className="text-sm/6 font-medium text-gray-300">
                    Alarm Label
                  </Label>

                  <Input
                    value={alarmLabel}
                    onChange={(e) => setAlarmLabel(e.target.value)}
                    className={clsx(
                      "my-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-300",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                </Field>
                <div className="flex gap-4">
                  <Select
                    items={hours}
                    selectTitle={time.hours}
                    selected={selectedHours}
                    setSelected={setSelectedHours}
                  />
                  <Select
                    items={minutes}
                    selectTitle={time.minutes}
                    selected={selectedMinutes}
                    setSelected={setSelectedMinutes}
                  />
                  <Select
                    items={types}
                    selectTitle={"Time"}
                    selected={type}
                    setSelected={setType}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2 items-center">
                <Button
                  className="  gap-2 rounded-lg border border-gray-500/20 py-1.5 px-4 text-sm/6 font-semibold text-gray-300 focus:outline-none data-[hover]:bg-gray-600/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Cancel
                </Button>
                <Button
                  className="  gap-2 rounded-lg bg-gray-800/50 border border-gray-500/20 py-1.5 px-4 text-sm/6 font-semibold text-gray-300 focus:outline-none data-[hover]:bg-gray-600/50 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={save}
                >
                  Save
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
