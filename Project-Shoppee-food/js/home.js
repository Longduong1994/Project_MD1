let btnSearch = document.querySelector(".search-box-btn");

btnSearch.addEventListener("click", function () {
  let input = this.previousElementSibling;
  this.parentElement.classList.toggle("open");
  input.focus();
  searchProduct()
});

let productList = JSON.parse(localStorage.getItem("productList")) || [];
let showProducts = document.querySelector(".listMenu");

// render products
function renderProducts() {
  showProducts.inerHTML = "";
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].rating == 5)
      showProducts.innerHTML =
        showProducts.innerHTML +
        `
                  <div class="food-menu">
                    <img
                      src="${productList[i].image}"
                      alt=""
                    />
                    <div>
                      <h6>${productList[i].name}</h6>
                      <p>${productList[i].description}</p>
                      <p>
                        <i class="bi bi-tag"></i>
                        <span style="color: red;"> Giảm ngay ${productList[i].discounts}% </span>
                      </p>
                    </div>
                  </div>
    `;
  }
}
renderProducts();

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
