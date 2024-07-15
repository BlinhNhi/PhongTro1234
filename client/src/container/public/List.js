import React, { useEffect, useState } from "react";
import { Button, Item } from "../../components";
import { getPostsLimlit } from "../../stores/actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function List({ categoryCode }) {
    const [sort, setSort] = useState(0);
    const dispatch = useDispatch();
    // phương thức có sẵn của useSearchParams
    const [searchParams] = useSearchParams();
    const { posts } = useSelector((state) => state.post);

    //?
    useEffect(() => {
        let params = [];
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {};
        params?.forEach((i) => {
            // searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] }
            if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
            }
        });
        // console.log(params);
        // console.log(searchParamsObject);
        if (categoryCode) searchParamsObject.categoryCode = categoryCode;
        if (sort === 1) searchParamsObject.order = ['createdAt', 'DESC'];
        // console.log(searchParamsObject);
        // return searchParamsObject;
        // console.log(searchParamsObject);

        dispatch(getPostsLimlit(searchParamsObject));
    }, [searchParams, categoryCode, sort]);

    return (
        <div className="w-full p-2 bg-white shadow-md rounded-none-md px-6">
            <div className="flex items-center justify-between my-4">
                <h4 className="text-xl font-semibold"> Danh Sách Tin Đăng </h4>
                <span>Cập nhật: 10:48 02/01/2024</span>
            </div>
            <div className="flex items-center gap-2 my-2">
                <span>Sắp Xếp :</span>
                <span
                    className={`bg-gray-200 cursor-pointer hover:underline hover:bg-blue-200 p-2 rounded-md  ${sort === 0 && "underline font-semibold"
                        }`}
                    onClick={() => setSort(0)}
                >
                    Mặc Định
                </span>
                <span
                    className={`bg-gray-200 cursor-pointer hover:underline hover:bg-blue-200 p-2 rounded-md  ${sort === 1 && "underline"
                        }`}
                    onClick={() => setSort(1)}
                >
                    Mới Nhất
                </span>
            </div>

            <div className="">
                {posts?.length > 0 &&
                    posts.map((item) => {
                        return (
                            <Item
                                key={item?.id}
                                address={item?.address}
                                attributes={item?.attributes}
                                description={JSON.parse(item?.description)}
                                images={JSON.parse(item?.images.image)}
                                star={+item?.star}
                                title={item?.title}
                                user={item?.user}
                                id={item?.id}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default List;
