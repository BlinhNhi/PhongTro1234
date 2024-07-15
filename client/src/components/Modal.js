import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useEffect, useState } from "react";

import { getNumberArea, getNumberPrice } from "../ultils/Common/getNumbers";
import { getCodesPrice, getCodesArea } from "../ultils/Common/getCodes";

function Modal({
    setIsShowModal,
    content,
    name,
    handleSubmit,
    queries,
    arrMaxMin,
    // sửa default text video 49 phút 24
    defaultText
}) {
    // console.log(arrMaxMin);
    // const [leftPersent, setLefPersent] = useState(0);
    // const [rightPersent, setRightPersent] = useState(100);
    // ?
    const [leftPersent, setLefPersent] = useState(
        name === "price" && arrMaxMin?.priceArr
            ? arrMaxMin?.priceArr[0]
            : name === "area" && arrMaxMin?.areaArr
                ? arrMaxMin?.areaArr[0]
                : 0
    );
    const [rightPersent, setRightPersent] = useState(
        name === "price" && arrMaxMin?.priceArr
            ? arrMaxMin?.priceArr[1]
            : name === "area" && arrMaxMin?.areaArr
                ? arrMaxMin?.areaArr[1]
                : 100
    );

    const [activeElement, setActiveElement] = useState("");

    useEffect(() => {
        const activedTrackElement = document.getElementById("track-active");
        if (activedTrackElement) {
            if (rightPersent <= leftPersent) {
                activedTrackElement.style.left = `${rightPersent}%`;
                activedTrackElement.style.right = `${100 - leftPersent}%`;
            } else {
                activedTrackElement.style.left = `${leftPersent}%`;
                activedTrackElement.style.right = `${100 - rightPersent}%`;
            }
        }
    }, [leftPersent, rightPersent]);

    const handleClickStack = (e) => {
        // ??
        const stackEl = document.getElementById("track");
        const stackRect = stackEl.getBoundingClientRect();
        let percent = Math.round(
            ((e.clientX - stackRect.left) * 100) / stackRect.width
        );
        // console.log(percent);
        if (Math.abs(percent - leftPersent) <= Math.abs(percent - rightPersent)) {
            setLefPersent(percent);
        } else {
            setRightPersent(percent);
        }
    };

    const convertPercentToMoney = (percent) => {
        return name === "price"
            ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
            : name === "area"
                ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
                : 0;
    };

    const convertMoneyToPercent = (percent) => {
        let target = name === "price" ? 15 : name === "area" ? 90 : 1;
        return Math.floor((percent / target) * 100);
    };

    // console.log(getNumberArea('tu 80m asdas'));

    const handleActive = (code, value) => {
        setActiveElement(code)
        let arrMaxMin = name === 'price' ? getNumberPrice(value) : getNumberArea(value)
        if (arrMaxMin.length === 1) {
            if (arrMaxMin[0] === 1) {
                setLefPersent(0)
                setRightPersent(convertMoneyToPercent(1))
            }
            if (arrMaxMin[0] === 20) {
                setLefPersent(0)
                setRightPersent(convertMoneyToPercent(20))
            }
            if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
                setLefPersent(100)
                setRightPersent(100)
            }
        }
        if (arrMaxMin.length === 2) {
            setLefPersent(convertMoneyToPercent(arrMaxMin[0]))
            setRightPersent(convertMoneyToPercent(arrMaxMin[1]))
        }
    }
    // const handleActive = (code, value) => {
    //     setActiveElement(code);
    //     let arrMaxMin =
    //         name === "price" ? getNumberPrice(value) : getNumberArea(value);
    //     if (arrMaxMin.length === 1) {
    //         if (arrMaxMin[0] === 1) {
    //             setLefPersent(0);
    //             // KHÁC CHỦ PJ
    //             setRightPersent(0);
    //         }
    //         if (arrMaxMin[0] === 20) {
    //             setLefPersent(0);
    //             setRightPersent(convertMoneyToPercent(20));
    //         }
    //         if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
    //             setLefPersent(100);
    //             setRightPersent(100);
    //         }
    //     }

    //     if (arrMaxMin.length === 2) {
    //         setLefPersent(convertMoneyToPercent(arrMaxMin[0]));
    //         setRightPersent(convertMoneyToPercent(arrMaxMin[1]));
    //     }
    // };

    const handleBeforeSubmit = (e) => {
        // áp dụng
        let min = leftPersent <= rightPersent ? leftPersent : rightPersent;
        let max = leftPersent <= rightPersent ? rightPersent : leftPersent;
        const arrMaxMin = (leftPersent === rightPersent && leftPersent === 100) ?
            [convertPercentToMoney(min), 999999999]
            : [convertPercentToMoney(min), convertPercentToMoney(max)];

        // const result =
        //     name === "price"
        //         ? getCodesPrice(arrMaxMin, content)
        //         : name === "area"
        //             ? getCodesArea(arrMaxMin, content)
        //             : [];
        handleSubmit(
            e,
            {
                // [`${name}Code `]: result?.map((item) => item.code),
                [`${name}Number `]: arrMaxMin,
                [name]: `Từ ${convertPercentToMoney(min)}${(leftPersent === rightPersent && leftPersent === 100) ? '' : ` đến ${convertPercentToMoney(max)} `}  
                ${name === "price" ? "triệu" : "m2"
                    }`,
            },
            {
                [`${name}Arr `]: [min, max],
            }
        );
        // handleSubmit(e, {
        //     [`${name}Code `]: [convertPercentToMoney(leftPersent), convertPercentToMoney(rightPersent)],
        //     [name]: `Từ ${convertPercentToMoney(leftPersent)} đến ${convertPercentToMoney(rightPersent)}  triệu`
        // })
    };

    return (
        <div
            onClick={() => {
                setIsShowModal(false);
            }}
            className="fixed h-screen top-0 left-0 right-0 bottom-0 bg-overlay-30 z-20 flex justify-center items-center"
        >
            <div
                onClick={(e) => {
                    // chống lại sự kiện nổi bọt tránh khi click vào thẻ con thẻ che cũng kích hoạt sự kiện onClick
                    e.stopPropagation();
                    setIsShowModal(true);
                }}
                className="w-2/5 bg-white rounded-md relative h-[500px]"
            >
                <div
                    onClick={(e) => {
                        // chống lại sự kiện nổi bọt tránh khi click vào thẻ con thẻ che cũng kích hoạt sự kiện onClick
                        e.stopPropagation();
                        setIsShowModal(false);
                    }}
                    className="h-[45px] px-4 flex items-center  border-gray-400 border-b"
                >
                    <div className="text-2xl hover:text-red-600 cursor-pointer">
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    </div>
                </div>

                {(name === "category" || name === "province") && (
                    <div className="p-4 flex flex-col">
                        {content?.map((item) => {
                            return (
                                <span
                                    key={item.code}
                                    className="py-2 flex gap-2 items-center border-b border-gray-200"
                                >
                                    <input
                                        type="radio"
                                        id={item.code}
                                        name={name}
                                        value={item.code}
                                        //?
                                        checked={
                                            item.code === queries[`${name}Code `] ? true : false
                                        }
                                        onClick={(e) =>
                                            handleSubmit(e, {
                                                [name]: item.value,
                                                [`${name}Code `]: item?.code,
                                            })
                                        }
                                    ></input>
                                    <label htmlFor={item.code}>{item.value}</label>
                                </span>
                            );
                        })}
                    </div>
                )}

                {(name === "price" || name === "area") && (
                    <div className="p-12 py-20">
                        <div className="flex items-center justify-center flex-col relative">
                            <div className="z-30 absolute top-[-48px] font-semibold text-xl  text-orange-600">
                                {leftPersent === 100 && rightPersent === 100
                                    ? `Trên ${convertPercentToMoney(leftPersent)}  ${name === "price" ? "triệu" : "m2"
                                    }`
                                    : `Từ ${leftPersent <= rightPersent
                                        ? convertPercentToMoney(leftPersent)
                                        : convertPercentToMoney(rightPersent)
                                    } ${name === "price" ? "triệu" : "m2"} đến ${rightPersent >= leftPersent
                                        ? convertPercentToMoney(rightPersent)
                                        : convertPercentToMoney(leftPersent)
                                    } ${name === "price" ? "triệu" : "m2"}`}
                            </div>
                            <div
                                onClick={handleClickStack}
                                id="track"
                                className="w-full absolute bg-gray-400 rounded-full slider-track h-[5px] top-0 bottom-0"
                            ></div>
                            <div
                                onClick={handleClickStack}
                                id="track-active"
                                className=" absolute bg-orange-500 rounded-full slider-track-active h-[5px] top-0 bottom-0"
                            ></div>

                            <input
                                max="100"
                                min="0"
                                step="1"
                                value={leftPersent}
                                onChange={(e) => {
                                    setLefPersent(+e.target.value);
                                    activeElement && setActiveElement("");
                                }}
                                type="range"
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                            ></input>

                            <input
                                max="100"
                                min="0"
                                step="1"
                                value={rightPersent}
                                onChange={(e) => {
                                    setRightPersent(+e.target.value);
                                    activeElement && setActiveElement("");
                                }}
                                type="range"
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                            ></input>
                            <div className="flex justify-between items-center absolute z-30 top-6 left-0 right-0">
                                <span
                                    className="px-4 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // khác vs chủ đề tài
                                        setLefPersent(0);
                                    }}
                                >
                                    0
                                </span>
                                <span
                                    className="mr-[-12px] cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // khác vs chủ đề tài
                                        setRightPersent(100);
                                    }}
                                >
                                    {name === "price"
                                        ? "15 triệu +"
                                        : name === "area"
                                            ? "Trên 90 m2"
                                            : ""}
                                </span>
                            </div>
                        </div>
                        <div className="mt-24">
                            <h4 className="font-medium mb-4">Chọn Nhanh</h4>
                            <div className="flex gap-2 items-center flex-wrap w-full">
                                {content?.map((item) => {
                                    return (
                                        <span
                                            onClick={() => handleActive(item.code, item.value)}
                                            key={item.code}
                                            className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${item.code === activeElement
                                                ? "bg-blue-800 text-white "
                                                : ""
                                                }`}
                                        >
                                            {item?.value}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                {(name === "price" || name === "area") && (
                    <button
                        className="absolute bottom-0 rounded-bl-md rounded-br-md bg-[#FFA500] text-black w-full py-2 font-medium uppercase"
                        onClick={handleBeforeSubmit}
                    >
                        Áp Dụng
                    </button>
                )}
            </div>
        </div>
    );
}

export default memo(Modal);
