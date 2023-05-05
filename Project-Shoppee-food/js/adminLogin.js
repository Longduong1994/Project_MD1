const admin = {
  userName: "admin",
  email: "admin@gmail.com",
  password: "admin123",
};

let loginButton = document.getElementById("btn-login");

loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  let adminUserName = document.getElementById("userName").value;
  let adminEmail = document.getElementById("email").value;
  let adminPassword = document.getElementById("password").value;

  if (adminUserName.trim() === "" || adminEmail.trim() === "" || adminPassword.trim() === "") {
    alert("Vui lòng nhập đầy đủ thông tin đăng nhập");
    return;
  }

  if (
    adminUserName === admin.userName &&
    adminEmail === admin.email &&
    adminPassword === admin.password
  ) {
    alert("Xin chào admin");
    window.location.href = "admin.html";
  } else {
    alert("Tên đăng nhập hoặc mật khẩu không đúng.");
  }
});

