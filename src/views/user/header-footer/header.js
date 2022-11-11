export default function headerComponent(login, join, admin = null) {
  return `
    <header class="box" style="margin-bottom:1.5rem;">
        <div class="header-container">
        <nav class="level">
          <div class="level-left">
            <div class="logo level-item" id="logo-box" style="background-color: #ff922b;
            width: 80px;
            color:#fff4e6;
            font-size: 20px;
            text-align: center;
            font-weight: bold;
            border-radius: 10px;">β</div>
          </div>
          <div class="level-right">
            <div class="level-item ${join} head-register" style="color:#ff922b; font-weight:bold; letter-spacing: 1px;">${join}</div>
            <div class="level-item ${login} head-login" style="color:#ff922b; font-weight:bold; letter-spacing: 1px;">${login}</div>
            ${
              admin
                ? `<div class="level-item ${admin} head-admin" style="color:#ff922b; font-weight:bold; letter-spacing: 1px;">${admin}</div>`
                : ""
            }
            <div class="level-item head-cart" style="color:#ff922b; font-weight:bold; letter-spacing: 1px;">CART</div>
          </div>
        </nav>
        </div>
    </header>
    `;
}
