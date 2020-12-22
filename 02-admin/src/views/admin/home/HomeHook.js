import React, { useState } from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { routes } from "../../../routers/routes";
import { Layout, Menu } from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,

} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function HomeHook() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <SubMenu key="sub1" icon={<UserOutlined />} title="产品管理">
            <Menu.Item key="sub11">
              <Link to="/product/add">
                <VideoCameraOutlined type="team" />
                <span>产品添加</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="sub12">
              <Link to="/product/list">
                <VideoCameraOutlined type="team" />
                <span> 产品列表</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<UserOutlined />} title="用户管理">
            <Menu.Item key="sub21">
              <Link to="/user/add">
                <VideoCameraOutlined type="team" />
                <span>用户添加</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="sub22">
              <Link to="/user/list">
                <VideoCameraOutlined type="team" />
                <span>用户列表</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            {routes.map((item, index) => {
              console.log(index);
              return (
                <Route
                  key={index}
                  exact
                  path={item.path}
                  render={(props) => <item.component {...props} />}
                />
              );
            })}
            <Redirect to="/product/list" />;
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
export default HomeHook;
