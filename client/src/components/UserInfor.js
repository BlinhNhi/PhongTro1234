import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPhone, faZ } from "@fortawesome/free-solid-svg-icons";

import avatarUser from '../assects/images/avartarUser.jpg'
import Button from "./Button";

function UserInfor({ userData }) {

    return (
        <div className="w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4">
            <img className="w-20 h-20 object-contain rounded-full" alt="avatar-user" src={avatarUser}></img>
            <h3 className="font-medium text-2xl">{userData?.name}</h3>
            <span className="flex items-center gap-4">
                <div className="text-sm text-green-600">
                    <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
                </div>
                <h4 className="text-lg">Đang Hoạt Động</h4>
            </span>
            {/* "tel:+0-589-0000111" */}
            <a href={`tel:+${userData?.phone}`} className="flex items-center gap-2 bg-[#13BB7B] w-full px-4 rounded-md">
                <div className="text-white text-lg font-bold ">
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                </div>
                <Button
                    text={userData?.phone}
                    fullWidth
                    textColor='text-white font-blod text-lg'
                ></Button>
            </a>

            <a href={`https://zalo.me/${userData?.phone}`} className="flex items-center gap-2 bg-white w-full px-4 rounded-md">
                <div className="text-lg font-bold text-black">
                    <FontAwesomeIcon icon={faZ}></FontAwesomeIcon>
                </div>
                <Button
                    text='Nhắn Zalo'
                    fullWidth
                    textColor='text-black font-blod text-lg'
                ></Button>
            </a >
        </div >
    );
}

export default memo(UserInfor);