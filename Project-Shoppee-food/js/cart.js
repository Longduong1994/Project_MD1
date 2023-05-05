let btnSearch = document.querySelector(".search-box-btn");

btnSearch.addEventListener("click", function () {
  let input = this.previousElementSibling;
  this.parentElement.classList.toggle("open");
  input.focus();
  searchProduct()
});



// Render sản phẩm đã được thêm và giỏ hàng

function renderCart() {
  let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
  let tbody = document.querySelector(".tbody");
  tbody.innerHTML = "";

  cartItem.forEach((item) => {
    let index = cartItem.findIndex((x) => x.name === item.name);
    let quantity = cartItem.filter((x) => x.name === item.name).length;

    if (index !== -1) {
      tbody.innerHTML += `
          <tr>
            <td class="product-img"><img src="${item.image}" alt="">${
        item.name
      }</td>
            <td><p><span>${item.price}</span><sup>đ</sup></p></td>
            <td>
            <div class="btn-ta">
            <button class="btn-plus" id=${
              item.id
            }  onclick="plus(event)">+</button>
            <input id="${item.id + 1}" type="number" value="${
        item.quantity
      }" min="1" onchange="updateCart()">
            <button class="btn-minas" id=${
              item.id
            } onclick="minus(event)">-</button>
            </div>
            </td>
            <td><button class="btn-delete">Xóa</button></td>
          </tr>
        `;
    }
  });
  renderTotal();
}

renderCart();

//Hàm Plus/Minas
// Hàm Plus
function plus(e) {
  e.preventDefault();
  let listCart = JSON.parse(localStorage.getItem("cartItem"));
  let productId = parseInt(e.target.id);
  let item = listCart.find((item) => item.id === productId);

  if (item) {
    item.quantity += 1;
    document.getElementById(`${item.id + 1}`).value = item.quantity;
  } else {
    listCart.push({ id: productId, quantity: 1 });
    document.getElementById(`${productId}`).value = item.quantity;
  }

  localStorage.setItem("cartItem", JSON.stringify(listCart));
  renderTotal();
}

// Hàm Minus
function minus(e) {
  e.preventDefault();
  let listCart = JSON.parse(localStorage.getItem("cartItem"));
  let productId = parseInt(e.target.id);
  let item = listCart.find((item) => item.id === productId);

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      document.getElementById(`${item.id + 1}`).value = item.quantity;
    }
  } else {
    listCart.push({ id: productId, quantity: 1 });
    document.getElementById(`${productId}`).value = item.quantity;
  }
  localStorage.setItem("cartItem", JSON.stringify(listCart));
  renderTotal();
}

function updateCart() {
  let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
  for (let i = 0; i < cartItem.length; i++) {
    let input = document.getElementById(`${cartItem[i].id + 1}`);
    if (input) {
      cartItem[i].quantity = input.value;
    }
  }
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
  renderTotal();
}

function cartTotal() {
  let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
  let total = 0;
  for (let i = 0; i < cartItem.length; i++) {
    total = total + Number(cartItem[i].quantity) * Number(cartItem[i].price);
  }
  return total;
}

//render total

function renderTotal() {
  let totalMoney = document.querySelector(".price-total");
  totalMoney.innerHTML = "";
  totalMoney.innerHTML =
    totalMoney.innerHTML +
    `
  <p>Tổng tiền : <span>${cartTotal()}</span><sup>đ</sup></p>
  `;
}

// Hàm xóa
function deleteCartItem(id) {
  let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
  let index = cartItem.findIndex((item) => item.id === id);
  if (index !== -1) {
    cartItem.splice(index, 1);
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    renderCart();
  }
}

// Lấy tất cả các nút xóa trong giỏ hàng
let btnDeletes = document.querySelectorAll(".btn-delete");

// Lặp qua tất cả các nút xóa để gán sự kiện xóa khi người dùng nhấn vào
btnDeletes.forEach((btnDelete) => {
  btnDelete.addEventListener("click", (e) => {
    e.preventDefault();
    let productId = parseInt(btnDelete.parentElement.parentElement.querySelector('.btn-plus').id);
    deleteCartItem(productId);
  });
});
 // hàm check thanh toán
function payClick(){
  let currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (!currentUser) {
    alert("Bạn cần đăng nhập để sử dụng dịch vụ")
  } else {
    let cartItem = JSON.parse(localStorage.getItem("cartItem")) || []
    if (cartItem.length == 0) {
      alert("Giỏ hàng của bạn chưa có gì cả")
    } else {
      window.location.href = "pay.html"
    }
  }
}


/// //Hàm tìm kiếm sp
function searchProduct() {
  let input = document.querySelector(".search-box-input");
  let keyword = input.value.toLowerCase().trim();

  if (keyword === "") {
    return;
  }

  let productList = JSON.parse(localStorage.getItem("productList"));

  let foundProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(keyword)
  );

  if (foundProducts.length > 0) {
    localStorage.setItem("foundProducts", JSON.stringify(foundProducts));
    window.location.href = "search.html";
  } else {
    alert("Không tìm thấy sản phẩm!");
  }
}
