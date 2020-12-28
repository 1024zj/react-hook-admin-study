import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Layout, Typography } from "antd";
import {
  MenuFoldOutlined,
  MailOutlined
} from '@ant-design/icons';
import "./Header.css";

const { Text } = Typography;
const { Header } = Layout;

export default function MyHeader(props) {
  let history = useHistory();
  let [collapsed, setCollapsed] = useState(false);
  const siderAction = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
    props.callback(collapsed);
  }

  const logout = () => {
    //清除用户保存的信息
    localStorage.removeItem("user");
    history.push(`/login`);
  }

  return (
    <Header className="HeaderBox">
      <div className="titleBox">
        <MenuFoldOutlined
          className="icon"
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={siderAction}
        />
      </div>
      <div className="menuBox">
        <MailOutlined />
        <Text
          className="menuWords"
          strong={true}
          onClick={logout}
        >
          退出
          </Text>
      </div>
    </Header>
  );

}
