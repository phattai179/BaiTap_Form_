import { CAP_NHAT_NGUOI_DUNG, SUA_NGUOI_DUNG, THEM_NGUOI_DUNG, XOA_NGUOI_DUNG } from "../Type/BaiTapQuanLyNguoiDungType"

export const themNguoiDungAction = (user) => {
    return {
        type: THEM_NGUOI_DUNG,
        user
    }
}

export const xoaNguoiDungAction = (taiKhoanUser, emailUser) => {
    return{ 
        type: XOA_NGUOI_DUNG,
        taiKhoanUser,
        emailUser
    }
}

export const suaNguoiDungAction = (user, event) => {
    return {
        type: SUA_NGUOI_DUNG,
        user,
    }
}

export const capNhatNguoiDungAction = (user) => {
    return {
        type: CAP_NHAT_NGUOI_DUNG,
        user
    }
}