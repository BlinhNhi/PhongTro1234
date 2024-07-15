import React, { memo } from "react";
const SearchItem = function ({ IconBefore, IconAfter, text, fontWeight, defaultValue }) {
    return (
        <div className=" bg-white py-2 px-4 w-full rounded-md text-gray-400 text-[13.3px] flex items-center justify-center gap-2">
            {IconBefore}
            <span className={`${fontWeight && 'font-medium text-black'} ${text ? 'font-medium text-black' : ''} w-[100px] overflow-hidden  text-ellipsis whitespace-nowrap`}>
                {text || defaultValue}
            </span>
            {IconAfter}
        </div>
    );
}

export default memo(SearchItem);