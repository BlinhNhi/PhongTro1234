import { faPencil, faListCheck, faUserPen, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const menuSideBar = [
    {
        id: 1,
        text: 'Đăng Tin Cho Thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
    },
    {
        id: 2,
        text: 'Quản Lý Tin Đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <FontAwesomeIcon icon={faListCheck}></FontAwesomeIcon>
    },
    {
        id: 3,
        text: 'Sửa Thông Tin Cá Nhân',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <FontAwesomeIcon icon={faUserPen}></FontAwesomeIcon>

    },
    {
        id: 4,
        text: 'Liên Hệ',
        path: '/he-thong/lien-he',
        icon: <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>

    }
]

export default menuSideBar