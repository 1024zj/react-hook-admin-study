//当有许多组件要使用reducer共有数据时,应该把主的reducer进行拆分
//把处理数据的内容让各个组件分的reducer去承担,主reducer只承担
//引入分reducer的作用,最后通过store把数据映射到所有组件中
import { combineReducers } from "redux"; //负责拆分reducer
import user from "./reducers/user/userReducer";
import product from "./reducers/product/productReducer";
export default combineReducers({
  product: product,
  user: user,
});
