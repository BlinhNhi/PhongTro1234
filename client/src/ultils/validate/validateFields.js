
const validate = (payload, setInvalidFields) => {
    console.log(payload);
    let invalids = 0
    // Object.entries chuyển Object thành mảng 
    let fields = Object.entries(payload)
    console.log(fields);
    fields.forEach(item => {
        if (item[1] === '') {
            setInvalidFields(prev => [...prev, {
                name: item[0],
                message: 'Bạn không được bỏ trống trường này'
            }]);
            invalids++
        };
    });

    fields.forEach(item => {
        switch (item[0]) {
            case 'password':
                if (item[1].length < 6) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Mật Khẩu Phải Có Tối Thiểu 6 Ký Tự'
                    }]);
                    invalids++
                };
                break;

            case 'phone':
                if (!+item[1]) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Số Điện Thoại Không Hợp Lệ'
                    }]);
                    invalids++
                }
                break;
            case 'priceNumber':
            case 'areaNumber':
                if (+item[1] === 0) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Vui Lòng Nhập Trường Này'
                    }]);
                    invalids++
                }
                if (!+item[1]) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Trường này phải là số'
                    }]);
                    invalids++
                }
                break;
            default:
                break;
        }
    });
    console.log(invalids);
    return invalids
}

export default validate
