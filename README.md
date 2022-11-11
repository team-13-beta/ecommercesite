<div align="center">

# β - 3대 500을 위한 단백질

대학교 3학년 자취생 **김헬창** 현재 데드리프트 120, 스쿼트 100, 벤치 80 으로 3대 300이다.
<br/>
**3대 500**을 찍기 위해 단백질을 보충하려고 하는데... 가성비 좋은 구매 사이트가 없다!
<br/>
그리하여 본인이 팀원들을 구해 사이트를 개발하려고 한다고 한다.

<img src="https://i.ibb.co/GRHXNQD/2022-11-09-3-00-30.png"  width="500" height="350">

<hr/>
</div>

## 김헬창의 기술 스택

### FRONT

<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=javascript&logoColor=white" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />

<br/>

### BACK

<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=MongoDB&logoColor=white" />

<br/>
<hr/>

## 김헬창의 팀원들

| 이름   | 담당 역할   | 담당 업무                     | 3대 스텟 |
| ------ | ----------- | ----------------------------- | -------- |
| 유상우 | 팀장/백엔드 | Auth                          | 220      |
| 전세현 | 백엔드      | 상품                          | 100      |
| 정호진 | 프론트엔드  | 관리자 페이지                 | 425      |
| 한세은 | 프론트엔드  | 장바구니, 상품, 주문 페이지   | 200      |
| 홍화낙 | 프론트엔드  | Auth, 메인 페이지, 헤더, 푸터 | 270      |

<br/>
<hr/>
<br/>

## 서비스 주요 기능

**사용자**

- 회원가입, 로그인을 할 수 있다.
- 구글 로그인을 할 수 있다.
- 사용자는 상품을 장바구니에 담을 수 있다.
- 사용자는 장바구니에 담은 상품의 수량을 조절 할 수 있다.
- 상품이 품절이 되면 장바구니에 담을 수 없으며 구매도 불가능하다.
- 주문시 로그인한 사용자의 주소를 미리 불러온다.
- 사용자는 주문 취소를 할 수 있다.
- 사용자는 계정 관리에서 본인 정보를 수정할 수 있다.

**관리자**

- 관리자는 관리자 페이지에서 상품, 카테고리, 주문 조회를 할 수 있다.
- 관리자는 상품, 카테고리, 주문을 생성, 수정, 삭제를 할 수 있다.

<br/>
<hr/>
<br/>

## 서비스 구성도

### 워크 플로우

<img src="https://i.ibb.co/Rp8xy7b/2022-11-10-5-26-56.png" alt="2022-11-10-5-26-56" border="0" width="500">
<img src="https://i.ibb.co/SB5WNKD/2022-11-10-5-27-03.png" alt="2022-11-10-5-27-03" border="0" width="400">

<br/>
<hr/>
<br/>

### API 명세서

| 기능                    | METHOD | ENDPOINT               |
| ----------------------- | ------ | ---------------------- |
| AUTH                    |        |                        |
| 회원가입                | POST   | /api/signup            |
| 로그인                  | POST   | api/login              |
| CATEGORY                |        |                        |
| 카테고리 조회           | GET    | /category              |
| 카테고리 생성           | POST   | /category              |
| 카테고리 수정           | PATCH  | /category/:id          |
| 카테고리 삭제           | DELETE | /category/:id          |
| ORDER                   |        |                        |
| 주문 생성               | POST   | /orders                |
| 주문 전체 조회(admin)   | GET    | /orders                |
| 주문 전체 조회(user)    | GET    | /orders/:user-id       |
| 주문 상세 조회          | GET    | /orders/item/:user-id  |
| 주문 수정               | PATCH  | /orders/:order-id      |
| 주문 삭제               | DELETE | /orders/:order-id      |
| PRODUCT                 |        |                        |
| 상품 전체 조회          | GET    | /products              |
| 카테고리 종속 상품 조회 | GET    | /products/:category-id |
| 상품 상세 조회          | GET    | /products/item/:id     |
| 상품 생성               | POST   | /products              |
| 상품 수정               | PATCH  | /products/:product-id  |
| 상품 삭제               | DELETE | /products/:product-id  |
| MYPAGE                  |        |                        |
| 사용자 정보 조회        | GET    | /api/userlist          |
| 사용자 정보 수정        | PATCH  | api/users              |
| 사용자 정보 삭제        | DELETE | api/delete             |
| 특정 사용자 조회        | GET    | api/:user-id           |

<br/>
<hr/>
<br/>

### 서비스 아키텍처

<img src="https://i.ibb.co/G7TZ6MQ/2022-11-10-7-13-14.png" alt="2022-11-10-7-13-14" border="0">
<br/>
<hr/>
<br/>

# 사이트 링크

**아래는 김헬창과 팀원들이 2주 동안 개발하여 만든 사이트이다!**
<br/>
<br/>
[베타 사이트 클릭!](https://www.naver.com)
