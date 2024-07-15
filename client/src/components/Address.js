import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Select, InputReadOnly } from "../components";
import { apiGetProvincesPublic, apiGetDistrictPublic } from "../services";

function Address({ setPayload, invalidFields, setInvalidFields }) {
    //39:13 #72
    const { dataEdit } = useSelector(state => state.post);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [reset, setReset] = useState(false);

    // console.log(province, district);

    // hàm dùng để chờ provinces lấy đc giá trị từ api sau đó ms setProvince
    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',');
            let findProvince = provinces?.length > 0 && provinces?.find(item => item?.province_name === addressArr[addressArr?.length - 1]?.trim());
            setProvince(findProvince ? findProvince.province_id : '')
        }
    }, [provinces, dataEdit])

    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',');
            let findDistrict = districts?.length > 0 && districts?.find(item => item?.district_name === addressArr[addressArr?.length - 2]?.trim());
            setDistrict(findDistrict ? findDistrict.district_id : '')
        }
    }, [districts, dataEdit])


    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetProvincesPublic();
            if (response.status === 200) {
                setProvinces(response?.data?.results);
            }
        };
        fetchPublicProvince();
    }, []);

    useEffect(() => {
        setDistrict("");
        const fetchPublicDistrict = async () => {
            const response = await apiGetDistrictPublic(province);
            setDistricts(response?.data?.results);
        };
        province && fetchPublicDistrict();
        !province ? setReset(true) : setReset(false);
        !province && setDistricts([]);
    }, [province]);

    //16:49 |#62 18:24
    useEffect(() => {
        setPayload((pre) => ({
            ...pre,
            address: `${district
                ? `${districts?.find((item) => item.district_id === district)?.district_name} ,` : ""

                }${province
                    ? `${provinces?.find((item) => item.province_id === province)
                        ?.province_name
                    }`
                    : ""
                }`,

            province: province
                ? `${provinces?.find((item) => item.province_id === province)
                    ?.province_name
                }`
                : "",
        }));
    }, [province, district]);
    return (
        <div>
            <h3 className="font-semibold text-xl py-4">Địa Chỉ Cho Thuê</h3>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Select
                        options={provinces}
                        label={"Thành Phố/Tỉnh"}
                        value={province}
                        setValue={setProvince}
                        type="province"
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    ></Select>

                    <Select
                        options={districts}
                        label={"Quận / Huyện"}
                        value={district}
                        setValue={setDistrict}
                        type="district"
                        reset={reset}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    ></Select>
                </div>

                <InputReadOnly
                    label="Địa Chỉ Chính Xác"
                    value={`${district ? `${districts?.find((item) => item.district_id === district)?.district_name} ,` : ""}  
                        ${province
                            ? `${provinces?.find((item) => item.province_id === province)
                                ?.province_name
                            }`
                            : ""
                        }`}
                ></InputReadOnly>
            </div>
        </div>
    );
}

export default memo(Address);
