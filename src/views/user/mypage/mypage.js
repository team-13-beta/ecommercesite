const oauthUser = `<!-- 주문 조회 -->
<a class="menuCard" href="/user/userorder" id="orderlist">
  <div class="menuBody">
    <p class="title is-3">주문 조회</p>
    <p class="subtitle is-5">
      주문 내역을 조회하고, 취소할 수 있습니다.
    </p>
  </div>
</a>

<!-- 내 정보 관리 -->
<a class="menuCard" href="/user/oauthUpdate/" id="accountupdate">
  <div class="menuBody">
    <p class="title is-3">내 정보 관리</p>
    <p class="subtitle is-5">
      나의 회원정보를 수정하고 탈퇴할 수 있습니다.
    </p>
  </div>
</a>`;

const homeUser = `<!-- 주문 조회 -->
<a class="menuCard" href="/user/userorder" id="orderlist">
  <div class="menuBody">
    <p class="title is-3">주문 조회</p>
    <p class="subtitle is-5">
      주문 내역을 조회하고, 취소할 수 있습니다.
    </p>
  </div>
</a>

<!-- 내 정보 관리 -->
<a class="menuCard" href="/user/accountUpdate" id="accountupdate">
  <div class="menuBody">
    <p class="title is-3">내 정보 관리</p>
    <p class="subtitle is-5">
      나의 회원정보를 수정하고 탈퇴할 수 있습니다.
    </p>
  </div>
</a>`;

const menuContainer = document.querySelector(".menuContainer");

const isLogin = sessionStorage.getItem("token") ? true : false;

if (isLogin) {
  menuContainer.innerHTML = homeUser;
}

if (!isLogin) {
  menuContainer.innerHTML = oauthUser;
}
