export const modal = `
                <div class="modal__close">
                  <button>닫기</button>
                </div>
                <div class="modal__card">
                  <div class="modal__header">
                    <div class="modal__back">
                      <img width="32px" height="24px" alt="arrow_back_icon" />
                    </div>
                    <h2>새 게시물 만들기</h2>
                    <p>공유하기</p>
                  </div>
                  <div class="modal__main">
                    <h3>사진과 동영상을 업로드 해보세요.</h3>
                    
                  </div>
                </div>
              `;

// 지시사항에 맞춰 자바스크립트 코드를 작성하세요.

export function closeModal() {
  document
    .querySelector("body")
    .removeChild(document.querySelector("body").firstChild);
}
