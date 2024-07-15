import { faPencil, faListCheck, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const menuManage = [
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
        text: 'Thông tin tài khoản',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <FontAwesomeIcon icon={faUserPen}></FontAwesomeIcon>

    }
]

export default menuManage