import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { InputForm, Button } from "../../components";
import * as actions from "../../stores/actions";
import Swal from "sweetalert2";
import validate from "../../ultils/validate/validateFields";

function Login() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //auth trong rootReducer
    const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
    const [register, setRegister] = useState(location.state?.flag);
    const [payload, setPayload] = useState({
        phone: "",
        password: "",
        name: "",
    });
    // validation
    const [invalidFields, setInvalidFields] = useState([]);

    // chuyển trạng thái đăng nhập , đăng ký
    useEffect(() => {
        setRegister(location.state?.flag);
    }, [location.state?.flag]);
    console.log(location.state);

    // check Login chuyển đến trang Home
    useEffect(() => {
        isLoggedIn && navigate("/");
    }, [isLoggedIn]);

    useEffect(() => {
        msg && Swal.fire("Oops !", msg, "error");
    }, [msg, update]);

    const handleSubmit = async () => {
        // nếu là register === pay load , còn ngc lại là login
        let finalPayload = register
            ? payload
            : {
                phone: payload.phone,
                password: payload.password,
            };
        console.log(finalPayload);
        let invalids = validate(finalPayload, setInvalidFields);
        if (invalids === 0)
            register
                ? dispatch(actions.register(payload))
                : dispatch(actions.login(payload));
        console.log(invalids);
        console.log(invalidFields);
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
                <h3 className="font-semibold text-2xl text-center mb-4">
                    {register ? "Đăng Ký Tài Khoản " : "Đăng Nhập"}
                </h3>
                <div className="w-full flex flex-col gap-5">
                    {register && (
                        <InputForm
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            label={"Họ Tên"}
                            value={payload.name}
                            setValue={setPayload}
                            type="name"
                        ></InputForm>
                    )}
                    <InputForm
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        label={"Số Điện Thoại"}
                        value={payload.phone}
                        setValue={setPayload}
                        type="phone"
                    ></InputForm>
                    <InputForm
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        label={"Mật Khẩu"}
                        value={payload.password}
                        setValue={setPayload}
                        type="password"
                    ></InputForm>

                    <Button
                        text={register ? "Đăng Ký" : "Đăng Nhập"}
                        textColor="text-white"
                        bgColor="bg-secondary"
                        onClick={handleSubmit}
                    />
                </div>

                <div className="mt-7 flex items-center justify-between">
                    {register ? (
                        <small>
                            Bạn Đã Có Tài Khoản
                            <span
                                onClick={() => {
                                    setRegister(false);
                                    setPayload({
                                        phone: "",
                                        password: "",
                                        name: "",
                                    });
                                }}
                                className="text-blue-500 hover:underline ml-1 cursor-pointer"
                            >
                                Đăng Nhập Ngay
                            </span>
                        </small>
                    ) : (
                        <>
                            <small className="text-[blue] hover:text-[red] cursor-pointer">
                                Bạn Quên Mật Khẩu
                            </small>
                            <small
                                className="text-[blue] hover:text-[red] cursor-pointer"
                                onClick={() => {
                                    setRegister(true);
                                    setPayload({
                                        phone: "",
                                        password: "",
                                        name: "",
                                    });
                                }}
                            >
                                Tạo Tài Khoản
                            </small>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
