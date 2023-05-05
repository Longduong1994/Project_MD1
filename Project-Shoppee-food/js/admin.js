// Đăng xuất
let logout = document.getElementById("logout-btn");
let dropdown = document.querySelector(".dropdown");
dropdown.style.left = "40px"

logout.addEventListener("click", function () {
  localStorage.removeItem("admin");
  window.location.href = "adminLogin.html";
});



// Hàm chuyển đổi file ảnh sang dạng base64
function convertImageToBase64(image) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Hàm render bảng sản phẩm
function renderProductTable() {
  let productTable = document.querySelector("#product-list-admin tbody");
  // Xóa toàn bộ nội dung bảng cũ
  productTable.innerHTML = "";

  // Lấy ra danh sách sản phẩm từ localStorage
  let productList = JSON.parse(localStorage.getItem("productList")) || [];

  for (let i = 0; i < productList.length; i++) {
    let product = productList[i];

    // Tạo HTML cho từng sản phẩm trong bảng
    let productHtml = `
      <tr>
        <td class="id">${product.id}</td>
        <td class="td-img"><img src="${product.image}" alt="${product.name}"></td>
        <td>${product.name}</td>
        <td>${product.classify}</td>
        <td><span>${product.price}</span><sup>đ</sup></td>
        <td><span>${product.discounts}</span><sup>%</sup></td>
        <td>${product.rating}<i class="bi bi-star-fill" style="color:red"></i></td>
        <td>${product.description}</td>
        <td>
          <button type="button" id="edit-btn-${product.id}" class="edit-btn">Sửa</button>
          <button type="button" id="delete-btn-${product.id}" class="delete-btn">Xóa</button>
        </td>
      </tr>
    `;

    // Thêm HTML sản phẩm vào bảng
    productTable.innerHTML += productHtml;
  }
}

// Render bảng sản phẩm khi tải trang
renderProductTable();

// Hàm thêm sản phẩm
async function addProduct() {
  let productList = JSON.parse(localStorage.getItem("productList")) || [];

  // Lấy giá trị của các trường dữ liệu từ form
  let name = document.querySelector("#product-name").value;
  let classify = document.querySelector("#product-classify").value;
  let price = document.querySelector("#product-price").value;
  let description = document.querySelector("#product-description").value;
  let discounts = document.querySelector("#product-discounts").value;
  let rating = document.querySelector("#product-rating").value;
  let imageInput = document.querySelector("#image");
  let image = await convertImageToBase64(imageInput.files[0]);
  let id = productList.length + 1;
  console.log(name);
  console.log(discounts);
  // Tạo một đối tượng mới chứa thông tin sản phẩm
  let newProduct = {
    id: id,
    name,
    classify,
    price,
    description,
    rating,
    discounts,
    image,
  };

  // Thêm sản phẩm mới vào danh sách
  productList.push(newProduct);

  // Lưu lại danh sách sản phẩm vào localStorage
  localStorage.setItem("productList", JSON.stringify(productList));

  // Hiển thị thông báo thành công
  alert("Thêm sản phẩm thành công!");
  document.querySelector("#image").value = "";
  document.querySelector("#product-name").value = "";
  document.querySelector("#product-classify").value = "";
  document.querySelector("#product-price").value = "";
  document.querySelector("#product-discounts").value = "";
  document.querySelector("#product-rating").value = "";
  document.querySelector("#product-description").value = "";
  // Reset form
  // productForm.reset();

  // Hiển thị danh sách sản phẩm
  renderProductTable();
}

// Thêm sự kiện click cho nút Thêm sản phẩm
let addBtn = document.querySelector("#add-btn");
addBtn.addEventListener("click", addProduct);

// Hàm sửa sản phẩm
const tbody = document.querySelector(".tbody-product");
let updateIndex = -1;

tbody.addEventListener("click", async function (e) {
  const productList = JSON.parse(localStorage.getItem("productList")) || [];
  if (e.target.classList.contains("edit-btn")) {
    let row = e.target.closest("tr");
    let id = row.querySelector(".id").textContent;

    let findIndex = -1;
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id === Number(id)) {
        findIndex = i;
        break; // Thoát khỏi vòng lặp khi tìm thấy sản phẩm
      }
    }

    if (findIndex > -1) {
      updateIndex = findIndex;
      let td = e.target.parentElement.parentElement;
      let product = productList[updateIndex];

      td.innerHTML = `
        <td class="id">${product.id}</td>
        <td class="td-img"><input type="file" id="image" name="image" accept="image/*" required></td>
        <td><input type="text" id="product-name" name="product-name" value="${product.name}" required></td>
        <td><input type="text" id="product-classify" name="product-classify" value="${product.classify}" required></td>
        <td><input type="number" id="product-price" name="product-price" value="${product.price}" required></td>
        <td><input type="number" id="product-discounts" name="product-discounts" value="${product.discounts}" required></td>
        <td><input type="number" id="product-rating" name="product-rating" value="${product.rating}" required></td>
        <td><textarea id="product-description" name="product-description" rows="5" required>${product.description}</textarea></td>
        <td>
          <button type="button" class="change-btn">Cập nhật</button>
          <button type="button" class="cancel-btn">Quay lại</button>
        </td>
      `;
    }
  } else if (e.target.classList.contains("change-btn")) {
    let td = e.target.parentElement.parentElement;
    let img = td.querySelector("#image").files[0];
    let image = await convertImageToBase64(img);
    let name = td.querySelector("#product-name").value;
    let classify = td.querySelector("#product-classify").value;
    let price = td.querySelector("#product-price").value;
    let discounts = td.querySelector("#product-discounts").value;
    let rating = td.querySelector("#product-rating").value;
    let description = td.querySelector("#product-description").value;

    // thay thế thông tin cũ bằng thông tin mới vừa nhập
    productList[updateIndex] = {
      ...productList[updateIndex],
      image,
      name,
      classify,
      price,
      discounts,
      rating,
      description,
    };

    localStorage.setItem("productList", JSON.stringify(productList));
    renderProductTable();
  } else if (e.target.classList.contains("cancel-btn")) {
    renderProductTable();
  }

  // Hàm xóa sản phẩm
  if (e.target.classList.contains("delete-btn")) {
    let row = e.target.closest("tr");
    let id = row.querySelector(".id").textContent;
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].id === Number(id)) {
        findIndex = i;
        break;
      }
    }
    if (findIndex > -1) {
      productList.splice(findIndex, 1);
      localStorage.setItem("productList", JSON.stringify(productList));

      // Giảm giá trị của id trên local storage
      let deletedCount = 0;
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id > Number(id)) {
          productList[i].id--;
          deletedCount++;
          console.log(productList[i].id);
        }
      }
      localStorage.setItem("productList", JSON.stringify(productList));

      // Render lại bảng sản phẩm
      renderProductTable();
    }
    deleteProduct(id);
  }
});

