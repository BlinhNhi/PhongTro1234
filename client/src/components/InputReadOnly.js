function InputReadOnly({ label, value, direction, editPhone }) {
    return (
        <div className={`flex ${direction ? direction : 'flex-col gap-2'}`}>
            <label className="font-medium w-48 flex-none" htmlFor="exactly-address">
                {label}
            </label>
            <div className="flex-auto mb-4">
                <input
                    id="exactly-address"
                    type="text"
                    readOnly
                    className="border border-gray-400 flex-auto rounded-md  bg-gray-200 p-2 w-full outline-none"
                    value={value || ''}
                ></input>
                {editPhone && <small className="text-blue-500 cursor-pointer">Đổi Số Điện Thoại</small>}
            </div>
        </div>
    );
}

export default InputReadOnly;