import { useSelector } from "react-redux";

import Select from "./Select";
import { InputReadOnly, InputFormPost } from "./";

const target = [
    {
        code: "Nam",
        value: "Nam",
    },
    {
        code: "Nữ",
        value: "Nữ",
    },
    {
        code: "Tất Cả",
        value: "Tất Cả",
    },
];
function Overview({ payload, setPayload, invalidFields, setInvalidFields }) {
    const { categories } = useSelector((state) => state.app);
    const { currentUserData } = useSelector((state) => state.user);
    // const { dataEdit } = useSelector(state => state.post)



    // console.log(currentUserData);
    return (
        <div>
            <h2 className="font-semibold text-xl py-4">Thông Tin Mô Tả</h2>
            <div className="w-full flex flex-col gap-4">
                <div className="w-1/2">
                    <Select
                        options={categories}
                        value={payload.categoryCode}
                        setValue={setPayload}
                        name="categoryCode"
                        label="Loại chuyên mục"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    ></Select>
                </div>

                <InputFormPost
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    value={payload.title}
                    name="title"
                    setValue={setPayload}
                    label={"Tiêu Đề"}
                    unit={""}
                ></InputFormPost>

                <div>
                    <label className="font-semibold" htmlFor="desc">
                        Nội dung mô tả
                    </label>
                    <textarea
                        id="desc"
                        cols="30"
                        rows="10"
                        className="w-full rounded-md border border-gray-300 p-2 outline-none"
                        value={payload.description}
                        onFocus={() => setInvalidFields([])}
                        onChange={(e) =>
                            setPayload((prev) => ({ ...prev, description: e.target.value }))

                        }
                    ></textarea>
                    <small className="text-red-500 block w-full">
                        {invalidFields?.some(item => item.name === 'description') && invalidFields?.find(item => item.name === 'description')?.message}
                    </small>
                </div>

                <div className="w-1/2 flex flex-col gap-4">
                    <InputReadOnly
                        label={"Thông Tin Liên Hệ"}
                        value={currentUserData?.name}
                    ></InputReadOnly>

                    <InputReadOnly
                        label={"Điện Thoại"}
                        value={currentUserData?.phone}
                    ></InputReadOnly>

                    <InputFormPost
                        small="Nhập số đầy đủ nếu 1 triệu thì nhập 1.000.000"
                        label={"Giá Cho Thuê"}
                        name="priceNumber"
                        value={payload.priceNumber}
                        setValue={setPayload}
                        unit={"Đồng"}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    ></InputFormPost>

                    <InputFormPost
                        label={"Diện Tích"}
                        name="areaNumber"
                        value={payload.areaNumber}
                        setValue={setPayload}
                        unit={"m2"}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    ></InputFormPost>

                    <Select
                        label={"Đối Tượng Cho Thuê"}
                        options={target}
                        // dataEdit?.overviews?.target ||
                        value={payload.target}
                        setValue={setPayload}
                        name="target"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    ></Select>
                </div>
            </div>
        </div>
    );
}

export default Overview;
