import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useState } from "react";

export const Select = ({ items, selectTitle }) => {
  const [selected, setSelected] = useState(items[0]);

  return (
    <div className="w-full my-2">
      <p className="text-xs text-gray-500 font-medium"> {selectTitle}</p>
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg border border-gray-500/20 bg-gray-500/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-gray-300",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        >
          {selected.item}

          <Icon
            icon="mdi-light:chevron-down"
            width="20"
            height="20"
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] max-h-52  z-10 rounded-xl border border-white/5 bg-gray-400/5 backdrop-blur-2xl p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {items.map((item) => (
            <ListboxOption
              key={item.item}
              value={item}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <Icon
                icon="mdi-light:check"
                width="20"
                height="20"
                className="invisible size-4 text-gray-300 group-data-[selected]:visible"
              />
              <div className="text-sm/6 text-gray-300">{item.item}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};
