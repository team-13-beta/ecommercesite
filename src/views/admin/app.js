import Categories from "./categories/category.js";
import Orders from "./orders/order.js";
import Products from "./products/product.js";

import { navigate } from "../utility/navigate.js";
import { checkStringEmpty, pathToRegex } from "../useful-functions.js";
import ProductDetail from "./products/productDetail.js";
import OrderDetail from "./orders/orderDetail.js";
import { closeModal } from "./components/modal.js";
import { get, post, del, patch } from "../api.js";

const BASE_URL = `http://localhost:5000`;

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
      console.log(orders.state, searchData);
      const orderLists = checkStringEmpty(searchData)
        ? this.state.orderLists
        : orders.state.filter((order) =>
            order.consumerName.includes(searchData),
          );
      orders.setState(orderLists);
    },
  });
  const products = new Products({
    $app,
    initialState: this.state,
    searchHandler: (searchData) => {
      const productLists = checkStringEmpty(searchData)
        ? this.state.productLists
        : products.state.productLists.filter((product) =>
            product.productName.includes(searchData),
          );
      products.setState({ ...products.state, productLists });
    },
    appendHandler: async (appendItem) => {
      const postResult = await post(`${BASE_URL}/products`, appendItem);
      // 상품, 카테고리, 주무 조회 관련해서 데이터 schema 통일 시킬 것.

      this.setState({
        productLists: [...this.state.productLists, { ...postResult }],
      });
    },
  });
  const categories = new Categories({
    $app,
    initialState: this.state.categoryLists,
    searchHandler: (searchData) => {
      const categoryLists = checkStringEmpty(searchData)
        ? this.state.categoryLists
        : categories.state.filter((category) =>
            category.name.includes(searchData),
          );
      categories.setState(categoryLists);
    },
    appendHandler: async (appendItem) => {
      // Append 추가
      const postResult = await post(`${BASE_URL}/category`, appendItem);
      this.setState({
        ...this.state,
        categoryLists: [...this.state.categoryLists, postResult],
      });
      closeModal();
    },
    deleteHandler: async (deleteId) => {
      const deleteResult = await del(`${BASE_URL}/category`, `${deleteId}`);
      console.log(deleteResult); // 여기서 값 처리 되는지 확인
      const categoryLists = this.state.categoryLists.filter(
        (category) => category.id !== deleteId,
      );

      this.setState({
        categoryLists,
      });
      closeModal();
    },
    updateHandler: async ({ id, name }) => {
      const updateResult = await patch(`${BASE_URL}/category`, `${id}`, {
        name,
      });
      console.log(updateResult); // 여기서도 확인

      const categoryLists = this.state.categoryLists.map((category) =>
        category.id === id ? { id, name } : category,
      );

      this.setState({ categoryLists });
      closeModal();
    },
  });

  const productDetail = new ProductDetail({
    $app,
    $initialState: this.state.productDetail,
    $categories: this.state.categoryLists,
    deleteHandler: async (deleteId) => {
      const delResult = await del(`${BASE_URL}/products`, `${deleteId}`);
      console.log(delResult);
      const productLists = this.state.productLists.filter(
        (product) => product.id !== deleteId,
      );
      navigate(`/admin/products`);
      this.setState({ productLists, productDetail: {} });
    },
    updateHandler: async (updateData) => {
      const { id } = updateData;
      const patchResult = patch(`${BASE_URL}/products`, id, updateData);
      consnole.log(patchResult);
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
    deleteHandler: async (deleteId) => {
      const delResult = await del(`${BASE_URL}/orders`, `${deleteId}`);
      console.log(delResult);
      const orderLists = this.state.orderLists.filter(
        (order) => order.id !== deleteId,
      );
      navigate(`/admin/orders`);
      this.setState({ orderLists });
    },
    updateHandler: async (updateData) => {
      const { id } = updateData;
      const patchResult = patch(`${BASE_URL}/orders`, id, updateData);
      consnole.log(patchResult);

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

  this.render = async () => {
    const results = routes.map((route) => {
      return {
        route,
        result: location.pathname.match(pathToRegex(route.path)),
      };
    });
    let match = results.find((route) => route.result != null);
    if (match) {
      this.setState(); // 테이블 초기화.
      // switch (match.route.view) {
      //   case orders:
      //     const orderLists = await get(`${BASE_URL}/orders`);
      //     console.log(orderLists);
      //     break;
      // }
      match.route.view.init();
    }
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    // orderList가 애매함...
    // 동기화 기준을 어떻게 잡아야 할 지 모르겠다
    orders.setState(this.state.orderLists);
    categories.setState(this.state.categoryLists);
    products.setState({ ...this.state });
    orderDetail.setState(this.state.orderDetail);
    productDetail.setState(this.state.productDetail, this.state.categoryLists);
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
          const targetURL = target.href.replace(`${BASE_URL}/admin`, "");

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

    // const [productLists, categoryLists, orderLists] = await Promise.all([
    //   get(`${BASE_URL}/products`),
    //   get(`${BASE_URL}/category`),
    //   get(`${BASE_URL}/`).then((res) => res.json()),
    // ]);

    const [productLists, categoryLists, orderLists] = await Promise.all([
      fetch("./mockData/productData.json").then((res) => res.json()),
      fetch("./mockData/categoryData.json").then((res) => res.json()),
      fetch("./mockData/orderData.json").then((res) => res.json()),
    ]);

    this.setState({
      productLists,
      categoryLists,
      orderLists,
    });

    navigate(`${BASE_URL}/admin/orders`, {
      title: "Orders",
      state: "initial",
    });
  };

  this.init();
}
