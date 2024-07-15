import { memo, useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { formatVietnameseToString } from '../ultils/Common/formatToVietnamese'
import { Link } from "react-router-dom";
import { path } from "../ultils/constant";

// cni tiết của phòng trọ
const indexs = [0, 1, 2, 3];
function Item({
  images,
  title,
  star,
  user,
  description,
  attributes,
  address,
  id,
}) {
  const [isHoverHeart, setIsHoverHeart] = useState(false);

  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++) {
      stars.push(<FontAwesomeIcon icon={faStar}></FontAwesomeIcon>);
    }
    return stars;
  };

  return (
    <div className="w-full flex  border-t border-red-400 py-4">
      <Link
        to={`${path.DETAIL}${formatVietnameseToString(title).replaceAll('/', '')}/${id}`}
        className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer"
      >
        {images.length > 0 &&
          //?
          images
            .filter((i, index) => indexs.some((i) => i === index))
            ?.map((i, index) => {
              return (
                <img
                  src={i}
                  key={index}
                  alt="preview"
                  className="w-[47%] h-[120px] object-cover"
                ></img>
              );
            })}
        <span className=" bg-overlay-30 rounded-md absolute left-1 bottom-4 p-[4px] text-white">
          {`${images.length}`} ảnh
        </span>
        <span
          className="  absolute right-8 text-xl bottom-4  text-white"
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? (
            <div className="text-red-600">
              <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            </div>
          ) : (
            <div className="text-white">
              <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            </div>
          )}
        </span>
      </Link>

      <div className="w-3/5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex justify-between items-center flex-2">
            <div className="text-yellow-400">
              {handleStar(+star).length > 0 &&
                handleStar(+star).map((star, number) => {
                  return <span key={number}> {star}</span>;
                })}
            </div>
          </div>
          <Link to={`${path.DETAIL}${formatVietnameseToString(title).replaceAll('/', '')}/${id}`} className="text-red-500 font-medium ml-2 w-[300px] flex-3 whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </Link>
          <div className="text-orange-500 text-2xl flex-1 text-right">
            <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
          </div>
        </div>

        <div className=" my-2 flex justify-between  items-center text-sm">
          <p className="flex-3 whitespace-normal overflow-hidden text-ellipsis font-bold text-green-600">
            {attributes?.price}
          </p>
          <p className="flex-1">{attributes?.acreage} </p>
          <p className="flex-3 whitespace-normal overflow-hidden text-ellipsis">{`${address.split(",")[address.split(",").length - 2]
            }${address.split(",")[address.split(",").length - 1]}`}</p>
        </div>
        <p className="text-gray-500 w-full h-[50px]  whitespace-pre-line text-ellipsis overflow-hidden  ">
          {description}
        </p>
        <div className="flex items-center my-6 justify-between">
          <div className="flex items-center">
            <img
              className="h-[30px] w-[30px] mr-4 object-cover rounded-full"
              src="https://tse2.mm.bing.net/th?id=OIF.ZmvwqxajiHcK2umWBw5ioA&pid=Api&P=0&h=220"
              alt="avatar-user"
            ></img>
            <p>{user?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="bg-blue-700 text-white p-1 rounded-md"
            >{`Gọi ${user?.phone}`}</button>
            <a
              type="button"
              href={`https://zalo.me/${user?.zalo}`}
              target="_blank"
              className="bg-white text-blue-700 p-1 rounded-md border border-blue-700"
            >
              Nhắn Zalo{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Item);
