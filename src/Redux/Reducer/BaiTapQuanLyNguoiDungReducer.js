import { CAP_NHAT_NGUOI_DUNG, SUA_NGUOI_DUNG, THEM_NGUOI_DUNG, XOA_NGUOI_DUNG } from "../Type/BaiTapQuanLyNguoiDungType"

const stateDefault = {
    mangNguoiDung: [
        // { taiKhoan: "a", hoTen: "Nguyễn Văn A", matKhau: "abc", email: "nguyenvana@gmail.com", soDienThoai: "0999999999", kindNguoiDung: "Khách hàng", valueNguoiDung: "1" },
        // { taiKhoan: "b", hoTen: "Nguyễn Văn B", matKhau: "BBB", email: "nguyenvanB@gmail.com", soDienThoai: "0555555555", kindNguoiDung: "Học Sinh", valueNguoiDung: "2" },
        // { taiKhoan: "c", hoTen: "Nguyễn Văn c", matKhau: "CCC", email: "nguyenvanC@gmail.com", soDienThoai: "0666666666", kindNguoiDung: "Khách hàng", valueNguoiDung: "1" },
        // { taiKhoan: "d", hoTen: "Nguyễn Văn D", matKhau: "aDDDbc", email: "nguyenvanD@gmail.com", soDienThoai: "0332121212", kindNguoiDung: "Cán bộ", valueNguoiDung: "3" }
    ],

    userSua: {
        taiKhoan: "",
        hoTen: "",
        matKhau: "",
        soDienThoai: "",
        email: "",
        valueNguoiDung: "",
        kindNguoiDung: ""
    }
}



export const BaiTapQuanLyNguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case THEM_NGUOI_DUNG: {
            let mangNguoiDungUpdate = [...state.mangNguoiDung, action.user]

            return { ...state, mangNguoiDung: mangNguoiDungUpdate }
        }

        case XOA_NGUOI_DUNG: {
            // let mangNguoiDungUpdate = [...state.mangNguoiDung]

            // let index = mangNguoiDungUpdate.findIndex(user => user.taiKhoan === action.taiKhoanUser)

            // console.log(index)

            // if (index) {
            //     mangNguoiDungUpdate.splice(index, 1)

            // }

            let mangNguoiDungUpdate = state.mangNguoiDung.filter(user => user.taiKhoan !== action.taiKhoanUser)


            state.mangNguoiDung = mangNguoiDungUpdate;

            console.log('mangKetQua', mangNguoiDungUpdate) 

            return { ...state }
        }

        case SUA_NGUOI_DUNG: {
            state.userSua = {...action.user}
            return {...state}

        }

        case CAP_NHAT_NGUOI_DUNG : {
            const mangNguoiDungUpdate = [...state.mangNguoiDung]

            let userUpdate = mangNguoiDungUpdate.find(user => user.taiKhoan === action.user.taiKhoan)

            if(userUpdate){
                userUpdate.taiKhoan = action.user.taiKhoan
                userUpdate.hoTen = action.user.hoTen
                userUpdate.matKhau = action.user.matKhau
                userUpdate.soDienThoai = action.user.soDienThoai
                userUpdate.email = action.user.email
                userUpdate.valueNguoiDung = action.user.valueNguoiDung
                userUpdate.kindNguoiDung = action.user.kindNguoiDung
            }

            state.mangNguoiDung = mangNguoiDungUpdate

            return {...state}
        }
    }

    return { ...state }
}