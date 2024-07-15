import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { memo } from "react";

import { text } from '../ultils/data/dataIntro'
import { Button } from '../components'
import { formatVietnameseToString } from "../ultils/Common/formatToVietnamese";
function Intro() {
    //categories : trong app reducer
    const { categories } = useSelector(state => state.app)
    return (
        <div className="w-3/5 bg-white gap-4 rounded-md p-4 shadow-md justify-center items-center flex flex-col">
            <h3 className='font-bold text-lg'>{text.title}</h3>
            <p className='text-gray-800 text-center my-4'>
                {text.description}
                <span className="text-link">
                    {categories?.length > 0 && categories.map((item, index) => {
                        // if (item.value === 'trang chủ') {
                        //     return (
                        //         <div>
                        //             kkkk
                        //         </div>
                        //     )
                        // }
                        return (
                            <Link
                                to={`/${formatVietnameseToString(item.value)}`}
                                key={index}
                                className="text-blue-400 font-medium hover:text-orange-600"
                            >
                                {`${item.value.toLowerCase()}, `}
                            </Link>
                        )
                    })}
                </span>
                {text.description2}
            </p>
            <div className='flex items-center justify-around w-full'>
                {text.statistics.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-col justify-center items-center'>
                            <h4 className='font-bold text-lg'>{item.value}</h4>
                            <p className='text-gray-700'>{item.name}</p>
                        </div>
                    )
                })}
            </div>
            <h3 className='font-bold text-lg py-2'>{text.maxPrice}</h3>
            <div className="flex items-center justify-center gap-2">
                {
                    text.star.map(item => {
                        return (
                            <span key={item} className="text-yellow-400 text-2xl">
                                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                            </span>
                        )
                    })
                }
            </div>
            <p className='text-gray-600 italic text-center'>{text.comments}</p>
            <span className='text-gray-700'>{text.author}</span>
            <h3 className='font-bold text-lg py-2'>{text.question}</h3>
            <p className=''>{text.answer}</p>
            <Button text='Đăng Tin Ngay' bgColor='bg-secondary2' textColor='text-white' px='px-10'></Button>
            <div className="h-12"></div>
        </div>
    );
}

export default memo(Intro);