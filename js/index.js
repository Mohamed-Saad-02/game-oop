import { Games } from "./games.js";

new Games();

const scrollTop = document.querySelector(".scroll-top");

scrollTop.addEventListener("click", () => window.scrollTo(0, 0));

window.addEventListener("scroll", function () {
  const mainSectionCards = document.querySelector(".games-cards").offsetTop;

  if (this.scrollY > mainSectionCards) scrollTop.classList.add("active");
  else scrollTop.classList.remove("active");
});
