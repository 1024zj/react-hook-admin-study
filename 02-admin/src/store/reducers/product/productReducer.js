import { PRODUCT_SET } from "../../actions";
const defaultState = {
  title: "产品信息",
  product: [
    { title: "汽车", price: 100 },
    { title: "房子", price: 99 },
  ],
};
export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case PRODUCT_SET:
      newState.product = action.product;
      return newState;
    default:
      return state;
  }
};
