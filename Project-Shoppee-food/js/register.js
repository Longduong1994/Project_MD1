function validateForm() {
  // Lấy giá trị của các trường nhập liệu từ form
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("Confirm-password").value;

  // Kiểm tra tính hợp lệ của giá trị nhập vào
  if (username === "") {
    showError("username", "Tên tài khoản không được để trống");
    return false;
  }

  if (email === "") {
    showError("email", "Email không được để trống");
    return false;
  } else if (!isValidEmail(email)) {
    showError("email", "Email không hợp lệ");
    return false;
  }

  if (password === "") {
    showError("password", "Mật khẩu không được để trống");
    return false;
  } else if (password.length < 6) {
    showError("password", "Mật khẩu phải có ít nhất 6 ký tự");
    return false;
  }

  if (confirmPassword === "") {
    showError("Confirm-password", "Xác nhận mật khẩu không được để trống");
    return false;
  } else if (confirmPassword !== password) {
    showError("Confirm-password", "Xác nhận mật khẩu không khớp");
    return false;
  }

  // Lấy danh sách tài khoản đã tồn tại từ localStorage
  let existingUsers = JSON.parse(localStorage.getItem("user")) || [];

  // Kiểm tra xem email đã được sử dụng cho tài khoản khác chưa
  let existingAccount = existingUsers.find((user) => user.email === email);
  if (existingAccount) {
    alert("Email đã được sử dụng cho tài khoản khác");
    return false;
  }
  let id = 0;
  if (existingUsers.length == 0) {
    id = 1;
  } else {
    id = existingUsers[existingUsers.length - 1].id + 1;
  }
  // Thêm tài khoản mới vào danh sách và lưu vào localStorage
  let newAccount = {
    id: id,
    username,
    email,
    password,
    status:true
  };
  existingUsers.push(newAccount);
  localStorage.setItem("user", JSON.stringify(existingUsers));

  // Thông báo tạo tài khoản thành công
  alert("Tạo tài khoản thành công!");

  // Chuyển hướng người dùng đến trang chủ hoặc trang đăng nhập
  window.location.href = "login.html";

  // Trả về true để ngăn form được gửi đi khi người dùng nhấn nút Đăng kí
  return true;
}

// Hàm báo lỗi
function showError(inputId, errorMessage) {
  // Hiển thị thông báo lỗi bên dưới trường nhập liệu tương ứng
  let input = document.getElementById(inputId);
  let small = input.nextElementSibling;
  input.className = "form-control error";
  small.innerText = errorMessage;
}
// Hàm check email
function isValidEmail(email) {
  // Kiểm tra tính hợp lệ của địa chỉ email
  let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}
