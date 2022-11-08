export default function headerComponent(login, join) {
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
            <div class="level-item ${login}"><a href="/${login}">${login}</a></div>
            <div class="level-item ${join}"><a href="/${join}">${join}</a></div>
            <div class="level-item"><a href="/user/bucket/">Cart</a></div>
          </div>
        </nav>
        </div>
    </header>
    `;
}
