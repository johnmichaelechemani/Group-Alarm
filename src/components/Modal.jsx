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
export const MyModal = ({ title, group }) => {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
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
                {group && (
                  <Field>
                    <Label className="text-sm/6 font-medium text-gray-300">
                      Title
                    </Label>
                    <Input
                      className={clsx(
                        "my-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-300",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                  </Field>
                )}
                <Field>
                  <Label className="text-sm/6 font-medium text-gray-300">
                    {group && <span>Group</span>} Description
                  </Label>

                  <Input
                    className={clsx(
                      "my-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-gray-300",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                </Field>
              </div>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-gray-300 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
