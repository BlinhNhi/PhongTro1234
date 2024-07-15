// lưu tất cả đường dẫn trang web trong này
export const path = {
    HOME: "/*",
    HOME_PAGE: ":page",
    LOGIN: "login",
    TRANG_CHU: "trangchu",
    CHO_THUE_CAN_HO: "cho-thue-can-ho",
    CHO_THUE_MAT_BANG: "cho-thue-mat-bang",
    CHO_THUE_PHONG_TRO: "cho-thue-phong-tro",
    NHA_CHO_THUE: "nha-cho-thue",
    Star: "*",
    DETAIL_POST__TITLE__POSTID: "chitiet/:title/:postId",
    SEARCH: "tim-kiem",
    SYSTERM: "/he-thong/*",
    CREATE_POST: "tao-moi-bai-dang",
    MANAGE_POST: "quan-ly-bai-dang",
    EDIT_ACCOUNT: "sua-thong-tin-ca-nhan",
    CONTACT_SYSTEM: "lien-he",
    DETAIL: "/chitiet/",
    DETAIL_ALL: "chitiet/*",
};

export const text = {
    HOME_TITLE: "Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2023",
    HOME_DECRIPTION:
        "Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2023. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.",
};

export const location = [
    {
        id: 1,
        name: "Phòng Trọ Hồ Chí Minh",
        image: "https://phongtro123.com/images/location_hcm.jpg",
        provinceCode: "CUID",
    },
    {
        id: 2,
        name: "Phòng Trọ Hà Nội",
        image: "https://phongtro123.com/images/location_hn.jpg",
        provinceCode: "NDOE",
    },
    {
        id: 3,
        name: "Phòng Trọ Đà Nẵng",
        image: "https://phongtro123.com/images/location_dn.jpg",
        provinceCode: "NNAE",
    },
];
