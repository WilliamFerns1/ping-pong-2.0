const menuButton = document.getElementById("menu-btn");
const navItems = document.getElementById("nav-list");

let isMenuActive = false;

let rotation = 0;
const toggleNavList = () => {
  isMenuActive = !isMenuActive;
  toggleMenu(isMenuActive);
  menuButton.style.rotate = `${rotation}deg`;
}

const isMobile = () => {
  return window.innerWidth <= 512;
}

const toggleMenu = (isMenuActive) => {
  if (isMobile()) {
    if (isMenuActive) {
      navItems.classList = "slide-from-right";
      navItems.style.display = "flex";
      menuButton.classList = "fa-solid fa-xmark";
      rotation += 360;
    } else {
      navItems.classList = "slide-from-left";
      menuButton.classList = "fa-solid fa-bars";
      rotation -= 360;
    }
  }
}

menuButton.addEventListener("click", toggleNavList);


