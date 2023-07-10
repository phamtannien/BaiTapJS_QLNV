var dsnv = new DSNV();
var validation = new Validation();
getLocalStorage();

function getEle(id){
    return document.getElementById(id);
}
/**
 * lấy thông tin nhân viên
 */
function layThongTinNV (){
    var taiKhoan = getEle("tknv").value;
   // var taiKhoan = getEle("tknv").disabled;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCB = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;
    /**
     * flag
     */
    var flag = true;

    /**
     * validation
     */
    //tài khoản
   flag &= validation.kiemTraRong(taiKhoan, "tbTKNV", "(*)vui lòng nhập tài khoản")
   && validation.kiemTraDoDaiKiTu(taiKhoan, "tbTKNV", "(*)vui lòng nhập 4 đến 6 kí tự", 4 , 6)
   && validation.kiemTraTaiKhoanTonTai(taiKhoan,"tbTKNV", "(*)tài khoản đã tồn tại", dsnv.arr )

    //họ tên
   flag &= validation.kiemTraRong(hoTen, "tbTen", "(*)vui lòng nhập tên")
   && validation.kiemTraChuoiKiTu(hoTen,"tbTen",  "(*)vui lòng nhập tên là chữ" )
   //email
   flag &= validation.kiemTraRong(email, "tbEmail", "(*)vui lòng nhập email")
   && validation.checkPattern(email, "tbEmail", "(*)vui lòng nhập email đúng định dạng",	/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   )
   //mật khẩu
   flag &= validation.kiemTraRong(matKhau, "tbMatKhau", "(*)vui lòng nhập mật khẩu")
   && validation.checkPattern(matKhau, "tbMatKhau", "(*)vui lòng nhập mật khẩu có số, chữ in hoa và kí tự đặc biệt",  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/ )
   && validation.kiemTraDoDaiKiTu(matKhau, "tbMatKhau", "(*)vui lòng nhập mật khẩu từ 6 - 10 kí tự", 6, 10 )
   
  //ngày làm
   flag &= validation.kiemTraRong(ngayLam, "tbNgay", "(*)vui lòng nhập ngày làm")

   //lương
   flag &= validation.kiemTraRong(luongCB, "tbLuongCB", "(*)vui lòng nhập lương")
   && validation.kiemTraLuongCB(luongCB, "tbLuongCB", "(*)vui lòng nhập lương từ 1000000 - 20000000", 1000000, 20000000)
  //chức vụ
  flag &= validation.kiemTraChucVu("chucvu", "tbChucVu", "(*)chọn chức vụ phù hợp") 
   //giờ làm
   flag &= validation.kiemTraRong(gioLam, "tbGiolam", "(*)vui lòng nhập số giờ làm")
   && validation.kiemTraLuongCB(gioLam, "tbGiolam", "(*)vui lòng nhập giờ từ 80-200", 80, 200)

    if(flag){
            //tạo đối tượng nhân viên tường lớp đối tượng NhanVien
    var nv = new NhanVien(taiKhoan,hoTen, email, matKhau, ngayLam, luongCB, chucVu, gioLam )

    // tính tổng lương, xếp loại
    nv.tinhTongLuong();
    nv.xepLoaiNV();
    return nv;
    }
    return null;

}
function renderTable (data){
    var content = "";
    for (var i = 0; i < data.length; i++){
        var nv = data[i];

        content += `
           <tr>
               <td>${nv.taiKhoan}</td>
               <td>${nv.hoTen}</td>
               <td>${nv.email}</td>
               <td>${nv.ngayLam}</td>
               <td>${nv.chucVu}</td>
               <td>${nv.tongLuong}</td>
               <td>${nv.xepLoai}</td>
               <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNV('${nv.taiKhoan}')" >Sửa</button>
               </td>
               <td>
                <button class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')" >Xóa</button>
               </td>
               
           </tr>
        ` ;
    }
    getEle("tableDanhSach").innerHTML = content;
}
/**
 * tìm kiếm
 */
function searchNV (){
var searchName = getEle("searchName").value;
var mangTimKiem = dsnv.timKiemNV(searchName)
renderTable(mangTimKiem);
}
getEle("searchName").addEventListener("keyup", searchNV)
/**
 * sửa nhân viên
 */
function suaNV(taiKhoan) {
  var nv = dsnv.layThongTinChiTietNV(taiKhoan)
if(nv){
    getEle("tknv").value = nv.taiKhoan;
   // getEle("tknv").disabled = true;
    getEle("name").value = nv.hoTen;
    getEle("email").value = nv.email;
    getEle("password").value = nv.matKhau;
    getEle("datepicker").value = nv.ngayLam;
    getEle("luongCB").value = nv.luongCB;
    getEle("chucvu").value = nv.chucVu;
    getEle("gioLam").value = nv.gioLam;

    //getEle("btnCapNhat").style.display = "block";
    // getEle("btnThemNV").style.display = "none"
}
};
/**
 * cập nhật
 */
getEle("btnCapNhat").onclick = function(){
    var nv = layThongTinNV();
    if(nv){
        dsnv.capNhatNV(nv);
        renderTable(dsnv.arr)
        setLocalStorage();
    }
    
}
/**
  * xóa nhân viên
  */
function xoaNV(taiKhoan){
    dsnv._xoaNV(taiKhoan);
    renderTable(dsnv.arr)
    setLocalStorage();
};
/**
 * thêm nhân viên
 */
getEle("btnThemNV").onclick = function (){
  
    //lấy thông tin
   var nv = layThongTinNV();
   if(nv){
     // đẩy vào DSNV
     dsnv.themNV(nv);
    //in ra ngoài
     renderTable(dsnv.arr)
    //lưu vào local của trình duyệt
setLocalStorage()
   }
   
}
function setLocalStorage (){
    // JSON => string
    var dataString = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV",dataString );
}

function getLocalStorage (){
    if(localStorage.getItem("DSNV")){
        var dataString =  localStorage.getItem("DSNV")
        // string => JSON
        var dataJson = JSON.parse(dataString)
        //nạp dữ liệu lại mãng
        dsnv.arr = dataJson;
        //in ra lại table
        renderTable(dsnv.arr)
    }
 };
 

