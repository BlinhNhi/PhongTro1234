import { useEffect } from "react";
import { useNavigate, useParams, createSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCoins, faLocationCrosshairs, faClock } from "@fortawesome/free-solid-svg-icons";


import { getPostsLimlit } from "../../stores/actions";
import { SliderCustom, UserInfor, RelatedPost } from "../../components";
import { path } from "../../ultils/constant";
function DetailPost() {
    const { postId } = useParams();
    // post của reducer
    const { posts } = useSelector(state => state.post)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        postId && dispatch(getPostsLimlit({ id: postId }))
    }, [postId])


    const handleFilterLabel = () => {
        let titleSearch = `Tìm kiếm tin đăng theo chuyên mục : ${posts[0]?.labelData?.value}`
        navigate({
            pathname: `/${path.SEARCH}`,
            search: createSearchParams({ labelCode: posts[0]?.labelData?.code }).toString(),
        }, { state: { titleSearch } });
    }
    return (
        <div className="w-full flex gap-4">
            <div className="w-[70%]">
                <div className="bg-white p-6 rounded-md shadow">
                    <SliderCustom images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)}></SliderCustom>
                    <div className="flex flex-col gap-4 mt-14">
                        <h2 className="text-2xl font-bold text-red-500">{posts[0]?.title}</h2>
                        <div className="flex items-center gap-2">
                            <span>Chuyên Mục : </span>
                            <span
                                onClick={handleFilterLabel}
                                className="text-blue-500 underline font-medium hover:text-red-500 cursor-pointer">{posts[0]?.overviews?.area}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-xl text-blue-400">
                                <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                            </div>
                            <span>{posts[0]?.address}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-12">
                                <div className="flex items-center gap-2">
                                    <div className="text-lg text-yellow-500">
                                        <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>
                                    </div>
                                    <span className="font-semibold text-2xl text-green-500">{posts[0]?.attributes?.price}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-lg text-gray-400">
                                        <FontAwesomeIcon icon={faLocationCrosshairs}></FontAwesomeIcon>
                                    </div>
                                    <span className="text-lg">

                                        {posts[0]?.attributes?.acreage}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="text-lg text-gray-400">
                                        <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                    </div>
                                    <span className="text-lg">
                                        {posts[0]?.attributes?.published}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">

                                    <span className="text-lg">
                                        {posts[0]?.attributes?.hashtag}
                                    </span>
                                </div>
                            </span>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold my-4">Thông Tin Mô Tả</h3>
                            <div className="flex flex-col gap-3 text-lg">
                                {/* {posts[0]?.description && JSON.parse(posts[0]?.description)?.map((item, i) => {
                                    return (
                                        <span className="text-left" key={i}>{item}</span>
                                    )
                                })} */}
                                {/* {posts[0]?.description} */}

                            </div>
                        </div>
                        <div className="mt-8">
                            {/* 43:09 | #8 */}
                            <h3 className="text-xl font-semibold my-4">Đặc điểm tin đăng</h3>
                            <table className="w-full">
                                <tbody className="">
                                    <tr className="">
                                        <td className=" p-3 text-lg font-semibold bg-slate-200">Mã Tin : </td>
                                        <td className=" p-3 text-lg bg-slate-200 ">{posts[0]?.overviews?.code}</td>
                                    </tr>
                                    <tr>
                                        <td className=" p-3 text-lg font-semibold ">Khu Vực : </td>
                                        <td className=" p-3 text-lg ">{posts[0]?.overviews?.area}</td>

                                    </tr>
                                    <tr>
                                        <td className=" p-3 text-lg  bg-slate-200 font-semibold">Loại Tin Đăng</td>
                                        <td className=" p-3 text-lg  bg-slate-200 ">{posts[0]?.overviews?.type}</td>

                                    </tr>
                                    <tr>
                                        <td className=" p-3 text-lg font-semibold">Đối Tượng :</td>
                                        <td className=" p-3 text-lg ">{posts[0]?.overviews?.target}</td>

                                    </tr>
                                    <tr>
                                        <td className=" p-3 text-lg  bg-slate-200 font-semibold ">Gói Tin : </td>
                                        <td className=" p-3 text-lg  bg-slate-200 text-red-400">{posts[0]?.overviews?.bonus}</td>

                                    </tr>
                                    <tr>
                                        <td className=" p-3 text-lg font-semibold">Ngày Đăng :</td>
                                        <td className=" p-3 text-lg ">{posts[0]?.overviews?.created}</td>
                                    </tr>
                                    <tr>
                                        <td className=" p-3 text-lg  bg-slate-200 font-semibold">Ngày Hết Hạn : </td>
                                        <td className=" p-3 text-lg  bg-slate-200 ">{posts[0]?.overviews?.expire}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold my-4">Thông Tin Liên Hệ</h3>
                            <table className="w-full">
                                <tbody className="">
                                    <tr className="">
                                        <td className=" p-3 text-lg font-semibold bg-slate-200">Tên : </td>
                                        <td className=" p-3 text-lg bg-slate-200 ">{posts[0]?.user?.name}</td>
                                    </tr>
                                    <tr>
                                        <td className=" p-3 text-lg font-semibold ">Điện Thoại : </td>
                                        <td className=" p-3 text-lg ">{posts[0]?.user?.phone}</td>

                                    </tr>
                                    <tr>
                                        <td className=" p-3 text-lg  bg-slate-200 font-semibold">Zalo : </td>
                                        <td className=" p-3 text-lg  bg-slate-200 ">{posts[0]?.user?.zalo}</td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-[30%] flex flex-col gap-6">
                <UserInfor userData={posts[0]?.user}></UserInfor>
                <RelatedPost></RelatedPost>
                <RelatedPost newPost></RelatedPost>
            </div>
        </div>
    );
}

export default DetailPost;