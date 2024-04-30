import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { HiOutlineCheck } from "react-icons/hi";
import { HiMiniChevronUpDown } from "react-icons/hi2";
// import { getDisplayValue } from "@utils/displayValue";
export const getDisplayValue = (data: any, selected: string, displayKey: string) => {
    const obj = data?.find((item: any) => item._id === selected);
    return obj?.[displayKey] || ''
}
export default function Select({
    label,
    data,
    selected,
    valueKey,
    displayKey,
    onChange,
}: SelectType) {
    //   const [selected, setSelected] = useState(people[0])
    // console.log({ label, data, selected, valueKey, displayKey, onChange });

    return (
        <div className="w-full my-2">
            <Listbox value={selected} onChange={onChange}>
                <div className="flex justify-start items-center gap-2 my-1">
                    {label}
                    {/* <ErrorText error={error} classNames={errorClass} /> */}
                </div>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-md  bg-white dark:bg-gray-800 border border-solid border-gray-300 dark:border-gray-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                            {getDisplayValue(data, selected, displayKey) ||
                                "Select from Options"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <HiMiniChevronUpDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md  bg-white dark:bg-gray-800 border border-solid border-gray-300 dark:border-gray-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {data?.map((item, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                                            ? "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-200"
                                            : "text-gray-400"
                                        }`
                                    }
                                    value={item?.[valueKey]}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`flex items-center gap-4 truncate ${selected ? "font-medium" : "font-normal"
                                                    }`}
                                            >
                                                <img src={item.logoURI} className="w-4 h-4" />{item?.[displayKey]}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <HiOutlineCheck
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

type SelectType = {
    displayKey: string;
    valueKey: string;
    label?: string;
    data?: any[];
    selected?: any;
    setSelected?: (value: any) => void;
    onChange?: (value: any) => void;
};