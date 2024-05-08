const menuButton = document.getElementById("menu-btn");
const navItems = document.getElementById("nav-list");

let isMenuActive = false;

let rotation = 0;

/* Path to get this working: */
/* 1. Make a keyframe that starts at right 0%, and end at right 5vh at 100%. */
/* 2. Add keyframe to a class called slide-from-right. The keyframe must take take a ease-in-out of 3s; */
/* 3. When it is time to show the menu, put slide-from-right class on the nav-items div, then put the display to flex.  */
/*   Else if it is time to hide the nav items, put on another class that is called "reverse-animation". */
/*   The "reverse-animation" class will have the following: "animation-direction: reverse;" */

const toggleNavList = () => {
  isMenuActive = !isMenuActive;
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
  menuButton.style.rotate = `${rotation}deg`;
}

menuButton.addEventListener("click", toggleNavList);
