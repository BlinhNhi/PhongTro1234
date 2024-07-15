import { memo } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, createSearchParams, useNavigate } from 'react-router-dom'

import { formatVietnameseToString } from "../ultils/Common/formatToVietnamese";


function ItemSideBar({ content, title, isDouble, type }) {
  //???
  const formatContent = () => {
    const oddEl = content?.filter((item, index) => index % 2 !== 0);
    const evenEl = content?.filter((item, index) => index % 2 === 0);
    const formatContent = oddEl?.map((item, index) => {
      return {
        right: item,
        left: evenEl?.find((item2, index2) => index2 === index),
      };
    });

    return formatContent;
  };
  // console.log(formatContent());


  // const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const handleFilterPosts = (code) => {
    // dispatch(actions.getPostsLimlit({[type] : code}))
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        [type]: code,
        // page: 
      }).toString(),
    });
  }
  return (
    <div className="p-4 rounded-md bg-white w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            content.map((item, index) => {
              if (item.value === 'Trang Chủ') {
                return (
                  <div key={index}></div>
                )
              }
              return (
                <Link
                  to={`${formatVietnameseToString(item.value)}`}
                  key={item.code}
                  className="flex gap-2 items-center border-b border-dashed border-gray-200 pb-1 "
                >
                  <div className="text-xs">
                    <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                  </div>
                  <p className="cursor-pointer hover:text-orange-600">
                    {item.value}
                  </p>
                </Link>
              );
            })}
        </div>
      )}

      {isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            // item là left và price
            formatContent(content).map((item, index) => {
              return (
                <div
                  key={index}
                  className=" "
                >
                  <div className="flex items-center justify-around">
                    <div
                      onClick={() => handleFilterPosts(item.left.code)}
                      className="flex flex-1  gap-2 items-center border-b border-dashed border-gray-200 pb-1  ">
                      <div className="text-xs">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                        ></FontAwesomeIcon>
                      </div>
                      <p className="cursor-pointer hover:text-orange-600">
                        {item.left.value}
                      </p>
                    </div>
                    <div
                      onClick={() => handleFilterPosts(item.right.code)}
                      className="flex flex-1 gap-2 items-center border-b border-dashed border-gray-200 pb-1 ">
                      <div className="text-xs">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                        ></FontAwesomeIcon>
                      </div>
                      <p className="cursor-pointer hover:text-orange-600">
                        {item.right.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default memo(ItemSideBar);
