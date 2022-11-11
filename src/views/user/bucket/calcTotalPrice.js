export default function calcTotalPrice() {
  let res = 0;
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (Number.isInteger(parseInt(key))) {
      const data = JSON.parse(window.localStorage.getItem(key));
      res += parseInt(data.stock) * parseInt(data.price);
    }
  }
  return res;
}
