export default function headerComponent() {
  return `
    <header class="box " style="margin-bottom:0.5rem;">
        <div class="header-container">
        <nav class="level">
          <div class="level-left">
            <div class="level-item" id="logo-box" style="background-color: #ff922b;
            color:#fff4e6;
            width: 80px;
            font-size: 20px;
            text-align: center;
            border-radius: 10px;
            ">β</div>
          </div>
          <div class="level-right">
            <div class="level-item"><a href="/login">로그인</a></div>
            <div class="level-item"><a href="/register">회원가입</a></div>
            <div class="level-item">장바구니</div>
          </div>
        </nav>
        </div>
    </header>
    `;
}
