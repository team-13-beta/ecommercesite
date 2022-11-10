const detailBtnEl = document.querySelector(".img_detail");
const deliveryBtnEl = document.querySelector(".img_delivery");
const nutritionBtnEl = document.querySelector(".img_nutrition");

detailBtnEl.addEventListener("click", () => {
  detailBtnEl.parentElement.classList.add("is-active");
  deliveryBtnEl.parentElement.classList.remove("is-active");
  nutritionBtnEl.parentElement.classList.remove("is-active");
  document.querySelector("#img1").scrollIntoView({ behaivor: "smooth" });
});
deliveryBtnEl.addEventListener("click", () => {
  detailBtnEl.parentElement.classList.remove("is-active");
  deliveryBtnEl.parentElement.classList.add("is-active");
  nutritionBtnEl.parentElement.classList.remove("is-active");
  document.querySelector("#img2").scrollIntoView({ behaivor: "smooth" });
});
nutritionBtnEl.addEventListener("click", () => {
  detailBtnEl.parentElement.classList.remove("is-active");
  deliveryBtnEl.parentElement.classList.remove("is-active");
  nutritionBtnEl.parentElement.classList.add("is-active");
  document.querySelector("#img3").scrollIntoView({ behaivor: "smooth" });
});
