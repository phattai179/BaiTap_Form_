import React, { Component } from 'react'
import Swal from 'sweetalert2'
import {connect} from 'react-redux'
import { capNhatNguoiDungAction, themNguoiDungAction } from '../Redux/Action/BaiTapQuanLyNguoiDungAction'


class FormDangKy extends Component {

    state = {
        values: {
            taiKhoan: "",
            hoTen: "",
            matKhau: "",
            soDienThoai: "",
            email: "",
            valueNguoiDung: "",
            kindNguoiDung: ""
        },

        errors: {
            taiKhoan: "",
            hoTen: "",
            matKhau: "",
            soDienThoai: "",
            email: "",
            valueNguoiDung: "",
            kindNguoiDung: "",
        }
    }

    handleChangeInput = (event) => {
        let { name, value, id, } = event.target
        let typeInput = event.target.getAttribute('typeInput')


        //let tagChucVu = event.target


        // Xét giá trị newValues

        let newValues = { ...this.state.values }
        newValues[name] = value

        if (id === "kindNguoiDung") {
            let { options, selectedIndex } = event.target
            let { innerHTML } = options[selectedIndex]
            // newValues[id] = options[selectIndex]
            newValues[id] = innerHTML
        }


        // Xét giá trị newErrors

        let newErrors = { ...this.state.errors }

        newErrors[name] = newValues[name] === "" ? [name] + ' không được bỏ trống' : ""
        newErrors[id] = newValues[name] === "0" ? "Vui lòng chọn loại người dùng" : ""

        // Xét định dạng email 
        if (typeInput === "email") {
            const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

            if (!regexEmail.test(value)) {
                newErrors[name] = name + " không đúng định dạng"
            }
        }

        if (typeInput === "phone") {
            const regexNumber = /^[0-9]+$/;

            if (!regexNumber.test(value)) {
                newErrors[name] = name + " không đúng định dạng"
            }
        }


        this.setState({
            values: newValues,
            errors: newErrors
        }, () => {
            console.log('valueMoi', this.state)
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let { id } = event.target
        let valid = true;
        let successProfile = "";
        let errorsProfile = "";

        for (let key in this.state.values) {
            if (this.state.values[key].trim() === "") {
                valid = false;
            }

            if (key === 'valueNguoiDung') {
                if (this.state.values[key] === "0") {
                    valid = false
                }
            }

            if (id === 'kindNguoiDung') {
                let { options, selectedIndex } = event.target;
                let { innerHTML } = options[selectedIndex]

                successProfile += `
                <p class = "text-start text-success"><b>Loại người dùng</b>: ${innerHTML}</p>
            `
            } else {
                successProfile += `
                <p class = "text-start text-success"><b>${key}</b>: ${this.state.values[key]}</p>
            `
            }


        }

        for (let key in this.state.errors) {
            if (this.state.errors[key] !== "") {
                valid = false;
                
            }
            errorsProfile += `
            <p class = "text-start text-danger">${this.state.errors[key]}</p>
            `


        }

        if (!valid) {
            Swal.fire({
                title: 'Đăng ký thất bại!',
                html: errorsProfile,
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return

        } else {
            Swal.fire({
                title: 'Đăng ký thành công!',
                html: successProfile,
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }

        this.props.dispatch(themNguoiDungAction(this.state.values))
    }


    componentWillReceiveProps = (newProps) => {
        this.setState({
            values: newProps.userSua
        })
    }

    render() {

        let {taiKhoan, hoTen, matKhau, soDienThoai, email, kindNguoiDung, valueNguoiDung} = this.state.values

        return (
            <form className="card mt-4" onSubmit={this.handleSubmit}>
                <div className="card-header bg-dark text-white">
                    <h3>Form đăng ký</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <h5>Tài khoản</h5>
                                <input value = {taiKhoan} className="form-control" name="taiKhoan" onChange={this.handleChangeInput}></input>
                                <p className="text-danger" >{this.state.errors.taiKhoan}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <h5>Họ tên</h5>
                                <input value = {hoTen} className="form-control" name="hoTen" onChange={this.handleChangeInput}></input>
                                <p className="text-danger" >{this.state.errors.hoTen}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-6">
                            <div className="form-group">
                                <h5>Mật khẩu</h5>
                                <input value = {matKhau} className="form-control" name="matKhau" onChange={this.handleChangeInput}></input>
                                <p className="text-danger" >{this.state.errors.matKhau}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group" >
                                <h5>Số điện thoại</h5>
                                <input value = {soDienThoai} typeInput="phone" className="form-control" name="soDienThoai" onChange={this.handleChangeInput}></input>
                                <p className="text-danger" >{this.state.errors.soDienThoai}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-6">
                            <div className="form-group">
                                <h5>Email</h5>
                                <input value = {email} typeInput="email" className="form-control" name="email" onChange={this.handleChangeInput} ></input>
                                <p className="text-danger" >{this.state.errors.email}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <h5>Mã loại người dùng</h5>
                                <select value = {valueNguoiDung} id="kindNguoiDung" className="form-select" name="valueNguoiDung" onChange={this.handleChangeInput}>
                                    <option value="0">Chọn loại khách hàng</option>
                                    <option value="1">Khách hàng</option>
                                    <option value="2" >Học sinh</option>
                                    <option value="3">Cán bộ</option>
                                </select>
                                <p className="text-danger" >{this.state.errors.kindNguoiDung}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-header">
                    <button type="submit" className="btn btn-success" >Đăng ký</button>
                    <button type = "button" className = "btn btn-primary ms-2" onClick = {() => {
                        this.props.dispatch(capNhatNguoiDungAction(this.state.values))
                    }}>Cập Nhật Người Dùng</button>
                </div>
            </form>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        userSua: state.BaiTapQuanLyNguoiDungReducer.userSua
    }
}


export default connect(mapStateToProps)(FormDangKy)