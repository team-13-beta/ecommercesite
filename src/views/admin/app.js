import Categories from "./categories/category.js";
import Orders from "./orders/order.js";
import Products from "./products/product.js";

import { navigate } from "../utility/navigate.js";
import { pathToRegex } from "../useful-functions.js";
import ProductDetail from "./products/productDetail.js";
import OrderDetail from "./orders/orderDetail.js";

const BASE_URL = `http://localhost:5000/admin`;
const orderData = {
  data: [
    {
      id: "1",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "2",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "3",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "4",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "5",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "6",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "7",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "8",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "김민수",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "9",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "asdf",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      id: "10",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "한정환",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
  ],
};
const categoryData = {
  data: [
    {
      category_id: "1",
      category_name: "닭가슴살",
    },
    {
      category_id: "2",
      category_name: "프로틴음료",
    },
    {
      category_id: "3",
      category_name: "프로틴",
    },
    {
      category_id: "4",
      category_name: "도시락",
    },
  ],
};
const productData = {
  data: [
    {
      id: "1",
      productName: "김계란 닭가슴살",
      category: "닭가슴살",
      price: "2400",
      stock: "100",
    },
    {
      id: "2",
      productName: "하림 닭가슴살",
      category: "닭가슴살",
      price: "2700",
      stock: "100",
    },
    {
      id: "3",
      productName: "허닭 닭가슴살",
      category: "닭가슴살",
      price: "2200",
      stock: "50",
    },
    {
      id: "4",
      productName: "풀무원 닭가슴살",
      category: "닭가슴살",
      price: "1800",
      stock: "100",
    },
    {
      id: "5",
      productName: "김계란 프로틴",
      category: "프로틴",
      price: "4000",
      stock: "100",
    },
    {
      id: "6",
      productName: "몬스터 프로틴",
      category: "프로틴",
      price: "35000",
      stock: "100",
    },
    {
      id: "7",
      productName: "김혜자 도시락",
      category: "도시락",
      price: "4500",
      stock: "100",
    },
    {
      id: "8",
      productName: "GS 도시락",
      category: "도시락",
      price: "4700",
      stock: "100",
    },
    {
      id: "9",
      productName: "닭가슴살",
      category: "닭가슴살",
      price: "2400",
      stock: "100",
    },
    {
      id: "10",
      productName: "닥터유 24",
      category: "프로틴음료",
      price: "2400",
      stock: "100",
    },
    {
      id: "11",
      productName: "셀트리온 27",
      category: "프로틴음료",
      price: "2700",
      stock: "100",
    },
    {
      id: "12",
      productName: "김수미 도시락",
      category: "도시락",
      price: "4400",
      stock: "100",
    },
    {
      id: "13",
      productName: "생닭가슴살",
      category: "닭가슴살",
      price: "900",
      stock: "100",
    },
  ],
};

export default function App({ $app }) {
  this.state = {
    renderStack: 0,
    orderLists: orderData.data,
    categoryLists: categoryData.data,
    productLists: productData.data,
  };

  const orders = new Orders({
    $app,
    initialState: orderData.data,
    onClick: (searchData) => {
      const orderLists =
        searchData === ""
          ? orderData.data
          : this.state.orderLists.filter((data) =>
              data.consumerName.includes(searchData),
            );

      this.setState({
        ...this.state,
        orderLists,
      });
    },
  });
  const products = new Products({
    $app,
    initialState: productData.data,
    onClick: (searchData) => {
      const productLists =
        searchData === ""
          ? productData.data
          : this.state.productLists.filter((data) =>
              data.productName.includes(searchData),
            );

      this.setState({
        ...this.state,
        productLists,
      });
    },
  });
  const categories = new Categories({
    $app,
    initialState: categoryData.data,
    onClick: (searchData) => {
      const categoryLists =
        searchData === ""
          ? categoryData.data
          : this.state.categoryLists.filter((data) =>
              data.category_name.includes(searchData),
            );

      this.setState({
        ...this.state,
        categoryLists,
      });
    },
  });
  const productDetail = new ProductDetail({ $app, $initialState: {} });
  const orderDetail = new OrderDetail({
    $app,
    $initialState: {},
    deleteHandler: (e) => {},
    updateHandler: (updateVal) => {
      const { id } = updateVal;
      // 수정 완료가 되어야 함.
      const orderLists = this.state.orderLists.map((order) =>
        order.id === id ? updateVal : order,
      );
      orderDetail.setState(updateVal);
      this.setState({ orderLists });
    },
  });

  const routes = [
    { path: "/admin/orders", view: orders, title: "Orders" },
    { path: "/admin/products", view: products, title: "Products" },
    { path: "/admin/categories", view: categories, title: "Categories" },
    {
      path: "/admin/products/:id",
      view: productDetail,
      title: "ProductDetails",
    },
    { path: "/admin/orders/:id", view: orderDetail, title: "OrderDetails" },
  ];

  this.render = () => {
    const results = routes.map((route) => {
      return {
        route,
        result: location.pathname.match(pathToRegex(route.path)),
      };
    });
    console.log(results);
    let match = results.find((route) => route.result != null);
    // 화면이 변하지 않아서, 그만큼 화면이 쌓이게 되는 것인가?
    // 값이 변화가 된다면, render가 되어야 함.
    // setState -> render -> url match -> orderDetail init()
    //                                 -> orderDetail render();
    console.log("setState 실행 횟수:", this.state.renderStack);
    if (match) {
      if (
        match.route.view === orderDetail ||
        match.route.view === productDetail
      ) {
        if (match.route.view.state) {
          match.route.view.render();
        }
      }
      match.route.view.init();
    }
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
      renderStack: this.state.renderStack + 1,
    };
    orders.setState(this.state.orderLists);
    categories.setState(this.state.categoryLists);
    products.setState(this.state.productLists);
    this.render();
  };

  this.init = () => {
    window.addEventListener("popstate", () => this.render());

    window.addEventListener("DOMContentLoaded", () => {
      document.body.addEventListener("click", (e) => {
        e.preventDefault();
        const { target } = e;
        if (target.matches("[data-link]")) {
          const targetURL = target.href.replace(BASE_URL, "");
          if (targetURL !== location.pathname) {
            navigate(`/admin${targetURL}`, {
              title: target.dataset.link,
              state: "load",
            });
          }
        }
      });
    });

    window.addEventListener("historychange", ({ detail }) => {
      const { to, isReplace, state } = detail;
      if (isReplace || to === location.pathname)
        history.replaceState(state, "", to);
      else history.pushState(state, "", to);

      this.render();
    });

    navigate(`${BASE_URL}/orders`, {
      title: "Orders",
      state: "initial",
    });
  };

  this.init();
}
