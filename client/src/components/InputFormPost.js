function InputFormPost({ label, unit, value, setValue, name, small, invalidFields, setInvalidFields, direction, isSemiBold }) {

    return (
        <div className={`flex ${direction ? direction : 'flex-col gap-2'}`}>
            <label className={`${isSemiBold ? "w-48 flex-none" : "font-semibold w-48 flex-none"}`} htmlFor="title">
                {label}
            </label>
            <div className="flex flex-auto flex-col items-center">
                <div className="flex w-full items-center">
                    <input
                        value={value}
                        type="text"
                        id="title"
                        className={`${unit ? "rounded-tl-md  rounded-bl-md " : "rounded-md"
                            } flex-auto border border-gray-300 p-2 outline-non `}
                        // ? name , title
                        onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                        onFocus={() => setInvalidFields && setInvalidFields([])}
                    ></input>
                    {unit && (
                        <span
                            className="flex flex-none w-16 bg-gray-200 p-2 border border-gray-300 items-center justify-center rounded-tr-md  rounded-br-md">
                            {unit}
                        </span>
                    )}
                </div>
                {invalidFields?.some(item => item.name === name) && <small className="text-red-500 block w-full">
                    {invalidFields?.find(item => item.name === name)?.message}
                </small>}
            </div>
            {small && <small className="opacity-70 whitespace-normal">{small}</small>}

        </div>
    );
}

export default InputFormPost;
