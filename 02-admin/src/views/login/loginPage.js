import React from "react";
import { connect } from "react-redux";
import { USER_SET, TOKEN_SET } from "../../store/actions";
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import "./loginPage.css";

function Login(props) {
  let history = useHistory();
  const onFinish = async (values) => {
    let res = await props.http.login(values);
    if (res.ob) {
      props.setToken(res.ob.token);
      props.setUser(res.ob);
      history.push(`/`);
    }
  }

  return (
    <div className="container-login">

      <h1 className="page-title">后台管理系统-登录 {props.token}页面</h1>
      <Form
        className="form"
        name="login"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          className="Item"
          rules={[{
            required: true,
            whitespace: true,
            message: "用户名必须输入,不能有空格"
          },
          {
            min: 4,
            message: "用户名不能小于4位"
          },
          {
            max: 11,
            message: "用户名不能大于12位"
          },
          {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: "用户名必须是英文数字下划线",
          },
          ]}>
          <Input
            className="input"
            placeholder="请输入你的账号"
          />
        </Form.Item>

        <Form.Item
          name="passwd"
          className="Item"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "密码必须输入,不能有空格",
            },
            { min: 6, message: "密码不能小于6位" },
            { max: 12, message: "密码不能大于12位" },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: "密码必须是英文数字下划线",
            },
          ]}
        >

          <Input
            className="input"

            type="password"
            placeholder="密 码"
          />
        </Form.Item>


        <div
          className="inputItem">
          <Button className="button" type="primary" htmlType="submit">
            登录
          </Button>

        </div>
      </Form>
    </div >
  );
}

const mapStatetiProps = (state) => ({
  user: state.user.user,
  token: state.user.token
});

const mapDispatch = (dispatch) => ({
  setUser(user) {
    let action = {
      type: USER_SET,
      user: user,
    };
    dispatch(action);
  },
  setToken(token) {
    let action = {
      type: TOKEN_SET,
      token: token
    }
    dispatch(action);
  }
});
export default connect(mapStatetiProps, mapDispatch)(Login);
