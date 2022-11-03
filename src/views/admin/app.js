import Categories from "./categories/category.js";
import Orders from "./orders/order.js";
import Products from "./products/product.js";

import { navigate } from "../utility/navigate.js";
import { pathToRegex } from "../useful-functions.js";
import ProductDetail from "./products/productDetail.js";
import OrderDetail from "./orders/orderDetail.js";
import { closeModal } from "./components/modal.js";

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
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "2",
      productName: "하림 닭가슴살",
      category: "닭가슴살",
      price: "2700",
      stock: "100",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "3",
      productName: "허닭 닭가슴살",
      category: "닭가슴살",
      price: "2200",
      stock: "50",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "4",
      productName: "풀무원 닭가슴살",
      category: "닭가슴살",
      price: "1800",
      stock: "100",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "5",
      productName: "김계란 프로틴",
      category: "프로틴",
      price: "4000",
      stock: "100",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "6",
      productName: "몬스터 프로틴",
      category: "프로틴",
      price: "35000",
      stock: "100",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "7",
      productName: "김혜자 도시락",
      category: "도시락",
      price: "4500",
      stock: "100",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "8",
      productName: "GS 도시락",
      category: "도시락",
      price: "4700",
      stock: "100",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "9",
      productName: "닭가슴살",
      category: "닭가슴살",
      price: "2400",
      stock: "100",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "10",
      productName: "닥터유 24",
      category: "프로틴음료",
      price: "2400",
      stock: "100",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "11",
      productName: "셀트리온 27",
      category: "프로틴음료",
      price: "2700",
      stock: "100",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "12",
      productName: "김수미 도시락",
      category: "도시락",
      price: "4400",
      stock: "100",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
    {
      id: "13",
      productName: "생닭가슴살",
      category: "닭가슴살",
      price: "900",
      stock: "100",
      companyName: "paper company",
      description: "temp",
      imageSrc: "base64",
    },
  ],
};

export default function App({ $app }) {
  this.state = {
    orderLists: orderData.data,
    categoryLists: categoryData.data,
    productLists: productData.data,
    orderDetail: {},
    productDetail: {},
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
    initialState: this.state,
    searchHandler: (searchData) => {
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
    searchHandler: (searchData) => {
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
    appendHandler: (appendItem) => {
      this.setState({
        ...this.state,
        categoryLists: [...this.state.categoryLists, appendItem],
      });
      closeModal();
    },
  });
  const productDetail = new ProductDetail({
    $app,
    $initialState: this.state.productDetail,
    $categories: this.state.categoryLists,
    deleteHandler: (e) => {
      console.log(e);
    },
    updateHandler: (updateData) => {
      const { id } = updateData;
      console.log(updateData);
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
    deleteHandler: (e) => {},
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

  this.init = () => {
    window.addEventListener("popstate", () => {
      this.render();
    });

    window.addEventListener("DOMContentLoaded", () => {
      document.querySelector("nav").addEventListener("click", (e) => {
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
