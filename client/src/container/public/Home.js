import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


import Header from "./Header";
import Footer from "./Footer";
import { Navigation, Search } from "./index";
import { Contact, Intro } from "../../components";
import { path } from "../../ultils/constant";



function Home() {

    const { isLoggedIn } = useSelector(state => state.auth)
    const location = useLocation()


    return (
        <div className="w-full flex flex-col gap-6 items-center m-auto  h-full">
            <Header></Header>
            <Navigation></Navigation>
            {isLoggedIn && !location.pathname?.includes(path.DETAIL) && <Search></Search>}
            <div className=" w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-8  ">
                <Outlet></Outlet>
            </div>
            <Intro></Intro>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
}

export default Home;