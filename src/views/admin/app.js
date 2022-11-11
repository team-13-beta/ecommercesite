import Categories from "./categories/category.js";
import Orders from "./orders/order.js";
import Products from "./products/product.js";

import { navigate } from "../utility/navigate.js";
import {
  checkAdmin,
  checkStringEmpty,
  getImageKeyByCheckType,
  pathToRegex,
} from "../useful-functions.js";
import ProductDetail from "./products/productDetail.js";
import OrderDetail from "./orders/orderDetail.js";
import { closeModal } from "./components/modal.js";
import { get, post, dels, patchs } from "../api.js";
import { deletePhoto } from "../aws-s3.js";

const BASE_URL = window.location.origin;

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
      const orderLists = checkStringEmpty(searchData)
        ? this.state.orderLists
        : orders.state.filter((order) => order.userName.includes(searchData));
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
            product.name.includes(searchData),
          );
      products.setState({ ...products.state, productLists });
    },
    appendHandler: async (appendItem) => {
      const postResult = await post(`/products`, appendItem);

      this.setState({
        productLists: [...this.state.productLists, { ...postResult.data }],
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
      const postResult = await post(`/category`, appendItem);

      this.setState({
        ...this.state,
        categoryLists: [...this.state.categoryLists, postResult.data],
      });
      closeModal();
    },
    deleteHandler: async (deleteId) => {
      const deleteResult = await dels(`/category/${deleteId}`);
      if (deleteResult.code >= 400) {
        alert("삭제에 실패했습니다.");
        return;
      }
      const categoryLists = this.state.categoryLists.filter(
        (category) => category.id !== deleteId,
      );

      this.setState({
        categoryLists,
      });
      closeModal();
    },
    updateHandler: async ({ id, name }) => {
      const updateResult = await patchs(`/category/${id}`, {
        name,
      });
      if (updateResult.code >= 400) {
        alert("수정에 실패했습니다.");
        closeModal();
        return;
      }

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
    deleteHandler: async (deleteId, preImageKey) => {
      Object.values(preImageKey).forEach((imageKey) => deletePhoto(imageKey));
      const delResult = await dels(`/products/${deleteId}`);
      if (delResult.code >= 400) {
        alert("삭제에 실패했습니다.");
        return;
      }
      const productLists = this.state.productLists.filter(
        (product) => Number(product.id) !== Number(deleteId),
      );
      navigate(`/admin/products`);
      this.setState({ productLists, productDetail: {} });
    },
    updateHandler: async (updateData, preImageKey) => {
      const {
        id,
        categoryId,
        titleImage,
        detailImage,
        deliveryImage,
        nutritionImage,
      } = updateData;

      // 넘겨주는 image의 타입이 object라면, 기존에 있던 값을 삭제하고 해당 값을 넣어줘야 함.
      // this.state.productDetail에 데이터가 들어가야 하는데, 그게 들어가지 않음.
      updateData = {
        ...updateData,
        titleImage: await getImageKeyByCheckType(
          titleImage,
          categoryId,
          preImageKey.titleImage,
        ),
        detailImage: await getImageKeyByCheckType(
          detailImage,
          categoryId,
          preImageKey.detailImage,
        ),
        deliveryImage: await getImageKeyByCheckType(
          deliveryImage,
          categoryId,
          preImageKey.deliveryImage,
        ),
        nutritionImage: await getImageKeyByCheckType(
          nutritionImage,
          categoryId,
          preImageKey.nutritionImage,
        ),
      };

      const patchResult = await patchs(`/products/${id}`, updateData);

      const productLists = this.state.productLists.map((product) =>
        product.id == id ? updateData : product,
      );
      alert("수정 완료");
      this.setState({ productLists, productDetail: patchResult });
    },
  });
  const orderDetail = new OrderDetail({
    $app,
    $initialState: this.state.orderDetail,
    deleteHandler: async (deleteId) => {
      const delResult = await dels(`/orders/${deleteId}`);
      if (!delResult.acknowledged) {
        alert("삭제에 실패했습니다.");
        return;
      }
      const orderLists = this.state.orderLists.filter(
        (order) => order.id !== deleteId,
      );

      navigate(`/admin/orders`);
      this.setState({ orderLists });
    },
    updateHandler: async (updateData) => {
      const { id } = updateData;
      const patchResult = await patchs(`/orders/${id}`, updateData);

      const orderLists = this.state.orderLists.map((order) =>
        order.id !== id ? updateData : order,
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
      // this.setState(); // 테이블 초기화.
      switch (match.route.view) {
        case orders:
          const orderLists = await get(`/orders`);
          this.setState({ orderLists });
          break;
        case products:
          const productLists = await get(`/products`);
          this.setState({ productLists });
          break;
        case categories:
          const categoryLists = await get(`/category`);
          this.setState({ categoryLists });
          break;
      }
      match.route.view.init();
    }
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    console.log(nextState, "nextState!!");
    orders.setState(this.state.orderLists);
    categories.setState(this.state.categoryLists);
    products.setState({ ...this.state });
    orderDetail.setState(this.state.orderDetail);
    productDetail.setState(this.state.productDetail, this.state.categoryLists);
  };

  this.init = async () => {
    checkAdmin();
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

    const [productLists, categoryLists, orderLists] = await Promise.all([
      get(`/products`),
      get(`/category`),
      get(`/orders`),
    ]);

    this.setState({
      productLists,
      categoryLists,
      orderLists,
    });

    navigate(`/admin/orders`, {
      title: "Orders",
      state: "initial",
    });
  };

  this.init();
}
