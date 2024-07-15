import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { ItemSideBar, RelatedPost } from "../../components";
import List from "./List";
import Pagination from "./Pagination";



function SearchDetail() {
    const { prices, areas } = useSelector(state => state.app)
    const location = useLocation()

    return (
        <div className=" w-full flex flex-col gap-3">

            <div>
                <h1 className="text-[28px] font-bold">
                    {location?.state?.titleSearch || 'Kết Quả Tìm Kiếm'}
                </h1>
                <p className="text-base text-gray-700">{`${location?.state?.titleSearch || ''} Phòng mới xây , chính chủ , trường học , siêu thị
                    , cửa hàng tiện lợi , khu an ninh .`}</p>
            </div>
            <div className="flex w-full gap-4">
                <div className="w-[70%]">
                    <List ></List>
                    <Pagination></Pagination>

                </div>
                <div className="w-[30%]  flex flex-col gap-4 justify-start items-center">
                    {/* <ItemSideBar content={categories} title='Danh Sách Cho Thuê' /> */}
                    <ItemSideBar isDouble={true} type='priceCode' content={prices} title='Xem Theo Giá' />
                    <ItemSideBar isDouble={true} type='areaCode' content={areas} title='Xem Theo Diện Tích' />
                    <RelatedPost></RelatedPost>
                </div>

            </div>
        </div>
    );
}

export default SearchDetail;