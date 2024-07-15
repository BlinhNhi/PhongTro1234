import React, { memo } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

import { path } from '../ultils/constant'
// prop book popular
function ProvincesBtn({ name, image, provinceCode }) {
    const navigate = useNavigate()
    const handleOnclick = () => {
        let titleSearch = `Cho Thuê Phòng Trọ Khu Vực ${name} , Giá Rẻ`
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams({ provinceCode }).toString(),
        }, { state: { titleSearch } })
    }
    return (
        <div onClick={handleOnclick} className="shadow-md rounded-bl-md rounded-br-md cursor-pointer  text-blue-600  hover:text-orange-600">
            <img src={image} alt={name}
                className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md text-center " >
            </img>
            <div className="font-medium p-2">{name}</div>
        </div>
    );
}

export default memo(ProvincesBtn);
