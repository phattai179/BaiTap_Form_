import React, { Component } from 'react'
import {connect} from 'react-redux'
import { suaNguoiDungAction, xoaNguoiDungAction } from '../Redux/Action/BaiTapQuanLyNguoiDungAction'

class TableDanhSachNguoiDung extends Component {

    renderUser = () => {
        return this.props.mangNguoiDung.map((user, index) => {
            return (
                <tr key = {index}>
                    <td>{index + 1}</td>
                    <td>{user.taiKhoan}</td>
                    <td>{user.hoTen}</td>
                    <td>{user.matKhau}</td>
                    <td>{user.email}</td>
                    <td>{user.soDienThoai}</td>
                    <td>{user.kindNguoiDung}</td>
                    <td>
                        <button className = "btn btn-danger" onClick = {() => {
                            this.props.dispatch(xoaNguoiDungAction(user.taiKhoan, user.email))
                            
                        }}>Xóa</button>
                        <button className = "btn btn-primary ms-2" onClick = {() => {
                            this.props.dispatch(suaNguoiDungAction(user))
                        }}>Chỉnh sửa</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className = "mt-3">
                <table className = "table">
                    <thead>
                        <tr className = "bg-dark text-white">
                            <th>STT</th>
                            <th>Tài khoản</th>
                            <th>Họ Tên</th>
                            <th>Mật Khẩu</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Loại Người dùng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUser()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapDispatchToProps = (state) => ({
    mangNguoiDung: state.BaiTapQuanLyNguoiDungReducer.mangNguoiDung
})

export default connect(mapDispatchToProps)(TableDanhSachNguoiDung)