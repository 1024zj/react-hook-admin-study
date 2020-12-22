import { USER_SET, TOKEN_SET } from "../../actions";



const reLogin = ()=>{
   //信息提示
   //跳转到登录页面
}

let token = sessionStorage.getItem('token')!=null?sessionStorage.getItem('token'):reLogin;
const defaultState = {
  token: token,
  user: {
    name: "小明",
    age: 18,
  },
};

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case USER_SET:
      newState.user = action.user;
      return newState;
    case TOKEN_SET:
      newState.token = action.token;
      return newState;
    default:
      return state;
  }
};
