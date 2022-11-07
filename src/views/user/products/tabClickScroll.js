const detailBtnEl = document.querySelector(".img_detail");
const deliveryBtnEl = document.querySelector(".img_delivery");
const nutritionBtnEl = document.querySelector(".img_nutrition");

const location1 = document.querySelector(".img1").offsetTop;
const location2 = document.querySelector(".img2").offsetTop;
const location3 = document.querySelector(".img3").offsetTop;

detailBtnEl.addEventListener("click", () => {
  window.scrollTo({ top: location1, behaivor: "smooth" });
});
deliveryBtnEl.addEventListener("click", () => {
  window.scrollTo({ top: location2, behaivor: "smooth" });
});
nutritionBtnEl.addEventListener("click", () => {
  window.scrollTo({ top: location3, behaivor: "smooth" });
});
