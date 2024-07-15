import { useState } from "react";
import { Button, InputFormPost } from "../../components";
import Swal from "sweetalert2";

function ContactSystem() {
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        content: ''
    });
    const handleSubmit = () => {
        Swal.fire(`Cám Ơn ${payload.name}`, 'Phản Hồi Của Bạn Đã Được Gửi ', 'success').then(() => {
            setPayload({
                name: '',
                phone: '',
                content: ''
            })
        })
    }
    return (<div className="w-full">
        <h1 className="text-2xl font-semibold mb-6">Liên Hệ Với Chúng Tôi</h1>
        <div className="flex gap-4">
            <div className="flex-1 h-fit flex flex-col gap-4  bg-red-400 rounded-3xl text-white bg-gradient-to-br from-blue-700 to-cyan-400">
                <div className="flex flex-col gap-4 p-4 text-xl">
                    <h4 className="font-semibold text-2xl">Thông tin liên hệ</h4>
                    <span>Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro123.Com</span>
                    <span>Điện thoại: 0917 686 101</span>
                    <span>Email: cskh.phongtro123@gmail.com</span>
                    <span>Zalo: 0917 686 101</span>
                    <span>Viber: 0917 686 101</span>
                    <span>Địa chỉ: LD - 02.06, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ, Phường An Phú, Quận 2, Tp. Hồ Chí Minh.</span>
                </div>
            </div>
            <div className="flex-1 bg-white shadow-md rounded-md">
                <div className="flex flex-col gap-4 p-4 text-xl">
                    <h4 className="font-semibold text-2xl">
                        Liên Hệ Trực Tuyến
                    </h4>
                    <div className="flex flex-col gap-6">
                        <InputFormPost isSemiBold label="Họ Tên Của Bạn" value={payload.name} name='name' setValue={setPayload}></InputFormPost>
                        <InputFormPost isSemiBold label="Số Điện Thoại" value={payload.phone} name='phone' setValue={setPayload}></InputFormPost>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="desc">Nội Dung Mô Tả</label>
                        <textarea value={payload.content} onChange={e => setPayload(prev => ({ ...prev, content: e.target.value }))} name='content' className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full" id="desc" col="30" rows='3'></textarea>
                    </div>
                    <div>
                        <Button text="Gửi Liên Hệ" bgColor='bg-blue-500' textColor='text-white' fullWidth onClick={handleSubmit}></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default ContactSystem;