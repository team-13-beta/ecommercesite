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
allResult.addEventListener("click", allProduct);

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

// 카테고리 생성
async function addCategory() {
  const categorys = await Api.get("/category");
  console.log(categorys);

  for (const category of categorys) {
    const { id, name } = category;
    // const imageUrl = await getImageUrl(titleImage);

    Category.innerHTML += `<div class ="category-item" id="${id}">
        <div class="bottom-product-name">
        <p>${name}</p>
        </div>
        </div>`;
  }
}

// 전체 상품 생성.

async function addProduct() {
  const products = await Api.get("/products");
  console.log(products);
  for (const product of products) {
    const { id, name, price, description } = product;
    const { titleImage } = description;
    const imageUrl = await getImageUrl(titleImage);

    bottomInner.innerHTML += ` <div class ="bottom-products ${id}"><a href="/user/products/${id}">
    <div class="bottom-product-image-container">
    <img class="bottom-product-image" src="${imageUrl}" alt="">
    </div>
    <div class="bottom-product-name">
    <p>${name}</p>
    </div>
    <div class="bottom-product-price">
    ${addCommas(price) + "원"}
    </div>
    </div>
    `;
  }
}

//바탕에 깔아두기
addCategory();
addProduct();

// 카테고리 버튼 누르면 상품 나오는 이벤트

Category.addEventListener("click", async (e) => {
  e.preventDefault();
  let a = e.target.parentNode.parentNode.id;
  try {
    const products = await Api.get("/products");
    const addTitleImage = await Promise.all(
      products
        .filter((data, i) => {
          return data.categoryId == a;
        })
        .map(async (data) => {
          return {
            ...data,
            titleImage: await getImageUrl(data.description.titleImage),
          };
        }),
    );

    let result = addTitleImage
      .map((data) => {
        return `<div class ="bottom-products"><a href="/user/products/${
          data.id
        }">
              <div class="bottom-product-image-container">
              <img class="bottom-product-image" src="${data.titleImage}" alt="">
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
    if (result == 0) {
    }

    bottomInner.innerHTML =
      result.length == 0
        ? `<div class="nothing-products"><p class="nothing">상품 준비 중 입니다.</p></div>`
        : result;
  } catch (err) {
    console.log(err);
  }
});

// 전체 상품 보기 버튼
async function allProduct(e) {
  e.preventDefault();
  const products = await Api.get("/products");
  bottomInner.innerHTML = "";
  for (const product of products) {
    const { id, name, price, description } = product;
    const { titleImage } = description;
    const imageUrl = await getImageUrl(titleImage);

    bottomInner.innerHTML += ` <div class ="bottom-products ${id}"><a href="/user/products/${id}">
    <div class="bottom-product-image-container">
    <img class="bottom-product-image" src="${imageUrl}" alt="">
    </div>
    <div class="bottom-product-name">
    <p>${name}</p>
    </div>
    <div class="bottom-product-price">
    ${addCommas(price) + "원"}
    </div>
    </div>
    `;
  }
}
