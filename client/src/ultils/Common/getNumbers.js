export const getNumberPrice = (stringPrice) => {
    return stringPrice.split(' ').map(item => +item).filter(item => !item === false)
}

export const getNumberArea = (stringArea) => {
    return stringArea.split(' ').map(item => +item.match(/\d+/)).filter(item => item !== 0)
}