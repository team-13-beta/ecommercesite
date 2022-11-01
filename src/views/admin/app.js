import Categories from "./categories/index.js";
import Orders from "./orders/index.js";
import Products from "./products/index.js";

import { navigate } from "../utility/navigate.js";
import { pathToRegex } from "../useful-functions.js";

export default function App({ $app }) {
  this.state = {};

  const orders = new Orders({ $app, initialState: this.state.homeList });
  const products = new Products({ $app, initialState: "Settings" });
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

    if (match) match.route.view.init();
  };

  this.init = () => {
    window.addEventListener("popstate", () => {
      this.render();
    });

    window.addEventListener("DOMContentLoaded", () => {
      document.body.addEventListener("click", (e) => {
        e.preventDefault();
        const { target } = e;
        if (target.matches("[data-link]")) {
          const BASE_URL = `http://localhost:5000`;
          const targetURL = target.href.replace(BASE_URL, "");
          navigate(targetURL, { title: target.dataset.link });
          this.render();
        }
      });
    });
    window.addEventListener("historychange", ({ detail }) => {
      const { to, isReplace, state } = detail;
      console.log(detail);
      if (isReplace || to === location.pathname)
        history.replaceState(state, "", to);
      else history.pushState(state, "", to);

      this.render();
    });

    const initialUrl = `http://localhost:5000/admin/orders`;

    navigate(initialUrl, {
      title: "Orders",
    });
  };

  this.init();
}
