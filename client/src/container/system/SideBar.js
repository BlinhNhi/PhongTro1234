import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import avatarUser from '../../assects/images/avartarUser.jpg'
import menuSideBar from '../../ultils/data/menuSideBar';
import * as actions from '../../stores/actions';
import { blodTobase64 } from '../../ultils/tobase64';

const activeStyle = 'bg-gray-300 flex items-center  p-2 gap-3 rounded-md font-bold';
const nonActiveStyle = ' hover:bg-gray-300 flex items-center  p-2 gap-3 rounded-md cursor-pointer';

function SideBar() {
    const dispatch = useDispatch();
    const { currentUserData } = useSelector(state => state.user);

    return (
        <div className="flex-none w-[256px] p-2 flex flex-col gap-6 bg-gray-200">
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <img src={blodTobase64(currentUserData?.avatar) || avatarUser} className='h-12 w-12 object-cover border-2 border-white rounded-full' alt='avatarUser'></img>
                    <div className='flex flex-col justify-center'>
                        <small className='font-semibold'>{currentUserData?.name}</small>
                        <small>{currentUserData?.phone}</small>
                    </div>

                </div>
                <span>Mã Thành Viên : <small className='font-medium'>{currentUserData?.id?.match(/\d/g)?.join("")?.slice(0, 7)}</small></span>
            </div>
            <div className='flex flex-col gap-2'>
                {
                    menuSideBar.map(i => {
                        return (
                            <NavLink
                                className={({ isActive }) => isActive ? activeStyle : nonActiveStyle}
                                to={i?.path}
                                id={i.id}
                            >
                                {i.icon}
                                {i.text}
                            </NavLink>
                        )
                    })
                }
                <span onClick={() => dispatch(actions.logout())} className={nonActiveStyle}>
                    <div><FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon></div>
                    Thoát
                </span>

            </div>

        </div>
    );
}

export default SideBar;