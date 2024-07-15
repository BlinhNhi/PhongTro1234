import { useSelector } from "react-redux";

import avatarUser from '../assects/images/avartarUser.jpg'
import { blodTobase64 } from "../ultils/tobase64";

function User() {
    const { currentUserData } = useSelector((state) => state.user);
    console.log(currentUserData);
    return (
        <>
            {currentUserData && Object.keys(currentUserData).length > 0 && <div className="flex items-center gap-2 ">
                <img
                    src={blodTobase64(currentUserData?.avatar) || avatarUser}
                    alt="avartar"
                    className="w-10 h-10 object-cover rounded-full border-2 border-white shadow-md"
                >

                </img>
                <div className="flex flex-col">
                    <span>Xin Chào , <span className="font-semibold">{currentUserData?.name}</span></span>
                    <span>Mã Tài Khoản : <span className="font-medium">{`${currentUserData?.id?.slice(0, 10)}...`}</span></span>
                </div>
            </div>}
        </>
    );
}

export default User;