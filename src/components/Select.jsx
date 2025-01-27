import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useState } from "react";

const people = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

export const SelectRingTone = () => {
  const [selected, setSelected] = useState(people[1]);

  return (
    <div className="w-52 my-2">
      <p className="text-xs text-gray-500 font-medium"> Select Ringtones</p>
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg border border-gray-500/20 bg-gray-500/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-gray-300",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        >
          {selected.name}

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
            "w-[var(--button-width)] rounded-xl border border-white/5 bg-gray-400/5 backdrop-blur-2xl p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {people.map((person) => (
            <ListboxOption
              key={person.name}
              value={person}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <Icon
                icon="mdi-light:check"
                width="20"
                height="20"
                className="invisible size-4 text-gray-300 group-data-[selected]:visible"
              />
              <div className="text-sm/6 text-gray-300">{person.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};
