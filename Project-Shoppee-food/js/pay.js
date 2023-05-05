//hàm render thông tin khách hàng khi thanh toán

let currentUser = JSON.parse(localStorage.getItem("currentUser"))
let listUser = JSON.parse(localStorage.getItem("listUser"))
let form = document.querySelector(".form-information")

function renderInformation() {
  form.innerHTML = "";
  let foundUser = false;
  for (let i = 0; i < listUser.length; i++) {
    if (listUser[i].id === currentUser.id) {
      form.innerHTML += `
        <label for="name">Họ và tên</label>
        <input type="text" id="name" name="name" value="${listUser[i].fullName}" required>

        <label for="email">Email</label>
        <input type="email" id="email" name="email" value="${currentUser.email}" required>

        <label for="phone">Số điện thoại</label>
        <input type="tel" id="phone" name="phone" value="${listUser[i].phoneNumber}" required>

        <label for="address">Địa chỉ</label>
        <input type="text" id="address" name="address" value="${listUser[i].address}" required>

        <label for="payment">Phương thức thanh toán</label>
        <select id="payment" name="payment">
          <option value="creditcard">Thẻ tín dụng</option>
          <option value="paypal">PayPal</option>
          <option value="cod">Thanh toán khi nhận hàng</option>
        </select>

        <button class="pay-btn" onclick="handlePayment()">Thanh Toán</button>
      `;
      foundUser = true;
      break;
    }
  }
  if (!foundUser) {
    form.innerHTML += `
      <label for="name">Họ và tên</label>
      <input type="text" id="name" name="name" value="" required>

      <label for="email">Email</label>
      <input type="email" id="email" name="email" value="" required>

      <label for="phone">Số điện thoại</label>
      <input type="tel" id="phone" name="phone" value="" required>

      <label for="address">Địa chỉ</label>
      <input type="text" id="address" name="address" value="" required>

      <label for="payment">Phương thức thanh toán</label>
      <select id="payment" name="payment">
        <option value="creditcard">Thẻ tín dụng</option>
        <option value="paypal">PayPal</option>
        <option value="cod">Thanh toán khi nhận hàng</option>
      </select>

      <button class="pay-btn" onclick="handlePayment()">Thanh Toán</button>
    `;
  }
}


renderInformation()

//hàm xóa các sản phẩm trong giỏ hàng và lưu vào thông tin sản phẩm đã mua

function handlePayment(){
    // Lấy giá trị phương thức thanh toán được chọn
    let payment = document.getElementById("payment").value;

    // Lưu thông tin sản phẩm vào local storage
    let currentDate = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại
    let purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];
    let cartItem = JSON.parse(localStorage.getItem("cartItem"));
  
    for (let i = 0; i < cartItem.length; i++) {
      let purchasedItem = {
        username:currentUser.username,
        image: cartItem[i].image,
        name: cartItem[i].name,
        price: cartItem[i].price,
        quantity: cartItem[i].quantity,
        date: currentDate,
        payment:payment,
      };
      purchasedItems.push(purchasedItem);
    }

  
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  
    // Hiển thị thông báo thanh toán thành công
    alert("Thanh toán thành công");
    localStorage.setItem("cartItem", JSON.stringify([]))
    // Chuyển về trang chủ
    window.location.href = "home.html";
  }
  


