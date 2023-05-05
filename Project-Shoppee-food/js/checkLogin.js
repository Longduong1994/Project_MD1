// Hàm logout,hàm profile
let logout = document.getElementById("logout-btn");
let profile = document.getElementById("profile-btn");
let cartItem = JSON.parse(localStorage.getItem("cartItem"));

logout.addEventListener("click",function(){
  localStorage.removeItem("currentUser");
  localStorage.setItem("cartItem", JSON.stringify([]))
  window.location.reload()
})

profile.addEventListener("click",function(){
  window.location.href = "user.html"; 
})



if (localStorage.getItem("currentUser")) {
  // Nếu có currentUser trong local
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  document.getElementById(
    "login-user"
  ).innerHTML = `<b id="currentUserLogin">${currentUser.username}</b>`;
  document.getElementById('profile-btn').innerText = "Profile"
  document.getElementById('logout-btn').innerText = "Logout";

}else {
  document.querySelector(".dropdown").style.display = "none"
}
 
