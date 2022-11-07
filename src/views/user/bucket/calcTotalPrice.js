export default function calcTotalPrice(idEl) {
  let res = 0;
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    const data = JSON.parse(window.localStorage.getItem(key));
    res += parseInt(data.stock) * parseInt(data.price);
  }
  return res;
}
