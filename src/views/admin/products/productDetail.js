export default function ProductDetail({ initialState }) {
  this.state = initialState;
  this.init = () => {
    console.log("productDetail");
    this.render();
  };
  this.render = () => {};
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
}
