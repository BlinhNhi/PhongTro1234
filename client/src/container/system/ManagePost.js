import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import * as actions from "../../stores/actions";
import { Button, UpdatePost } from "../../components";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";

function ManagePost() {
    const dispatch = useDispatch();
    const { postOfCurrentUser, dataEdit } = useSelector((state) => state.post);
    const [isEdit, setIsEdit] = useState(false);
    const [updateAfterDelete, setUpdateAfterDelete] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        !dataEdit && dispatch(actions.getPostsLimlitAdmin());
    }, [dataEdit, updateAfterDelete]);


    // bật tắt model
    useEffect(() => {
        !dataEdit && setIsEdit(false)
    }, [dataEdit])

    // 
    useEffect(() => {
        setPosts(postOfCurrentUser)
    }, [postOfCurrentUser])

    // console.log(postOfCurrentUser);
    // kiểm tra bài viết hết hạn hay còn hạn
    const CheckStatus = (dateTimeCurrent) =>
        moment(dateTimeCurrent, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
            new Date().toDateString()
        );

    const handleDeletePost = async (postId) => {
        const response = await apiDeletePost(postId)
        if (response?.data?.error === 0) {
            setUpdateAfterDelete(pre => !pre)
        }
        else {
            Swal.fire('Error', 'Xoá Tin Thất Bại', "error");
        }
    }

    // 24:19 #75
    const handleFilterByStatus = (statusCode) => {
        if (statusCode === 1) {
            const activePost = postOfCurrentUser?.filter(item => CheckStatus(item?.overviews?.expire?.split(",")[2]))
            setPosts(activePost)
        }
        else if (statusCode === 2) {
            const expiredPost = postOfCurrentUser?.filter(item => !CheckStatus(item?.overviews?.expire?.split(",")[2]))
            setPosts(expiredPost)
        }
        else {
            setPosts(postOfCurrentUser)
        }
    }
    return (
        <div className="flex flex-col gap-6 ">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h1 className="font-medium text-3xl">Quản Lý Tin Đăng</h1>
                <select onChange={e => handleFilterByStatus(+e.target.value)} className="outline-none border p-2 border-gray-200 rounded-md">
                    <option value="">Lọc Theo Trạng Thái</option>
                    <option value="2">Đã Hết Hạn</option>
                    <option value="1">Đang Hoạt Động</option>
                </select>
            </div>
            <table className="w-full table-auto">
                <thead>
                    <tr className="flex w-full bg-gray-100">
                        <th className="border flex-1 p-2">Mã Tin</th>
                        <th className="border flex-1 p-2">Ảnh Đại Diện</th>
                        <th className="border flex-1 p-2">Tiêu Đề</th>
                        <th className="border flex-1 p-2">Giá</th>
                        <th className="border flex-1 p-2">Ngày Bắt Đầu</th>
                        <th className="border flex-1 p-2">Ngày Hết Hạn</th>
                        <th className="border flex-1 p-2">Trạng Thái</th>
                        <th className="border flex-1 p-2">Tuỳ Chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {!posts ? (
                        <tr>
                            <td>kkkkkk</td>
                        </tr>
                    ) : (
                        posts?.map((item) => {
                            return (
                                <tr key={item?.id} className="flex h-16 ">
                                    <td className="border p-2 text-center whitespace-nowrap overflow-hidden text-ellipsis h-full flex-1">
                                        {item?.overviews?.code}
                                    </td>

                                    <td className="border flex-1 flex items-center justify-center p-2">
                                        <img
                                            src={JSON.parse(item?.images?.image)[0] || ""}
                                            alt="avatar-post"
                                            className="w-10 h-10 object-cover rounded-md"
                                        ></img>
                                    </td>
                                    <td className="border p-2 text-center whitespace-nowrap overflow-hidden text-ellipsis h-full flex-1">
                                        {item?.title}
                                    </td>
                                    <td className="border p-2 text-center whitespace-nowrap overflow-hidden text-ellipsis h-full flex-1">
                                        {item?.attributes?.price}
                                    </td>
                                    <td className="border p-2 text-center whitespace-nowrap overflow-hidden text-ellipsis h-full flex-1">
                                        {item?.overviews?.created}
                                    </td>
                                    <td className="border p-2 text-center whitespace-nowrap overflow-hidden text-ellipsis h-full flex-1">
                                        {item?.overviews?.expire}
                                    </td>
                                    <td className="border p-2 text-center whitespace-nowrap overflow-hidden text-ellipsis h-full flex-1">
                                        {CheckStatus(item?.overviews?.expire?.split(",")[2])
                                            ? "Đang Hoạt Động"
                                            : "Hết Hạn"}
                                    </td>
                                    <td className="flex items-center text-center  justify-center gap-4 h-full flex-1 p-2 border">
                                        <Button
                                            onClick={() => {
                                                setIsEdit(true)
                                                dispatch(actions.editData(item))
                                            }}
                                            bgColor="bg-green-600"
                                            textColor="text-white"
                                            text="Sửa"
                                        ></Button>

                                        <Button
                                            bgColor="bg-orange-600"
                                            textColor="text-white"
                                            text="Xoá"
                                            onClick={() => handleDeletePost(item.id)}
                                        >
                                            Xoá
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
            {isEdit && <UpdatePost setIsEdit={setIsEdit}></UpdatePost>}
        </div>
    );
}

export default ManagePost;
