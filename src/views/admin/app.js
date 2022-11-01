import Categories from "./categories/index.js";
import Orders from "./orders/index.js";
import Products from "./products/index.js";

import { navigate } from "../utility/navigate.js";
import { pathToRegex } from "../useful-functions.js";

const INITNAI_URL = `http://localhost:5000/admin`;
const orderData = {
  data: [
    {
      order_id: "1",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      order_id: "2",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      order_id: "3",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      order_id: "4",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      order_id: "5",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      order_id: "6",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      order_id: "7",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      order_id: "8",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      order_id: "9",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
    {
      order_id: "10",
      address: "경기도 수원시 장안구 엄복동",
      consumerName: "정호진",
      phoneNumber: "010-2333-9654",
      status: "배송전",
      totalPrice: 10000,
    },
  ],
};

export default function App({ $app }) {
  this.state = {
    orderLists: [],
  };

  const orders = new Orders({ $app, initialState: this.state.orderLists });
  const products = new Products({ $app });
  const categories = new Categories({ $app });

  const routes = [
    { path: "/admin/orders", view: orders, title: "Orders" },
    { path: "/admin/products", view: products, title: "Products" },
    { path: "/admin/categories", view: categories, title: "Categories" },
  ];

  this.render = () => {
    const results = routes.map((route) => {
      return {
        route,
        result: location.pathname.match(pathToRegex(route.path)),
      };
    });
    let match = results.find((route) => route.result != null);

    if (match) {
      match.route.view.init();
    }
  };

  this.setState = (state) => {
    this.state = { ...state };
  };

  this.init = () => {
    window.addEventListener("popstate", () => this.render());

    window.addEventListener("DOMContentLoaded", () => {
      document.body.addEventListener("click", (e) => {
        e.preventDefault();
        const { target } = e;
        if (target.matches("[data-link]")) {
          const BASE_URL = `http://localhost:5000`;
          const targetURL = target.href.replace(BASE_URL, "");
          if (targetURL !== location.pathname) {
            navigate(targetURL, { title: target.dataset.link, state: "load" });
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

    console.log(orderData);
    this.setState({ ...this.state, orderLists: orderData.data });

    navigate(`${INITNAI_URL}/orders`, {
      title: "Orders",
      state: "initial",
    });
  };

  this.init();
}
