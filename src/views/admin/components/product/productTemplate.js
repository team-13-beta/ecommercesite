export function productDetailTemplate(data, categories = []) {
  return `
      <button class="button" data-type="update">
        수정 완료
      </button>
      <button class="button" data-type="delete">
        삭제하기
      </button>
      <div>
        <div>
          <label>제품명: </label>
          <input value="${data.productName}"  data-type="productName"/>
          <label>카테고리:</label>
          <select data-type="category">
            ${categories
              .map((category) => {
                if (category.category_name === data.category) {
                  return `<option selected>${category.category_name}</option>`;
                } else {
                  return `<option>${category.category_name}</option>`;
                }
              })
              .join("")}
          </select>
        </div>
        <div>
          <label>납품 회사: </label>
          <input value="${data.companyName}"  data-type="companyName"/>
          <label>남은 수량: </label>
          <input value="${data.stock}"  data-type="stock"/>
          <label>가격: </label>
          <input value="${data.price}"  data-type="price"/>
        </div>
        <div>
          <label>상세 설명: </label>
          <textarea  data-type="description">${data.description}</textarea>
        </div>
        <label>이미지: </label>
        <img id="product-image" src=${data.imageSrc} data-type="imageSrc"/>
        <p>이미지 수정</p>
        <label for="file" >
            <p>컴퓨터에서 선택</p>
          </label>
        </div>
      `;
}
// <input type="file" name="file" id="file" />
