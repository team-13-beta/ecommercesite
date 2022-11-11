
function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
        // 공백을 제거
        item = item.replace(' ', '');
  
        var dic = item.split('=');
  
        if (key === dic[0]) {
            result = dic[1];
            return true;    // break;
        }
    });
    return result;
  }
  
  
  //쿠키값 조회
  
  function deleteCookie(key) {
      document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  
  export {getCookie,deleteCookie}