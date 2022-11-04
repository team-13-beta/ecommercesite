import Categories from "./categories/category.js";
import Orders from "./orders/order.js";
import Products from "./products/product.js";

import { navigate } from "../utility/navigate.js";
import { checkStringEmpty, pathToRegex } from "../useful-functions.js";
import ProductDetail from "./products/productDetail.js";
import OrderDetail from "./orders/orderDetail.js";
import { closeModal } from "./components/modal.js";

const BASE_URL = `http://localhost:5000/admin`;

export default function App({ $app }) {
  this.state = {
    orderLists: [],
    categoryLists: [],
    productLists: [],
    orderDetail: {},
    productDetail: {},
  };

  const orders = new Orders({
    $app,
    initialState: this.state.orderLists,
    searchHandler: (searchData) => {
      const curOrderLists = this.state.orderLists;
      const orderLists =
        searchData === ""
          ? wholeOrderLists
          : curOrderLists.filter((data) =>
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
    initialState: this.state,
    searchHandler: (searchData) => {
      const curProductLists = this.state.productLists;
      const productLists = checkStringEmpty(searchData)
        ? curProductLists
        : curProductLists.filter((data) =>
            data.productName.includes(searchData),
          );

      this.setState({
        ...this.state,
        productLists,
      });
    },
    appendHandler: (appendData) => {
      this.setState({
        productLists: [...this.state.productLists, { ...appendData }],
      });
    },
  });
  const categories = new Categories({
    $app,
    initialState: this.state.categoryLists,
    searchHandler: (searchData) => {
      const curCategoryLists = this.state.categoryLists;
      const categoryLists = checkStringEmpty(searchData)
        ? curCategoryLists
        : curCategoryLists.filter((data) =>
            data.categoryName.includes(searchData),
          );

      this.setState({
        ...this.state,
        categoryLists,
      });
    },
    appendHandler: (appendItem) => {
      this.setState({
        ...this.state,
        categoryLists: [...this.state.categoryLists, appendItem],
      });
      closeModal();
    },
    deleteHandler: (deleteId) => {
      const categoryLists = this.state.categoryLists.filter(
        (category) => category.id !== deleteId,
      );
      this.setState({
        categoryLists,
      });
    },
  });

  const productDetail = new ProductDetail({
    $app,
    $initialState: this.state.productDetail,
    $categories: this.state.categoryLists,
    deleteHandler: (deleteId) => {
      const productLists = this.state.productLists.filter(
        (product) => product.id !== deleteId,
      );
      navigate(`/admin/products`);
      this.setState({ productLists, productDetail: {} });
    },
    updateHandler: (updateData) => {
      const { id } = updateData;
      const productLists = this.state.productLists.map((product) =>
        product.id === id ? updateData : product,
      );
      alert("수정 완료");
      this.setState({ productLists, productDetail: updateData });
    },
  });

  const orderDetail = new OrderDetail({
    $app,
    $initialState: this.state.orderDetail,
    deleteHandler: (deleteId) => {
      const orderLists = this.state.orderLists.filter(
        (order) => order.id !== deleteId,
      );
      navigate(`/admin/orders`);
      this.setState({ orderLists });
    },
    updateHandler: (updateData) => {
      const { id } = updateData;
      // 수정 완료가 되어야 함.
      const orderLists = this.state.orderLists.map((order) =>
        order.id === id ? updateData : order,
      );

      alert("수정 완료");
      this.setState({ orderLists, orderDetail: updateData });
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
    let match = results.find((route) => route.result != null);
    if (match) {
      match.route.view.init();
    }
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    orders.setState(this.state.orderLists);
    categories.setState(this.state.categoryLists);
    products.setState({ ...this.state });
    orderDetail.setState(this.state.orderDetail);
    productDetail.setState(this.state.productDetail, this.state.categoryLists);

    // this.render();
  };

  this.init = async () => {
    window.addEventListener("popstate", () => {
      this.render();
    });
    window.addEventListener("DOMContentLoaded", () => {
      document.body.querySelector(".tabs").addEventListener("click", (e) => {
        e.preventDefault();
        const { target } = e;
        if (target.matches("[data-link]")) {
          const targetURL = target.href.replace(BASE_URL, "");

          const $ul = e.target.closest("ul");
          const $li = e.target.closest("li");

          for (const node of $ul.childNodes) {
            if (node.nodeType === 1) {
              if ($li === node) $li.classList.add("is-active");
              else node.classList.remove("is-active");
            }
          }

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

    const [orderData, productData, categoryData] = await Promise.all([
      fetch("./mockData/orderData.json").then((res) => res.json()),
      fetch("./mockData/productData.json").then((res) => res.json()),
      fetch("./mockData/categoryData.json").then((res) => res.json()),
    ]);

    this.setState({
      orderLists: orderData.data,
      productLists: productData.data,
      categoryLists: categoryData.data,
    });

    navigate(`${BASE_URL}/orders`, {
      title: "Orders",
      state: "initial",
    });
  };

  this.init();
}
