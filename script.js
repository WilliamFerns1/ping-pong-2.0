const menuButton = document.getElementById("menu-btn");
const navItems = document.getElementById("nav-list");

let isMenuActive = false;

let rotation = 0;

const toggleNavList = () => {
  isMenuActive = !isMenuActive;
  if (isMenuActive) {
    navItems.style.display = "flex";
    menuButton.classList = "fa-solid fa-xmark";
    rotation += 360;
  } else {
    navItems.style.display = "none";
    menuButton.classList = "fa-solid fa-bars";
    rotation -= 360;
  }
  menuButton.style.rotate = `${rotation}deg`;
}

menuButton.addEventListener("click", toggleNavList);
