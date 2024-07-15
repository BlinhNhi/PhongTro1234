import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { getCodesArea, getCodesPrice } from "../../ultils/Common/getCodes";
import { Address, Overview, Loading, Button } from "../../components";
import { apiUploadImages, apiCreatePost, apiUpdatePost } from "../../services";
import validate from "../../ultils/validate/validateFields";
import { resetEditData } from "../../stores/actions";

function CreatePost({ isEdit }) {
    const { dataEdit } = useSelector(state => state.post)
    const [payload, setPayload] = useState(() => {
        const initData = {
            categoryCode: dataEdit?.categoryCode || '',
            title: dataEdit?.title || '',
            priceNumber: dataEdit?.priceNumber * 1000000 || 0,
            areaNumber: dataEdit?.areaNumber || 0,
            // image
            images: dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : '',
            address: dataEdit?.address || '',
            priceCode: dataEdit?.priceCode || '',
            areaCode: dataEdit?.areaCode || '',
            description: dataEdit?.description ? JSON.parse(dataEdit?.description) : '',
            // ?? 10:12/74
            target: dataEdit?.overviews?.target || '',
            province: dataEdit?.province || '',
        }
        return initData
    });
    // console.log(payload);
    // console.log(dataEdit);
    const [imagePreview, setImagePreview] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const { prices, areas, categories } = useSelector((state) => state.app);
    const { currentUserData } = useSelector((state) => state.user);
    const [invalidFields, setInvalidFields] = useState([]);
    const dispatch = useDispatch();

    // hàm dùng lấy image khi trước update
    useEffect(() => {
        if (dataEdit) {
            const images = JSON.parse(dataEdit?.images?.image)
            images && setImagePreview(images);
        }
    }, [dataEdit])

    const handleDeleteImage = (image) => {
        // 20:14/64
        setImagePreview((pre) => pre?.filter((item) => item !== image));
        setPayload((pre) => ({
            ...pre,
            images: pre.images?.filter((item) => item !== image),
        }));
    };

    const handleSubmit = async () => {
        let priceCodeArr = getCodesPrice(
            +payload.priceNumber / Math.pow(10, 6),
            prices,
            1,
            15
        );
        let priceCode = priceCodeArr[0]?.code;

        let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 0, 90);
        let areaCode = areaCodeArr[0]?.code;
        let finalPayload = {
            ...payload,
            priceCode,
            areaCode,
            userId: currentUserData.id,
            priceNumber: +payload.priceNumber / Math.pow(10, 6),
            target: payload.target || "Tất Cả",
            label: `${categories?.find((item) => item.code === payload?.categoryCode)?.value
                } ${payload?.address?.split(",")[0]}`,
        };
        const result = validate(finalPayload, setInvalidFields);
        // console.log(result);
        // console.log(invalidFields);
        console.log(finalPayload);
        if (result === 0) {
            // chuyển form create thành update
            if (dataEdit && isEdit) {
                finalPayload.postId = dataEdit?.id
                finalPayload.attributesId = dataEdit?.attributesId
                finalPayload.imagesId = dataEdit?.imagesId
                finalPayload.overviewId = dataEdit?.overviewId

                const response = await apiUpdatePost(finalPayload)
                if (response?.data.err === 0) {
                    Swal.fire(
                        "Cập Nhật Tin Thành Công",
                        "Tin Đã Được Cập Nhật",
                        "success"
                    ).then(() => {
                        resetPayload();
                        dispatch(resetEditData());
                    });
                } else {
                    Swal.fire("Oops !!!", "Đã Xãy Ra Lỗi", "error");
                }
                console.log(response);
                console.log(response);
            } else {
                console.log(finalPayload);
                const response = await apiCreatePost(finalPayload);
                if (response?.data.error === 0) {
                    Swal.fire(
                        "Thêm Tin Thành Công",
                        "Tin Đã Được Đăng",
                        "success"
                    ).then(() => {
                        resetPayload();
                    });
                } else {
                    Swal.fire("Oops !!!", "Đã Xãy Ra Lỗi", "error");
                }
                console.log(response);
            }

        }
    };

    const resetPayload = () => {
        setPayload({
            categoryCode: "",
            title: "",
            priceNumber: 0,
            areaNumber: 0,
            images: "",
            address: "",
            priceCode: "",
            areaCode: "",
            description: "",
            target: "",
            province: "",
        });
    }

    const handleFiles = async (e) => {
        e.stopPropagation();
        setIsLoading(true);
        let images = [];
        const files = e.target.files;
        const formData = new FormData();
        for (let i of files) {
            formData.append("file", i);
            formData.append(
                "upload_preset",
                process.env.REACT_APP_UPLOAD_ASSETS_NAME
            );
            const response = await apiUploadImages(formData);
            console.log(response);
            if (response.status === 200)
                images = [...images, response.data?.secure_url];
        }
        setIsLoading(false);
        setImagePreview((pre) => [...pre, ...images]);
        setPayload((pre) => ({ ...pre, images: [...pre.images, ...images] }));
        console.log(typeof (images));
    };



    return (
        <div className="px-6">
            <h1 className="font-medium border-b border-gray-200 py-4 text-3xl">
                {isEdit ? 'Chỉnh Sửa Tin Đăng' : 'Đăng Tin Mới'}
            </h1>
            <div className="flex gap-4">
                <div className="py-4  flex flex-col gap-8 flex-auto">
                    <Address
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        payload={payload}
                        setPayload={setPayload}
                    ></Address>

                    <Overview
                        payload={payload}
                        setPayload={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    ></Overview>
                    {/* Hình Ảnh */}
                    <div className="w-full mb-6">
                        <h2 className="font-semibold text-xl py-2">Hình Ảnh</h2>
                        <span className="italic">
                            Cập Nhật Hình Ảnh Rõ Ràng Sẽ Cho Thuê Nhanh Hơn
                        </span>
                        <div className="w-full">
                            <label
                                className="w-full border-4 border-blue-200 text-5xl text-gray-300 flex-col gap-6  my-4 items-center justify-center h-[300px] flex border-dashed rounded-md"
                                htmlFor="file"
                            >
                                {loading ? (
                                    <Loading></Loading>
                                ) : (
                                    <span className="flex flex-col items-center justify-center gap-6">
                                        <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                                        <div className="text-black text-3xl">Thêm Ảnh</div>
                                    </span>
                                )}
                            </label>
                            <input
                                onChange={handleFiles}
                                type="file"
                                id="file"
                                hidden
                                multiple
                            ></input>
                            <small className="text-red-500 block w-full">
                                {invalidFields?.some((item) => item.name === "images") &&
                                    invalidFields?.find((item) => item.name === "images")
                                        ?.message}
                            </small>
                            <h3 className="font-medium py-2 text-xl">Ảnh Đã Chọn</h3>
                            <div className="flex gap-4 items-center">
                                {imagePreview?.map((item) => {
                                    return (
                                        <div className="relative " key={item}>
                                            <img
                                                key={item}
                                                alt="img-preview"
                                                src={item}
                                                className="w-60 h-60 object-cover rounded-md"
                                            ></img>
                                            <span
                                                title="Xoá"
                                                className="top-0 text-2xl bg-gray-700 hover:bg-slate-900 text-white rounded-[60%] cursor-pointer right-0 p-2 absolute "
                                                onClick={() => handleDeleteImage(item)}
                                            >
                                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>




                    <Button
                        onClick={handleSubmit}
                        text={isEdit ? 'Cập Nhật' : "Tạo Mới"}
                        bgColor="bg-green-500"
                        textColor="text-white"
                    ></Button>
                </div>
                <div className="w-[30%] flex-none">
                    <Loading></Loading>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
