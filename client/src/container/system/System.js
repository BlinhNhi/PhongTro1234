import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { Header, SideBar } from '../system'
import { path } from "../../ultils/constant";
function System() {
    const { isLoggedIn } = useSelector(state => state.auth);
    if (!isLoggedIn) {
        return <Navigate to={`/${path.LOGIN}`} replace={true}></Navigate>
    }
    return (
        <div className="w-full flex flex-col items-center m-auto  h-screen">
            <Header></Header>
            <div className="w-full flex flex-auto h-screen">
                <SideBar></SideBar>
                <div className="flex-auto bg-white shadow-md p-4 overflow-y-auto">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}

export default System;