let btnSearch = document.querySelector(".search-box-btn");

btnSearch.addEventListener("click", function () {
  let input = this.previousElementSibling;
  this.parentElement.classList.toggle("open");
  input.focus();
  searchProduct()
});



//Hàm render sản phảm tìm kiếm
let foundProducts = JSON.parse(localStorage.getItem("foundProducts")) || [];
let showProduct = document.querySelector(".list-product");


function renderProducts() {
  showProduct.innerHTML = "";
  for(let i=0; i<foundProducts.length; i++) {
    showProduct.innerHTML =
    showProduct.innerHTML +
      `
      <div class="information">
      <div class="product">
              <img src="${foundProducts[i].image}" alt="">
              <div class="info">
                  <h3>${foundProducts[i].name}</h3>
                  <p>Quán: ${foundProducts[i].description}</p>
                  <p>Giá: <span style="color: blue;">${foundProducts[i].price}</span> <sup>đ</sup></p>
                  <p>Giảm giá:<span style="color: red;"><span>${foundProducts[i].discounts}</span> %</span> 
                  <span> Chỉ còn</span> <span style="color: red;"><span class="sell-price">${foundProducts[i].price - foundProducts[i].price*foundProducts[i].discounts/100}</span><sup>đ</sup></span></p>
                  <p>Đánh Giá:  ${foundProducts[i].rating} <i class="bi bi-star-fill" style="color:red"></i> <button class="btn-add">Thêm vào giả hàng</button></p>
                  
              </div>
          </div>
          </div>
        `;
  }
}
renderProducts();


//Thêm vào giỏ hàng(addCart)

let buyBtn = document.querySelectorAll(".btn-add");
let productNumber = document.querySelector(".checkout_items")
let count = 0;

for (let i = 0; i < buyBtn.length; i++) {
  buyBtn[i].addEventListener("click", function (e) {
    e.preventDefault();

    let productBox = this.closest(".information");
  
    let productName = productBox.querySelector("h3").innerText;
    let productImg = productBox.querySelector("img").src;
    let productPrice = productBox.querySelector(".sell-price").innerText;

    let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];
    let existingItem = cartItem.find((item) => item.name === productName);

    if (existingItem) {
      alert("Sản phẩm đã có trong giỏ hàng");
    } else {
      let item = {
        id: cartItem.length + 1,
        image: productImg,
        name: productName,
        price: productPrice,
        quantity: 1,
      };
      cartItem.push(item);
      count++
      productNumber.innerText = count;
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
      alert("Thêm vào giỏ hàng thành công");
    }
  });
}


// //Hàm tìm kiếm sp
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
