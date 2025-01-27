import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { useState } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import { Select } from "./Select";
export const MyModal = ({ title, group }) => {
  let [isOpen, setIsOpen] = useState(false);

  const time = {
    id: 1,
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  };

  function open() {
    setIsOpen(true);
  }

  function save() {
    console.log(selected, groupTitle, label);
    setIsOpen(false);
  }

  const generateHours = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      item: String(i + 1).padStart(2, "0"),
    }));
  };

  const generateMinutes = () => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      item: String(i).padStart(2, "0"),
    }));
  };

  const hours = generateHours();
  const minutes = generateMinutes();
  const type = [
    { id: 1, item: "AM" },
    { id: 2, item: "PM" },
  ];
  const [selected, setSelected] = useState(hours[0]);
  const [groupTitle, setTitle] = useState("");
  const [label, setLabel] = useState("");

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
                {group && (
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
                )}
                <Field>
                  <Label className="text-sm/6 font-medium text-gray-300">
                    {group && <span>Group</span>} Label
                  </Label>

                  <Input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
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
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Select
                    items={minutes}
                    selectTitle={time.minutes}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Select
                    items={type}
                    selectTitle={"Time"}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end items-center">
                <Button
                  className="  gap-2 rounded-lg bg-gray-800/50 py-1.5 px-4 text-sm/6 font-semibold text-gray-300 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600/50 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
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
