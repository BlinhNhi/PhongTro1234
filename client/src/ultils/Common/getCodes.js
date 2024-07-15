import { getNumberArea, getNumberPrice } from "./getNumbers";
// totals {key : OU1N , value : Dưới 1 Triệu}

// hàm dùng để lấy giá trị lớn nhỏ  (min,max)
export const getCodePrice = (totals, min, max) => {
    return totals?.map((item) => {
        let arrMaxMin = getNumberPrice(item.value);

        return {
            ...item,
            // arrMaxMin = [5,7] | min : 0 , max : 15
            min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : max,
            max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 999999999 : arrMaxMin[0]
        };
    });

};



export const getCodeArea = (totals, min, max) => {
    return totals?.map((item) => {
        let arrMaxMin = getNumberArea(item.value);

        return {
            ...item,
            min: arrMaxMin.length === 2 ? arrMaxMin[0] : arrMaxMin[0] === min ? 0 : max,
            max: arrMaxMin.length === 2 ? arrMaxMin[1] : arrMaxMin[0] === max ? 999999999 : arrMaxMin[0]
        };
    });
};

// export const getCodesArea = (arrMinMax, areas) => {
//     const areasWithMinMax = getCodeArea(areas);
//     return areasWithMinMax.filter(
//         (item) =>
//             (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) ||
//             (item.max >= arrMinMax[0] && item.max <= arrMinMax[1])
//     );
// };

// hàm dùng lấy mã code của giá trị khoảng min max
export const getCodesPrice = (entry, prices, min, max) => {
    const pricesWithMinMax = getCodePrice(prices, min, max);
    // console.log(pricesWithMinMax);
    return pricesWithMinMax.filter(item => item.min <= entry && entry < item.max)
};

export const getCodesArea = (entry, areas, min, max) => {
    const areasWithMinMax = getCodeArea(areas, min, max);
    // console.log(areasWithMinMax);
    return areasWithMinMax.filter(item => item.min <= entry && entry < item.max)
};


