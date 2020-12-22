import React from "react";
import { Layout, Typography } from "antd";
import {
  MenuFoldOutlined,
  MailOutlined
} from '@ant-design/icons';
import "./Header.css";

const { Text } = Typography;
const { Header } = Layout;

export default class MyHeader extends React.Component {
  constructor(props) {
    super();
    this.state = {
      collapsed: false,
      callback: props.callback
    };
  }

  siderAction() {
    let buffer = this.state.collapsed;
    if (buffer) {
      buffer = false;
    } else {
      buffer = true;
    }

    this.state.callback(buffer);

    this.setState({
      collapsed: buffer
    });
  }

  logout() {
    //清除用户保存的信息
    localStorage.removeItem("user");
    console.log(this.props.headerProps);
    this.props.headerProps.history.push({
      pathname: "/login",
      state: {}
    });
  }
  render() {
    return (
      <Header className="HeaderBox">
        <div className="titleBox">
          <MenuFoldOutlined
            className="icon"
            type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={this.siderAction.bind(this)}
          />
        </div>
        <div className="menuBox">
          <MailOutlined />
          <Text
            className="menuWords"
            strong={true}
            onClick={this.logout.bind(this)}
          >
            退出
          </Text>
        </div>
      </Header>
    );
  }
}
