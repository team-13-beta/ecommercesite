import * as Api from "../../api.js";
import { addCommas } from "../../useful-functions.js";

// 요소(element), input 혹은 상수
const right_arrow = document.querySelector(".right-arrow");
const left_arrow = document.querySelector(".left-arrow");

right_arrow.addEventListener("click", right_arrow_handler);
left_arrow.addEventListener("click", left_arrow_handler);
//데이터
const orderData = {
  data: [
    {
      id: "1",
      address: "경기도 수원시 장안구 엄복동",
      item: "정호진",
      category: "010-2333-9654",
      img: "../../images/닭가슴살.png",
      Price: 10000,
    },
    {
      id: "2",
      address: "경기도 수원시 장안구 엄복동",
      item: "김민수",
      category: "010-2333-9654",
      img: "../../images/닭가슴살.png",
      Price: 10000,
    },
    {
      id: "3",
      address: "경기도 수원시 장안구 엄복동",
      item: "김민수",
      category: "010-2333-9654",
      img: "../../images/도시락.png",
      Price: 10000,
    },
    {
      id: "4",
      address: "경기도 수원시 장안구 엄복동",
      item: "김민수",
      category: "010-2333-9654",
      img: "../../images/건강식품.png",
      Price: 10000,
    },
    {
      id: "5",
      address: "경기도 수원시 장안구 엄복동",
      item: "김민수",
      category: "010-2333-9654",
      img: "../../images/프로틴음료.png",
      Price: 10000,
    },
    {
      id: "6",
      address: "경기도 수원시 장안구 엄복동",
      item: "닭가슴살",
      category: "010-2333-9654",
      img: "../../images/닭가슴살.png",
      Price: 10000,
    },
    {
      id: "7",
      address: "경기도 수원시 장안구 엄복동",
      item: "김민수",
      category: "010-2333-9654",
      img: "../../images/닭가슴살.png",
      Price: 10000,
    },
    {
      id: "8",
      address: "경기도 수원시 장안구 엄복동",
      item: "김민수",
      category: "010-2333-9654",
      img: "배송전",
      Price: 10000,
    },
    {
      id: "9",
      address: "경기도 수원시 장안구 엄복동",
      item: "김민수",
      category: "010-2333-9654",
      img: "배송전",
      Price: 10000,
    },
    {
      id: "10",
      address: "경기도 수원시 장안구 엄복동",
      item: "김민수",
      category: "010-2333-9654",
      img: "배송전",
      Price: 10000,
    },
  ],
};

// Click Image Slider

function left_arrow_handler() {
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

function right_arrow_handler() {
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

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
const bottomInner = document.querySelector(".bottom-products-container");

// 아이템 받아오기.
const getItemList = async () => {
  const data = orderData.data;
  console.log(data);
  console.log(
    data.map((data, i) => {
      console.log(data.id);
    }),
  );
  const result = data
    .map((data, i) => {
      if (i > 6) return;
      else {
        return `<div class ="bottom-products column">
          <div class="bottom-product-image-container"> 
              <a href="/user/products/${
                data.id
              }"><img class="bottom-product-image" src="${data.img}" alt=""></a>
          </div>
          <div class="bottom-product-name">
              <a href="/user/products/${data.id}">${data.item}</a>
          </div>
          <div class="bottom-product-price">
              ${addCommas(data.Price) + "원"}
          </div>
          </div>
          `;
        // 시간에 따라서 최신상품들만 보여주고 싶다.
        // 타임스템프를 적용하면 될듯 ?
      }
    })
    .join("");
  bottomInner.innerHTML = result;
};

getItemList();
