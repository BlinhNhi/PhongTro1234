import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { path } from "../../ultils/constant";
import { Button, User } from "../../components";
import icons from "../../ultils/icon";
import menuManage from "../../ultils/data/menuManage";
import * as actions from "../../stores/actions";

const { AiOutlinePlusCircle } = icons;

function Header() {
  const navigate = useNavigate();
  // currentUserData trong userReducer
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [searchParms] = useSearchParams();
  const headerRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParms.get("page")]);

  return (
    <div ref={headerRef} className="w-3/5">
      <div className="w-full flex items-center justify-between ">
        <Link to={"/"}>
          <img
            alt="logo"
            src="https://phongtro123.com/images/logo-phongtro.svg"
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <div className="flex items-center gap-1">
              <span>Phòng Trọ 123.com Xin Chào!</span>

              <Button
                text={"Đăng Nhập"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(false)}
              />
              <Button
                text={"Đăng Ký"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </div>
          )}

          {isLoggedIn && (
            <div className="flex items-center  relative gap-4">
              <span><User></User></span>
              <div className="flex items-center justify-center">
                <Button
                  text={"Quản Lý Tài Khoản"}
                  // IcAfter={<FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>}
                  textColor="text-white"
                  bgColor="bg-blue-600"
                  px='px-4'
                  onClick={() => setShowMenu(pre => !pre)}
                />
                {/* <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon> */}
              </div>
              {showMenu && <div className="absolute min-w-200 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col gap-2">
                {
                  menuManage.map(i => {
                    return (
                      <Link
                        className="cursor-pointer hover:text-orange-500 flex items-center gap-3 text-blue-600 py-2 border-b border-gray-200"
                        to={i?.path}
                        id={i.id}
                      >

                        {i.icon}
                        {i.text}
                      </Link>
                    )
                  })
                }

                <span
                  className="cursor-pointer hover:text-orange-500 flex items-center gap-3 text-blue-600 py-2"
                  onClick={() => {
                    dispatch(actions.logout())
                    setShowMenu(false)
                  }}
                >
                  <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
                  Đăng Xuất
                </span>
              </div>}
            </div>
          )}

          <Button
            text={"Đăng Tin Mới"}
            textColor="text-white"
            bgColor="bg-secondary2"
            iconAfter={AiOutlinePlusCircle}
            onClick={() => navigate('/he-thong/tao-moi-bai-dang')}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
