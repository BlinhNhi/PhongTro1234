import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faMapLocationDot,
  faCircleDollarToSlot,
  faCrop,
  faHouse,
  faClose,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";

import { Modal, SearchItem } from "../../components";
import { path } from "../../ultils/constant";
// import * as actions from '../../stores/actions'
// import { getCodesPrice, getCodesArea } from "../../ultils/Common/getCodes";


function Search() {
  const dispatch = useDispatch()
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([])
  const [name, setName] = useState({})
  const [queries, setQueries] = useState({})
  const [arrMaxMin, setArrMaxMin] = useState({})
  const [defaultText, setDefaultText] = useState('')
  const { provinces, areas, prices, categories } = useSelector(state => state.app)
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(getCodesArea([34, 85], areas));
  // console.log(getCodesPrice());
  // console.log(provinces, prices, areas, categories);
  useEffect(() => {
    if (!location.pathname.includes(path.SEARCH)) {
      setArrMaxMin({})
      setQueries({})
    }
  }, [location])
  // console.log(queries);

  const handleShowModal = (content, name) => {
    setContent(content)
    setName(name)
    setDefaultText(defaultText)
    setIsShowModal(true)
  }

  const handleSubmit = useCallback((e, query, arrMaxMin) => {
    e.stopPropagation();
    setQueries(pre => ({ ...pre, ...query }))
    setIsShowModal(false)
    //?
    arrMaxMin && setArrMaxMin(prev => ({ ...prev, ...arrMaxMin }))
  }, [isShowModal, queries])
  // console.log(queries);
  // console.log(getCodePrice(prices));
  // console.log(getCodeArea(areas));

  const handleSearch = () => {
    console.log(queries);
    // lọc number trên thanh params
    const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1]);
    // console.log(queryCodes);
    let queryObj = {};
    queryCodes.forEach(item => {
      queryObj[item[0]] = item[1]
    })
    // console.log(queryObj);
    const queryText = Object.entries(queries).filter(item => !item[0].includes('Number') || !item[0].includes('Code'))
    // console.log(queryText);

    let queryTextObj = {};
    queryText.forEach(item => { queryTextObj[item[0]] = item[1] });
    console.log(queryTextObj);
    // 
    let titleSearch = `${queryTextObj.category
      ? queryTextObj.category
      : 'Cho thuê tất cả'} ${queryTextObj.province
        ? `tỉnh ${queryTextObj.province}`
        : ''} ${queryTextObj.price
          ? `giá ${queryTextObj.price}`
          : ''} ${queryTextObj.area
            ? `diện tích ${queryTextObj.area}` : ''} `
    // console.log(titleSearch);
    console.log(queryTextObj);

    navigate({
      pathname: path.SEARCH,
      search: createSearchParams(queryObj).toString(),
    }, { state: { titleSearch } })
  }
  return (
    <>
      <div className="w-3/5 p-[10px] my-3 bg-[#febb02] rounded-lg lg:flex-row flex flex-col items-center justify-around gap-2">
        <span className="flex-1 cursor-pointer" onClick={() => handleShowModal(categories, 'category', "Tìm Tất Cả")}>
          <SearchItem
            fontWeight
            text={queries?.category}
            defaultValue={"Tìm Tất Cả"}
            IconBefore={<FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>}
            IconAfter={<FontAwesomeIcon icon={faClose}></FontAwesomeIcon>}
          ></SearchItem>
        </span>

        <span className="flex-1 cursor-pointer" onClick={() => handleShowModal(provinces, 'province', "Toàn Quốc")}>
          <SearchItem
            IconAfter={<FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>}
            text={queries?.province}
            defaultValue={"Toàn Quốc"}
            IconBefore={<FontAwesomeIcon icon={faMapLocationDot}></FontAwesomeIcon>}
          ></SearchItem>
        </span>

        <span className="flex-1 cursor-pointer" onClick={() => handleShowModal(prices, 'price', "Chọn Giá")}>
          <SearchItem
            IconAfter={<FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>}
            IconBefore={
              <FontAwesomeIcon icon={faCircleDollarToSlot}></FontAwesomeIcon>
            }
            defaultValue={"Chọn Giá"}
            text={queries?.price}
          ></SearchItem>
        </span>

        <span className="flex-1 cursor-pointer" onClick={() => handleShowModal(areas, 'area', "Chọn Diện Tích")}>
          <SearchItem
            IconAfter={<FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>}
            IconBefore={<FontAwesomeIcon icon={faCrop}></FontAwesomeIcon>}
            text={queries?.area}
            defaultValue={"Chọn Diện Tích"}
          ></SearchItem>
        </span>

        <button
          className="outline-none py-2 px-4 flex-1 bg-[#0071c2] text-sm rounded-md text-white flex items-center justify-center gap-2 font-medium"
          onClick={handleSearch}
        >
          <i>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </i>
          Tìm Kiếm
        </button>
      </div>
      {isShowModal && <Modal arrMaxMin={arrMaxMin} queries={queries} name={name} handleSubmit={handleSubmit} defaultText={defaultText} content={content} setIsShowModal={setIsShowModal}></Modal>}
    </>
  );
}

export default Search;
