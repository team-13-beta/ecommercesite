import * as Api from "../../api.js";
import { addCommas } from "../../useful-functions.js";
import { getImageUrl } from "../../aws-s3.js";

// 요소(element), input 혹은 상수
const rightArrow = document.querySelector(".right-arrow");
const leftArrow = document.querySelector(".left-arrow");
const Category = document.querySelector(".category");
const bottomInner = document.querySelector(".bottom-products-container");
const allResult = document.querySelector("#all-result-button");

rightArrow.addEventListener("click", rightArrowHandler);
leftArrow.addEventListener("click", leftArrowHandler);
// Click Image Slider

function leftArrowHandler() {
  let currentSlide = document.querySelector("#photo .slide.active");
  let prevSlide = currentSlide.previousElementSibling;
  if (prevSlide === null) {
    prevSlide = currentSlide.parentElement.lastElementChild;
  }
  currentSlide.animate(
    {
      opacity: [1, 0],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    },
  );
  currentSlide.classList.remove("active");
  prevSlide.animate(
    {
      opacity: [0, 1],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    },
  );
  prevSlide.classList.add("active");
}

function rightArrowHandler() {
  let currentSlide = document.querySelector("#photo .slide.active");
  let nextSlide = currentSlide.nextElementSibling;
  if (nextSlide === null) {
    nextSlide = currentSlide.parentElement.firstElementChild;
  }
  currentSlide.animate(
    {
      opacity: [1, 0],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    },
  );
  currentSlide.classList.remove("active");
  nextSlide.animate(
    {
      opacity: [0, 1],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    },
  );
  nextSlide.classList.add("active");
}

const data = await Api.get("/products"); // 전체 상품 데이터
console.log(data);
const categoryData = await Api.get("/category");
console.log(categoryData); // 전체 카테고리 데이터
let image = [];

for (let i = 0; i < data.length; i++) {
  let imageUrl = await getImageUrl(`${data[i].titleImage}`); //titleImage가 없어서 안뜨는 거 같다.
  image.push(imageUrl);
}

// 이미지를 필터링 해서 보여주고 싶은데 어떻게 하지..

console.log(image[1]);

// Category.addEventListener("click", (e) => {
//   const filterResult = data
//     .filter((data) => {
//       return e.target.parentNode.parentNode.id == data.categoryId;
//     })
//     .map((data, i) => {
//       return `<div class ="bottom-products"><a href="products/${
//         data.productId
//       }">
//         <div class="bottom-product-image-container">
//         <img class="bottom-product-image" src="/${image[i]}" alt="">
//         </div>
//         <div class="bottom-product-name">
//         <p>${data.name}</p>
//         </div>
//         <div class="bottom-product-price">
//         ${addCommas(data.price) + "원"}
//         </div>
//         </div>
//         `;
//     })
//     .join("");
//   bottomInner.innerHTML = filterResult;
// });

const result = data
  .map((data, i) => {
    {
      return `<div class ="bottom-products"><a href="/user/products/${data.id}">
      <div class="bottom-product-image-container">
      <img class="bottom-product-image" src="${image[i]}" alt="">
      </div>
      <div class="bottom-product-name">
      <p>${data.name}</p>
      </div>
      <div class="bottom-product-price">
      ${addCommas(data.price) + "원"}
      </div>
      </div>
      `;
    }
  })
  .join("");

bottomInner.innerHTML = result;

const categoryResult = categoryData
  .map((data, i) => {
    {
      return `    <div class ="category-item" id="${data._id}">
      <div class="bottom-product-name">
      <p>${data.name}</p>
      </div>
      </div>
      `;
    }
  })
  .join("");
Category.innerHTML = categoryResult;

// 상품 전체 보기 버튼
allResult.addEventListener("click", (e) => {
  e.preventDefault();
  let allResults = data
    .map((data, i) => {
      return `<div class ="bottom-products"><a href="/user/products/${data.id}">
        <div class="bottom-product-image-container">
        <img class="bottom-product-image" src="${image[i]}" alt="">
        </div>
        <div class="bottom-product-name">
        <p>${data.name}</p>
        </div>
        <div class="bottom-product-price">
        ${addCommas(data.price) + "원"}
        </div>
        </div>
        `;
    })
    .join("");
  bottomInner.innerHTML = allResults;
});

Category.addEventListener("click", (e) => {
  const filterResult = data
    .map((data, i) => {
      if (data.categoryId == e.target.parentNode.parentNode.id) {
        return `<div class ="bottom-products"><a href="products/${data.id}">
        <div class="bottom-product-image-container">
        <img class="bottom-product-image" src="/${image[i]}" alt="">
        </div>
        <div class="bottom-product-name">
        <p>${data.name}</p>
        </div>
        <div class="bottom-product-price">
        ${addCommas(data.price) + "원"}
        </div>
        </div>
        `;
      }
    })
    .join("");

  bottomInner.innerHTML = filterResult;
});
