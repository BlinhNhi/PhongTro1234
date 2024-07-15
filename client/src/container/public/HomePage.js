import React, { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { text } from '../../ultils/constant'
import { ItemSideBar, Provinces, RelatedPost } from "../../components";
import List from "./List";
import Pagination from "./Pagination";
import * as actions from '../../stores/actions'




function HomePage() {
    // const [params] = useSearchParams();
    //app lấy từ rootReducer
    const { categories, prices, areas } = useSelector(state => state.app)

    return (
        <div className=" w-full flex flex-col gap-3">

            <div>
                <h1 className="text-[28px] font-bold">
                    {text.HOME_TITLE}
                </h1>
                <p className="text-base text-gray-700">{text.HOME_DECRIPTION}</p>
            </div>
            <Provinces></Provinces>
            <div className="flex w-full gap-4">
                <div className="w-[70%]">
                    <List></List>
                    <Pagination></Pagination>

                </div>
                <div className="w-[30%]  flex flex-col gap-4 justify-start items-center">
                    <ItemSideBar content={categories} title='Danh Sách Cho Thuê' />
                    <ItemSideBar isDouble={true} type='priceCode' content={prices} title='Xem Theo Giá' />
                    <ItemSideBar isDouble={true} type='areaCode' content={areas} title='Xem Theo Diện Tích' />
                    <RelatedPost></RelatedPost>
                </div>

            </div>
        </div>
    );
}

export default HomePage;