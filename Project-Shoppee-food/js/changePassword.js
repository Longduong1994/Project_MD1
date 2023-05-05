function changePassword() {
    // Lấy thông tin người dùng nhập vào
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let newPassword = document.getElementById("password").value;
    let confirmPassword = document.getElementById("Confirm-password").value;
  
    // Lấy thông tin người dùng từ localStorage
    let storedUser = JSON.parse(localStorage.getItem("user")) || {};
  
    // Kiểm tra tính hợp lệ của người dùng
    if (storedUser.username === username && storedUser.email === email) {
      if (newPassword !== confirmPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu không giống nhau");
        return false;
      }
  
      // Cập nhật mật khẩu mới cho người dùng
      storedUser.password = newPassword;
      localStorage.setItem("user", JSON.stringify(storedUser));
  
      alert("Thay đổi mật khẩu thành công");
      window.location.href = "login.html";
      return true;
    }
  
    alert("Tài khoản hoặc email không đúng");
    return false;
  }
  
  let changePasswordButton = document.querySelector(".btn-submit");

changePasswordButton.addEventListener("click", function(event) {
  event.preventDefault();
  changePassword();
});
