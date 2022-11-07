export default function productDesData(des_img1, des_img2, des_img3) {
  return `
        <div class="image img1">
            <img src=${des_img1} />
        </div>
        <div class="image img2">
            <img src=${des_img2} />
        </div>
        <div class="image img3">
            <img src=${des_img3} />
        </div>
      `;
}
