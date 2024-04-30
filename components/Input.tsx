import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { TbClipboardCopy } from "react-icons/tb";
// import ErrorText from "@elements/ErrorText";
import ErrorText from "./ErrorText";

function Input({
    min,
    max,
    label,
    type,
    onChange,
    value,
    placeholder,
    disabled,
    classNames,
    isHide,
    readOnly,
    error,
    errorClass,
}: InputType) {
    const [showPassword, setShowPassword] = useState(true);
    return (
        <div
            className={`relative flex items-center justify-between w-full flex-wrap ${isHide ? "hidden" : ""
                }`}
        >
            <label
                htmlFor="inputField"
                className="form-label text-gray-500 w-full text-sm"
            >
                <div className="flex justify-start items-center gap-2">
                    {label}
                    <ErrorText error={error} classNames={errorClass} />
                </div>

                <input
                    min={min}
                    max={max}
                    readOnly={readOnly}
                    type={showPassword ? type : "text"}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder || label}
                    className={`
          relative
          px-3 py-2.5 my-3
          placeholder-slate-300  
          bg-white dark:bg-gray-800 
          text-sm shadow outline-none 
          focus:outline-none  w-full  
          text-gray-500 dark:text-gray-200
            bg-clip-padding
            border border-solid border-gray-300 dark:border-gray-200
            transition
            ease-in-out
            rounded
            m-0
        focus:text-gray-700 focus:bg-white focus:border-gray-400 ${classNames} ${type === "password" || type === "clipboard" ? " pr-10 " : ""
                        }`}
                />
                {type === "password" && (
                    <span
                        className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-6"
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}
                    >
                        {showPassword ? (
                            <AiFillEyeInvisible size={18} />
                        ) : (
                            <AiFillEye size={18} />
                        )}
                    </span>
                )}

                {type === "clipboard" && (
                    <span
                        title="Click to copy"
                        className="cursor-pointer hover:text-green-600 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-6"
                        onClick={async () => {
                            await navigator.clipboard.writeText(value as never);
                        }}
                    >
                        <TbClipboardCopy size={18} />
                    </span>
                )}
            </label>
            {/* <ErrorText error={error} classNames="py-1" /> */}
        </div>
    );
}
type InputType = {
    min?: string | number;
    max?: string | number;
    label?: string;
    type: string;
    value: string | number | readonly string[] | undefined;
    onChange?: (arg?: any) => void;
    placeholder?: string;
    disabled?: boolean;
    classNames?: string;
    isHide?: boolean;
    readOnly?: boolean;
    error?: string;
    errorClass?: string;
};

export default Input;
