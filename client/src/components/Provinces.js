import React from "react";

import { ProvincesBtn } from "./index";
import { location } from "../ultils/constant";
// Đại diện mỗi khu vực
function Provinces() {
    return (
        <div className="flex justify-center gap-5 py-5">
            {location.map(item => {
                return (
                    <ProvincesBtn key={item.id} image={item.image} name={item.name} provinceCode={item.provinceCode}></ProvincesBtn>
                )
            })}
        </div>
    );
}

export default Provinces;