//hàm render thông tin khách hàng
let user = JSON.parse(localStorage.getItem("user"));
let listUser = JSON.parse(localStorage.getItem("listUser"));
let info = document.getElementById("tbody-user");

function renderUserInformation() {
  info.innerHTML = "";
  for (let i = 0; i < listUser.length; i++) {
    info.innerHTML += `
  <tr >
  <td>${i + 1}</td>
  <td class = "image"><img src=${listUser[i].img}></td>
  <td id="${listUser[i].id}" class="fullname">${listUser[i].fullName}</td>
  <td>${listUser[i].dateOfBirth}</td>
  <td>${listUser[i].gender}</td>
  <td>${listUser[i].phoneNumber}</td>
  <td>${listUser[i].address}</td>
  <td>${listUser[i].feedBack}</td>
  <td>
      <button type="button" class="close-btn" onclick="listCloseUser(${
        listUser[i].id
      })">Khóa</button>
      <button type="button" class="oppen-btn" onclick="listUnlockUser(${
        listUser[i].id
      })">Mở</button>
  </td>
</tr> 
  `;

    if (listUser[i].status == true) {
      let name = document.getElementById(`${listUser[i].id}`);
      name.style.color = "#000";
    } else {
      let name = document.getElementById(`${listUser[i].id}`);
      name.style.color = "red";
    }
  }
}
renderUserInformation();

// Hàm khóa mở user

//hàm khóa

function listCloseUser(user) {
 
  let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
  for (let i = 0; i < listUser.length; i++) {
    if (parseInt(user) === listUser[i].id) {
      let name = document.getElementById(`${listUser[i].id}`);
    
      name.style.color = "red";
      listUser[i].status = false;
  
      localStorage.setItem("listUser", JSON.stringify(listUser)); 
      
    }
  }

}

//hàm mở

function listUnlockUser(user) {

  let listUser = JSON.parse(localStorage.getItem("listUser")) || [];
  for (let i = 0; i < listUser.length; i++) {
    if (parseInt(user) === listUser[i].id) {
      listUser[i].status = true;
      let name = document.getElementById(`${listUser[i].id}`);
    
      name.style.color = "#000";
    
      localStorage.setItem("listUser", JSON.stringify(listUser)); 
    }
  }
}

// //hàm tìm kiếm sản phẩm

// function searchAndRenderProduct() {
//   let input = document.querySelector("#search-input");
//   let keyword = input.value.toLowerCase().trim();
//   if (keyword === "") {
//     window.location.reload()
//     return;
//   }

//   let productList = JSON.parse(localStorage.getItem("productList"));

//   let filteredProductList = productList.filter((product) =>
//     product.name.toLowerCase().includes(keyword)
//   );
//   if (filteredProductList.length > 0) {
//   } else {
    
//     alert("Không tìm thấy sản phẩm!");
//   }
//   renderProductTable(filteredProductList);
// }

// // // Thêm sự kiện keyup vào ô input
// // document.querySelector("#search-input").addEventListener("keyup", function() {
// //   searchAndRenderProduct();
// // });

// function renderProductTable(filteredProductList) {
//   let productTable = document.querySelector("#product-list-admin tbody");
//   // Xóa toàn bộ nội dung bảng cũ
//   productTable.innerHTML = "";

//   for (let i = 0; i < filteredProductList.length; i++) {
//     let product = filteredProductList[i];

//     // Tạo HTML cho từng sản phẩm trong bảng
//     let productHtml = `
//       <tr>
//         <td class="id">${product.id}</td>
//         <td class="td-img"><img src="${product.image}" alt="${product.name}"></td>
//         <td>${product.name}</td>
//         <td>${product.classify}</td>
//         <td><span>${product.price}</span><sup>đ</sup></td>
//         <td><span>${product.discounts}</span><sup>%</sup></td>
//         <td>${product.rating}<i class="bi bi-star-fill" style="color:red"></i></td>
//         <td>${product.description}</td>
//         <td>
//           <button type="button" id="edit-btn-${product.id}" class="edit-btn">Sửa</button>
//           <button type="button" id="delete-btn-${product.id}" class="delete-btn">Xóa</button>
//         </td>
//       </tr>
//     `;

//     // Thêm HTML sản phẩm vào bảng
//     productTable.innerHTML += productHtml;
//   }
// }
// let productList = JSON.parse(localStorage.getItem("productList")) || [];
// renderProductTable(productList )


//quản lý đơn hàng