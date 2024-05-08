const menuButton = document.getElementById("menu-btn");
const navItems = document.getElementById("nav-list");

let isMenuActive = false;

function toggleNavList() {
  isMenuActive = !isMenuActive;
  if (isMenuActive) {
    navItems.style.display = "flex";
    menuButton.classList = "fa-solid fa-xmark";
  } else {
    navItems.style.display = "none";
    menuButton.classList = "fa-solid fa-bars";
  }
}

menuButton.addEventListener("click", toggleNavList);
