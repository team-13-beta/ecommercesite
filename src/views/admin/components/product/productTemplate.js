export function productDetailTemplate(data, categories = [], imgaes = {}) {
  if (!data) return `<div>데이터가 없습니다.</div>`;
  const { titleImage, detailImage, deliveryImage, nutritionImage } = imgaes;
  return `<div class="modify-container">
        <button class="button" data-type="update">
          수정 완료
        </button>
        <button class="button" data-type="delete">
          삭제하기
        </button>
      </div>
      <div class="content">
        <div class="field">
          <label class="label">상품명</label>
          <div class="control">
            <input
              class="input"
              type="text"
              id="productName"
              value="${data.name}"
              data-type="productName"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">카테고리</label>
          <div class="control">
            <div class="select full-select">
              <select id="categoryId" data-type="category">
                ${categories.reduce(
                  (acc, { id, name }) =>
                    (acc += `<option value="${id}" 
                    ${data.categoryId == id ? "selected" : ""}
                    >${name}</option>`),
                  "",
                )}
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">납품 회사</label>
          <div class="control">
            <input
              class="input"
              type="text"
              id="companyName"
              value="${data.company}"
              data-type="companyName"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">제품 설명</label>
          <div class="control">
            <textarea class="textarea" id="summary" data-type="description">${
              data.description.summary
            }</textarea>
          </div>
        </div>

        <div class="field file-field">
          
          <label class="label">메인 이미지</label>
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" data-type="title" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">컴퓨터에서 선택</span>
              </span>
            </label>
          </div>
          ${`<img id="title-image" src=${titleImage} data-type="imageSrc" alt="메인  이미지"/>`}
          
          <label class="label">상세 이미지</label>
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" data-type="detail" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">컴퓨터에서 선택</span>
              </span>
            </label>
          </div>
          ${`<img id="detail-image" src=${detailImage} data-type="imageSrc" alt="제품  이미지"/>`}

          <label class="label">배달 이미지</label>
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" data-type="delivery" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">컴퓨터에서 선택</span>
              </span>
            </label>
          </div>
          ${`<img id="delivery-image" src=${deliveryImage} data-type="imageSrc" alt="배달  이미지"/>`}

          <label class="label">영양 이미지</label>
          <div class="file">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" id="file" data-type="nutrition" />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">컴퓨터에서 선택</span>
              </span>
            </label>
          </div>
          ${`<img id="nutrition-image" src=${nutritionImage} data-type="imageSrc" alt="영양  이미지"/>`}
        
        </div>

  

        <div class="field">
          <label class="label">재고량</label>
          <div class="control">
            <input
              class="input"
              id="stock"
              value="${data.stock}"
              type="number"
              data-type="stock"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">가격</label>
          <div class="control">
            <input
              class="input"
              id="price"
              value="${data.price}"
              type="number"
              data-type="price"
            />
          </div>
        </div>
      </div>
   `;
}
