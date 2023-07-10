function NhanVien (
     _taiKhoan,
     _hoTen,
     _email,
     _matKhau,
     _ngayLam,
     _luongCB,
     _chucVu,
     _gioLam
     ){
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";
    
    this.tinhTongLuong = function(){
        if(_chucVu === "Sếp"){
            this.tongLuong = parseFloat(this.luongCB) * 3
        } else if(_chucVu === "Trưởng phòng"){
            this.tongLuong = parseFloat(this.luongCB) * 2
        } else if (_chucVu === "Nhân viên"){
            this.tongLuong = parseFloat(this.luongCB)  
        }
    } ;
    this.xepLoaiNV = function (){
        if(_gioLam >= 192){
            this.xepLoai = "xuat sac"
        } else if(_gioLam >= 176 & _gioLam < 192) {
            this.xepLoai = "gioi"
        }else if( _gioLam >= 160 & _gioLam < 176){
            this.xepLoai = "kha"
        } else if(_gioLam < 160) {
            this.xepLoai = "trung binh"
        }
        //return this.xepLoai
    };
}