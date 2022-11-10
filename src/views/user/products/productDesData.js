export default function productDesData(des_img1, des_img2, des_img3) {
  return `
        <div class="image" id="img1">
            <img src=${des_img1} alt="상세 이미지"/>
        </div>
        <div class="image" id="img2">
            <img src=${des_img2} alt="배송 이미지"/>
        </div>
        <div class="image" id="img3">
            <img src=${des_img3} alt="영양 이미지" />
        </div>
      `;
}
