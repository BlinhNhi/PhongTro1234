import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InputReadOnly, InputFormPost, Button } from "../../components";
import avartarUser from 'src/assects/images/avartarUser.jpg'
import { apiUpdateUser } from "../../services";
import { fileToBase64, blodTobase64 } from "../../ultils/tobase64";
import { getCurrentUser } from '../../stores/actions';
import Swal from "sweetalert2";

function EditAccount() {
    const { currentUserData } = useSelector(state => state.user);
    // console.log(currentUserData);
    const [payload, setPayload] = useState({
        name: currentUserData?.name || '',
        avatar: blodTobase64(currentUserData?.avatar) || '',
        fbUrl: currentUserData?.fbUrl || '',
        zalo: currentUserData?.zalo || ''
    });
    const dispatch = useDispatch();

    // chưa fix img quá kích thước
    const handleSubmit = async () => {
        const response = await apiUpdateUser(payload)
        if (response?.data?.err === 0) {
            Swal.fire('Done', 'Chỉnh Sửa Trang Cá Nhân Thành Công', 'success').then(() => {
                dispatch(getCurrentUser())
            });
        }
        else {
            Swal.fire('Opps', 'Chỉnh Sửa Trang Cá Nhân Thất Bại', 'error')
        }
    }

    const handleUploadFile = async (e) => {
        const imageBase64 = await fileToBase64(e.target.files[0]);
        setPayload(prev => ({
            ...prev,
            avatar: imageBase64
        }))
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="font-medium border-b w-full border-gray-200 py-4 text-3xl">
                Chỉnh Sửa Thông Tin Cá Nhân
            </h1>
            <div className="w-3/5 py-6 flex flex-col gap-6">
                <InputReadOnly
                    value={`#${currentUserData?.id?.match(/\d/g)?.join("")?.slice(0, 7)}` || ''}
                    direction={"flex-row items-center"}
                    label="Mã Thành Viên :"
                ></InputReadOnly>
                <InputReadOnly
                    value={currentUserData?.phone || ''}
                    editPhone
                    direction={"flex-row items-center"}
                    label="Số Điện Thoại :"
                ></InputReadOnly>
                <InputFormPost
                    name='name'
                    value={payload.name}
                    setValue={setPayload}
                    direction={"flex-row items-center"}
                    label="Tên Hiển Thị :"
                ></InputFormPost>
                <InputFormPost
                    name='zalo'
                    setValue={setPayload}
                    value={payload.zalo}
                    direction={"flex-row items-center"}
                    label="Zalo : "
                ></InputFormPost>
                <InputFormPost
                    name='fbUrl'
                    setValue={setPayload}
                    value={payload.fbUrl}
                    direction={"flex-row items-center"}
                    label="FaceBook : "
                ></InputFormPost>
                <div className="flex">
                    <label className="w-48 flex-none font-semibold" htmlFor="password">Mật Khẩu</label>
                    <small className="flex-auto text-blue-500 cursor-pointer">Đổi Mật Khẩu</small>
                </div>
                <div className="flex items-center my-8 rounded-full">
                    <label className="w-48 flex-none font-semibold " htmlFor="avatar">Ảnh Đại Diện</label>
                    <div>
                        <img src={payload?.avatar || avartarUser} alt="avatar" className="w-28 h-28 rounded-full object-cover"></img>
                        <input onChange={handleUploadFile} type="file" className="appearance-none my-4" id="avatar"></input>
                    </div>
                </div>
                <Button onClick={handleSubmit} text='Cập Nhật' bgColor='bg-blue-500' textColor='text-white'></Button>
            </div>
        </div>
    );
}

export default EditAccount;
