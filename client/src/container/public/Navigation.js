import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../stores/actions'
import { formatVietnameseToString } from "../../ultils/Common/formatToVietnamese";


const active = 'hover:bg-secondary2 px-4 h-full flex items-center  bg-secondary2';
const notActive = 'hover:bg-secondary2 px-4 h-full flex items-center bg-secondary'

// thanh navbar
function Navigation({ isAdmin }) {
    // const [categories , setCategories] = useState([]);
    const dispatch = useDispatch()
    // dùng destructuring để nhận all data
    const { categories } = useSelector(state => state.app)
    useEffect(() => {
        // const fetchCategories = async () =>{
        //     const reponse = await apiGetCategories();
        //     if(reponse?.data.err===0){
        //         setCategories(reponse.data.response)
        //     }
        // }
        // fetchCategories();
        dispatch(actions.getCategories())
    }, [])
    return (
        <div className={`w-full flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center h-[40px] bg-secondary text-white`}>
            <div className="w-3/5 flex  text-sm font-medium h-full text-left">
                {
                    categories?.length > 0 && categories.map((item) => {
                        return (
                            <div key={item.code} className="h-full ">
                                <NavLink
                                    // to={`/${item.path}`}
                                    to={`/${formatVietnameseToString(item.value)}`}
                                    // end={item.end}
                                    className={({ isActive }) => isActive ? active : notActive}
                                >
                                    {item.value}
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Navigation;