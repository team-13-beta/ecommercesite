export default function headerComponent() {
  return `
    <header class="box">
        <div class="header-container">
        <nav class="level">
          <div class="level-left">
            <div class="logo level-item" style="background-color: #ff922b;
            width: 80px;
            font-size: 20px;
            text-align: center;
            border-radius: 10px;"><a href="/">β</a></div>
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
