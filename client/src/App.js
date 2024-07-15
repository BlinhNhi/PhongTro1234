import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Home, HomePage, Login, Rental, DetailPost, SearchDetail } from "./container/public";
import { path } from './ultils/constant'
import { CreatePost, EditAccount, ManagePost, System, ContactSystem } from "./container/system";
import * as actions from './stores/actions'
import { Contact } from "./components";



function App() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrentUser())
    }, 1000)
  }, [isLoggedIn])

  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAreas())
    dispatch(actions.getProvinces())

  }, []);
  return (
    <div className="bg-primary overflow-hidden">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path='*' element={<HomePage />}></Route>
          <Route path={path.HOME_PAGE} element={<HomePage />}></Route>

          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />}></Route>
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />}></Route>
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />}></Route>
          <Route path={path.NHA_CHO_THUE} element={<Rental />}></Route>
          <Route path={path.SEARCH} element={<SearchDetail />}></Route>
          <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />}></Route>
          {/* <Route path={path.DETAIL_ALL} element={<DetailPost />}></Route> */}
        </Route>

        <Route path={path.SYSTERM} element={<System></System>}>
          <Route path={path.CREATE_POST} element={<CreatePost />}></Route>
          <Route path={path.MANAGE_POST} element={<ManagePost />}></Route>
          <Route path={path.MANAGE_POST} element={<ManagePost />}></Route>
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />}></Route>
          <Route path={path.CONTACT_SYSTEM} element={<ContactSystem />}></Route>


        </Route>
      </Routes>
    </div>
  );
}

export default App;
