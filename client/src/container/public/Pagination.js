import { PageNumber } from "../../components";
import { useSelector } from "react-redux";
import {
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Pagination() {
  //?
  const { count, posts } = useSelector((state) => state.post);
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [searchParams] = useSearchParams();

  // console.log("currentPage : ", currentPage);
  useEffect(() => {
    let page = searchParams.get('page');
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1)
  }, [searchParams]);

  useEffect(() => {
    let maxPage = Math.ceil(count / process.env.REACT_APP_POST_LIMIT);
    // console.log('max page : ' , maxPage);
    let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2);
    let start = (currentPage - 2) <= 0 ? 1 : (currentPage - 2);
    let temp = [];
    for (let i = start; i <= end; i++) {
      // push so trang dc hien thi trong phân trang
      temp.push(i);
    }
    setArrPage(temp);
    // console.log(temp);

    // Ẩn thanh start end khi page là 1 và 16
    currentPage >= (maxPage - 2) ? setIsHideEnd(true) : setIsHideEnd(false);
    currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false);

    // if(currentPage >= maxPage - 1){
    //     setIsHideEnd(true)
    // }
    // else{
    //     setIsHideEnd(false)
    // }
  }, [count, posts, currentPage]);
  // console.log(arrPage);

  // const handlePageNumber = () =>{
  //     // console.log(length);
  //     // count 40 phần tử , length là số p/tử trong trang :5 => max =7
  //     let max = Math.floor(count/posts.length)
  //     let arrNumber = []
  //     for(let i = 1 ; i < max ; i++)
  //         arrNumber.push(i)
  //     return arrNumber.length > 6 ? arrNumber.filter(i => i < 7) : arrNumber
  // }

  // console.log(handlePageNumber());

  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {!isHideStart && (
        <PageNumber
          // icon={<FontAwesomeIcon icon={faAngleDoubleLeft}></FontAwesomeIcon>}
          number={1}
          setCurrentPage={setCurrentPage}
        ></PageNumber>
      )}
      {(!isHideStart && currentPage !== 4) && <PageNumber number={"..."}></PageNumber>}

      {arrPage.length > 0 &&
        arrPage.map((item) => {
          return (
            <PageNumber
              key={item}
              number={item}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></PageNumber>
          );
        })}

      {!isHideEnd && <PageNumber number={"..."}></PageNumber>}
      {!isHideEnd && (
        <PageNumber
          icon={<FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>}
          number={Math.floor(count / posts.length)}
          // ?
          setCurrentPage={setCurrentPage}
        ></PageNumber>
      )}
    </div>
  );
}

export default Pagination;
