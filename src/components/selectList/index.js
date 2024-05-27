import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
  { id: 7, name: "Caroline Schultz" },
  { id: 8, name: "Mason Heaney" },
  { id: 9, name: "Claudie Smitham" },
  { id: 10, name: "Emil Schaefer" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectList({ options, selected, onChange }) {
  // const [selected, setSelected] = useState("Closest")

  return (
    <Listbox value={selected} onChange={onChange}>
      {({ open }) => (
        <>
          <div className=" ">
            <Listbox.Button className="relative w-[120px] bg-darkYellow cursor-default rounded-lg py-2 pl-3 pr-10 text-left  shadow-sm  focus:outline-none ">
              <span className="block truncate capitalize">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-black"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-[9] max-h-60 w-[120px] mt-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options?.map((person) => (
                  <Listbox.Option
                    key={person?.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-[#EBF3FB] text-black" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={person?.attributes?.sortBy}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected
                              ? "font-semibold capitalize"
                              : "font-normal capitalize",
                            "block truncate capitalize"
                          )}
                        >
                          {person?.attributes?.sortBy}
                        </span>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-black" : "",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
