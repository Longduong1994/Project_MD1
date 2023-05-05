// add sự kiện đăng nhập

let loginButton = document.getElementById("btn-login");

loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  checkLogin();
});



// // check login so sánh tài khoản và mật khẩu



function checkLogin() {

  // Lấy thông tin người dùng nhập vào
  let username = document.getElementsByName("user")[0].value;
  let password = document.getElementsByName("password")[0].value;
if(username==""||password==""){
  alert("Nhập thông tin đầy đủ")
}else{
  // Lấy danh sách tài khoản từ localStorage
  let storedUsers = JSON.parse(localStorage.getItem("user")) || [];

  // Tìm kiếm tài khoản phù hợp
  let matchedUser = storedUsers.find(function (user) {
    return user.username === username && user.password === password;
  });

  // Kiểm tra tài khoản có bị khóa không
  let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
  let blockedUser = listUser.find(function (user) {
    return user.id === matchedUser.id && user.status === false;
  });

  if (blockedUser) {
    alert("Tài khoản này đã bị khóa!");
  }else if (matchedUser) {
    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
    alert("Đăng nhập thành công ");
    window.location.href = 'home.html';
  } else {
    alert("Tài khoản hoặc mật khẩu không đúng!");
  }

}
}



