function Validation(){
    this.kiemTraRong = function(value, id, mess){
        if(value === ""){
            getEle(id).innerHTML = mess;
            getEle(id).style.display = "block"
            return false;
        }
         getEle(id).innerHTML = ""
         getEle(id).style.display = "none"
         return true;
        }
    this.kiemTraChucVu = function (idSelect, id, mess){
        var slcChucVu = document.getElementById(idSelect)
        if(slcChucVu.selectedIndex !== 0){
            //true
            getEle(id).innerHTML = ""
            getEle(id).style.display = "none"
            return true;
        }
        // false
        getEle(id).innerHTML = mess;
            getEle(id).style.display = "block"
            return false;
    }    
    this.kiemTraDoDaiKiTu = function (value, id, mess, min, max){
        if(min <= value.trim().length && value.trim().length <= max){
            //true
            getEle(id).innerHTML = ""
            getEle(id).style.display = "none"
            return true;
        }
        //false
        getEle(id).innerHTML = mess;
        getEle(id).style.display = "block"
        return false;
    }
    this.kiemTraChuoiKiTu = function(value, id, mess){
        var letter = 	"^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        if(value.match(letter)){
            //true
            getEle(id).innerHTML = ""
            getEle(id).style.display = "none"
            return true;
        }
        //false
        getEle(id).innerHTML = mess;
        getEle(id).style.display = "block"
        return false;
    }
    this.checkPattern = function (value, id, mess, letter){
        if(value.match(letter)){
            //true
            getEle(id).innerHTML = ""
            getEle(id).style.display = "none"
            return true;
        }
        //false
        getEle(id).innerHTML = mess;
        getEle(id).style.display = "block"
        return false;
    };
    this.kiemTraTaiKhoanTonTai= function( value, id, mess, listNV){
        var isExist = false;
        for(var i = 0; i < listNV.length; i++){
            var nv = listNV[i];
            if(nv.taiKhoan === value){
                isExist = true;
                break;
            }
        }
        if(isExist){
            
            getEle(id).innerHTML = mess;
            getEle(id).style.display = "block"
            return false;
        }
        getEle(id).innerHTML = ""
        getEle(id).style.display = "none"
        return true;
    }
    this.kiemTraLuongCB = function (value, id, mess, min, max){
        if( value <= max  && value >= min){
            //true
            getEle(id).innerHTML = ""
            getEle(id).style.display = "none"
            return true;
        }
        //false
        getEle(id).innerHTML = mess;
        getEle(id).style.display = "block"
        return false;
    }
}