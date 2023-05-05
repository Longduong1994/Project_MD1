

// Hàm render thông tin user

let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
let tbody = document.querySelector(".tbody-user");
let currentId = JSON.parse(localStorage.getItem("currentUser")).id;


function renderListUser() {
  let listUser = JSON.parse(localStorage.getItem("listUser")) || [];

  tbody.innerHTML = "";

  for (let i = 0; i < listUser.length; i++) {
    console.log(listUser[i].img)
    if (currentId == listUser[i].id) {
      tbody.innerHTML +=
        `
        <tr>
          <td><img src=${listUser[i].img} alt=""></td>
          <td>${listUser[i].fullName}</td>
          <td>${listUser[i].dateOfBirth}</td>
          <td>${listUser[i].gender}</td>
          <td>${listUser[i].phoneNumber}</td>
          <td>${listUser[i].address}</td>
          <td>${listUser[i].feedBack}</td>
        </tr> 
      `;
    }
  }
}

// Lắng nghe sự kiện thay đổi của localStorage
window.addEventListener("storage", function(event) {
  if (event.key === "currentUser") {
    currentId = JSON.parse(localStorage.getItem("currentUser")).id;
    renderListUser();
  } else if (event.key === "listUser") {
    renderListUser();
  }
});

renderListUser();


//Hàm cập nhật thông tin addDescription

let addBtn = document.querySelector(".edit-btn");
let action = document.querySelector(".update");

addBtn.onclick = function () {
  tbody.innerHTML =
    tbody.innerHTML +
    `
  <tr>
            <td>
            <label for="user-avatar">Ảnh đại diện:</label>
            <input type="text" id="user-avatar" name="user-avatar" >
            </td>
            <td>
            <label for="user-name">Họ và tên:</label>
            <input type="text" id="user-name" name="user-name" required>
            </td>
            <td>
            <label for="user-dateOfBirth">Ngày sinh:</label>
            <input type="date" id="user-dateOfBirth" name="user-dateOfBirth" required>
            </td>
            <td>
            <label for="user-gender">Giới tính:</label>
            <select id="user-gender" name="user-gender" required>
                <option value="">--Chọn giới tính--</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
            </select>
            </td>
            <td>
            <label for="user-phoneNumber">Số Điện Thoại:</label>
            <input type="number" id="user-phoneNumber" name="user-phoneNumber" required>
            </td>
            <td>
            <label for="user-address">Địa chỉ:</label>
            <input type="text" id="user-address" name="user-address" required>
            </td>
            <td>
            <label for="user-feedback">Phản hồi:</label>
            <input type="text" id="user-feedback" name="user-feedback" rows="5" required></input>
            </td>
          </tr>
  `;
  addBtn.style.display = "none";
  action.innerHTML =
    action.innerHTML +
    `
<span><button class="confirm-btn">Hoàn Thành</button></span>
<span><button class="cancel-btn">Hủy Bỏ</button></span>
`;
let confirm = document.querySelector(".confirm-btn");
confirm.addEventListener("click", function () {
 
  let image = document.querySelector("#user-avatar").value;
  let fullName = document.querySelector("#user-name").value;
  let dateOfBirth = document.querySelector("#user-dateOfBirth").value;
  let gender = document.querySelector("#user-gender").value;
  let phoneNumber = document.querySelector("#user-phoneNumber").value;
  let address = document.querySelector("#user-address").value;
  let feedBack = document.querySelector("#user-feedback").value;

  let newUser = {
    id: currentId,
    img: image,
    fullName: fullName,
    dateOfBirth: dateOfBirth,
    gender: gender,
    phoneNumber: phoneNumber,
    address: address,
    feedBack: feedBack,
    status:true
  };

  // Kiểm tra xem user có tồn tại trong danh sách hay không
  let existingUserIndex = listUser.findIndex(user => user.id === currentId);
  if (existingUserIndex !== -1) { // Nếu user đã tồn tại thì cập nhật thông tin của nó
    listUser[existingUserIndex] = newUser;
  } else { // Nếu user chưa tồn tại thì thêm mới
    listUser.push(newUser);
  }

  // lưu thông tin người dùng vào local
  localStorage.setItem("listUser", JSON.stringify(listUser));
});


};

//Hàm render lịch sử giao dịch

function renderHistory() {
  let history = document.querySelector("#tbody-history");
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let purchasedItems =
    JSON.parse(localStorage.getItem("purchasedItems")) || [];

  history.innerHTML = "";

  for (let i = 0; i < purchasedItems.length; i++) {
    if (purchasedItems[i].username === currentUser.username) {
      history.innerHTML += `
        <tr>
          <td class="td-img"><img src="${purchasedItems[i].image}" alt=""></td>
          <td>${purchasedItems[i].name}</td>
          <td>${purchasedItems[i].price}</td>
          <td>${purchasedItems[i].date}</td>
          <td>${purchasedItems[i].quantity}</td>
          <td>${purchasedItems[i].payment}</td>
        </tr> 
      `;
    }
  }
}

renderHistory();
