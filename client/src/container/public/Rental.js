import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { ItemSideBar, Provinces, RelatedPost } from "../../components";
import List from "./List";
import Pagination from "./Pagination";
import { formatVietnameseToString } from "../../ultils/Common/formatToVietnamese";

function Rental() {
    const { categories, prices, areas } = useSelector((state) => state.app);
    const [categoryCurrent, setCategoryCurrent] = useState({});
    const [categoryCode, setCategoryCode] = useState("none");
    const location = useLocation();
    useEffect(() => {
        const category = categories?.find(
            (item) => `/${formatVietnameseToString(item.value)}` === location.pathname
        );
        setCategoryCurrent(category);
        if (category) {
            setCategoryCode(category.code);
        }
    });
    console.log(categoryCode);
    // console.log(setCategoryCode);

    return (
        <div className=" w-full flex flex-col gap-3">
            <div>
                <h1 className="text-[28px] font-bold">{categoryCurrent?.header}</h1>
                <p className="text-base text-gray-700">{categoryCurrent?.subHeader}</p>
            </div>
            <Provinces></Provinces>
            <div className="flex w-full gap-4">
                <div className="w-[70%]">
                    <List categoryCode={categoryCode}></List>
                    <Pagination></Pagination>
                </div>
                <div className="w-[30%]  flex flex-col gap-4 justify-start items-center">
                    {/* <ItemSideBar content={categories} title='Danh Sách Cho Thuê' /> */}
                    <ItemSideBar
                        isDouble={true}
                        type="priceCode"
                        content={prices}
                        title="Xem Theo Giá"
                    />
                    <ItemSideBar
                        isDouble={true}
                        type="areaCode"
                        content={areas}
                        title="Xem Theo Diện Tích"
                    />
                    <RelatedPost></RelatedPost>
                </div>
            </div>
        </div>
    );
}

export default Rental;
