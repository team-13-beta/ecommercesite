export default function renderOrderData() {
  return `
    <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label" for="receiverName">이름</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="receiverName"
            type="text"
            placeholder="받는 분 이름을 입력해 주세요."
            autocomplete="on"
          />
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label" for="receiverPhoneNumber">연락처</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="receiverPhoneNumber"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="핸드폰 번호를 입력해주세요."
            autocomplete="on"
          />
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label" for="address2">주소</label>
    </div>
    <div class="field-body search">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="postalCode"
            type="text"
            placeholder="주소찾기를 클릭해 주세요."
            readonly
          />
        </p>
      </div>
      <div>
        <button
          class="button is-light is-hovered"
          id="searchAddressButton"
        >
          주소찾기
        </button>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal no-label"></div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="address1"
            type="text"
            placeholder=""
            autocomplete="on"
            readonly
          />
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal no-label"></div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="address2"
            type="text"
            placeholder=""
            autocomplete="on"
          />
        </p>
      </div>
    </div>
  </div>
    `;
}
